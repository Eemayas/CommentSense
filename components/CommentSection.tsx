/** @format */

"use client";
import React, { useState, useEffect, useRef } from "react";
import { Pagination, Divider } from "@nextui-org/react";
import { CommentData, CommentDataPaginationState, SearchPrompt } from "@/types";
import CommentCards from "./CommentsCards";
import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/utils/motion";
import { scrollToSection } from "@/lib/action/ScrollFunctionalities";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_DATA_PAGINATION,
  ADD_COMMENT_DATA_SUCCESS,
  IS_SHOW_SPINNER,
} from "@/lib/store/Reducer/constant";
import { AxiosResponse } from "axios";
import { getCommentsAnalysisPagination } from "@/app/constants/apiEndpints";
import { RootState } from "@/lib/store/Reducer/store";
import AnalysisTabularView, {
  ColumnHeaderType,
  YouTubeAnalysisResult,
} from "@/app/(home)/components/YouTubeCommentAnalysisTablarView";

const pageSize = 12; // Number of comments to display per page

const CommentAnalysisSection = () => {
  const dispatch = useDispatch();
  const commentDatas: CommentData[] = useSelector(
    (state: RootState) => state.CommentDataReducer,
  );
  const searchPrompt: SearchPrompt = useSelector(
    (state: RootState) => state.SearchPromptReducer,
  );
  const commentDataPagination: CommentDataPaginationState = useSelector(
    (state: RootState) => state.CommentDataPaginationReducer,
  );
  const searchLink = useSelector(
    (state: RootState) => state.YoutubeLinkReducer,
  );
  const baseUrl = useSelector((state: RootState) => state.BaseUrlReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedComments, setDisplayedComments] = useState([
    {
      type: 0,
      comment: "",
      positive_score: 0,
      negative_score: 0,
      neutral_score: 0,
    },
  ]);
  const columns: ColumnHeaderType[] = [
    { name: "Positive", uid: "pos_accuracy" },
    { name: "Neural", uid: "neu_accuracy" },
    { name: "Negative", uid: "neg_accuracy" },
    { name: " Result", uid: "result" },
    { name: "Comments", uid: "comments" },
  ];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (commentDataPagination[currentPage] != undefined) {
      // const commentsToDisplay: CommentData[] =
      //   commentDataPagination[currentPage];

      setDisplayedComments(commentDataPagination[currentPage]);
    }

    console.log({ displayedComments });
  }, [currentPage, commentDatas, commentDataPagination]);
  const youTubeAnalysisResult: YouTubeAnalysisResult[] = displayedComments.map(
    (commentAnalysis, index) => {
      return {
        id: index,
        comments: commentAnalysis.comment,
        result: commentAnalysis.type,
        pos_accuracy: commentAnalysis.positive_score,
        neu_accuracy: commentAnalysis.negative_score,
        neg_accuracy: commentAnalysis.positive_score,
      };
    },
  );

  if (!searchLink && commentDatas.length === 0) return;

  return (
    <>
      <motion.section
        id="CommentSection"
        ref={sectionRef}
        whileInView={"show"}
        variants={staggerContainer()}
        viewport={{ once: true, amount: 0.1 }}
        className={`items-center px-6 py-5 md:px-20`}
      >
        <h1 className="head-text">Comments Analysis</h1>

        <AnalysisTabularView
          columnsHeader={columns}
          dataToView={youTubeAnalysisResult}
        />
        <Divider className="mt-5" />
        <div className="mt-5 flex flex-row justify-center">
          <Pagination
            showControls
            siblings={0}
            total={
              searchPrompt.comment % pageSize === 0
                ? searchPrompt.comment / pageSize
                : Math.ceil(searchPrompt.comment / pageSize)
            }
            boundaries={1}
            color="secondary"
            page={currentPage}
            onChange={async (e: number) => {
              setCurrentPage(e);
              dispatch({
                type: IS_SHOW_SPINNER,
                payload: true,
              });
              if (!(e in commentDataPagination)) {
                try {
                  const response = await getCommentsAnalysisPagination({
                    baseUrl: baseUrl,
                    params: {
                      page_number: e.toString(),
                    },
                  });
                  console.log({ comments: response.comments });
                  await dispatch({
                    type: ADD_COMMENT_DATA_PAGINATION,
                    payload: { key: e, value: response.comments },
                  });

                  await dispatch({
                    type: ADD_COMMENT_DATA_SUCCESS,
                    payload: response.comments,
                  });
                } catch (error) {
                  console.error("Error fetching data:", error);
                }
              }
              dispatch({
                type: IS_SHOW_SPINNER,
                payload: false,
              });
              scrollToSection("CommentSection");
            }}
          />
        </div>
      </motion.section>{" "}
    </>
  );
};

export default CommentAnalysisSection;
