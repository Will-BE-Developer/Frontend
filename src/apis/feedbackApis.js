import axios from "axios";
import instance from "./axios.js";

export const feedbackApis = {
  getFeedback: async (page, sort, filter) => {
    try {
      const res = await instance.get("/api/interviews/", {
        params: {
          page,
          sort,
          filter,
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getDetail: async (cardId) => {
    try {
      const res = await instance.get(`/api/interviews/${cardId}`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getDetailVideo: async (cardId) => {
    try {
      const res = await instance.get(`/api/interviews/${cardId}`);
      const convertVideo = await axios.get(res.data.interview.video, {
        headers: {
          accept: "application/json,",
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "blob",
      });
      return convertVideo.data;
    } catch (err) {
      console.log(err);
      return err.response;
    }
  },
  updateDetail: async (cardId, updateData) => {
    try {
      const res = await instance.put(`/api/interviews/${cardId}`, updateData);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  deleteDetail: async (cardId) => {
    try {
      const res = await instance.delete(`/api/interviews/${cardId}`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addScrap: async (id) => {
    try {
      const res = await instance.post(`/api/scraps/${id}`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  undoScrap: async (id) => {
    try {
      const res = await instance.delete(`/api/scraps/${id}`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
};

export default feedbackApis;
