"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  CircularProgress,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import { fadeIn } from "@/lib/utils/motion";
type Props = {
  type: number;
  comment: string;
  positive_score: number;
  negative_score: number;
  neutral_score: number;
  index: number;
};
const CommentCards = ({
  comment,
  positive_score,
  negative_score,
  neutral_score,
  type,
  index,
}: Props) => {
  const ChipClassNames =
    type == 0
      ? {
          base: "border-1 border-white/6=80 bg-white",
          content: "text-red-400 text-small font-semibold",
        }
      : type === 4
      ? {
          base: "border-1 border-white/6=80 bg-white",
          content: "text-green-400 text-small font-semibold",
        }
      : {
          base: "border-1 border-white/6=80 bg-white",
          content: "text-yellow-400 text-small font-semibold",
        };
  const CardColor =
    type == 0 ? "to-red-400" : type === 4 ? "to-green-400" : "to-yellow-400";
  return (
    <motion.div variants={fadeIn("right", "spring", 0.25 * index, 0.55)}>
      <Card
        className={`
      w-[300px] h-[450px] border-none bg-gradient-to-br from-violet-500
      ${CardColor}
         gap-2`}
        style={{ transition: "opacity 0.05s, transform 0.5s" }}
      >
        <CardBody className="justify-center items-center h-[410px]">
          <div className="flex flex-row gap-3">
            <div className="justify-center items-center flex flex-col gap-2">
              <CircularProgress
                aria-label="true"
                classNames={{
                  svg: "w-16 h-16 drop-shadow-md",
                  indicator: "stroke-green-500",
                  track: "stroke-black/20",
                  value: "text-lg font-semibold text-green-500",
                }}
                value={positive_score}
                strokeWidth={4}
                showValueLabel={true}
              />
              <p className=" text-gray-300 text-xs">Positive</p>
            </div>
            <div className="justify-center items-center flex flex-col gap-2">
              <CircularProgress
                aria-label="true"
                classNames={{
                  svg: "w-16 h-16 drop-shadow-md",
                  indicator: "stroke-yellow-500",
                  track: "stroke-black/20",
                  value: "text-lg font-semibold text-yellow-500",
                }}
                value={neutral_score}
                strokeWidth={4}
                showValueLabel={true}
              />
              <p className=" text-gray-300 text-xs">Neutral</p>
            </div>
            <div className=" justify-center items-center flex flex-col gap-2">
              <CircularProgress
                aria-label="true"
                classNames={{
                  svg: "w-16 h-16 drop-shadow-md",
                  indicator: "stroke-red-500",
                  track: "stroke-black/20",
                  value: "text-lg font-semibold text-red-500",
                }}
                value={negative_score}
                strokeWidth={4}
                showValueLabel={true}
              />
              <p className="text-gray-300 text-xs">Negative</p>
            </div>
          </div>

          <Divider orientation="horizontal" />
          <ScrollShadow className="w-full h-[90%]">
            <p className="ml-2 w-[90%] text-center font-medium text-white sm:text-xl">
              {comment}
            </p>
          </ScrollShadow>
        </CardBody>
        <Divider orientation="horizontal" className="my-1" />
        <CardFooter className=" justify-center items-center pt-0">
          <Chip size="lg" classNames={ChipClassNames} variant="shadow">
            {type == 0 ? "Negative" : type == 2 ? "Neutral" : "Postive"}
          </Chip>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CommentCards;
