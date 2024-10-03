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
    <section id="VideoSection" className="items-center px-6 py-5 md:px-20">
      <h1 className="head-text">Video</h1>
      <Divider className="my-4" />
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
