import React, { useEffect } from 'react';
import { FaSliders } from 'react-icons/fa6';
import AOS from 'aos';

const Settings = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="admin-settings">
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Control Panel</h2>
          <p className="text-muted small mb-0">Manage global application intelligence and system preferences.</p>
        </div>
      </div>

      <div className="row g-5 mb-5">
        <div className="col-lg-8 mx-auto" data-aos="fade-up">
          <div className="card border-0 shadow-sm rounded-5 overflow-hidden bg-white">
            <div className="card-header bg-dark text-white p-4 px-5 border-0">
              <div className="d-flex align-items-center">
                <div className="bg-primary p-2 rounded-3 me-3">
                  <FaSliders size={24} />
                </div>
                <h5 className="fw-bold mb-0">Core Configuration</h5>
              </div>
            </div>
            <div className="card-body p-5 bg-light bg-opacity-50 text-start">
              <form>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Platform Identity</label>
                    <input type="text" className="form-control border-0 shadow-sm p-3 rounded-3" defaultValue="EstateHub" placeholder="e.g. EstateHub Pro" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Corporate Email</label>
                    <input type="email" className="form-control border-0 shadow-sm p-3 rounded-3" defaultValue="admin@estatehub.com" placeholder="admin@estatehub.com" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Connectivity Hotline</label>
                    <input type="text" className="form-control border-0 shadow-sm p-3 rounded-3" defaultValue="+92 300 1234567" placeholder="+92 300 0000000" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Financial Unit</label>
                    <input type="text" className="form-control border-0 shadow-sm p-3 rounded-3" defaultValue="PKR" placeholder="e.g. PKR" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Chronological Timezone</label>
                    <select className="form-select border-0 shadow-sm p-3 rounded-3">
                      <option value="Asia/Karachi">Asia/Karachi (GMT+5)</option>
                      <option value="UTC">Universal UTC</option>
                      <option value="Europe/London">Europe/London (BST)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small text-uppercase text-muted">Temporal Format</label>
                    <select className="form-select border-0 shadow-sm p-3 rounded-3">
                      <option value="Y-m-d">Standard (2026-05-30)</option>
                      <option value="d/m/Y">European (30/05/2026)</option>
                      <option value="M d, Y">Verbal (May 30, 2026)</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold small text-uppercase text-muted">Headquarters Address</label>
                    <textarea className="form-control border-0 shadow-sm p-3 rounded-3" rows="3" defaultValue="DHA Phase 6, Lahore, Pakistan"></textarea>
                  </div>
                </div>
                <div className="mt-5 text-end">
                  <button type="button" className="btn btn-primary rounded-pill px-5 py-3 shadow-lg fw-bold transition-all">Commit Configuration</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
