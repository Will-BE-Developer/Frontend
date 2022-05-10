import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../apis/axios";
import { deleteCookie, setCookie } from "../../shared/cookies";

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const signinKakao = createAsyncThunk(
  "user/signin",
  async (data, { rejectWithValue }) => {
    const { url, code } = data;
    try {
      const response = await instance.get(url, {
        params: {
          code: code,
        },
      });
      const result = {
        user: response.data.user,
        token: response.headers.authorization,
      };

      return result;
    } catch (err) {
      console.log(err.response, "err msg");
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupEmail = createAsyncThunk(
  "user/signupEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/signup`, userData);

      return response.data;
    } catch (err) {
      console.log("이메일 회원가입 오류: ", err.response);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signinEmail = createAsyncThunk(
  "user/signinEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/signin", userData);
      // const response = await instance.post(
      //   `${process.env.REACT_APP_API_JURI_URL}/signin`,
      //   userData
      // );
      const result = {
        user: response.data.user,
        token: response.headers.authorization,
      };
      return result;
    } catch (err) {
      console.log("이메일 로그인 오류: ", err.response);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "user/signout",
  async (token, { rejectWithValue }) => {
    console.log(token);
    try {
      await instance.post(
        "/signout",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return { msg: "success" };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupEmail.fulfilled, (state, action) => {});
    builder.addCase(signinEmail.fulfilled, (state, action) => {
      setCookie("token", action.payload.token);
      state.user = action.payload.user;
    });
    builder.addCase(signinKakao.fulfilled, (state, action) => {
      setCookie("token", action.payload.token);
      state.user = action.payload.user;
    });
    builder.addCase(signout.fulfilled, (state) => {
      deleteCookie("token");
      state.user = null;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
