import instance from "./axios.js";

export const getFeedback = async () => {
  try {
    const res = await instance.get("/api/interviews/", {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getFeedbackDetail = async (cardId) => {
  console.log(cardId);
  try {
    const res = await instance.get(`/api/interviews/${cardId}`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err;
  }
};

export const getFeedbackDetailVideo = async (cardId) => {
  try {
    const res = await instance.get(`/api/interviews/${cardId}`);
    const convertVideo = await instance.get(res.data.interview.video, {
      responseType: "blob",
    });
    return convertVideo.data;
  } catch (err) {
    console.log(err.response);
    return err;
  }
};

export const editFeedbackDetail = async (cardId) => {
  console.log(cardId);
  try {
    const res = await instance.get(`/api/interviews/${cardId}`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err;
  }
};

export const deleteFeedbackDetail = async (cardId) => {
  console.log(cardId);
  try {
    const res = await instance.delete(`/api/interviews/${cardId}`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err.response);
    return err;
  }
};

export const signupEmailCheck = async (email) => {
  try {
    const res = await instance.get(
      `${process.env.REACT_APP_API_JURI_URL}/signup/${email}`
    );
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

// export const getUserCard = async (email) => {
//   try {
//     const res = await instance.get(
//       `${process.env.REACT_APP_API_JURI_URL}/signup/${email}`
//     );
//     if (res.status === 200) {
//       alert(res.data.msg);
//       return res.data;
//     }
//   } catch (err) {
//     if (err.response.status === 409) {
//       alert(err.response.data.msg);
//       return err.response.data;
//     }
//     console.log("이메일 중복 체크 오류: ", err.response);
//     return err;
//   }
// };
