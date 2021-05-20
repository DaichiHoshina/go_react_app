import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Common";
import Qs from "qs";
import { TUser } from "../modules/User";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (arg: { page?: number; per?: number }, thunkAPI) => {
    const { page, per } = arg;
    try {
      const url = `${process.env.API_URL}/users`;

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

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (arg: { id?: number }, thunkAPI) => {
    const { id } = arg;
    try {
      const url = `${process.env.API_URL}/users/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (arg: { user?: TUser }, thunkAPI) => {
    const { user } = arg;

    const postUser = Object.assign({}, user!);

    try {
      const url = `${process.env.API_URL}/users`;
      const response = await axios.post(url, postUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/ updateUser",
  async (arg: { id?: string; user?: TUser }, thunkAPI) => {
    const { user } = arg;
    const { id } = arg;

    const postUser = Object.assign({}, user!);

    try {
      const url = `${process.env.API_URL}/users/${id}`;
      const response = await axios.put(url, postUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (arg: { id?: string }, thunkAPI) => {
    const { id } = arg;
    try {
      const url = `${process.env.API_URL}/users/${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);

// ログイン処理
export const loginUser = createAsyncThunk(
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
export const logoutUser = createAsyncThunk(
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
