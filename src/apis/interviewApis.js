import instance from "./axios";
import axios from "axios";

const interviewApis = {
  getCategories: async () => {
    try {
      const {
        data: { categories },
      } = await instance.get("/api/categories");
      return categories;
    } catch (error) {
      return error.response;
    }
  },
  getQuestion: async (topic) => {
    try {
      const {
        data: { question },
      } = await instance.get(`/api/questions/${topic}`);
      return question;
    } catch (error) {
      return error.response;
    }
  },
  getPresignedUrl: async () => {
    try {
      const { data } = await instance.post(
        `${process.env.REACT_APP_API_FILE_URL}/api/interviews/draft`
      );
      return data;
    } catch (error) {
      return error.response;
    }
  },
  s3VideoUpload: async (presignedUrl, video) => {
    try {
      await axios.put(presignedUrl, video, {
        headers: {
          "Content-Type": "video/webm",
          accept: "application/json,",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      return error;
    }
  },
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
      return error.response;
    }
  },
};

export default interviewApis;
