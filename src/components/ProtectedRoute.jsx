<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
