import { createSlice } from "@reduxjs/toolkit";
import {
  createPresentation,
  deletePresentation,
  fetchPresentation,
  fetchPresentations,
  updatePresentation,
} from "../services/Presentation";
import { TLike } from "./Like";
import { TUser } from "./User";

// state
export type TPresentation = {
  id?: number | null;
  discription?: string | null;
  title?: string | null;
  created_at?: Date | null;
  user_id?: string | number | null;
  image?: string | null;
  user?: TUser | null;
  likes?: Array<TLike> | null;
};

export type TPresentationState = {
  presentation?: TPresentation | null;
  presentations?: Array<TPresentation> | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const initialState: TPresentationState = {
  presentation: null,
  presentations: [],
  loading: false,
  error: false,
  errorMessage: "",
};

// createSlice(action, reducer)
export const presentationSlice = createSlice({
  name: "presentations",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 通信成功時
    builder.addCase(fetchPresentations.fulfilled, (state, action) => {
      state.presentation = action.payload[0];
      state.presentations = action.payload;
      state.loading = false;
      state.error = false;
    });
    // 通信中
    builder.addCase(fetchPresentations.pending, (state) => {
      state.loading = true;
    });
    // 通信失敗時
    builder.addCase(fetchPresentations.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = (action.payload as any)!.errorMessage;
    });

    // 投稿取得
    builder.addCase(fetchPresentation.fulfilled, (state, action) => {
      state.presentation = action.payload?.[0];
      state.error = false;
    });

    // 投稿登録
    builder.addCase(createPresentation.fulfilled, (state) => {
      console.log("投稿登録");
      state.error = false;
    });

    // 投稿更新
    builder.addCase(updatePresentation.fulfilled, (state) => {
      console.log("投稿更新");
      state.error = false;
    });

    // 投稿削除
    builder.addCase(deletePresentation.fulfilled, (state) => {
      console.log("投稿削除");
      state.error = false;
    });
  },
});
