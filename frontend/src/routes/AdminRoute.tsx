import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

/**
 * Route guard that requires Admin authentication.
 * If user is not authenticated or not an admin, redirects to /admin/login.
 */
export const AdminRoute: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner fullScreen tip="Verifying administrator credentials..." />;
  }

  // Check if authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check if user has admin/manager role
  if (user.role !== 'admin' && user.role !== 'manager') {
    return <Navigate to="/admin/login" state={{ from: location, error: 'Unauthorized: Admin role required' }} replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
