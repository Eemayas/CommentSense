/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IS_SHOW_URL_ENTRY } from "@/lib/store/Reducer/constant";
import { RootState } from "@/lib/store/Reducer/store";

const EndpointSetup = () => {
  const dispatch = useDispatch();

  const baseUrl = useSelector((state: RootState) => state.BaseUrlReducer);

  return (
    <>
      <div className="text-sm">
        Currently API point set at:{" "}
        <a
          href={baseUrl}
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {baseUrl}
        </a>
        . Wrong Url?{" "}
        <a
          className="cursor-pointer font-bold text-blue-500 underline"
          onClick={() => {
            console.log("svrwg");
            dispatch({
              type: IS_SHOW_URL_ENTRY,
              payload: true,
            });
          }}
        >
          Change it
        </a>
      </div>
      <div className="text-sm ">
        Run the Flask Server either in local by cloning repo from{" "}
        <a
          href={"https://github.com/Eemayas/README-Crafter-Flask-Server"}
          className="font-bold text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        or in{" "}
        <a
          className="cursor-pointer font-bold text-blue-500 underline"
          href={
            "https://colab.research.google.com/drive/17xqM5mYzgA3jsJ9oyga-j5-GDQuJg56k"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Collab.
        </a>
      </div>
    </>
  );
};

export default EndpointSetup;
