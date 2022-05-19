import instance from "./axios.js";

const mypageApis = {
  getUserCard: async () => {
    try {
      const res = await instance.get(`/api/users/me/interviews`);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getUserScrap: async () => {
    try {
      const res = await instance.get(`/api/users/me/scraps`);
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
export default mypageApis;
