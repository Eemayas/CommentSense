/** @format */

import React from "react";
import { Divider } from "@nextui-org/react";

import Navbar from "@/components/Navbar";
import Searchbar from "@/app/(home)/components/Searchbar";
import CommentAnalysisSection from "@/app/(home)/components/CommentSection";
import YoutubeVideoSection from "@/app/(home)/components/YoutubeVideoSection";
import EndpointSetup from "@/components/EndpointSetup";
import SentimentAnalysisSectionWrapper from "@/components/SentimentAnalysisSectionWrapper";
import ModelDetailCarousel from "./(home)/components/ModelDetailCarousel";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SentimentAnalysisSectionWrapper isYoutubeAnalysis={true}>
        <Searchbar />
        <EndpointSetup />
        <Divider className="my-1 mt-6" />
        <ModelDetailCarousel />
      </SentimentAnalysisSectionWrapper>

      <YoutubeVideoSection />

      <CommentAnalysisSection />
    </div>
  );
}
