/** @format */

"use client";

import { singleCommentAnalysis } from "@/app/constants/apiEndpints";
import {
  ADD_TEXT,
  IS_SHOW_ERROR_MODAL,
  IS_SHOW_SPINNER,
  IS_SHOW_SUCESS_MODAL,
  REMOVE_TEXT,
} from "@/lib/store/Reducer/constant";
import { RootState } from "@/lib/store/Reducer/store";
import { removeComment } from "@/lib/store/Reducer/textReducer";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TextbarEntry = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
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

      dispatch({
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
    }
  };

  return (
    <>
      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text for analysis"
            className="searchbar-input max-w-[56rem] sm:min-w-[40rem]"
            rows={5}
          />
          <button
            disabled={text === ""}
            type="submit"
            className="searchbar-btn"
          >
            Search
          </button>
        </div>
      </form>{" "}
    </>
  );
};

export default TextbarEntry;
