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
      const commentsToDisplay: CommentData[] =
        commentDataPagination[currentPage];

      setDisplayedComments(commentDataPagination[currentPage]);
      console.log(commentsToDisplay);
    }

    console.log(displayedComments);
  }, [currentPage, commentDatas, commentDataPagination]);
  // const sss = [
  //   {
  //     comment: "If this was all scripted, the actors are the best",
  //     negative_score: 1.83,
  //     neutral_score: 10.14,
  //     positive_score: 88.03,
  //     type: 4,
  //   },
  //   {
  //     comment: "October 2024",
  //     negative_score: 8.52,
  //     neutral_score: 79.48,
  //     positive_score: 12,
  //     type: 2,
  //   },
  //   {
  //     comment: "whoever called this pop rock should be fired",
  //     negative_score: 94.48,
  //     neutral_score: 5.21,
  //     positive_score: 0.3,
  //     type: 0,
  //   },
  //   {
  //     comment: "October 2024 who's here?",
  //     negative_score: 4.53,
  //     neutral_score: 90.96,
  //     positive_score: 4.52,
  //     type: 2,
  //   },
  //   {
  //     comment: "Anyone in October 2024?\n(Bet i will beat September 2024😂)",
  //     negative_score: 3.1,
  //     neutral_score: 67.78,
  //     positive_score: 29.12,
  //     type: 2,
  //   },
  //   {
  //     comment: "21 She said what the fxxx",
  //     negative_score: 78.75,
  //     neutral_score: 19.75,
  //     positive_score: 1.5,
  //     type: 0,
  //   },
  //   {
  //     comment: "Anyone in October 2024? ❤",
  //     negative_score: 0.23,
  //     neutral_score: 37.88,
  //     positive_score: 61.88,
  //     type: 4,
  //   },
  //   {
  //     comment: "Plz play this on my funeral.",
  //     negative_score: 20.92,
  //     neutral_score: 47.43,
  //     positive_score: 31.66,
  //     type: 2,
  //   },
  //   {
  //     comment: "9 years old and still a banger",
  //     negative_score: 2.04,
  //     neutral_score: 38.95,
  //     positive_score: 59,
  //     type: 4,
  //   },
  //   {
  //     comment:
  //       "And maroon 5 are always be my favorite band no matter what it is sugar's number one girls like you number two and cold is number Three",
  //     negative_score: 0.14,
  //     neutral_score: 2.09,
  //     positive_score: 97.78,
  //     type: 4,
  //   },
  //   {
  //     comment: "I'm Anthony and My birthday is on October 28th 2012",
  //     negative_score: 0.68,
  //     neutral_score: 87.41,
  //     positive_score: 11.9,
  //     type: 2,
  //   },
  //   {
  //     comment: "Anyone in october😅",
  //     negative_score: 1.39,
  //     neutral_score: 55.91,
  //     positive_score: 42.71,
  //     type: 2,
  //   },
  // ];
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

// <div className="relative flex flex-col" id="app-container">
//   <div className="p-6">
//     <div className="relative flex max-h-[520px] w-full flex-col gap-4 overflow-scroll">
//       <div className="relative z-0 flex w-full flex-col justify-between gap-4 overflow-auto rounded-large bg-content1 p-4 shadow-small">
//         <table
//           aria-label="Example table with infinite pagination"
//           id="react-aria-:Raqqqpmla:"
//           role="grid"
//           tabindex="0"
//           aria-describedby=""
//           className="h-auto min-h-[400px] w-full min-w-full table-auto"
//         >
//           <thead
//             className="[&amp;>tr]:first:rounded-lg [&amp;>tr]:first:shadow-small sticky top-0 z-20"
//             role="rowgroup"
//           >
//             <tr
//               role="row"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <th
//                 data-key="name"
//                 role="columnheader"
//                 tabIndex={-1}
//                 id="react-aria-:Raqqqpmla:-name"
//                 className="group h-10 whitespace-nowrap bg-default-100 px-3 text-start align-middle text-tiny font-semibold text-foreground-500 outline-none first:rounded-s-lg last:rounded-e-lg data-[focus-visible=true]:z-10 data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//               >
//                 Name
//               </th>
//               <th
//                 data-key="height"
//                 role="columnheader"
//                 tabIndex={-1}
//                 id="react-aria-:Raqqqpmla:-height"
//                 className="group h-10 whitespace-nowrap bg-default-100 px-3 text-start align-middle text-tiny font-semibold text-foreground-500 outline-none first:rounded-s-lg last:rounded-e-lg data-[focus-visible=true]:z-10 data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//               >
//                 Height
//               </th>
//               <th
//                 data-key="mass"
//                 role="columnheader"
//                 tabIndex={-1}
//                 id="react-aria-:Raqqqpmla:-mass"
//                 className="group h-10 whitespace-nowrap bg-default-100 px-3 text-start align-middle text-tiny font-semibold text-foreground-500 outline-none first:rounded-s-lg last:rounded-e-lg data-[focus-visible=true]:z-10 data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//               >
//                 Mass
//               </th>
//               <th
//                 data-key="birth_year"
//                 role="columnheader"
//                 tabIndex={-1}
//                 id="react-aria-:Raqqqpmla:-birth_year"
//                 className="group h-10 whitespace-nowrap bg-default-100 px-3 text-start align-middle text-tiny font-semibold text-foreground-500 outline-none first:rounded-s-lg last:rounded-e-lg data-[focus-visible=true]:z-10 data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//               >
//                 Birth year
//               </th>
//             </tr>
//             <tr
//               tabIndex={-1}
//               aria-hidden="true"
//               className="block h-px w-px"
//               style={{ marginLeft: "0.25rem", marginTop: "0.25rem" }}
//             ></tr>
//           </thead>
//           <tbody role="rowgroup">
//             <tr
//               data-first="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Luke Skywalker"
//               aria-labelledby="react-aria-:Raqqqpmla:-LukeSkywalker-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Luke SkywalkerLuke Skywalkername"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-LukeSkywalker-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Luke Skywalker</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Luke SkywalkerLuke Skywalkerheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>172</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Luke SkywalkerLuke Skywalkermass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>77</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Luke SkywalkerLuke Skywalkerbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>19BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="C-3PO"
//               aria-labelledby="react-aria-:Raqqqpmla:-C-3PO-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="C-3POC-3POname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-C-3PO-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>C-3PO</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="C-3POC-3POheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>167</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="C-3POC-3POmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>75</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="C-3POC-3PObirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>112BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="R2-D2"
//               aria-labelledby="react-aria-:Raqqqpmla:-R2-D2-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="R2-D2R2-D2name"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-R2-D2-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>R2-D2</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="R2-D2R2-D2height"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>96</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="R2-D2R2-D2mass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>32</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="R2-D2R2-D2birth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>33BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Darth Vader"
//               aria-labelledby="react-aria-:Raqqqpmla:-DarthVader-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Darth VaderDarth Vadername"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-DarthVader-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Darth Vader</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Darth VaderDarth Vaderheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>202</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Darth VaderDarth Vadermass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>136</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Darth VaderDarth Vaderbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>41.9BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Leia Organa"
//               aria-labelledby="react-aria-:Raqqqpmla:-LeiaOrgana-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Leia OrganaLeia Organaname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-LeiaOrgana-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Leia Organa</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Leia OrganaLeia Organaheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>150</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Leia OrganaLeia Organamass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>49</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Leia OrganaLeia Organabirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>19BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Owen Lars"
//               aria-labelledby="react-aria-:Raqqqpmla:-OwenLars-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Owen LarsOwen Larsname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-OwenLars-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Owen Lars</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Owen LarsOwen Larsheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>178</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Owen LarsOwen Larsmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>120</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Owen LarsOwen Larsbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>52BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Beru Whitesun lars"
//               aria-labelledby="react-aria-:Raqqqpmla:-BeruWhitesunlars-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Beru Whitesun larsBeru Whitesun larsname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-BeruWhitesunlars-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Beru Whitesun lars</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Beru Whitesun larsBeru Whitesun larsheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>165</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Beru Whitesun larsBeru Whitesun larsmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>75</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Beru Whitesun larsBeru Whitesun larsbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>47BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="R5-D4"
//               aria-labelledby="react-aria-:Raqqqpmla:-R5-D4-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="R5-D4R5-D4name"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-R5-D4-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>R5-D4</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="R5-D4R5-D4height"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>97</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="R5-D4R5-D4mass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>32</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="R5-D4R5-D4birth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Biggs Darklighter"
//               aria-labelledby="react-aria-:Raqqqpmla:-BiggsDarklighter-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Biggs DarklighterBiggs Darklightername"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-BiggsDarklighter-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Biggs Darklighter</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Biggs DarklighterBiggs Darklighterheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>183</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Biggs DarklighterBiggs Darklightermass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>84</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Biggs DarklighterBiggs Darklighterbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>24BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Obi-Wan Kenobi"
//               aria-labelledby="react-aria-:Raqqqpmla:-Obi-WanKenobi-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//               data-middle="true"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Obi-Wan KenobiObi-Wan Kenobiname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Obi-WanKenobi-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Obi-Wan Kenobi</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Obi-Wan KenobiObi-Wan Kenobiheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>182</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Obi-Wan KenobiObi-Wan Kenobimass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>77</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Obi-Wan KenobiObi-Wan Kenobibirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>57BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Anakin Skywalker"
//               aria-labelledby="react-aria-:Raqqqpmla:-AnakinSkywalker-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Anakin SkywalkerAnakin Skywalkername"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-AnakinSkywalker-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Anakin Skywalker</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Anakin SkywalkerAnakin Skywalkerheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>188</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Anakin SkywalkerAnakin Skywalkermass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>84</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Anakin SkywalkerAnakin Skywalkerbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>41.9BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Wilhuff Tarkin"
//               aria-labelledby="react-aria-:Raqqqpmla:-WilhuffTarkin-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Wilhuff TarkinWilhuff Tarkinname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-WilhuffTarkin-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Wilhuff Tarkin</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wilhuff TarkinWilhuff Tarkinheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>180</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wilhuff TarkinWilhuff Tarkinmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wilhuff TarkinWilhuff Tarkinbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>64BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Chewbacca"
//               aria-labelledby="react-aria-:Raqqqpmla:-Chewbacca-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="ChewbaccaChewbaccaname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Chewbacca-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Chewbacca</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="ChewbaccaChewbaccaheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>228</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="ChewbaccaChewbaccamass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>112</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="ChewbaccaChewbaccabirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>200BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Han Solo"
//               aria-labelledby="react-aria-:Raqqqpmla:-HanSolo-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Han SoloHan Soloname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-HanSolo-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Han Solo</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Han SoloHan Soloheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>180</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Han SoloHan Solomass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>80</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Han SoloHan Solobirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>29BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Greedo"
//               aria-labelledby="react-aria-:Raqqqpmla:-Greedo-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="GreedoGreedoname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Greedo-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Greedo</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="GreedoGreedoheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>173</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="GreedoGreedomass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>74</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="GreedoGreedobirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>44BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Jabba Desilijic Tiure"
//               aria-labelledby="react-aria-:Raqqqpmla:-JabbaDesilijicTiure-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Jabba Desilijic TiureJabba Desilijic Tiurename"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-JabbaDesilijicTiure-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Jabba Desilijic Tiure</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Jabba Desilijic TiureJabba Desilijic Tiureheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>175</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Jabba Desilijic TiureJabba Desilijic Tiuremass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>1,358</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Jabba Desilijic TiureJabba Desilijic Tiurebirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>600BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Wedge Antilles"
//               aria-labelledby="react-aria-:Raqqqpmla:-WedgeAntilles-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Wedge AntillesWedge Antillesname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-WedgeAntilles-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Wedge Antilles</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wedge AntillesWedge Antillesheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>170</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wedge AntillesWedge Antillesmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>77</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wedge AntillesWedge Antillesbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>21BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Jek Tono Porkins"
//               aria-labelledby="react-aria-:Raqqqpmla:-JekTonoPorkins-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Jek Tono PorkinsJek Tono Porkinsname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-JekTonoPorkins-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Jek Tono Porkins</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Jek Tono PorkinsJek Tono Porkinsheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>180</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Jek Tono PorkinsJek Tono Porkinsmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>110</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Jek Tono PorkinsJek Tono Porkinsbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Yoda"
//               aria-labelledby="react-aria-:Raqqqpmla:-Yoda-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="YodaYodaname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Yoda-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Yoda</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="YodaYodaheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>66</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="YodaYodamass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>17</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="YodaYodabirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>896BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Palpatine"
//               aria-labelledby="react-aria-:Raqqqpmla:-Palpatine-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//               data-middle="true"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="PalpatinePalpatinename"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Palpatine-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Palpatine</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="PalpatinePalpatineheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>170</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="PalpatinePalpatinemass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>75</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="PalpatinePalpatinebirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>82BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Boba Fett"
//               aria-labelledby="react-aria-:Raqqqpmla:-BobaFett-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Boba FettBoba Fettname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-BobaFett-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Boba Fett</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Boba FettBoba Fettheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>183</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Boba FettBoba Fettmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>78.2</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Boba FettBoba Fettbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>31.5BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="IG-88"
//               aria-labelledby="react-aria-:Raqqqpmla:-IG-88-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="IG-88IG-88name"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-IG-88-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>IG-88</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="IG-88IG-88height"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>200</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="IG-88IG-88mass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>140</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="IG-88IG-88birth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>15BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Bossk"
//               aria-labelledby="react-aria-:Raqqqpmla:-Bossk-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="BosskBosskname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Bossk-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Bossk</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="BosskBosskheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>190</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="BosskBosskmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>113</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="BosskBosskbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>53BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Lando Calrissian"
//               aria-labelledby="react-aria-:Raqqqpmla:-LandoCalrissian-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Lando CalrissianLando Calrissianname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-LandoCalrissian-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Lando Calrissian</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Lando CalrissianLando Calrissianheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>177</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Lando CalrissianLando Calrissianmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>79</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Lando CalrissianLando Calrissianbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>31BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Lobot"
//               aria-labelledby="react-aria-:Raqqqpmla:-Lobot-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="LobotLobotname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Lobot-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Lobot</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="LobotLobotheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>175</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="LobotLobotmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>79</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="LobotLobotbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>37BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Ackbar"
//               aria-labelledby="react-aria-:Raqqqpmla:-Ackbar-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="AckbarAckbarname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-Ackbar-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Ackbar</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="AckbarAckbarheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>180</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="AckbarAckbarmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>83</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="AckbarAckbarbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>41BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Mon Mothma"
//               aria-labelledby="react-aria-:Raqqqpmla:-MonMothma-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Mon MothmaMon Mothmaname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-MonMothma-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Mon Mothma</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Mon MothmaMon Mothmaheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>150</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Mon MothmaMon Mothmamass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Mon MothmaMon Mothmabirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>48BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Arvel Crynyd"
//               aria-labelledby="react-aria-:Raqqqpmla:-ArvelCrynyd-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Arvel CrynydArvel Crynydname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-ArvelCrynyd-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Arvel Crynyd</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Arvel CrynydArvel Crynydheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Arvel CrynydArvel Crynydmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Arvel CrynydArvel Crynydbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//             </tr>
//             <tr
//               data-middle="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Wicket Systri Warrick"
//               aria-labelledby="react-aria-:Raqqqpmla:-WicketSystriWarrick-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Wicket Systri WarrickWicket Systri Warrickname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-WicketSystriWarrick-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Wicket Systri Warrick</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wicket Systri WarrickWicket Systri Warrickheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>88</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wicket Systri WarrickWicket Systri Warrickmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>20</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Wicket Systri WarrickWicket Systri Warrickbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>8BBY</span>
//               </td>
//             </tr>
//             <tr
//               data-last="true"
//               data-odd="true"
//               role="row"
//               tabIndex={-1}
//               data-key="Nien Nunb"
//               aria-labelledby="react-aria-:Raqqqpmla:-NienNunb-name"
//               className="group outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
//             >
//               <td
//                 tabIndex={-1}
//                 data-key="Nien NunbNien Nunbname"
//                 role="rowheader"
//                 id="react-aria-:Raqqqpmla:-NienNunb-name"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>Nien Nunb</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Nien NunbNien Nunbheight"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>160</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Nien NunbNien Nunbmass"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>68</span>
//               </td>
//               <td
//                 tabIndex={-1}
//                 data-key="Nien NunbNien Nunbbirth_year"
//                 role="gridcell"
//                 className="[&amp;>*]:z-1 [&amp;>*]:relative relative whitespace-normal px-3 py-2 text-start align-middle text-small font-normal outline-none before:absolute before:inset-0 before:z-0 before:bg-default/60 before:opacity-0 before:content-[''] first:before:rounded-s-lg last:before:rounded-e-lg data-[focus-visible=true]:z-10 data-[selected=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[selected=true]:before:opacity-100 group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-foreground-300"
//               >
//                 <span>unknown</span>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="flex w-full justify-center">
//           <div
//             aria-label="Loading"
//             className="relative inline-flex flex-col items-center justify-center gap-2"
//           >
//             <div className="relative flex h-8 w-8">
//               <i className="absolute h-full w-full animate-spinner-ease-spin rounded-full border-3 border-solid border-b-white border-l-transparent border-r-transparent border-t-transparent"></i>
//               <i className="absolute h-full w-full animate-spinner-linear-spin rounded-full border-3 border-dotted border-b-white border-l-transparent border-r-transparent border-t-transparent opacity-75"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>;
