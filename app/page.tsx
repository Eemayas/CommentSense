// "use client";
import { Divider } from "@nextui-org/react";

import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import React from "react";
import Navbar from "@/components/Navbar";
import { datassss } from "@/lib/CommentsData";
import CommentSection from "@/components/CommentSection";

import ModelDetailSection from "@/components/ModelDetailSection";
import Link from "next/link";
// import Sidebar from "@/components/Sidebar";
export default async function Home() {
  return (
    <>
      <Navbar />
      <section className=" max-xl:flex-col px-6 flex gap-16 md:px-20 py-32">
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
              href={"https://www.youtube.com/"}
              target="_"
            >
              {" "}
              Youtube{" "}
            </Link>
            Link or instead try for{" "}
            <Link
              className="text-blue-500 font-bold underline"
              href={"./predict"}
            >
              {" "}
              Single Text{" "}
            </Link>
          </p>

          <Searchbar />
          <Divider className="my-1 mt-6" />
          <ModelDetailSection />
        </div>
        <HeroCarousel />
      </section>
      <Divider className="my-4" />

      <CommentSection datassss={datassss} />
    </>
  );
}
