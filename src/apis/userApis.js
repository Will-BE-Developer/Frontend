import instance from "./axios";

const userApis = {
  signupEmailCheck: async (email) => {
    const res = await instance.get(`/signup/${email}`);
    return res;
  },
};

export default userApis;
