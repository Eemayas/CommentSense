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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (commentDataPagination[currentPage] != undefined) {
      const commentsToDisplay: CommentData[] =
        commentDataPagination[currentPage];

      setDisplayedComments(commentDataPagination[currentPage]);
      console.log(commentsToDisplay);
    }

    console.log(displayedComments);
  }, [currentPage, commentDatas, commentDataPagination]);

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
        <h1 className="mb-8 mt-4 text-5xl font-bold leading-[72px] tracking-[-1.2px] text-gray-900">
          Comments Analysis
        </h1>
        <div className="mx-auto flex flex-wrap items-center justify-center gap-5">
          {displayedComments.map((comment, index) => (
            <CommentCards
              index={index}
              key={`${comment.type}-${index}`}
              comment={comment.comment}
              neutral_score={comment.neutral_score}
              positive_score={comment.positive_score}
              negative_score={comment.negative_score}
              type={comment.type}
            />
          ))}
        </div>
        <Divider className="mt-5" />
        <div className="mt-5 flex flex-row justify-center">
          <Pagination
            showControls
            total={
              // 4
              // commentDatas.length % pageSize === 0
              //   ? commentDatas.length / pageSize
              //   : Math.ceil(commentDatas.length / pageSize)
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
                  const response: AxiosResponse<any, any> =
                    await getCommentsAnalysisPagination({
                      baseUrl: baseUrl,
                      params: {
                        page_number: e.toString(),
                      },
                    });
                  await dispatch({
                    type: ADD_COMMENT_DATA_PAGINATION,
                    payload: { key: e, value: response.data.comments },
                  });

                  console.log(response.data);
                  console.log(response.data.comments);
                  console.log(commentDatas);
                  await dispatch({
                    type: ADD_COMMENT_DATA_SUCCESS,
                    payload: response.data.comments,
                  });
                  let receivedComments = response.data.comments;
                  // console.log(response.data[0].comments);
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
        {/* <Button
        onClick={(e: any) => {
          console.log(datassss.slice(10, 20));
          dispatch({
            type: ADD_COMMENT_DATA_SUCCESS,
            payload: datassss.slice(10, 20),
          });
        }}
      >
        clickedme
      </Button> */}
      </motion.section>{" "}
    </>
  );
};

export default CommentAnalysisSection;
