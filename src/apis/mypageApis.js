import instance from "./axios.js";
import { getCookie } from "../shared/cookies";
const token = getCookie("token");

//MyPage
export const getUserCard = async () => {
  try {
    const res = await instance.get(`/api/users/me/interviews`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const getUserScrap = async () => {
  try {
    const res = await instance.get(`/api/users/me/scraps`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const addScrap = async (id) => {
  try {
    const res = await instance.post(
      `/api/scraps/${id}`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const undoScrap = async (id) => {
  try {
    const res = await instance.delete(`/api/scraps/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    return err.response;
  }
};
