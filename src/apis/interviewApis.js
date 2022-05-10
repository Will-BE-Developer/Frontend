import instance from "./axios";
import { getCookie } from "../shared/cookies";

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
        "/api/interviews/draft",
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      return data;
    } catch (error) {
      return error.response;
    }
  },
  s3VideoUpload: async (presignedUrl, video) => {
    try {
      await instance.put(presignedUrl, video, {
        headers: {
          "Content-Type": "video/webm",
        },
      });
    } catch (error) {
      return error;
    }
  },
  s3ThumbnailUpload: async (presignedUrl, thumbnail) => {
    try {
      await instance.put(presignedUrl, thumbnail, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch (error) {
      return error;
    }
  },
  createInterview: async (interviewId, note, questionId, isPublic) => {
    const data = { note, questionId, isPublic };

    try {
      await instance.post(`/api/interviews/${interviewId}`, data, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
    } catch (error) {
      return error.response;
    }
  },
};

export default interviewApis;
