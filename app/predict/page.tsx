"use client";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Textbar from "@/components/Textbar";
import { TextDataEntry, TextDataMap } from "@/types";
import CommentCards from "@/components/CommentsCards";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Text() {
  const textData: TextDataMap = useSelector((state: any) => state.TextReducer);
  console.log(textData);
  return (
    <>
      <Navbar />
      <section className=" max-xl:flex-col px-6 flex gap-5 md:px-5 py-8">
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
          <p className="mt-6 ">
            Powerful, self-serve product and growth analytics to help you
            convert, engage, and retain more.
          </p>
          <p>
            Try it out with
            <Link
              className="text-blue-500 font-bold underline"
              href={"./predict"}
            >
              {" "}
              Single Text{" "}
            </Link>
            Link or instead try for{" "}
            <Link
              className="text-blue-500 font-bold underline"
              href={"https://www.youtube.com/"}
              target="_"
            >
              {" "}
              Youtube{" "}
            </Link>
          </p>

          <Textbar />
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
          return null; // or an empty fragment <>
        })}
      </div>
    </>
  );
}
