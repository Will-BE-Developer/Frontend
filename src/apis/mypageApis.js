import instance from "./axios.js";

const mypageApis = {
  getUserCard: () => instance.get(`/api/users/me/interviews`),
  getUserScrap: () => instance.get(`/api/users/me/scraps`),
};
export default mypageApis;
