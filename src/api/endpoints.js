export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    GET_ME: '/auth/getme',
    FORGOT_PASSWORD: '/auth/password/forgot',
    RESET_PASSWORD: (token) => `/auth/password/reset/${token}`,
    UPDATE_PASSWORD: '/auth/password/update',
    UPDATE_PROFILE: '/auth/profile/update',
  },
  
  // Products
  PRODUCTS: {
    GET_ALL: '/product/all',
    GET_BY_ID: (id) => `/product/${id}`,
    CREATE: '/product/admin/add-product',
    UPDATE: (id) => `/product/admin/update/${id}`,
    DELETE: (id) => `/product/admin/delete/${id}`,
  },
  
  // Orders
  ORDERS: {
    CREATE: '/order/create',
    GET_MY_ORDERS: '/order/my-orders',
    GET_BY_ID: (id) => `/order/${id}`,
    GET_ALL_ADMIN: '/admin/orders',
    UPDATE_STATUS: (id) => `/admin/order/${id}/status`,
  },
  
  // Reviews
  REVIEWS: {
    CREATE: '/review/create',
    GET_BY_PRODUCT: (productId) => `/review/product/${productId}`,
    DELETE: (id) => `/review/${id}`,
  },
};