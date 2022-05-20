import * as Sentry from "@sentry/react";
import instance from "./axios";
import axios from "axios";

const interviewApis = {
  getCategories: () => instance.get("/api/categories"),
  getQuestion: (topic) => instance.get(`/api/questions/${topic}`),
  getPresignedUrl: () =>
    instance.post(`${process.env.REACT_APP_API_FILE_URL}/api/interviews/draft`),
  s3VideoUpload: (presignedUrl, video) =>
    axios.put(presignedUrl, video, {
      headers: {
        "Content-Type": "video/webm",
        accept: "application/json,",
        "Access-Control-Allow-Origin": "*",
      },
    }),
  s3ThumbnailUpload: async (presignedUrl, thumbnail) => {
    try {
      await axios.put(presignedUrl, thumbnail, {
        headers: {
          "Content-Type": "image/png",
          accept: "application/json,",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      Sentry.captureException(`S3 Thumbnail upload : ${error}`);
      return error;
    }
  },
  createInterview: async (interviewId, note, questionId, isPublic) => {
    const data = { note, questionId, isPublic };

    try {
      await instance.post(
        `${process.env.REACT_APP_API_FILE_URL}/api/interviews/${interviewId}`,
        data
      );
    } catch (error) {
      Sentry.captureException(`Create interview : ${error}`);
      return error.response;
    }
  },
};

export default interviewApis;
