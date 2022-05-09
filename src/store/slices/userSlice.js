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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinKakao.fulfilled, (state, action) => {
      setCookie("token", action.payload.token);
      state.user = action.payload.user;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
