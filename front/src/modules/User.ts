import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  loginConfirm,
  updateUser,
} from "../services/User";

// state
export type TUser = {
  id?: number | string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  password?: string | null;
  created_at?: Date | null;
};

export type TUserState = {
  user?: TUser | null;
  users?: Array<TUser> | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const initialState: TUserState = {
  user: null,
  users: [],
  loading: false,
  error: false,
  errorMessage: "",
};

// createSlice(action, reducer)
export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 通信成功時
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.user = action.payload[0];
      state.users = action.payload;
      state.loading = false;
      state.error = false;
    });
    // 通信中
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    // 通信失敗時
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = (action.payload as any)!.errorMessage;
    });

    // ユーザー取得
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload?.[0];
      state.error = false;
    });

    // ユーザー取得
    builder.addCase(loginConfirm.fulfilled, (state, action) => {
      state.user = action.payload?.data;
      state.error = false;
    });

    // ユーザー登録
    builder.addCase(createUser.fulfilled, (state) => {
      console.log("ユーザー登録");
      state.error = false;
    });

    // ユーザー更新
    builder.addCase(updateUser.fulfilled, (state) => {
      console.log("ユーザー更新");
      state.error = false;
    });

    // ユーザー削除
    builder.addCase(deleteUser.fulfilled, (state) => {
      console.log("ユーザー削除");
      state.error = false;
    });
  },
});
