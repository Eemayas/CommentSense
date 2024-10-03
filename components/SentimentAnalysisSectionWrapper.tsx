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
    <section className="flex flex-col justify-center px-6 py-32 md:px-20">
      <p className="small-text">Smart Sentiment Analysis Start Here &rarr;</p>
      <h1 className="head-text">
        Unleash the Power of
        <span className="text-primary"> CommentSense</span>
      </h1>
      <p className="mt-6">
        Powerful, self-serve product and growth analytics to help you convert,
        engage, and retain more.
      </p>
      {isYoutubeAnalysis ? (
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
