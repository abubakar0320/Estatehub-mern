import React from 'react';
import { 
  FaBars, FaMagnifyingGlass, FaCircleUser, FaGear, FaPowerOff 
} from 'react-icons/fa6';

const AdminHeader = ({ title = "Admin Panel" }) => {
  // Placeholder user data
  const user = {
    username: "Admin",
    avatar: "https://ui-avatars.com/api/?name=Admin&background=198754&color=fff"
  };

  return (
    <header className="main-header shadow-sm">
      <div className="d-flex align-items-center">
        <button className="btn btn-light rounded-circle me-3 border" id="menu-toggle">
          <FaBars />
        </button>
        <h5 className="fw-bold mb-0 d-none d-md-block">{title}</h5>
      </div>
      
      <div className="d-flex align-items-center gap-3">
        {/* Search */}
        <form className="d-none d-lg-flex me-3">
          <div className="input-group">
            <input type="text" className="form-control form-control-sm border-end-0" placeholder="Search..." />
            <span className="input-group-text bg-white border-start-0 text-muted"><FaMagnifyingGlass /></span>
          </div>
        </form>
        
        <div className="dropdown">
          <div className="d-flex align-items-center gap-2 pointer" data-bs-toggle="dropdown" role="button">
            <img src={user.avatar} className="rounded-circle border" width="35" height="35" style={{ objectFit: 'cover' }} alt="Profile" />
            <span className="small fw-bold d-none d-sm-inline">{user.username}</span>
          </div>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
            <li><a className="dropdown-item" href="#"><FaCircleUser className="me-2" /> My Profile</a></li>
            <li><a className="dropdown-item" href="#"><FaGear className="me-2" /> Settings</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item text-danger border-0 bg-transparent w-100 text-start"><FaPowerOff className="me-2" /> Logout</button></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
