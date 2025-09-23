import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading, 'allowedRoles:', allowedRoles);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    console.log('Role not allowed, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('Access granted to protected route');
  return children;
};

export default ProtectedRoute;
