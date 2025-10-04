// Token Storage - Secure token management
const TokenStorage = {
  setTokens(accessToken, refreshToken) {
    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('refresh_token', refreshToken);
  },
  
  getAccessToken() {
    return sessionStorage.getItem('access_token');
  },
  
  getRefreshToken() {
    return sessionStorage.getItem('refresh_token');
  },
  
  clearTokens() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  },

  hasTokens() {
    return !!this.getAccessToken();
  }
};

export default TokenStorage;