// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, name }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/signup`, { email, password, name }, { withCredentials: true });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error signing up");
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ code }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/verify-email`, { code }, { withCredentials: true });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error verifying email");
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/check-auth`, { withCredentials: true });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(null); // Not an error, just unauthenticated
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error logging in");
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error logging out");
    }
  }
);
