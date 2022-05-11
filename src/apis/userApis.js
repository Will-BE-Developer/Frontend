import instance from "./axios";
import { getCookie } from "../shared/cookies";

const userApis = {
  signupEmailCheck: async (email) => {
    try {
      const res = await instance.get(`/signup/${email}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
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
};

export default userApis;
