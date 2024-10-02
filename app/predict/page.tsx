/** @format */

"use client";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import Textbar from "@/components/Textbar";
import { TextDataEntry, TextDataMap } from "@/types";
import CommentCards from "@/components/CommentsCards";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/lib/store/Reducer/store";
import EndpointSetup from "@/components/EndpointSetup";

export default function Text() {
  const textData: TextDataMap = useSelector(
    (state: RootState) => state.TextReducer,
  );
  return (
    <>
      <Navbar />
      <section className="flex gap-5 px-6 py-8 max-xl:flex-col md:px-5">
        <div className="flex flex-col justify-center">
          <p className="small-text">
            Smart Sentiment Analysis Start Here
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
          </p>
          <h1 className="head-text">
            Unleash the Power of
            <span className="text-primary"> CommentSense</span>
          </h1>
          <p className="mt-6">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more.
          </p>
          <p>
            Try it out with
            <Link
              className="font-bold text-blue-500 underline"
              href={"./predict"}
            >
              {" "}
              Single Text{" "}
            </Link>
            Link or instead try for{" "}
            <Link className="font-bold text-blue-500 underline" href={"./"}>
              Youtube
            </Link>
          </p>

          <Textbar />
          <EndpointSetup />
        </div>
      </section>
      <Divider className="my-4" />
      <div className="flex flex-wrap gap-4">
        {Object.keys(textData).map((modelName, index) => {
          if (modelName !== "comment") {
            const model = textData[modelName] as TextDataEntry;
            return (
              <CommentCards
                type={model.type}
                comment={modelName}
                positive_score={model.positive_score}
                negative_score={model.negative_score}
                neutral_score={model.neutral_score}
                index={index}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
}
