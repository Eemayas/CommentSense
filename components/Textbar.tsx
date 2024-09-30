/** @format */

"use client";

import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TEXT,
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SPINNER,
  IS_SHOW_SUCESS_MODAL,
  REMOVE_TEXT,
} from "@/lib/store/Reducer/constant";
import { removeComment } from "@/lib/store/Reducer/textReducer";
import { singleCommentAnalysis } from "@/app/constants/apiEndpints";
import { RootState } from "@/lib/store/Reducer/store";

const Textbar = () => {
  // const commentDatas: CommentData[] = useSelector(
  //   (state: RootState) => state.CommentDataReducer
  // );
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = useSelector((state: RootState) => state.BaseUrlReducer);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: REMOVE_TEXT,
      payload: [],
    });
    removeComment();
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: true,
    });

    try {
      const response = await singleCommentAnalysis({
        baseUrl: baseUrl,
        config: { params: { text: text } },
      });

      await dispatch({
        type: ADD_TEXT,
        payload: response,
      });
      dispatch({
        type: IS_SHOW_SUCESS_MODAL,
        payload: {
          isShow: false,
          title: "Sucess",
          description: "Text is successfully analyzed",
        },
      });
    } catch (error: any) {
      dispatch({
        type: IS_SHOW_ERROR_MODAL,
        payload: {
          isShow: true,
          title: "Error",
          description: `${error.response?.data.error}`,
        },
      });
      console.log("Error fetching data:", error);
      // console.log("Error fetching data:", error.response?.data);
      // console.log("Error fetching data:", error.response?.data.error);
    }
  };

  return (
    <>
      <form className=" flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>
        <div className="flex gap-4  flex-wrap">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text for analysis"
            className="searchbar-input lg:max-w-[80%]"
            rows={4} // You can adjust the number of rows as needed
          />
          {/* <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text for analyis"
            className="searchbar-input"
          ></input> */}
          <button
            disabled={text === ""}
            type="submit"
            className="searchbar-btn"
          >
            {isLoading ? "Searching...." : "Search"}
          </button>
        </div>
      </form>{" "}
    </>
  );
};

export default Textbar;
