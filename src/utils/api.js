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

// ── PRODUCTS 
export const productAPI = {
  // Public routes
  getAllProducts: (params) =>
    apiClient(`/product/all?${params}`, {
      method: 'GET',
    }),

  search: (keyword, page = 1) =>
    apiClient(`/product/search?q=${keyword}&page=${page}`, {
      method: 'GET',
    }),

  getCategories: () =>
    apiClient('/product/categories', {
      method: 'GET',
    }),

  getFeatured: () =>
    apiClient('/product/featured', {
      method: 'GET',
    }),

  getNewArrivals: () =>
    apiClient('/product/new-arrivals', {
      method: 'GET',
    }),

  getByCategory: (category, page = 1) =>
    apiClient(`/product/category/${category}?page=${page}`, {
      method: 'GET',
    }),

  getById: (id) =>
    apiClient(`/product/${id}`, {
      method: 'GET',
    }),

  getRelated: (id) =>
    apiClient(`/product/${id}/related`, {
      method: 'GET',
    }),

  // Reviews
  postReview: (productId, reviewData) =>
    apiClient(`/product/review/post/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    }),

  deleteReview: (productId) =>
    apiClient(`/product/review/delete/${productId}`, {
      method: 'DELETE',
    }),

  // AI Search
  aiSearch: (userPrompt) =>
    apiClient('/product/ai-search', {
      method: 'POST',
      body: JSON.stringify({ userPrompt }),
    }),

  // Admin routes
  admin: {
    create: (formData) =>
      apiClient('/product/admin/create', {
        method: 'POST',
        body: formData, // FormData for file upload
      }),

    update: (id, formData) =>
      apiClient(`/product/admin/update/${id}`, {
        method: 'PUT',
        body: formData, // FormData for file upload
      }),

    delete: (id) =>
      apiClient(`/product/admin/delete/${id}`, {
        method: 'DELETE',
      }),

    getAll: (params) =>
      apiClient(`/product/admin/all?${params}`, {
        method: 'GET',
      }),

    getStatistics: () =>
      apiClient('/product/admin/statistics', {
        method: 'GET',
      }),
  },
};
