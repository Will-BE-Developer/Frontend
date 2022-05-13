import axios from "axios";
import { getCookie } from "../shared/cookies";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use((config) => {
  config.headers.common["Authorization"] = getCookie("token");
  return config;
});

export default instance;
