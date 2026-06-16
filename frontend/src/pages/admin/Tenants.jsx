import React, { useEffect, useState } from 'react';
import { 
  FaUserPlus, FaEllipsisVertical, FaEye, FaPenToSquare, 
  FaUserMinus, FaCalendarDays, FaUsersSlash 
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tenants');
      setTenants(response.data);
    } catch (error) {
      console.error('Error fetching residents:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://ui-avatars.com/api/?name=Resident&background=random';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Inactive': return 'danger';
      case 'Lease Expired': return 'warning';
      case 'Pending Renewal': return 'info';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="admin-tenants">
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Resident Directory</h2>
          <p className="text-muted small mb-0">Unified management of all registered residents and active leases.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold">
          <FaUserPlus className="me-2" /> Onboard Resident
        </button>
      </div>

      <div className="row g-4 mb-5">
        {tenants.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="p-5 bg-white rounded-5 shadow-sm">
              <FaUsersSlash size={60} className="text-light mb-3 opacity-25" />
              <h5 className="text-muted fw-bold">Directory is currently empty.</h5>
              <p className="text-muted small">Onboard your first resident to start tracking.</p>
            </div>
          </div>
        ) : (
          tenants.map((tenant) => {
            const color = getStatusColor(tenant.status);
            return (
              <div className="col-md-6 col-xl-4" key={tenant.id || tenant._id} data-aos="fade-up">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                          <img src={getImageUrl(tenant.profile_image)} className="rounded-circle border border-2 border-white shadow-sm" width="60" height="60" style={{ objectFit: 'cover' }} alt={tenant.user_name} />
                          <span className={`position-absolute bottom-0 end-0 p-1 bg-${color} border border-2 border-white rounded-circle shadow-sm`} style={{ width: '12px', height: '12px' }}></span>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0 text-dark">{tenant.user_name}</h6>
                          <small className="text-muted">ID: #{tenant.id ? tenant.id.toString().slice(-4).toUpperCase() : 'N/A'}</small>
                        </div>
                      </div>
                      <div className="dropdown">
                        <button className="btn btn-light btn-sm rounded-circle border shadow-sm p-0 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} data-bs-toggle="dropdown">
                          <FaEllipsisVertical className="small" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2">
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaEye className="me-2 text-info" /> View Profile</button></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaPenToSquare className="me-2 text-warning" /> Edit Details</button></li>
                          <li><hr className="dropdown-divider opacity-50" /></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-danger"><FaUserMinus className="me-2" /> Terminate Lease</button></li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-light rounded-3 p-3 mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.6rem' }}>Leased Asset</small>
                        <span className={`badge bg-${color}-subtle text-${color} rounded-pill px-2`} style={{ fontSize: '0.55rem' }}>{tenant.status}</span>
                      </div>
                      <h6 className="fw-bold text-dark text-truncate mb-0 small">{tenant.property_title || 'Unassigned'}</h6>
                    </div>

                    <div className="row g-2 mb-4">
                      <div className="col-6">
                        <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.55rem' }}>Lease Starts</small>
                        <span className="fw-bold text-dark small"><FaCalendarDays className="me-1 text-primary" /> {tenant.lease_start ? new Date(tenant.lease_start).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.55rem' }}>Monthly Rent</small>
                        <span className="fw-bold text-success small">Rs. {tenant.monthly_rent?.toLocaleString() || 0}</span>
                      </div>
                    </div>

                    <button className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold small">View Profile</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Tenants;
