import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaGauge, FaCircleUser, FaFileInvoice, FaHeadset, FaRightFromBracket, FaBuilding
} from 'react-icons/fa6';

const TenantSidebar = () => {
  const location = useLocation();
  const current_page = location.pathname;

  const isActive = (path) => current_page === path ? 'active' : '';

  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading">
        <span className="sidebar-logo text-white">
          <FaBuilding className="text-primary-light me-2" />Estate<span className="text-primary-light">Hub</span>
        </span>
      </div>
      <div className="list-group list-group-flush mt-3">
        <small className="text-uppercase text-muted px-4 mb-2" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px' }}>Resident Area</small>
        <Link to="/tenant" className={`list-group-item ${isActive('/tenant')}`}><FaGauge /> My Dashboard</Link>
        <Link to="/tenant/profile" className={`list-group-item ${isActive('/tenant/profile')}`}><FaCircleUser /> My Profile</Link>
        <Link to="/tenant/invoices" className={`list-group-item ${isActive('/tenant/invoices')}`}><FaFileInvoice /> Invoices</Link>
        <Link to="/tenant/support" className={`list-group-item ${isActive('/tenant/support')}`}><FaHeadset /> Support</Link>
        <hr className="text-secondary mx-3" />
        <button className="list-group-item text-danger border-0 bg-transparent w-100 text-start">
          <FaRightFromBracket /> Logout
        </button>
      </div>
    </div>
  );
};

export default TenantSidebar;
