import instance from "./axios.js";

const commentApi = {
  getComments: async (cardId) => {
    try {
      const res = await instance.get(`/api/comments/${cardId}`, {
        params: { per: 10 },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addComment: async (commentData) => {
    try {
      const res = await instance.post(`/api/comments`, commentData);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },

  deleteComment: async (id) => {
    try {
      const res = await instance.delete(`/api/comments/${id}`);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },

  updateComment: async (commentData, id) => {
    try {
      const res = await instance.put(`/api/comments/${id}`, commentData);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response;
    }
  },
};
export default commentApi;
