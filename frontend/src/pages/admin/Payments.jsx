import React, { useEffect, useState } from 'react';
import { 
  FaFileExport, FaCirclePlus, FaSackDollar, FaHourglassStart, 
  FaMagnifyingGlass, FaFileInvoice, FaHouse, FaCreditCard, FaCalendarDays, 
  FaEllipsis, FaPrint, FaEye, FaPenToSquare, FaTrashCan, FaReceipt 
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterStatus) params.append('status', filterStatus);

      const response = await api.get(`/payments?${params.toString()}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Paid': return 'bg-success-subtle text-success';
      case 'Pending': return 'bg-warning-subtle text-warning';
      case 'Overdue': return 'bg-danger-subtle text-danger';
      case 'Partial': return 'bg-info-subtle text-info';
      default: return 'bg-secondary-subtle text-secondary';
    }
  };

  const totalRevenue = payments
    .filter(p => p.payment_status === 'Paid')
    .reduce((acc, curr) => acc + (curr.amount_paid || 0), 0);

  const outstandingValue = payments
    .filter(p => p.payment_status === 'Pending' || p.payment_status === 'Overdue')
    .reduce((acc, curr) => acc + (curr.amount_paid || 0), 0);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="admin-payments">
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Financial Ledger</h2>
          <p className="text-muted small mb-0">Unified tracking of revenue, settlements and certified receipts.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-white rounded-pill px-4 shadow-sm border fw-bold text-dark">
            <FaFileExport className="me-2 text-primary" /> Export Report
          </button>
          <button className="btn btn-primary rounded-pill px-4 shadow-lg fw-bold">
            <FaCirclePlus className="me-2" /> Generate Invoice
          </button>
        </div>
      </div>

      {/* Financial KPI Row */}
      <div className="row g-4 mb-5" data-aos="fade-up">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 bg-primary text-white h-100">
            <div className="card-body p-4">
              <div className="bg-white bg-opacity-20 p-2 rounded-3 d-inline-block mb-3">
                <FaSackDollar size={24} />
              </div>
              <small className="text-white-50 text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>Settled Revenue</small>
              <h3 className="fw-bold mb-0">Rs. {totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100 border-start border-warning border-4">
            <div className="card-body p-4">
              <div className="bg-warning-subtle text-warning p-2 rounded-3 d-inline-block mb-3">
                <FaHourglassStart size={24} />
              </div>
              <small className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>Outstanding Value</small>
              <h3 className="fw-bold text-dark mb-0">Rs. {outstandingValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-7">
                  <div className="input-group">
                    <span className="input-group-text bg-light border-0"><FaMagnifyingGlass className="text-muted" /></span>
                    <input 
                      type="text" 
                      className="form-control border-0 bg-light" 
                      placeholder="Search reference, resident or asset..." 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <select className="form-select border-0 bg-light" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="">Global Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
                <div className="col-12">
                  <button className="btn btn-dark w-100 rounded-3 py-2 fw-bold shadow-sm" onClick={fetchPayments}>Sync Intelligence</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-5" data-aos="fade-up">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr className="bg-light">
                <th className="ps-4 border-0">Reference #</th>
                <th className="border-0">Resident Detail</th>
                <th className="border-0">Financials</th>
                <th className="border-0">Billing Cycle</th>
                <th className="border-0">Workflow</th>
                <th className="pe-4 text-end border-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="p-5 text-muted opacity-50">
                      <FaReceipt size={60} className="mb-3" />
                      <h5 className="fw-bold">No financial trail detected.</h5>
                    </div>
                  </td>
                </tr>
              ) : (
                payments.map((pay) => (
                  <tr key={pay.id || pay._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary-subtle text-primary p-2 rounded-3 me-3 border">
                          <FaFileInvoice />
                        </div>
                        <div>
                          <span className="fw-bold text-dark d-block">#{pay.invoice_number}</span>
                          <small className="text-muted" style={{ fontSize: '0.65rem' }}>UID: {pay.id || pay._id ? (pay.id || pay._id).toString().slice(-6).toUpperCase() : 'N/A'}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(pay.user_name || 'User')}&background=random&color=fff`} className="rounded-circle me-3 border border-2 border-white shadow-sm" width="38" height="38" alt={pay.user_name} />
                        <div>
                          <h6 className="fw-bold mb-0 text-dark">{pay.user_name || 'Deleted User'}</h6>
                          <small className="text-muted d-block text-truncate" style={{ maxWidth: '150px' }}><FaHouse className="me-1" />{pay.property_title || 'N/A'}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h6 className="fw-bold text-success mb-0">Rs. {pay.amount_paid?.toLocaleString() || 0}</h6>
                      <small className="text-muted" style={{ fontSize: '0.6rem' }}><FaCreditCard className="me-1" />{pay.payment_method || 'N/A'}</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark rounded-pill px-3 py-2 fw-bold border shadow-sm">
                        <FaCalendarDays className="me-1 text-primary" /> {pay.billing_month || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(pay.payment_status)} rounded-pill px-3 py-2 fw-bold`}>
                        {pay.payment_status}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <div className="dropdown">
                        <button className="btn btn-light btn-sm rounded-pill px-3 border shadow-sm" data-bs-toggle="dropdown">
                          <FaEllipsis />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2">
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaPrint className="me-2 text-primary" /> Official Receipt</button></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaEye className="me-2 text-info" /> Full Dossier</button></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-dark"><FaPenToSquare className="me-2 text-warning" /> Modify Status</button></li>
                          <li><hr className="dropdown-divider opacity-50" /></li>
                          <li><button className="dropdown-item py-2 rounded-3 text-danger"><FaTrashCan className="me-2" /> Delete Record</button></li>
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

export default Payments;
