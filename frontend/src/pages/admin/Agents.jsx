import React, { useEffect, useState } from 'react';
import { 
  FaCirclePlus, FaShield, FaLocationDot, FaStar, 
  FaGear, FaUserPen, FaTrashCan, FaIdCardClip, FaChartLine,
  FaUpload, FaXmark
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const Agents = ({ viewOnly = false }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Modal & Details State
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    cell_no: '',
    cnic: '',
    operational_area: '',
    experience: 0,
    rating: 5.0,
    specialization: '',
    commission: 2.0,
    status: 'Available',
    bio: ''
  });
  const [agentImage, setAgentImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await api.get('/agents');
      // Ensure agents is always an array
      setAgents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      if (!viewOnly) addToast('Critical: Failed to synchronize with expert network', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Top Rated': return 'warning';
      case 'Available': return 'success';
      case 'Busy': return 'info';
      case 'Inactive': return 'danger';
      default: return 'primary';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const val = parseFloat(rating) || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={i <= Math.floor(val) ? 'text-warning' : 'text-muted'} />
      );
    }
    return stars;
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://ui-avatars.com/api/?name=Agent&background=random';
    if (typeof path === 'string' && path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  };

  const handleOpenModal = (agent = null) => {
    if (viewOnly) return;
    if (agent) {
      setEditMode(true);
      setSelectedAgent(agent);
      setFormData({
        full_name: agent.full_name || '',
        email: agent.email || '',
        cell_no: agent.cell_no || '',
        cnic: agent.cnic || '',
        operational_area: agent.operational_area || '',
        experience: agent.experience || 0,
        rating: agent.rating || 5.0,
        specialization: agent.specialization || '',
        commission: agent.commission || 2.0,
        status: agent.status || 'Available',
        bio: agent.bio || ''
      });
    } else {
      setEditMode(false);
      setSelectedAgent(null);
      setFormData({
        full_name: '',
        email: '',
        cell_no: '',
        cnic: '',
        operational_area: '',
        experience: 0,
        rating: 5.0,
        specialization: '',
        commission: 2.0,
        status: 'Available',
        bio: ''
      });
    }
    setAgentImage(null);
    setShowModal(true);
  };

  const handleOpenDetails = (agent) => {
    setSelectedAgent(agent);
    setShowDetails(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAgentImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (viewOnly) return;
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (agentImage) data.append('agent_image', agentImage);

    try {
      if (editMode) {
        await api.put(`/agents/${selectedAgent.id || selectedAgent._id}`, data);
        addToast('Expert identity synchronized successfully', 'success');
      } else {
        await api.post('/agents', data);
        addToast('New expert onboarded to the network', 'success');
      }
      setShowModal(false);
      fetchAgents();
    } catch (error) {
      console.error('Error saving agent:', error);
      addToast('Operation failed: Network protocol error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (viewOnly) return;
    if (window.confirm('Are you sure you want to purge this expert record? This action is irreversible.')) {
      try {
        await api.delete(`/agents/${id}`);
        addToast('Expert record purged from network', 'success');
        fetchAgents();
      } catch (error) {
        console.error('Error deleting agent:', error);
        addToast('Error: Failed to purge record', 'error');
      }
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
    <div className={`admin-agents ${viewOnly ? 'container py-5' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">{viewOnly ? 'Our Expert Network' : 'Expert Network'}</h2>
          <p className="text-muted small mb-0">Collaborate with our elite registered property specialists.</p>
        </div>
        {!viewOnly && (
          <button className="btn btn-primary rounded-pill px-4 shadow-lg fw-bold" onClick={() => handleOpenModal()}>
            <FaCirclePlus className="me-2" /> Onboard Expert
          </button>
        )}
      </div>

      <div className="row g-4 mb-5">
        {agents.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="p-5 bg-white rounded-5 shadow-sm">
              <FaIdCardClip size={60} className="text-light mb-3 opacity-25" />
              <h5 className="text-muted fw-bold">Network is currently disconnected.</h5>
              <p className="text-muted small">Register your first property expert to begin.</p>
            </div>
          </div>
        ) : (
          agents.map((agent) => {
            const color = getStatusColor(agent.status);
            return (
              <div className="col-md-6 col-xl-4" key={agent.id || agent._id} data-aos="fade-up">
                <div className="card border-0 shadow-sm rounded-5 overflow-hidden h-100 bg-white hover-shadow transition-all">
                  <div className="card-body p-4 d-flex flex-column text-center">
                    <div className="mb-4">
                      <div className="position-relative d-inline-block mx-auto mb-4">
                        <img src={getImageUrl(agent.profile_image)} className="rounded-circle border border-4 border-light shadow-sm" width="110" height="110" style={{ objectFit: 'cover' }} alt={agent.full_name} />
                        <span className={`position-absolute bottom-0 end-0 p-2 bg-${color} text-white border border-4 border-white rounded-circle shadow-sm d-flex align-items-center justify-content-center`} style={{ transform: 'translate(-5%, -50%)', width: '32px', height: '32px' }}>
                          <FaShield size={14} />
                        </span>
                      </div>
                      <h5 className="fw-bold mb-1 text-dark">{agent.full_name}</h5>
                      <div className="d-flex justify-content-center align-items-center gap-1 mb-3">
                        {renderStars(agent.rating)}
                        <span className="ms-2 text-muted fw-bold small" style={{ fontSize: '0.7rem' }}>({parseFloat(agent.rating || 0).toFixed(1)})</span>
                      </div>
                      <span className="badge bg-light text-primary rounded-pill px-3 py-2 fw-bold border" style={{ fontSize: '0.7rem' }}>
                        <FaLocationDot className="me-1" /> {agent.operational_area || 'Global'}
                      </span>
                    </div>

                    <div className="row g-2 mb-4 pb-4 border-bottom">
                      <div className="col-6 border-end">
                        <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: '0.55rem' }}>Experience</small>
                        <span className="fw-bold h5 mb-0 text-dark">{agent.experience || 0} Yrs</span>
                      </div>
                      <div className="col-6">
                        <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: '0.55rem' }}>Commission</small>
                        <span className="fw-bold h5 mb-0 text-dark">{agent.commission || 2}%</span>
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-auto">
                      <button className="btn btn-light rounded-pill flex-grow-1 border fw-bold small text-dark" onClick={() => handleOpenDetails(agent)}>Access Profile</button>
                      {!viewOnly && (
                        <div className="dropdown">
                          <button className="btn btn-dark rounded-circle shadow-sm border p-0 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }} data-bs-toggle="dropdown">
                            <FaGear />
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2">
                            <li><button className="dropdown-item py-2 rounded-3 text-dark" onClick={() => handleOpenModal(agent)}><FaUserPen className="me-2 text-warning" /> Modify Identity</button></li>
                            <li><hr className="dropdown-divider opacity-50" /></li>
                            <li><button className="dropdown-item py-2 rounded-3 text-danger" onClick={() => handleDelete(agent.id || agent._id)}><FaTrashCan className="me-2" /> Purge Record</button></li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Onboarding Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-5 overflow-hidden">
              <div className="modal-header bg-dark text-white p-4 border-0">
                <h5 className="modal-title fw-bold">
                  {editMode ? 'Modify Expert Identity' : 'Expert Onboarding Protocol'}
                </h5>
                <button type="button" className="btn-close btn-close-white shadow-none" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4 p-md-5 bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Legal Full Name</label>
                      <input type="text" name="full_name" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.full_name} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Corporate Email</label>
                      <input type="email" name="email" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Contact Hotline</label>
                      <input type="text" name="cell_no" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.cell_no} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Identity (CNIC)</label>
                      <input type="text" name="cnic" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.cnic} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Operational Domain</label>
                      <input type="text" name="operational_area" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.operational_area} onChange={handleInputChange} placeholder="e.g. DHA, Lahore" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Specialization</label>
                      <select name="specialization" className="form-select border-0 shadow-sm p-3 rounded-3" value={formData.specialization} onChange={handleInputChange}>
                        <option value="">Select Domain</option>
                        <option value="Residential">Residential Specialist</option>
                        <option value="Commercial">Commercial Expert</option>
                        <option value="Industrial">Industrial Assets</option>
                        <option value="Luxury">Luxury Portfolio</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-uppercase text-muted">Experience (Years)</label>
                      <input type="number" name="experience" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.experience} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-uppercase text-muted">System Rating</label>
                      <input type="number" step="0.1" max="5" name="rating" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.rating} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-uppercase text-muted">Service Commission (%)</label>
                      <input type="number" step="0.5" name="commission" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.commission} onChange={handleInputChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-uppercase text-muted">Professional Biography</label>
                      <textarea name="bio" className="form-control border-0 shadow-sm p-3 rounded-3" rows="3" value={formData.bio} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold text-uppercase text-muted">Identity Visualization (Profile Image)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-0 shadow-sm"><FaUpload /></span>
                        <input type="file" className="form-control border-0 shadow-sm p-3 rounded-3" onChange={handleFileChange} accept="image/*" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-end d-flex gap-2 justify-content-end">
                    <button type="button" className="btn btn-light rounded-pill px-4 fw-bold" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary rounded-pill px-5 fw-bold shadow-lg">
                      {editMode ? 'Synchronize Identity' : 'Execute Onboarding'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedAgent && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-5 overflow-hidden">
              <div className="modal-body p-5 text-center bg-white">
                <button type="button" className="btn-close position-absolute top-0 end-0 m-4 shadow-none" onClick={() => setShowDetails(false)}></button>
                <img src={getImageUrl(selectedAgent.profile_image)} className="rounded-circle border border-4 border-light shadow mb-4" width="140" height="140" style={{ objectFit: 'cover' }} alt={selectedAgent.full_name} />
                <h4 className="fw-bold text-dark mb-1">{selectedAgent.full_name}</h4>
                <div className="d-flex justify-content-center align-items-center gap-1 mb-3">
                  {renderStars(selectedAgent.rating)}
                </div>
                <div className="badge bg-primary-light text-primary rounded-pill px-3 py-2 mb-4 fw-bold">
                  {selectedAgent.specialization || 'Property Expert'}
                </div>
                <p className="text-muted mb-4 px-3">{selectedAgent.bio || 'Professional real estate specialist dedicated to client success.'}</p>
                <div className="row g-3 mb-4">
                  <div className="col-6 text-start ps-4">
                    <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: '0.6rem' }}>Hotline</small>
                    <span className="fw-bold text-dark">{selectedAgent.cell_no}</span>
                  </div>
                  <div className="col-6 text-start ps-4">
                    <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: '0.6rem' }}>Domain</small>
                    <span className="fw-bold text-dark">{selectedAgent.operational_area || 'Global'}</span>
                  </div>
                </div>
                <button className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow" onClick={() => setShowDetails(false)}>Close Profile</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agents;
