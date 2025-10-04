// API Endpoints - Centralized endpoint management
const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`, // Full URL for refresh (outside interceptor)
  
  // Product endpoints
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  RELATED_PRODUCTS: (id) => `/products/${id}/related`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
};

export default API_ENDPOINTS;