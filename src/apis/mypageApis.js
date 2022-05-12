import instance from "./axios.js";
import { getCookie } from "../shared/cookies";

const mypageApis = {
  getUser: async () => {
    try {
      const response = await instance.get("/users/me", {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      return response.data;
    } catch (error) {
      return error.response;
    }
  },
  updateUser: async (formData) => {
    try {
      const res = await instance.put("/api/users/me", formData, {
        headers: {
          Authorization: getCookie("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      return res;
    } catch (err) {
      return err.response;
    }
  },
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
