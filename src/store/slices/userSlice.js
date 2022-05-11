import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../../shared/cookies";
import userApis from "../../apis/userApis";

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const signinKakao = createAsyncThunk(
  "user/signin",
  async (data, { rejectWithValue }) => {
    const { url, code } = data;
    try {
      const response = await userApis.signinKakao(url, code);

      const result = {
        user: response.data.user,
        token: response.headers.authorization,
      };

      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupEmail = createAsyncThunk(
  "user/signupEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userApis.signupEmail(userData);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signinEmail = createAsyncThunk(
  "user/signinEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await userApis.signinEmail(userData);
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const emailValidation = createAsyncThunk(
  "user/emailValidation",
  async (data, { rejectWithValue }) => {
    console.log(data, "token, email : ");
    const { token, email } = data;
    try {
      const response = await userApis.emailValidation(token, email);
      console.log(response);
      const result = {
        user: response.data.user,
        token: response.headers.authorization,
      };
      return result;
    } catch (err) {
      console.log("로그인 인증 오류", err.response);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApis.signout();
      return response;
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
    builder.addCase(emailValidation.fulfilled, (state, action) => {
      setCookie("token", action.payload.token);
      state.user = action.payload.user;
    });
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
