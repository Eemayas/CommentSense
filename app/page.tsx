/** @format */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@nextui-org/react";

import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel";
import CommentAnalysisSection from "@/components/CommentSection";
import ModelDetailSection from "@/components/ModelDetailSection";
import YoutubeVideoSection from "@/components/YoutubeVideoSection";

export default async function Home() {
  return (
    <>
      <Navbar />
      <section className="flex gap-16 px-6 py-32 max-xl:flex-col md:px-20">
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
              href={"https://www.youtube.com/"}
              target="_"
            >
              {" "}
              Youtube{" "}
            </Link>
            Link or instead try for{" "}
            <Link
              className="font-bold text-blue-500 underline"
              href={"./predict"}
            >
              Single Text{" "}
            </Link>
          </p>

          <Searchbar />
          <Divider className="my-1 mt-6" />
          <ModelDetailSection />
        </div>
        {/* <HeroCarousel /> */}
      </section>

      <YoutubeVideoSection />

      <CommentAnalysisSection />
    </>
  );
}
