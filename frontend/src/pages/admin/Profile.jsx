import React, { useEffect } from 'react';
import { FaIdCardClip, FaShieldHalved } from 'react-icons/fa6';
import AOS from 'aos';

const Profile = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Mock User Data
  const user = {
    username: 'Admin',
    role: 'Admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=198754&color=fff'
  };

  return (
    <div className="admin-profile">
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Identity Profile</h2>
          <p className="text-muted small mb-0">Manage your administrative credentials and digital presence.</p>
        </div>
      </div>

      <div className="row g-5 mb-5">
        <div className="col-lg-4 text-center" data-aos="fade-right">
          <div className="card border-0 shadow-sm rounded-5 bg-white p-5">
            <div className="card-body p-0">
              <div className="position-relative d-inline-block mx-auto mb-4">
                <img src={user.avatar} className="rounded-circle border border-4 border-light shadow-lg" width="180" height="180" style={{ objectFit: 'cover' }} alt="Profile" />
                <span className="position-absolute bottom-0 end-0 p-3 bg-success border border-white border-4 rounded-circle shadow-sm" style={{ width: '25px', height: '25px' }}></span>
              </div>
              <h3 className="fw-bold text-dark mb-1">{user.username}</h3>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-4 py-2 fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{user.role} OPERATOR</span>
            </div>
          </div>
        </div>
        
        <div className="col-lg-8" data-aos="fade-left">
          <div className="card border-0 shadow-sm rounded-5 overflow-hidden bg-white">
            <div className="card-header bg-white p-4 px-5 border-bottom">
              <h5 className="fw-bold mb-0 text-dark"><FaIdCardClip className="me-2 text-primary" /> Account Intelligence</h5>
            </div>
            <div className="card-body p-5 bg-light bg-opacity-50 text-start">
              <form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Global Username</label>
                    <input type="text" className="form-control border-0 shadow-sm p-3 rounded-3" defaultValue={user.username} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Identity Avatar</label>
                    <input type="file" className="form-control border-0 shadow-sm p-3 rounded-3" />
                  </div>
                  
                  <div className="col-12 mt-5 pt-5 border-top">
                    <div className="d-flex align-items-center mb-4">
                      <div className="bg-warning-subtle text-warning p-2 rounded-3 me-3"><FaShieldHalved size={24} /></div>
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">Security Protocol</h6>
                        <p className="text-muted small mb-0">Modify your authentication passphrase.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">New Passphrase</label>
                    <input type="password" name="new_password" className="form-control border-0 shadow-sm p-3 rounded-3" placeholder="Leave blank to maintain current" />
                  </div>
                </div>
                <div className="mt-5 text-end">
                  <button type="button" className="btn btn-primary rounded-pill px-5 py-3 shadow-lg fw-bold transition-all">Commit Identity Updates</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
