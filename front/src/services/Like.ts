import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Common";
import { TLike } from "../modules/Like";

export const createLike = createAsyncThunk(
  "likes/createLike",
  async (
    arg: { user_id?: number; presentation_id?: number; like?: TLike },
    thunkAPI
  ) => {
    const { like } = arg;

    const postLike = Object.assign({}, like!);

    try {
      const url = `${process.env.API_URL}/likes`;
      const response = await axios.post(url, postLike);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deleteLike = createAsyncThunk(
  "likes/deleteLike",
  async (
    arg: { user_id?: number; presentation_id?: number; like?: TLike },
    thunkAPI
  ) => {
    const { like } = arg;

    const postLike = Object.assign({}, like!);
    try {
      const url = `${process.env.API_URL}/likes/delete`;
      const response = await axios.post(url, postLike);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
