import axios from "axios";
const https = require("https");

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default instance;
