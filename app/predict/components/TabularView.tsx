"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
  CircularProgress,
  Divider,
} from "@nextui-org/react";
import { TextDataMap } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/Reducer/store";
import { textPredictInitialState } from "@/lib/store/Reducer/textReducer";

const statusColorMap: Record<string, ChipProps["color"]> = {
  "4": "success",
  "0": "danger",
  "2": "warning",
};

const columns = [
  { name: "Model", uid: "model" },
  { name: "Result", uid: "result" },
  { name: "Positive", uid: "pos_accuracy" },
  { name: "Neural", uid: "neu_accuracy" },
  { name: "Negative", uid: "neg_accuracy" },
];
type Result = {
  id: number;
  model: string;
  result: number;
  pos_accuracy: number;
  neu_accuracy: number;
  neg_accuracy: number;
};
const results: Result[] = [
  {
    id: 1,
    model: "RoBerta",
    result: 2,
    pos_accuracy: 20,
    neu_accuracy: 50,
    neg_accuracy: 29,
  },
  {
    id: 2,
    model: "LSTM",
    result: 0,
    pos_accuracy: 20,
    neu_accuracy: 50,
    neg_accuracy: 29,
  },
  {
    id: 3,
    model: "RNN",
    result: 1,
    pos_accuracy: 20,
    neu_accuracy: 50,
    neg_accuracy: 29,
  },
  {
    id: 4,
    model: "GRU",
    result: 2,
    pos_accuracy: 20,
    neu_accuracy: 50,
    neg_accuracy: 29,
  },
];

export default function ResultsTablarView() {
  const textData: TextDataMap = useSelector(
    (state: RootState) => state.TextReducer,
  );

  const results: Result[] = [
    {
      id: 1,
      model: "RoBerta",
      result: textData.Roberta.type,
      pos_accuracy: textData.Roberta.positive_score,
      neu_accuracy: textData.Roberta.neutral_score,
      neg_accuracy: textData.Roberta.negative_score,
    },
    {
      id: 2,
      model: "LSTM",
      result: textData.LSTM.type,
      pos_accuracy: textData.LSTM.positive_score,
      neu_accuracy: textData.LSTM.neutral_score,
      neg_accuracy: textData.LSTM.negative_score,
    },
    {
      id: 3,
      model: "RNN",
      result: textData.RNN.type,
      pos_accuracy: textData.RNN.positive_score,
      neu_accuracy: textData.RNN.neutral_score,
      neg_accuracy: textData.RNN.negative_score,
    },
    {
      id: 4,
      model: "GRU",
      result: textData.GRU.type,
      pos_accuracy: textData.GRU.positive_score,
      neu_accuracy: textData.GRU.neutral_score,
      neg_accuracy: textData.GRU.negative_score,
    },
  ];

  const renderCell = React.useCallback((user: Result, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Result];

    switch (columnKey) {
      case "model":
        return user.model;
      case "result":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.result.toString()]}
            size="md"
            variant="flat"
          >
            {cellValue === 0
              ? "Negative"
              : cellValue === 2
                ? "Neutral"
                : "Positive"}
          </Chip>
        );
      case "pos_accuracy":
        return (
          <CircularProgress
            aria-label="true"
            classNames={{
              svg: "w-10 h-10 drop-shadow-md",
              indicator: "stroke-green-500",
              track: "stroke-black/20",
              value: "text-[0.7rem] font-semibold text-green-500",
            }}
            value={user.pos_accuracy}
            strokeWidth={4}
            showValueLabel={true}
          />
        );
      case "neu_accuracy":
        return (
          <CircularProgress
            aria-label="true"
            classNames={{
              svg: "w-10 h-10 drop-shadow-md",
              indicator: "stroke-yellow-500",
              track: "stroke-black/20",
              value: "text-[0.7rem] font-semibold text-yellow-500",
            }}
            value={user.neu_accuracy}
            strokeWidth={4}
            showValueLabel={true}
          />
        );
      case "neg_accuracy":
        return (
          <CircularProgress
            aria-label="true"
            classNames={{
              svg: "w-10 h-10 drop-shadow-md",
              indicator: "stroke-red-500",
              track: "stroke-black/20",
              value: "text-[0.7rem] font-semibold text-red-500",
            }}
            value={user.neg_accuracy}
            strokeWidth={4}
            showValueLabel={true}
          />
        );
      default:
        return cellValue;
    }
  }, []);

  if (textData === textPredictInitialState) return;
  return (
    <>
      <Divider className="my-4" />
      <Table isHeaderSticky className={`items-center px-6 py-5 md:px-20`}>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={results}>
          {(item: Result) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
