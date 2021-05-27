import { createSlice } from "@reduxjs/toolkit";
import { createLike, deleteLike } from "../services/Like";

export type TLike = {
  id?: number | null;
  user_id?: number | null;
  presentation_id?: number | null;
};

export type TLikeState = {
  like?: TLike | null;
  likes?: Array<TLike> | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const initialState: TLikeState = {
  like: null,
  likes: [],
  loading: false,
  error: false,
  errorMessage: "",
};

export const likeSlice = createSlice({
  name: "likes",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // いいね登録
    builder.addCase(createLike.fulfilled, (state) => {
      console.log("いいね登録");
      state.error = false;
    });
    // いいね削除
    builder.addCase(deleteLike.fulfilled, (state) => {
      console.log("いいね削除");
      state.error = false;
    });
  },
});
