import instance from "./axios.js";
import { getCookie } from "../shared/cookies";

export const feedbackApis = {
  getFeedback: async (page, sort, category) => {
    console.log(page, sort, category);
    try {
      const res = await instance.get("/api/interviews/", {
        params: {
          page,
          sort,
          category,
        },
      });

      console.log(res.data);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getDetail: async (cardId) => {
    try {
      const res = await instance.get(`/api/interviews/${cardId}`, {
        headers: {
          Authorization: getCookie("token"),
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
          Authorization: getCookie("token"),
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
          Authorization: getCookie("token"),
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
          Authorization: getCookie("token"),
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
            Authorization: getCookie("token"),
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
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default feedbackApis;
