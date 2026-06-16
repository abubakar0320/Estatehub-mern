import React from 'react';
import { Outlet } from 'react-router-dom';
import TenantSidebar from '../components/TenantSidebar';
import AdminHeader from '../components/AdminHeader'; // Reusing header pattern

const TenantLayout = () => {
  return (
    <div id="wrapper" className="d-flex">
      <TenantSidebar />
      <div id="page-content-wrapper" className="flex-grow-1">
        <AdminHeader />
        <main className="container-fluid p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TenantLayout;
