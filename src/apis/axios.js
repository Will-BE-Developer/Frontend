import axios from "axios";
import { deleteCookie, getCookie } from "../shared/cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "https://willbedeveloper.com",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.common["Authorization"] = getCookie("token");
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      deleteCookie("token");
      alert("로그인이 만료되었습니다");
      window.location.href = "/signin";
    }

    if (error.response.status === 500) {
      window.location.href = "/notice";
    }

    return Promise.reject(error);
  }
);

export default instance;
