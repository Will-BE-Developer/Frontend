import instance from "./axios.js";

const highlightApis = {
  getHighlight: (cardId) => instance.get(`/api/likes/${cardId}`),
  addHighlight: (likeData) => instance.post(`/api/likes`, likeData),
};
export default highlightApis;
