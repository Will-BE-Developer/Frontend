import instance from "./axios";
import { getCookie } from "../shared/cookies";

const userApis = {
  signupEmailCheck: async (email) => {
    try {
      const res = await instance.get(`/signup/${email}`);
      if (res.status === 200) {
        alert(res.data.msg);
        return res.data;
      }
    } catch (err) {
      if (err.response.status === 409) {
        alert(err.response.data.msg);
        return err.response.data;
      }
      return err;
    }
  },
  signupEmail: async (userData) => {
    try {
      const response = await instance.post("/signup", userData);

      return response;
    } catch (error) {
      return error;
    }
  },
  signinEmail: async (userData) => {
    try {
      const response = await instance.post("/signin", userData);
      const result = {
        user: response.data.user,
        token: response.headers.authorization,
      };

      return result;
    } catch (error) {
      return error.response;
    }
  },
  signinKakao: async (url, code) => {
    try {
      const response = instance.get(url, {
        params: { code },
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  signout: async () => {
    try {
      await instance.post(
        "/signout",
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
    } catch (error) {
      return error.response;
    }
  },
};

export default userApis;
