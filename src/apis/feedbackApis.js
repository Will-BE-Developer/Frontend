import instance from "./axios.js";
import { getCookie } from "../shared/cookies";
const token = getCookie("token");

const feedbackApis = {
  getFeedback: async () => {
    try {
      const res = await instance.get("/api/interviews/");
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getDetail: async (cardId) => {
    try {
      const res = await instance.get(`/api/interviews/${cardId}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getDetailVideo: async (cardId) => {
    try {
      const res = await instance.get(`/api/interviews/${cardId}`, {
        headers: {
          Authorization: token,
        },
      });
      const convertVideo = await instance.get(res.data.interview.video, {
        responseType: "blob",
      });
      return convertVideo.data;
    } catch (err) {
      return err.response;
    }
  },
  updateDetail: async (cardId, updateData) => {
    try {
      const res = await instance.put(`/api/interviews/${cardId}`, updateData, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  deleteDetail: async (cardId) => {
    try {
      const res = await instance.delete(`/api/interviews/${cardId}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addScrap: async (id) => {
    try {
      const res = await instance.post(
        `/api/scraps/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  undoScrap: async (id) => {
    try {
      const res = await instance.delete(`/api/scraps/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default feedbackApis;
