import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/User";

// state
export type TUser = {
  id?: string | null;
  name?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
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
  },
});
