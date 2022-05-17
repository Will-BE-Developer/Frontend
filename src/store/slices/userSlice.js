import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../../shared/cookies";
import instance from "../../apis/axios";
import { getCookie } from "../../shared/cookies";

const initialState = {
  user: null,
};

export const signinKakao = createAsyncThunk(
  "user/signin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await instance.get("/user/kakao/callback", {
        params: { code },
        headers: {
          Authorization: getCookie("token"),
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

export const signupEmail = createAsyncThunk(
  "user/signupEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/signup", userData, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

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
      const response = await instance.post("/signin", userData, {
        headers: {
          Authorization: getCookie("token"),
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
export const emailValidation = createAsyncThunk(
  "user/emailValidation",
  async (data, { rejectWithValue }) => {
    const { token, email } = data;
    try {
      const response = await instance.get("/signin/validation", {
        params: {
          token,
          email,
        },
        headers: {
          Authorization: getCookie("token"),
        },
      });

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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/api/users/me", {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      const userData = {
        profileImageUrl: data.user.profileImageUrl,
        nickname: data.user.nickname,
        githubLink: data.user.githubLink,
        introduce: data.user.introduce,
      };

      return userData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await instance.put("/api/users/me", formData, {
        headers: {
          Authorization: getCookie("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = {
        profileImageUrl: data.user.profileImageUrl,
        nickname: data.user.nickname,
        githubLink: data.user.githubLink,
        introduce: data.user.introduce,
      };

      return userData;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signout = createAsyncThunk(
  "user/signout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/signout",
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.delete("/api/users/me", {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      return response.data;
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
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(signout.fulfilled, (state) => {
      deleteCookie("token");
      state.user = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      deleteCookie("token");
      state.user = null;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice;
