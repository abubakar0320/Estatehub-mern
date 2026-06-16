import React, { useEffect, useState } from 'react';
import { 
  FaCalendarPlus, FaMagnifyingGlass, FaHouse, FaUserTie, 
  FaCalendarDays, FaClock, FaEllipsis, FaEye, 
  FaPenToSquare, FaTrashCan, FaCalendarXmark 
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Pending': return 'bg-warning-subtle text-warning';
      case 'Confirmed': return 'bg-info-subtle text-info';
      case 'Deal Closed': return 'bg-success text-white';
      case 'Completed': return 'bg-primary-subtle text-primary';
      case 'Cancelled': return 'bg-danger-subtle text-danger';
      default: return 'bg-light text-dark';
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.booking_status === 'Pending').length,
    scheduled: bookings.filter(b => b.booking_status === 'Confirmed').length,
    conversions: bookings.filter(b => b.booking_status === 'Deal Closed').length
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="admin-bookings">
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Lead Orchestration</h2>
          <p className="text-muted small mb-0">Coordinate property tours and CRM workflow transitions.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 shadow-lg fw-bold">
          <FaCalendarPlus className="me-2" /> Initiate Booking
        </button>
      </div>

      {/* CRM KPI Row */}
      <div className="row g-4 mb-5" data-aos="fade-up">
        {[
          { label: 'Engagement Total', val: stats.total, color: 'primary' },
          { label: 'Inbound Requests', val: stats.pending, color: 'warning' },
          { label: 'Scheduled Tours', val: stats.scheduled, color: 'info' },
          { label: 'Conversions', val: stats.conversions, color: 'success' }
        ].map((kpi, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card border-0 shadow-sm rounded-4 bg-white border-start border-${kpi.color} border-5 h-100`}>
              <div className="card-body p-4">
                <small className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>{kpi.label}</small>
                <h3 className="fw-bold text-dark mb-0 mt-1">{kpi.val}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Intelligence Filters */}
      <div className="card border-0 shadow-sm rounded-4 bg-white mb-5" data-aos="fade-up">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><FaMagnifyingGlass className="text-muted" /></span>
                <input 
                  type="text" 
                  className="form-control border-0 bg-light" 
                  placeholder="Identify by lead name, asset or status..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select border-0 bg-light" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">Global Pipeline Status</option>
                <option value="Pending">Pending Approval</option>
                <option value="Confirmed">Scheduled</option>
                <option value="Deal Closed">Deal Closed</option>
              </select>
            </div>
            <div className="col-lg-2 ms-auto">
              <button className="btn btn-dark w-100 rounded-3 py-2 fw-bold shadow-sm" onClick={fetchBookings}>Filter Pipeline</button>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-5" data-aos="fade-up">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr className="bg-light">
                <th className="ps-4 border-0">Reference</th>
                <th className="border-0">Lead Identity</th>
                <th className="border-0">Asset & Agent</th>
                <th className="border-0">Timeline</th>
                <th className="border-0">Pipeline Stage</th>
                <th className="pe-4 text-end border-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="p-5 text-muted opacity-50">
                      <FaCalendarXmark size={60} className="mb-3" />
                      <h5 className="fw-bold">Pipeline is currently clear.</h5>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id || booking._id}>
                    <td className="ps-4">
                      <span className="fw-bold text-primary">#VIS-{(booking.id || booking._id).toString().slice(-4).toUpperCase()}</span>
                    </td>
                    <td>
                      <h6 className="fw-bold mb-0 text-dark">{booking.visitor_name}</h6>
                      <small className="text-muted">{booking.visitor_email}</small>
                    </td>
                    <td>
                      <div className="fw-bold small text-dark text-truncate" style={{ maxWidth: '180px' }}><FaHouse className="me-1 text-muted" />{booking.property_title || 'N/A'}</div>
                      <div className="small text-primary mt-1"><FaUserTie className="me-1" />{booking.agent_name || 'Unassigned'}</div>
                    </td>
                    <td>
                      <div className="fw-bold small text-dark"><FaCalendarDays className="me-1 text-muted" /> {booking.visit_date ? new Date(booking.visit_date).toLocaleDateString() : 'N/A'}</div>
                      <div className="small text-muted mt-1"><FaClock className="me-1" /> {booking.visit_time || 'N/A'}</div>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(booking.booking_status)} rounded-pill px-3 py-2 fw-bold`}>
                        {booking.booking_status}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <div className="dropdown">
                        <button className="btn btn-light btn-sm rounded-pill px-3 border shadow-sm" data-bs-toggle="dropdown">
                          <FaEllipsis />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2">
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaEye className="me-2 text-info" /> Pipeline Brief</button></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaPenToSquare className="me-2 text-warning" /> Advance Stage</button></li>
                          <li><hr className="dropdown-divider opacity-50" /></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-danger" onClick={() => handleDelete(booking.id || booking._id)}><FaTrashCan className="me-2" /> Remove Record</button></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
