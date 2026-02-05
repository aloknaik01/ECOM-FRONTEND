const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    credentials: 'include', // Important for cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(data.message || 'Something went wrong', response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error. Please try again.', 500);
  }
};

// ── AUTH 
// API Methods
export const authAPI = {
  register: (userData) => 
    apiClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    apiClient('/auth/logout', {
      method: 'GET',
    }),

  getMe: () =>
    apiClient('/auth/me', {
      method: 'GET',
    }),

  forgotPassword: (email, frontendUrl) =>
    apiClient(`/auth/password/forgot?frontendUrl=${frontendUrl}`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token, passwords) =>
    apiClient(`/auth/password/reset/${token}`, {
      method: 'PUT',
      body: JSON.stringify(passwords),
    }),

  updatePassword: (passwords) =>
    apiClient('/auth/password/update', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    }),

  updateProfile: (formData) =>
    apiClient('/auth/profile/update', {
      method: 'PUT',
      body: formData, // FormData for file upload
    }),
};

