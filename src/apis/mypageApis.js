import instance from "./axios.js";

const mypageApis = {
  getUserCard: (page) =>
    instance.get("/api/users/me/interviews", { params: { page } }),

  getUserScrap: (page) =>
    instance.get(`/api/users/me/scraps`, { params: { page } }),
};
export default mypageApis;
