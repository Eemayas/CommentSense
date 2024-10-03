/** @format */

import React from "react";
import Navbar from "@/components/Navbar";
import TextbarEntry from "./components/TextbarEntry";
import EndpointSetup from "@/components/EndpointSetup";
import ResultsTablarView from "./components/TabularView";
import SentimentAnalysisSectionWrapper from "@/components/SentimentAnalysisSectionWrapper";

export default function Text() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SentimentAnalysisSectionWrapper isYoutubeAnalysis={false}>
        <TextbarEntry />
        <EndpointSetup />
      </SentimentAnalysisSectionWrapper>

      <ResultsTablarView />
    </div>
  );
}
