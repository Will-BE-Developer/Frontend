import axios from "axios";
import { deleteCookie, getCookie } from "../shared/cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
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
    if (error.response.status === 401) {
      deleteCookie("token");
      alert("로그인이 만료되었습니다");
      window.location.href = "https://willbedeveloper.com/signin";
    }

    if (error.response.status === 403) {
      deleteCookie("token");
      alert("잘못된 접근입니다.");
      window.location.href = "https://willbedeveloper.com/";
    }

    if (error.response.status === 500) {
      window.location.href = "https://willbedeveloper.com/notice";
    }

    return Promise.reject(error);
  }
);

export default instance;
