// Auth Async Thunks
import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authSlice.js'
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      await authService.login(credentials);
      const user = await authService.getProfile();
      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getProfile();
      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to fetch profile';
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});