import React from "react";
import { useSelector } from "react-redux";
import Papa from "papaparse";
import { RootState } from "@/lib/store/Reducer/store";
import { CommentData } from "@/types";
import { Button } from "@nextui-org/react";

const ExportCSVButton: React.FC = () => {
  const commentDatas: CommentData[] = useSelector(
    (state: RootState) => state.CommentDataReducer,
  );

  const handleDownloadCSV = () => {
    // Prepare the data in the correct format for CSV export
    const csvData = commentDatas.map((data) => ({
      Type: data.type,
      Comment: data.comment,
      PositiveScore: data.positive_score,
      NegativeScore: data.negative_score,
      NeutralScore: data.neutral_score,
    }));

    // Convert the data to CSV format using PapaParse
    const csv = Papa.unparse(csvData);

    // Create a Blob from the CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Get the current date and time
    const currentDate = new Date();
    const timestamp = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")}_${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}-${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}-${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    // Create a link element, hide it, direct it to the Blob, and trigger a download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `comment_data_${timestamp}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      radius="full"
      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      onClick={handleDownloadCSV}
    >
      Download CSV
    </Button>
  );
};

export default ExportCSVButton;
