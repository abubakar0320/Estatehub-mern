import React, { useEffect, useState } from 'react';
import { FaHouse, FaMoneyBillWave, FaCalendarDays, FaUserTie } from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const TenantDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tenantInfo, setTenantInfo] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchTenantDossier();
  }, []);

  const fetchTenantDossier = async () => {
    try {
      // In a real scenario, we'd fetch the specific tenant info for the logged-in user
      // For this restoration, we'll try to find the tenant record associated with the user
      const response = await api.get('/tenants');
      // For demo/restoration purposes, we take the first active one or mock if none
      setTenantInfo(response.data[0]);
    } catch (error) {
      console.error('Error fetching resident dossier:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }

  return (
    <div className="tenant-dashboard p-4">
      <h3 className="fw-bold mb-4">Resident Portal</h3>
      
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 className="fw-bold mb-4"><FaHouse className="text-primary me-2" /> Active Lease Identity</h5>
            {tenantInfo ? (
              <div className="row align-items-center">
                <div className="col-md-4 text-center">
                  <img src={tenantInfo.profile_image || 'https://i.pravatar.cc/150?u=tenant'} className="rounded-4 w-100 shadow-sm" alt="Asset" />
                </div>
                <div className="col-md-8">
                  <h4 className="fw-bold text-dark">{tenantInfo.property_title}</h4>
                  <p className="text-muted small">Managed by EstateHub Elite Network</p>
                  <div className="d-flex gap-4 mt-4">
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>Monthly Commitment</small>
                      <span className="fw-bold text-success">Rs. {tenantInfo.monthly_rent?.toLocaleString()}</span>
                    </div>
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>Next Settlement</small>
                      <span className="fw-bold text-dark">July 1, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">No active lease record detected.</div>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 bg-dark text-white p-4 h-100">
            <h5 className="fw-bold mb-4"><FaUserTie className="text-primary me-2" /> Support Liaison</h5>
            <div className="d-flex align-items-center mb-4">
              <div className="bg-white rounded-circle p-2 me-3">
                <FaUserTie className="text-dark" size={24} />
              </div>
              <div>
                <h6 className="fw-bold mb-0">System Concierge</h6>
                <small className="text-white-50">Available 24/7</small>
              </div>
            </div>
            <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold">Initiate Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
