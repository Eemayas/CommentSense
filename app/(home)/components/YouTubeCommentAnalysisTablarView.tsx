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

import { getKeyValue, Spinner, Button } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { CommentData, TextDataMap } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/Reducer/store";
import { textPredictInitialState } from "@/lib/store/Reducer/textReducer";

export type ColumnHeaderType = {
  name: string;
  uid: string;
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  "4": "success",
  "0": "danger",
  "2": "warning",
};

export type YouTubeAnalysisResult = {
  id: number;
  comments: string;
  result: number;
  pos_accuracy: number;
  neu_accuracy: number;
  neg_accuracy: number;
};
interface AnalysisTabularViewProps {
  columnsHeader: ColumnHeaderType[];
  dataToView: YouTubeAnalysisResult[];
}

const AnalysisTabularView: React.FC<AnalysisTabularViewProps> = ({
  columnsHeader,
  dataToView,
}) => {
  const renderCell = React.useCallback(
    (result: YouTubeAnalysisResult, columnKey: React.Key) => {
      const cellValue = result[columnKey as keyof YouTubeAnalysisResult];

      switch (columnKey) {
        case "comments":
          return result.comments;
        case "result":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[result.result.toString()]}
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
              value={result.pos_accuracy}
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
              value={result.neu_accuracy}
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
              value={result.neg_accuracy}
              strokeWidth={4}
              showValueLabel={true}
            />
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <>
      <Divider className="my-4" />
      <Table
        isStriped
        isHeaderSticky
        aria-label="Table for Showing Analysis result"
        classNames={
          {
            // base: "max-h-[520px] overflow-scroll  ",
            // table: "min-h-[420px] ",
          }
        }
      >
        <TableHeader columns={columnsHeader}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={dataToView}>
          {(item: YouTubeAnalysisResult) => (
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
};
export default AnalysisTabularView;
