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
  // public
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiClient(`/product/all${q ? '?' + q : ''}`);
  },
  search: (keyword, page = 1) =>
    apiClient(`/product/search?q=${encodeURIComponent(keyword)}&page=${page}`),
  getById: (id) =>
    apiClient(`/product/${id}`),
  getByCategory: (category, page = 1) =>
    apiClient(`/product/category/${encodeURIComponent(category)}?page=${page}`),
  getCategories: () =>
    apiClient('/product/categories'),
  getFeatured: () =>
    apiClient('/product/featured'),
  getNewArrivals: () =>
    apiClient('/product/new-arrivals'),
  getRelated: (id) =>
    apiClient(`/product/${id}/related`),

  // reviews
  postReview: (productId, { rating, comment }) =>
    apiClient(`/product/review/post/${productId}`, {
      method: 'PUT', body: JSON.stringify({ rating, comment }),
    }),
  deleteReview: (productId) =>
    apiClient(`/product/review/delete/${productId}`, { method: 'DELETE' }),

  // AI search
  aiSearch: (userPrompt) =>
    apiClient('/product/ai-search', { method: 'POST', body: JSON.stringify({ userPrompt }) }),

  // admin
  create: (formData) =>
    apiClient('/product/admin/create', { method: 'POST', body: formData }),
  update: (id, formData) =>
    apiClient(`/product/admin/update/${id}`, { method: 'PUT', body: formData }),
  delete: (id) =>
    apiClient(`/product/admin/delete/${id}`, { method: 'DELETE' }),
  getAllAdmin: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiClient(`/product/admin/all${q ? '?' + q : ''}`);
  },
  getStatistics: () =>
    apiClient('/product/admin/statistics'),
};

// ── ORDERS 
export const orderAPI = {
  place: (orderData) =>
    apiClient('/order/new', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () =>
    apiClient('/order/orders/me'),
  getById: (orderId) =>
    apiClient(`/order/${orderId}`),
  // admin
  getAll: () =>
    apiClient('/order/admin/getall'),
  updateStatus: (orderId, status) =>
    apiClient(`/order/admin/update/${orderId}`, {
      method: 'PUT', body: JSON.stringify({ status }),
    }),
  delete: (orderId) =>
    apiClient(`/order/admin/delete/${orderId}`, { method: 'DELETE' }),
};