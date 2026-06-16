import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBuilding, FaArrowRight, FaBarsStaggered, FaGauge, FaRightFromBracket } from 'react-icons/fa6';

const Navbar = () => {
  const location = useLocation();
  const current_page = location.pathname;

  // Placeholder auth state
  const isLoggedIn = false;
  const isAdmin = false;

  const isActive = (path) => current_page === path ? 'text-primary active' : '';

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-3 p-2 me-2 shadow-sm">
            <FaBuilding />
          </div>
          <span className="fw-bold fs-4 text-dark">Estate<span className="text-primary">Hub</span></span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <FaBarsStaggered />
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/properties')}`} to="/properties">Properties</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/agents')}`} to="/agents">Agents</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/about')}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact')}`} to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/developer')}`} to="/developer">Developer</Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to={isAdmin ? '/admin' : '/user-dashboard'} className="text-dark fw-bold text-decoration-none small hover-primary">
                  <FaGauge className="me-1" /> Dashboard
                </Link>
                <button className="btn btn-outline-danger btn-sm rounded-pill px-4 fw-bold shadow-sm">
                  <FaRightFromBracket className="me-1" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary-custom shadow-sm px-4 fw-bold">
                Login <FaArrowRight className="ms-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
