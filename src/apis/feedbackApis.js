import instance from "./axios.js";
import { getCookie } from "../shared/cookies";
const token = getCookie("token");

export const getFeedback = async () => {
  try {
    const res = await instance.get("/api/interviews/");
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const getFeedbackDetail = async (cardId) => {
  try {
    const res = await instance.get(`/api/interviews/${cardId}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const getFeedbackDetailVideo = async (cardId) => {
  try {
    const res = await instance.get(`/api/interviews/${cardId}`, {
      headers: {
        Authorization: token,
      },
    });
    const convertVideo = await instance.get(res.data.interview.video, {
      responseType: "blob",
    });
    return convertVideo.data;
  } catch (err) {
    return err.response;
  }
};
export const updateFeedbackDetail = async (cardId, updateData) => {
  console.log(cardId, updateData);
  try {
    const res = await instance.put(`/api/interviews/${cardId}`, updateData, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

export const deleteFeedbackDetail = async (cardId) => {
  console.log(cardId);
  try {
    const res = await instance.delete(`/api/interviews/${cardId}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return err.response;
  }
};

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

export const signupEmailCheck = async (email) => {
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
    console.log("이메일 중복 체크 오류: ", err.response);
    return err;
  }
};
