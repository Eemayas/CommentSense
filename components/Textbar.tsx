"use client";

import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_DATA_PAGINATION,
  ADD_COMMENT_DATA_SUCCESS,
  ADD_TEXT,
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SPINNER,
  IS_SHOW_SUCESS_MODAL,
  REMOVE_TEXT,
  RESET_COMMENT_DATA_PAGINATION,
  RESET_COMMENT_DATA_SUCCESS,
  SEARCH_PROMPT_EDIT,
  YOUTUBE_LINK,
} from "@/lib/store/Reducer/constant";
import axios from "axios";
import { CommentData } from "@/types";
import { addComment, removeComment } from "@/lib/store/Reducer/textReducer";

const Textbar = () => {
  // const commentDatas: CommentData[] = useSelector(
  //   (state: any) => state.CommentDataReducer
  // );
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await axios.get(
        "http://localhost:3000/api/flask/predict/text",
        {
          params: { text: text },
        }
      );
      // dispatch({
      //   type: ADD_TEXT,
      //   payload: {
      //     text: text,
      //   },
      // });
      console.log(response.data);
      await dispatch({
        type: ADD_TEXT,
        payload: response.data,
      });
      dispatch({
        type: IS_SHOW_SUCESS_MODAL,
        payload: {
          isShow: false,
          title: "Sucess",
          description: "Text is successfully analyzed",
        },
      });
      // dispatch({
      //   type: IS_SHOW_SPINNER,
      //   payload: false,
      // });
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
      console.log("Error fetching data:", error.response?.data);
      console.log("Error fetching data:", error.response?.data.error);
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
