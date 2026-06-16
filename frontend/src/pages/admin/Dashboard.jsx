import React, { useEffect, useState } from 'react';
import { 
  FaBuilding, FaUsers, FaMoneyBillWave, FaUserTie, 
  FaPlus, FaChartLine, FaArrowRight 
} from 'react-icons/fa6';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar, PolarArea } from 'react-chartjs-2';
import AOS from 'aos';
import api from '../../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    properties: [],
    tenants: [],
    payments: [],
    agents: [],
    bookings: [],
    activity: []
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [propRes, tenantRes, payRes, agentRes, bookRes, actRes] = await Promise.all([
        api.get('/properties'),
        api.get('/tenants'),
        api.get('/payments'),
        api.get('/agents'),
        api.get('/bookings'),
        api.get('/activity')
      ]);

      setData({
        properties: propRes.data,
        tenants: tenantRes.data,
        payments: payRes.data,
        agents: agentRes.data,
        bookings: bookRes.data,
        activity: actRes.data
      });
    } catch (error) {
      console.error('Dashboard Data Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Derived Intelligence
  const stats = {
    totalProperties: data.properties.length,
    totalTenants: data.tenants.length,
    totalRevenue: data.payments.filter(p => p.payment_status === 'Paid').reduce((acc, curr) => acc + (curr.amount_paid || 0), 0),
    totalAgents: data.agents.length
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue (Rs)',
      data: [350000, 420000, 380000, 500000, 480000, stats.totalRevenue], // Mocking trend but using real total for current month
      borderColor: '#198754',
      backgroundColor: 'rgba(25, 135, 84, 0.1)',
      fill: true,
      tension: 0.3,
      borderWidth: 3,
      pointRadius: 4
    }]
  };

  const propertyData = {
    labels: ['Available', 'Sold', 'Occupied'],
    datasets: [{
      data: [
        data.properties.filter(p => p.status === 'Available').length,
        data.properties.filter(p => p.status === 'Sold').length,
        data.properties.filter(p => p.status === 'Occupied').length
      ],
      backgroundColor: ['#198754', '#0dcaf0', '#fd7e14'],
      borderWidth: 0
    }]
  };

  const bookingData = {
    labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    datasets: [{
      label: 'Bookings',
      data: [
        data.bookings.filter(b => b.booking_status === 'Pending').length,
        data.bookings.filter(b => b.booking_status === 'Confirmed').length,
        data.bookings.filter(b => b.booking_status === 'Completed').length,
        data.bookings.filter(b => b.booking_status === 'Cancelled').length
      ],
      backgroundColor: '#0d6efd',
      borderRadius: 5
    }]
  };

  const tenantData = {
    labels: ['Active', 'Inactive', 'Expired'],
    datasets: [{
      data: [
        data.tenants.filter(t => t.status === 'Active').length,
        data.tenants.filter(t => t.status === 'Inactive').length,
        data.tenants.filter(t => t.status === 'Lease Expired').length
      ],
      backgroundColor: [
        'rgba(25, 135, 84, 0.7)',
        'rgba(220, 53, 69, 0.7)',
        'rgba(255, 193, 7, 0.7)'
      ]
    }]
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-down">
        <div>
          <h3 className="fw-bold mb-0">Dashboard Overview</h3>
          <p className="text-muted small mb-0">Real-time operational intelligence</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm px-3 rounded-pill shadow-sm">
            <FaPlus className="me-1" /> New Property
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4" data-aos="fade-up">
        {[
          { title: 'Properties', val: stats.totalProperties, icon: <FaBuilding />, color: 'primary', sub: 'Managed assets' },
          { title: 'Tenants', val: stats.totalTenants, icon: <FaUsers />, color: 'success', sub: 'Registered residents' },
          { title: 'Revenue', val: `Rs. ${(stats.totalRevenue / 1000).toFixed(1)}K`, icon: <FaMoneyBillWave />, color: 'warning', sub: 'Total collections' },
          { title: 'Agents', val: stats.totalAgents, icon: <FaUserTie />, color: 'info', sub: 'Partner network' }
        ].map((item, i) => (
          <div className="col-md-3" key={i}>
            <div className="card stat-card h-100 border-0 shadow-sm bg-white">
              <div className="d-flex align-items-center mb-2">
                <div className={`icon-box bg-${item.color} text-${item.color === 'warning' ? 'dark' : 'white'} mb-0 me-3`}>
                  {item.icon}
                </div>
                <h6 className="mb-0 text-dark fw-bold">{item.title}</h6>
              </div>
              <h2 className="mb-0 fw-bold text-dark">{item.val}</h2>
              <small className="text-muted">{item.sub}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8" data-aos="fade-right">
          <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
            <h6 className="fw-bold mb-4 text-dark">Monthly Revenue Trends</h6>
            <div style={{ height: '300px' }}>
              <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
        
        <div className="col-lg-4" data-aos="fade-left">
          <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
            <h6 className="fw-bold mb-4 text-dark">Property Distribution</h6>
            <div style={{ height: '300px' }}>
              <Doughnut data={propertyData} options={{ responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'bottom' } } }} />
            </div>
          </div>
        </div>

        <div className="col-lg-6" data-aos="fade-up">
          <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
            <h6 className="fw-bold mb-4 text-dark">Booking Overview</h6>
            <div style={{ height: '250px' }}>
              <Bar data={bookingData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>

        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
          <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
            <h6 className="fw-bold mb-4 text-dark">Tenant Lifecycle</h6>
            <div style={{ height: '250px' }}>
              <PolarArea data={tenantData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card border-0 shadow-sm rounded-3 mb-4 bg-white" data-aos="fade-up">
        <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0 text-dark">Recent Activity Logs</h6>
          <button className="btn btn-light btn-sm border" onClick={fetchAllData}>Sync Logs</button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light small text-uppercase">
                <tr>
                  <th className="ps-4">Action</th>
                  <th>User</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {data.activity.length === 0 ? (
                  <tr><td colSpan="3" className="text-center py-4 text-muted">No recent system activity recorded.</td></tr>
                ) : (
                  data.activity.map((act) => (
                    <tr key={act.id}>
                      <td className="ps-4 small fw-bold text-dark">{act.action}</td>
                      <td className="small text-muted">{act.user}</td>
                      <td className="small text-muted">{new Date(act.time).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
