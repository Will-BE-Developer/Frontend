import instance from "./axios";

const userApis = {
  signupEmailCheck: async (email) => {
    try {
      const res = await instance.get(`/signup/${email}`);
      if (res.status === 200) {
        alert(res.data.msg);
        return res.data;
      }
    } catch (err) {
      if (err.response.status === 409) {
        console.log(err.response);
        // alert(err.response.data.msg);
        return err.response.data;
      }
      return err;
    }
  },
};

export default userApis;
