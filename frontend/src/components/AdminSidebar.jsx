import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChartLine, FaBuildingUser, FaUserGroup, FaIdCardClip, 
  FaFileInvoiceDollar, FaCalendarCheck, FaGear, FaCircleUser, FaPowerOff, FaCube 
} from 'react-icons/fa6';

const AdminSidebar = () => {
  const location = useLocation();
  const current_page = location.pathname;

  const isActive = (path) => current_page === path ? 'active' : '';

  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading">
        <span className="sidebar-logo">
          <FaCube className="me-2" />Estate<span>Hub</span>
        </span>
      </div>
      
      <div className="list-group list-group-flush mt-3">
        <Link to="/admin" className={`list-group-item ${isActive('/admin')}`}>
          <FaChartLine /> Dashboard
        </Link>
        
        <Link to="/admin/properties" className={`list-group-item ${isActive('/admin/properties')}`}>
          <FaBuildingUser /> Properties
        </Link>
        <Link to="/admin/tenants" className={`list-group-item ${isActive('/admin/tenants')}`}>
          <FaUserGroup /> Tenants
        </Link>
        <Link to="/admin/agents" className={`list-group-item ${isActive('/admin/agents')}`}>
          <FaIdCardClip /> Agents
        </Link>
        
        <Link to="/admin/payments" className={`list-group-item ${isActive('/admin/payments')}`}>
          <FaFileInvoiceDollar /> Payments
        </Link>
        <Link to="/admin/bookings" className={`list-group-item ${isActive('/admin/bookings')}`}>
          <FaCalendarCheck /> Bookings
        </Link>

        <Link to="/admin/settings" className={`list-group-item ${isActive('/admin/settings')}`}>
          <FaGear /> Settings
        </Link>
        <Link to="/admin/profile" className={`list-group-item ${isActive('/admin/profile')}`}>
          <FaCircleUser /> Profile
        </Link>

        <div className="mt-4 border-top border-secondary pt-3 mx-3">
          <button className="list-group-item text-danger border-0 bg-transparent w-100 text-start">
            <FaPowerOff /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
