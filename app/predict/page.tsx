/** @format */

import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import TextbarEntry from "./components/TextbarEntry";
import Link from "next/link";
import EndpointSetup from "@/components/EndpointSetup";
import ResultsTablarView from "./components/TabularView";

export default function Text() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <section className="flex h-full flex-grow gap-5 px-6 py-8 md:px-5">
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

          <TextbarEntry />
          <EndpointSetup />
        </div>
      </section>
      <Divider className="my-4" />
      <ResultsTablarView />
    </div>
  );
}
