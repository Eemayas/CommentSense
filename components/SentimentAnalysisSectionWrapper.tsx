import Link from "next/link";
import React from "react";
interface SentimentAnalysisSectionWrapperProps {
  children: React.ReactNode;
  isYoutubeAnalysis: boolean;
}

const SentimentAnalysisSectionWrapper: React.FC<
  SentimentAnalysisSectionWrapperProps
> = ({ children, isYoutubeAnalysis }) => {
  return (
    <section className="flex flex-grow flex-col items-center justify-center px-6 md:px-20">
      <p className="small-text">Discover Smart Sentiment Analysis &rarr;</p>
      <h1 className="head-text text-center">
        Supercharge Your Insights with
        <span className="text-primary"> CommentSense</span>
      </h1>
      <p className="mt-6 text-center">
        Unlock insights with CommentSense, the ultimate tool for powerful,
        intuitive sentiment analysis. Drive engagement, improve retention, and
        accelerate growth with advanced, self-serve analytics.
      </p>
      {isYoutubeAnalysis ? (
        <p>
          Get Started with a
          <Link
            className="font-bold text-blue-500 underline"
            href={"https://www.youtube.com/"}
            target="_"
          >
            {" "}
            Youtube{" "}
          </Link>
          Link or Try{" "}
          <Link
            className="font-bold text-blue-500 underline"
            href={"./predict"}
          >
            Single Text{" "}
          </Link>
          Input!
        </p>
      ) : (
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
      )}

      {children}
    </section>
  );
};

export default SentimentAnalysisSectionWrapper;
