/** @format */

import axios, { AxiosRequestConfig } from "axios";

export const BASEURL = "http://localhost:3000/api/flask";

export const getCommentsAnalysisPagination = async ({
  baseUrl,
  params,
}: {
  baseUrl: string;
  params: AxiosRequestConfig["params"];
}) => {
  try {
    const response = await axios.get(
      `${baseUrl}/get_comments_analysis_pagination`,
      {
        params,
      }
    );
    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching comments analysis pagination:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getCommentsAnalysis = async ({
  baseUrl,
  config,
}: {
  baseUrl: string;
  config: AxiosRequestConfig;
}) => {
  try {
    const response = await axios.get(
      `${baseUrl}/get_comments_analysis`,
      config
    );
    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching comments analysis:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const singleCommentAnalysis = async ({
  baseUrl,
  config,
}: {
  baseUrl: string;
  config: AxiosRequestConfig;
}) => {
  try {
    const response = await axios.get(
      `${baseUrl}/single-comment-analysis`,
      config
    );
    return response.data; // Return the actual data from the response
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
