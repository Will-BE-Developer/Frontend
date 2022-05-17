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
    console.log(likeData, "api add!! ");
    try {
      const res = await instance.post(`/api/likes`, likeData);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
};
export default highlightApis;
