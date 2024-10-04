/** @format */

import React from "react";
import { Divider } from "@nextui-org/react";

import Navbar from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import CommentAnalysisSection from "@/components/CommentSection";
import ModelDetailSection from "@/components/ModelDetailSection";
import YoutubeVideoSection from "@/components/YoutubeVideoSection";
import EndpointSetup from "@/components/EndpointSetup";
import SentimentAnalysisSectionWrapper from "@/components/SentimentAnalysisSectionWrapper";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SentimentAnalysisSectionWrapper isYoutubeAnalysis={true}>
        <Searchbar />
        <EndpointSetup />
        <Divider className="my-1 mt-6" />
        <ModelDetailSection />
      </SentimentAnalysisSectionWrapper>

      <YoutubeVideoSection />

      <CommentAnalysisSection />
    </div>
  );
}
