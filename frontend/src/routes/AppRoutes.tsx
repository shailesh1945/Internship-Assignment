import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageStores from '../pages/admin/ManageStores';

import StoreList from '../pages/user/StoreList';
import OwnerDashboard from '../pages/owner/OwnerDashboard';

import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute role="admin">
            <ManageStores />
          </ProtectedRoute>
        }
      />

      {/* Normal User */}
      <Route
        path="/stores"
        element={
          <ProtectedRoute role="normal">
            <StoreList />
          </ProtectedRoute>
        }
      />

      {/* Owner */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="store_owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-slate-500">
            404 Page Not Found
          </div>
        }
      />
    </Routes>
  );
}