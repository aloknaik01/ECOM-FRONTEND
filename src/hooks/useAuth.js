// Custom Auth Hook
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectIsInitialized,
} from '../features/auth/authSelectors';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const isInitialized = useSelector(selectIsInitialized);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,
  };
};

export default useAuth;