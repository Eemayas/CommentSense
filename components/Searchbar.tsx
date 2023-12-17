"use client";

import { scrollToSection } from "@/lib/action/ScrollFunctionalities";
import React, { FormEvent, useState } from "react";
import { DropDownButton } from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_DATA_PAGINATION,
  ADD_COMMENT_DATA_SUCCESS,
  IS_SHOW_SPINNER,
  RESET_COMMENT_DATA_PAGINATION,
  RESET_COMMENT_DATA_SUCCESS,
  SEARCH_PROMPT_EDIT,
  YOUTUBE_LINK,
} from "@/lib/store/Reducer/constant";
import axios from "axios";
import { CommentData } from "@/types";

const Searchbar = () => {
  const commentDatas: CommentData[] = useSelector(
    (state: any) => state.CommentDataReducer
  );
  const modelOptions = [
    {
      title: "Roberta",
      description: "Accuracy :95%",
    },
    {
      title: "LSTM",
      description: "Accuracy :90%",
    },
    {
      title: "GRU",
      description: "Accuracy :89%",
    },
    {
      title: "RNN",
      description: "Accuracy :85%",
    },
  ];
  const commentOptions = [
    {
      title: "100 comments",
      description: "",
    },
    {
      title: "500 comments",
      description: "",
    },
    {
      title: "1000 comments",
      description: "",
    },
    {
      title: "1500 comments",
      description: "",
    },
    {
      title: "2000 comments",
      description: "",
    },
    {
      title: "All comments",
      description:
        "This will take long time. We will mail you after the result are processed",
    },
  ];
  const dispatch = useDispatch();
  const [youtubeLink, setYoutubeLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState(modelOptions[0].title);
  const [comment, setComment] = useState(commentOptions[0].title);
  const [translatedText, setTranslatedText] = useState("");

  const isValidYouTubeURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostName = parsedURL.hostname;
      if (
        hostName.includes("youtube.com") ||
        hostName.includes("youtube.") ||
        hostName.endsWith("youtube") ||
        hostName.includes("youtu.be")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var match = comment.match(/\d+/);
    var commentCount = 100;
    // Check if a match is found
    if (match) {
      // Convert the matched string to a number
      var commentCount = parseInt(match[0], 10);

      // Log the result
      console.log(commentCount);
    } else {
      // Handle the case where no number is found
      console.log("No number found in the input string");
    }
    dispatch({
      type: RESET_COMMENT_DATA_SUCCESS,
      payload: [],
    });
    dispatch({
      type: RESET_COMMENT_DATA_PAGINATION,
      payload: [],
    });

    const isValidLink = isValidYouTubeURL(youtubeLink);
    if (!isValidLink) {
      alert("Invalid Link\nReason: Not a Youtube URL");
      return;
    }
    const videoID = youtubeLink.match(/[?&]v=([^&]+)/);
    if (!videoID) {
      alert("Invalid Link \nReason: Missing video ID");
      return;
    }

    dispatch({
      type: YOUTUBE_LINK,
      payload: videoID ? videoID[1] : "",
    });

    dispatch({
      type: IS_SHOW_SPINNER,
      payload: true,
    });
    try {
      const response = await axios.get(
        "http://localhost:3000/api/flask/get_comments_analysis",
        {
          params: {
            youtubeLink: youtubeLink,
            model,
            comment,
            pageNumber: "1",
          },
        }
      );
      dispatch({
        type: SEARCH_PROMPT_EDIT,
        payload: {
          youtubeLink: youtubeLink,
          model,
          comment: commentCount,
          pageNumber: "1",
        },
      });
      console.log(response.data);
      console.log(response.data.comments);
      console.log(commentDatas);
      await dispatch({
        type: ADD_COMMENT_DATA_SUCCESS,
        payload: response.data.comments,
      });
      await dispatch({
        type: ADD_COMMENT_DATA_PAGINATION,
        payload: { key: 1, value: response.data.comments },
      });
      let receivedComments = response.data.comments;
      // console.log(response.data[0].comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    console.log({
      searchPrompt: youtubeLink,
      model,
      comment,
      commentextracr: comment.match(/\d+/)![0],
    });
    dispatch({
      type: IS_SHOW_SPINNER,
      payload: false,
    });

    scrollToSection("CommentSection");
  };

  return (
    <>
      <form className=" flex flex-col gap-4 mt-12" onSubmit={handleSubmit}>
        <div className="flex gap-4  flex-wrap">
          <input
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="Enter YouTube Link"
            className="searchbar-input"
          ></input>
          <button
            disabled={youtubeLink === ""}
            type="submit"
            className="searchbar-btn"
          >
            {isLoading ? "Searching...." : "Search"}
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1 max-h-7 flex-row">
          <DropDownButton
            placeholder=" "
            className="max-w-xs max-h-12"
            label="Model Selection"
            options={modelOptions}
            setSelectedKeys={setModel}
            selectedKeys={model}
          />

          <DropDownButton
            placeholder=" "
            className="max-w-lg max-h-12"
            label="Comment Count"
            options={commentOptions}
            setSelectedKeys={setComment}
            selectedKeys={comment}
          />
        </div>
      </form>{" "}
    </>
  );
};

export default Searchbar;
