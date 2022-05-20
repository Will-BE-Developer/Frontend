import instance from "./axios";

const userApis = {
  signupEmailCheck: (email) => instance.get(`/signup/${email}`),
};

export default userApis;
