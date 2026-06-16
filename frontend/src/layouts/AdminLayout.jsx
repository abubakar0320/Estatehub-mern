import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  return (
    <div id="wrapper" className="d-flex">
      <AdminSidebar />
      <div id="page-content-wrapper" className="flex-grow-1">
        <AdminHeader />
        <main className="container-fluid p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
