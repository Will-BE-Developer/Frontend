import instance from "./axios.js";
import { getCookie } from "../shared/cookies";

const mypageApis = {
  getUserCard: async () => {
    try {
      const res = await instance.get(`/api/users/me/interviews`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  getUserScrap: async () => {
    try {
      const res = await instance.get(`/api/users/me/scraps`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  addScrap: async (id) => {
    try {
      const res = await instance.post(
        `/api/scraps/${id}`,
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },

  undoScrap: async (id) => {
    try {
      const res = await instance.delete(`/api/scraps/${id}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      return err.response;
    }
  },
};
export default mypageApis;
