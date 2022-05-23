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
      },
    }),
  s3ThumbnailUpload: (presignedUrl, thumbnail) =>
    axios.put(presignedUrl, thumbnail, {
      headers: {
        "Content-Type": "image/png",
      },
    }),
  createInterview: (interviewId, note, questionId, isPublic) =>
    instance.post(
      `${process.env.REACT_APP_API_FILE_URL}/api/interviews/${interviewId}`,
      {
        note,
        questionId,
        isPublic,
      }
    ),
};

export default interviewApis;
