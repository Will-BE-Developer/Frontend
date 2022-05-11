import instance from "./axios.js";
import { getCookie } from "../shared/cookies";
const token = getCookie("token");

const commentApi = {
  getComments: async (cardId) => {
    try {
      const res = await instance.get(`/api/comments/${cardId}`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addComment: async (commentData) => {
    console.log(commentData);
    try {
      const res = await instance.post(`/api/comments`, commentData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },
};
export default commentApi;
