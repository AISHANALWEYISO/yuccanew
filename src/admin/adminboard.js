

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './pages/Sidebar';
import { isAuthenticated } from './utils/auth';

const AdminBoard = () => {
  if (!isAuthenticated()) return <Navigate to="/admin/login" replace />;

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminBoard;



