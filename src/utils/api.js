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

// ── PRODUCTS API 
export const productAPI = {
  // Public routes
  getAll: (params) =>
    apiClient(`/product/all${params ? '?' + params : ''}`, {
      method: 'GET',
    }),

  search: (keyword, page = 1) =>
    apiClient(`/product/search?q=${encodeURIComponent(keyword)}&page=${page}`, {
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
    apiClient(`/product/category/${encodeURIComponent(category)}?page=${page}`, {
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
};


// ── ORDERS API 
export const orderAPI = {
  // Place new order
  place: (orderData) =>
    apiClient('/order/new', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  // Get single order
  getSingle: (orderId) =>
    apiClient(`/order/${orderId}`, {
      method: 'GET',
    }),

  // Get my orders
  getMyOrders: () =>
    apiClient('/order/orders/me', {
      method: 'GET',
    }),
};

//ADMIN API
export const adminAPI = {
  // Dashboard Stats
  getDashboardStats: () =>
    apiClient('/admin/fetch/dashboard-stats', {
      method: 'GET',
    }),

  // Users Management
  getAllUsers: () =>
    apiClient('/admin/getallusers', {
      method: 'GET',
    }),

  deleteUser: (userId) =>
    apiClient(`/admin/delete/${userId}`, {
      method: 'DELETE',
    }),

  // Products Management
  getAllProducts: (params) =>
    apiClient(`/product/admin/all${params ? '?' + params : ''}`, {
      method: 'GET',
    }),

  getProductStats: () =>
    apiClient('/product/admin/statistics', {
      method: 'GET',
    }),

  createProduct: (formData) =>
    apiClient('/product/admin/create', {
      method: 'POST',
      body: formData,
      isFormData: true,
    }),

  updateProduct: (productId, formData) =>
    apiClient(`/product/admin/update/${productId}`, {
      method: 'PUT',
      body: formData,
      isFormData: true,
    }),

  deleteProduct: (productId) =>
    apiClient(`/product/admin/delete/${productId}`, {
      method: 'DELETE',
    }),

  // Orders Management
  getAllOrders: () =>
    apiClient('/order/admin/getall', {
      method: 'GET',
    }),

  updateOrderStatus: (orderId, status) =>
    apiClient(`/order/admin/update/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  deleteOrder: (orderId) =>
    apiClient(`/order/admin/delete/${orderId}`, {
      method: 'DELETE',
    }),
};


// ── WISHLIST API
export const wishlistAPI = {
  // Get user's wishlist
  getWishlist: () =>
    apiClient('/wishlist', {
      method: 'GET',
    }),

  // Add product to wishlist
  addToWishlist: (productId) =>
    apiClient(`/wishlist/add/${productId}`, {
      method: 'POST',
    }),

  // Remove product from wishlist
  removeFromWishlist: (productId) =>
    apiClient(`/wishlist/remove/${productId}`, {
      method: 'DELETE',
    }),

  // Clear entire wishlist
  clearWishlist: () =>
    apiClient('/wishlist/clear', {
      method: 'DELETE',
    }),

  // Check if product is in wishlist
  checkInWishlist: (productId) =>
    apiClient(`/wishlist/check/${productId}`, {
      method: 'GET',
    }),
};
