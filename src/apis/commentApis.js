import instance from "./axios.js";

const commentApi = {
  getComments: (cardId) =>
    instance.get(`/api/comments/${cardId}`, {
      params: { per: 10 },
    }),
  addComment: (commentData) => instance.post(`/api/comments`, commentData),
  deleteComment: (id) => instance.delete(`/api/comments/${id}`),
  updateComment: (commentData, id) =>
    instance.put(`/api/comments/${id}`, commentData),
};
export default commentApi;
