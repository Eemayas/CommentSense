"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ModelDetailSection = () => {
  const modelData = [
    {
      model: "LSTM",
      accuracy: "0",
      precision: "0",
      recall: "0",
      f1: "0",
    },
    {
      model: "GRU",
      accuracy: "0",
      precision: "0",
      recall: "0",
      f1: "0",
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
    <div className="max-w-[350px] py-4 w-full bg-[#f2f4f7bd] rounded-[30px] mx-auto my-auto">
      <Carousel
        className=""
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        showArrows={false}
        showStatus={false}
        width={350}
      >
        {modelData.map((model, index) => (
          <Card
            key={index}
            className={`
           max-w-[300px]  border-none bg-gradient-to-br from-violet-500 to-yellow-400 mx-auto `}
            style={{ transition: "opacity 0.05s, transform 0.5s" }}
          >
            <CardHeader>
              <h1 className="mt-1 text-xl font-bold  text-gray-900">
                {model.model}
              </h1>
            </CardHeader>
            <div className="w-[280px] mx-auto">
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

export default ModelDetailSection;
