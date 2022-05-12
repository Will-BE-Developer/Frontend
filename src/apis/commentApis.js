import instance from "./axios.js";
import { getCookie } from "../shared/cookies";

const commentApi = {
  getComments: async (cardId) => {
    try {
      const res = await instance.get(`/api/comments/${cardId}`, {
        params: { per: 10 },
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addComment: async (commentData) => {
    try {
      const res = await instance.post(`/api/comments`, commentData, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },

  deleteComment: async (id) => {
    try {
      const res = await instance.delete(`/api/comments/${id}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },

  updateComment: async (commentData, id) => {
    try {
      const res = await instance.put(`/api/comments/${id}`, commentData, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },
};
export default commentApi;
