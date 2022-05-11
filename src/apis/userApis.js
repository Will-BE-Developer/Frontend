import instance from "./axios";
import { getCookie } from "../shared/cookies";

const userApis = {
  signupEmailCheck: async (email) => {
    try {
      const res = await instance.get(
        `${process.env.REACT_APP_API_JURI_URL}/signup/${email}`
      );
      console.log(res.data);
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
      const response = await instance.post(
        `${process.env.REACT_APP_API_JURI_URL}/signup`,
        userData
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  signinEmail: async (userData) => {
    try {
      const response = await instance.post(
        `${process.env.REACT_APP_API_JURI_URL}/signin`,
        userData
      );
      const result = {
        user: response.data.user,
        token: response.headers.authorization,
      };
      return result;
    } catch (error) {
      return error.response;
    }
  },

  emailValidation: async (token, email) => {
    try {
      const response = await instance.get(
        `${process.env.REACT_APP_API_JURI_URL}/signin/validation`,
        {
          params: {
            token,
            email,
          },
        }
      );

      return response;
    } catch (error) {
      console.log(error.response);
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
      return { message: "success" };
    } catch (error) {
      return error.response;
    }
  },
};

export default userApis;
