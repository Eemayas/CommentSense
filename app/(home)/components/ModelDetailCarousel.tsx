/** @format */

"use client";
import { Card, CardHeader } from "@nextui-org/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ModelDetailCarousel = () => {
  const modelData = [
    {
      model: "LSTM",
      accuracy: "91.28%",
      precision: "0.91",
      recall: "0.90",
      f1: "0.90",
    },
    {
      model: "GRU",
      accuracy: "89.78%",
      precision: "0.90",
      recall: "0.90",
      f1: "0.90",
    },
    {
      model: "RNN",
      accuracy: "86.72%",
      precision: "0.86",
      recall: "0.86",
      f1: "0.86",
    },
  ];

  return (
    <div className="mx-auto my-auto w-full max-w-[350px] rounded-[30px] bg-[#f2f4f7bd] p-4">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
        className="w-full"
      >
        {modelData.map((model, index) => (
          <Card
            key={index}
            className="mx-auto border-none bg-gradient-to-br from-violet-500 to-yellow-400 px-4"
            style={{ transition: "opacity 0.05s, transform 0.5s" }}
          >
            <CardHeader>
              <h1 className="mt-1 text-xl font-bold text-gray-900">
                {model.model}
              </h1>
            </CardHeader>
            <div className="mx-auto w-full">
              <div className="flex justify-between">
                <p>Accuracy</p>
                <div className="flex-grow border-b border-dotted border-black" />
                <p>{model.accuracy}</p>
              </div>

              <div className="flex justify-between">
                <p>Precision</p>
                <div className="flex-grow border-b border-dotted border-black"></div>
                <p>{model.precision}</p>
              </div>

              <div className="flex justify-between">
                <p>Recall</p>
                <div className="flex-grow border-b border-dotted border-black"></div>
                <p>{model.recall}</p>
              </div>
              <div className="flex justify-between">
                <p>F1</p>
                <div className="flex-grow border-b border-dotted border-black"></div>
                <p>{model.f1}</p>
              </div>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default ModelDetailCarousel;
