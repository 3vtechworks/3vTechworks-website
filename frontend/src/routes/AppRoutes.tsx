import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { LandingPage } from '../pages/Landing/LandingPage';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { DynamicAdminMenuPage } from '../pages/Admin/DynamicAdminMenuPage';
import { AdminLoginPage } from '../pages/Auth/AdminLoginPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { AdminRoute } from './AdminRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Public Role: 3D Smooth Animated Company Website for 3vTechworks */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. Admin Authentication Portal */}
      <Route element={<AuthLayout />}>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        {/* Forward generic auth paths to admin login */}
        <Route path="/auth/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/auth/register" element={<Navigate to="/admin/login" replace />} />
      </Route>

      {/* 3. Protected Admin Role: Dashboard (Only for Admin) */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path=":menuPath" element={<DynamicAdminMenuPage />} />
        </Route>
      </Route>

      {/* Legacy redirects */}
      <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/users" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/users" element={<Navigate to="/admin/dashboard" replace />} />

      {/* 4. 404 Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
