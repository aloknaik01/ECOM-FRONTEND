import axios from 'axios';
import store from '../store/index.js';
import { refreshTokenThunk, logout } from '../store/authSlice.js';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      store.getState().auth.refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await store.dispatch(refreshTokenThunk(store.getState().auth.refreshToken));
        if (refreshResponse.payload) {
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.payload.access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
