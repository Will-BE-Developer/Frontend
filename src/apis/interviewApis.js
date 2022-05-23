import instance from "./axios";
import axios from "axios";
import { getCookie } from "../shared/cookies";

const interviewApis = {
  getCategories: () => instance.get("/api/categories"),
  getQuestion: (topic) => instance.get(`/api/questions/${topic}`),
  getPresignedUrl: () =>
    axios.post(
      `${process.env.REACT_APP_API_FILE_URL}/api/interviews/draft`,
      {},
      {
        Authorization: getCookie("token"),
        accept: "application/json,",
        "Access-Control-Allow-Origin": "https://willbedeveloper.com",
      }
    ),
  s3VideoUpload: (presignedUrl, video) =>
    axios.put(presignedUrl, video, {
      headers: {
        "Content-Type": "video/webm",
        accept: "application/json,",
      },
    }),
  s3ThumbnailUpload: (presignedUrl, thumbnail) =>
    axios.put(presignedUrl, thumbnail, {
      headers: {
        "Content-Type": "image/png",
        accept: "application/json,",
      },
    }),
  createInterview: (interviewId, note, questionId, isPublic) =>
    axios.post(
      `${process.env.REACT_APP_API_FILE_URL}/api/interviews/${interviewId}`,
      {
        note,
        questionId,
        isPublic,
      },
      {
        Authorization: getCookie("token"),
        accept: "application/json,",
        "Access-Control-Allow-Origin": "https://willbedeveloper.com",
      }
    ),
};

export default interviewApis;
