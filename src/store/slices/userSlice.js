import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../apis/axios";
import { deleteCookie, setCookie } from "../../shared/cookies";

const initialState = {
  user: null,
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
      return rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "user/signout",
  async (token, { rejectWithValue }) => {
    try {
      await instance.post(
        `${process.env.REACT_APP_API_JURI_URL}/signout`,
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
