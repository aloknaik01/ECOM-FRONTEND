import { apiClient } from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';

export const productService = {
  /**
   * Get all products with filters
   */
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString 
      ? `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${queryString}`
      : API_ENDPOINTS.PRODUCTS.GET_ALL;
    
    return await apiClient.get(endpoint);
  },

  /**
   * Get single product by ID
   */
  getById: async (id) => {
    return await apiClient.get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
  },

  /**
   * Create new product (Admin)
   */
  create: async (formData) => {
    return await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, formData);
  },

  /**
   * Update product (Admin)
   */
  update: async (id, formData) => {
    return await apiClient.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), formData);
  },

  /**
   * Delete product (Admin)
   */
  delete: async (id) => {
    return await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
  },
};