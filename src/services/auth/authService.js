// Auth Service - Business logic layer
import apiClient from '../api/apiClient.js';
import TokenStorage from '../storage/tokenStorage.js';

const authService = {
  // Login user
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    const { access_token, refresh_token } = response.data;

    // Store tokens
    TokenStorage.setTokens(access_token, refresh_token);

    return response.data;
  },

  // Get user profile
  async getProfile() {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  // Refresh token
  async refreshToken() {
    const refreshToken = TokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh-token', {
      refreshToken,
    });

    const { access_token, refresh_token } = response.data;
    TokenStorage.setTokens(access_token, refresh_token);

    return response.data;
  },

  // Logout user
  logout() {
    TokenStorage.clearTokens();
  },

  // Check authentication
  isAuthenticated() {
    return TokenStorage.hasTokens();
  },
};

export default authService;