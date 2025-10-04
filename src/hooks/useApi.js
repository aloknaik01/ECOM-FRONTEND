// Custom API Hook
import { useState, useCallback } from 'react';
import apiClient from '../services/api/apiClient';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      let response;

      switch (method.toUpperCase()) {
        case 'GET':
          response = await apiClient.get(url, config);
          break;
        case 'POST':
          response = await apiClient.post(url, data, config);
          break;
        case 'PUT':
          response = await apiClient.put(url, data, config);
          break;
        case 'DELETE':
          response = await apiClient.delete(url, config);
          break;
        default:
          throw new Error('Invalid HTTP method');
      }

      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'API call failed';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { callApi, loading, error, clearError };
};

export default useApi;