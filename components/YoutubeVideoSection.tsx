"use client";
import { RootState } from "@/lib/store/Reducer/store";
import { Divider } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

const YoutubeVideoSection = () => {
  const searchLink = useSelector(
    (state: RootState) => state.YoutubeLinkReducer,
  );

  if (!searchLink) return;

  return (
    <section id="VideoSection">
      <Divider className="my-4" />  
      <h1 className="mb-8 mt-4 text-5xl font-bold leading-[72px] tracking-[-1.2px] text-gray-900">
        Video
      </h1>
      <div className="aspect-video flex-1">
        <iframe
          className="h-full w-full rounded-lg"
          src={`https://www.youtube.com/embed/${searchLink}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default YoutubeVideoSection;
