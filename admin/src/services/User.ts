import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from './Common';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const url = `${process.env.API_URL}/users`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const login = ({ loginId, password }: { loginId: string; password: string }): void => {
  console.log(loginId + password);
};
