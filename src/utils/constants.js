// App Constants
export const APP_NAME = 'E-Commerce';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/product-details/:productId',
  NOT_FOUND: '*',
};

export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 20 * 24 * 60 * 60 * 1000, // 20 days in ms
  REFRESH_TOKEN: 10 * 60 * 60 * 1000, // 10 hours in ms
};

export const API_CONFIG = {
  TIMEOUT: 15000,
  RETRY_ATTEMPTS: 3,
};