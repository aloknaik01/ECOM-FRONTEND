import { apiClient } from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';

export const authService = {

  //  Register new user

  register: async (userData) => {
    return await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  
   // Login user
  login: async (credentials) => {
    return await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  },


    //Logout user
  logout: async () => {
    return await apiClient.get(API_ENDPOINTS.AUTH.LOGOUT);
  },

   //Get current user

  getMe: async () => {
    return await apiClient.get(API_ENDPOINTS.AUTH.GET_ME);
  },

  // Forgot password

  forgotPassword: async (email) => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
    return await apiClient.post(
      `${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}?frontend_url=${frontendUrl}`,
      { email }
    );
  },

 // Reset password

  resetPassword: async (token, passwords) => {
    return await apiClient.put(
      API_ENDPOINTS.AUTH.RESET_PASSWORD(token),
      passwords
    );
  },

  // Update password
  updatePassword: async (passwords) => {
    return await apiClient.put(
      API_ENDPOINTS.AUTH.UPDATE_PASSWORD,
      passwords
    );
  },

 // Update profile
  
  updateProfile: async (formData) => {
    return await apiClient.put(
      API_ENDPOINTS.AUTH.UPDATE_PROFILE,
      formData
    );
  },
};