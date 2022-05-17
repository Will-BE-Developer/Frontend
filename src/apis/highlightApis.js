import instance from "./axios.js";

const highlightApis = {
  getHighlight: async (cardId) => {
    try {
      const res = await instance.get(`/api/likes/${cardId}`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addHighlight: async (likeData) => {
    try {
      const res = await instance.post(`/api/likes`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
};
export default highlightApis;
