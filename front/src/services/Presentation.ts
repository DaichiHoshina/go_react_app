import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Common";
import Qs from "qs";
import { TPresentation } from "../modules/Presentation";

export const fetchPresentations = createAsyncThunk(
  "presentations/fetchPresentations",
  async (arg: { page?: number; per?: number }, thunkAPI) => {
    const { page, per } = arg;
    try {
      const url = `${process.env.API_URL}/presentations`;

      const response = await axios.get(url, {
        params: {
          pagination: 1,
          page: page,
          per: per,
        },
        paramsSerializer: function (params) {
          return Qs.stringify(params, { arrayFormat: "brackets" });
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchPresentation = createAsyncThunk(
  "presentations/fetchPresentation",
  async (arg: { id?: number | string[] | string }, thunkAPI) => {
    const { id } = arg;
    try {
      const url = `${process.env.API_URL}/presentations/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const createPresentation = createAsyncThunk(
  "presentations/createPresentation",
  async (
    arg: { presentation?: TPresentation; user_id?: number | string },
    thunkAPI
  ) => {
    const { presentation, user_id } = arg;

    // ログインしているユーザーのIDをuser_idに設定する。
    const postPresentation = Object.assign({}, presentation!);
    postPresentation.user_id = user_id;
    try {
      const FormData = require("form-data");
      const formData = new FormData();
      Object.entries(postPresentation).forEach(([key, value]) => {
        if (key === "files") return;
        formData.append(key, value);
      });
      formData.append("user_id", user_id);
      formData.append("file", presentation?.image![0]);
      const url = `${process.env.API_URL}/presentations`;
      const response = await axios.post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const updatePresentation = createAsyncThunk(
  "presentations/ updatePresentation",
  async (
    arg: { id?: string | string[]; presentation?: TPresentation },
    thunkAPI
  ) => {
    const { presentation } = arg;
    const { id } = arg;

    const postPresentation = Object.assign({}, presentation!);

    try {
      const url = `${process.env.API_URL}/presentations/${id}`;
      const response = await axios.put(url, postPresentation);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deletePresentation = createAsyncThunk(
  "presentations/deletePresentation",
  async (arg: { id?: string | number }, thunkAPI) => {
    const { id } = arg;
    try {
      const url = `${process.env.API_URL}/presentations/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

// ユーザー登録処理
export const signUpPresentation = createAsyncThunk(
  "auth/signUp",
  async (arg: { loginForm: any }, thunkAPI) => {
    const { loginForm } = arg;
    try {
      console.log("url", `${process.env.API_URL}/auth`);
      const url = `${process.env.API_URL}/auth`;
      const response = await axios.post(url, {
        name: loginForm.name,
        email: loginForm.email,
        password: loginForm.password,
      });

      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.payload });
    }
  }
);

// ログイン処理
export const loginPresentation = createAsyncThunk(
  "auth/login",
  async (arg: { loginForm: any }, thunkAPI) => {
    const { loginForm } = arg;
    try {
      console.log("url", `${process.env.API_URL}/auth/login`);
      const url = `${process.env.API_URL}/auth/login`;
      const response = await axios.post(url, {
        email: loginForm.email,
        password: loginForm.password,
      });

      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.payload });
    }
  }
);

// ログアウト処理
export const logoutPresentation = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const url = `${process.env.API_URL}/auth/logout`;
      const response = await axios.get(url);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

// ログイン確認
export const loginConfirm = createAsyncThunk(
  "auth/loginConfirm",
  async (_, thunkAPI) => {
    try {
      const url = `${process.env.API_URL}/auth/user`;
      const response = await axios.get(url);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.payload });
    }
  }
);
