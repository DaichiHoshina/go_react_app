import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./Common";
import Qs from "qs";
import { TUser } from "../modules/User";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (arg: { page?: number; per?: number }, thunkAPI) => {
    const { page, per } = arg;
    try {
      const url = `http://localhost:3002/users`;

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
      const url = `http://localhost:3002/users/${id}`;
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
      const url = `http://localhost:3002/users`;
      debugger;
      const response = await axios.post(url, postUser);
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
      const url = `http://localhost:3002/users/${id}`;
      const response = await axios.delete(url);
      debugger;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  }
);
