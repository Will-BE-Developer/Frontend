import instance from "./axios.js";

const feedbackApis = {
  getFeedback: (page, sort, filter) =>
    instance.get("/api/interviews/", { params: { page, sort, filter } }),

  getDetail: (cardId) => instance.get(`/api/interviews/${cardId}`),

  updateDetail: (cardId, updateData) =>
    instance.put(`/api/interviews/${cardId}`, updateData),

  deleteDetail: (cardId) => instance.delete(`/api/interviews/${cardId}`),

  addScrap: (id) => instance.post(`/api/scraps/${id}`),

  undoScrap: (id) => instance.delete(`/api/scraps/${id}`),
};

export default feedbackApis;
