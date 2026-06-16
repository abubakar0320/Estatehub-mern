import React, { useEffect, useState } from 'react';
import { 
  FaCirclePlus, FaMagnifyingGlass, FaTag, FaLocationDot, 
  FaBed, FaBath, FaRulerCombined, FaEllipsisVertical, 
  FaEye, FaPenToSquare, FaTrashCan, FaBuilding, FaUpload, FaKitchenSet, FaCheck
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  // Search & Filter State
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterType, setFilterType] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: 'Sale',
    status: 'Available',
    location_area: '',
    city: 'Lahore',
    category_id: '',
    bedrooms: 0,
    bathrooms: 0,
    kitchens: 0,
    area_size: '',
    area_unit: 'Sq Ft',
    description: '',
    agent_id: '',
    address: '',
    is_featured: false,
    features: '',
    amenities: ''
  });
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchProperties();
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    try {
      const [catRes, agentRes] = await Promise.all([
        api.get('/categories'),
        api.get('/agents')
      ]);
      setCategories(catRes.data);
      setAgents(agentRes.data);
    } catch (error) {
      console.error('Error fetching support data:', error);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterCity) params.append('city', filterCity);
      if (filterType) params.append('type', filterType);

      const response = await api.get(`/properties?${params.toString()}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      addToast('Critical: Failed to sync asset inventory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (prop = null) => {
    if (prop) {
      setEditMode(true);
      setSelectedProperty(prop);
      setFormData({
        title: prop.title || '',
        price: prop.price || '',
        type: prop.type || 'Sale',
        status: prop.status || 'Available',
        location_area: prop.location_area || '',
        city: prop.city || 'Lahore',
        category_id: prop.category_id?._id || prop.category_id || '',
        bedrooms: prop.bedrooms || 0,
        bathrooms: prop.bathrooms || 0,
        kitchens: prop.kitchens || 0,
        area_size: prop.area_size || '',
        area_unit: prop.area_unit || 'Sq Ft',
        description: prop.description || '',
        agent_id: prop.agent_id?._id || prop.agent_id || '',
        address: prop.address || '',
        is_featured: prop.is_featured || false,
        features: prop.features ? prop.features.join(',') : '',
        amenities: prop.amenities ? prop.amenities.join(',') : ''
      });
    } else {
      setEditMode(false);
      setSelectedProperty(null);
      setFormData({
        title: '',
        price: '',
        type: 'Sale',
        status: 'Available',
        location_area: '',
        city: 'Lahore',
        category_id: '',
        bedrooms: 0,
        bathrooms: 0,
        kitchens: 0,
        area_size: '',
        area_unit: 'Sq Ft',
        description: '',
        agent_id: '',
        address: '',
        is_featured: false,
        features: '',
        amenities: ''
      });
    }
    setMainImage(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (mainImage) data.append('property_image', mainImage);

    try {
      if (editMode) {
        await api.put(`/properties/${selectedProperty.id || selectedProperty._id}`, data);
        addToast('Asset identity synchronized successfully', 'success');
      } else {
        await api.post('/properties', data);
        addToast('Elite asset published to network', 'success');
      }
      setShowModal(false);
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      addToast('Operation failed: Network protocol error', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to purge this property listing from the network?')) {
      try {
        await api.delete(`/properties/${id}`);
        addToast('Asset record purged from network', 'success');
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        addToast('Error: Failed to purge record', 'error');
      }
    }
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/800x600?text=No+Image';
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Available': return 'bg-success-subtle text-success';
      case 'Occupied': return 'bg-info-subtle text-info';
      case 'Sold': return 'bg-danger-subtle text-danger';
      default: return 'bg-secondary-subtle text-secondary';
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
    <div className="admin-properties">
      <div className="d-flex justify-content-between align-items-center mb-5" data-aos="fade-down">
        <div>
          <h2 className="fw-bold mb-1 text-dark">Portfolio Inventory</h2>
          <p className="text-muted small mb-0">Unified management of all registered real estate assets.</p>
        </div>
        <button className="btn btn-primary rounded-pill px-4 shadow-lg fw-bold" onClick={() => handleOpenModal()}>
          <FaCirclePlus className="me-2" /> Publish Listing
        </button>
      </div>

      {/* Search & Filters */}
      <div className="card border-0 shadow-sm rounded-4 mb-5 bg-white overflow-hidden" data-aos="fade-up">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-lg-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><FaMagnifyingGlass className="text-muted" /></span>
                <input 
                  type="text" 
                  className="form-control border-0 bg-light fw-bold small" 
                  placeholder="Identify by title, area or code..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select border-0 bg-light fw-bold small" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
                <option value="">Global Location</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select border-0 bg-light fw-bold small" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">Contract Type</option>
                <option value="Rent">For Rent</option>
                <option value="Sale">For Sale</option>
              </select>
            </div>
            <div className="col-lg-2">
              <button className="btn btn-dark w-100 rounded-3 py-2 fw-bold" onClick={fetchProperties}>Sync Database</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-5">
        {properties.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="p-5 bg-white rounded-5 shadow-sm">
              <FaBuilding size={60} className="text-light mb-3 opacity-25" />
              <h5 className="text-muted fw-bold">Inventory is currently empty.</h5>
              <p className="text-muted small">No listings match your network filters.</p>
            </div>
          </div>
        ) : (
          properties.map((prop) => (
            <div className="col-md-6 col-xl-4" key={prop.id || prop._id} data-aos="fade-up">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-shadow transition-all">
                <div className="position-relative" style={{ height: '200px' }}>
                  <img src={getImageUrl(prop.main_image)} className="w-100 h-100 object-fit-cover" alt="Asset" />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-white text-dark rounded-pill px-3 py-2 shadow-sm fw-bold border" style={{ fontSize: '0.65rem' }}>
                      <FaTag className="text-primary me-1" /> {prop.type}
                    </span>
                  </div>
                  {prop.is_featured && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-warning text-dark rounded-pill px-3 py-2 shadow-sm fw-bold border" style={{ fontSize: '0.65rem' }}>
                        FEATURED
                      </span>
                    </div>
                  )}
                  <div className="position-absolute bottom-0 start-0 m-3">
                    <span className="badge bg-primary text-white rounded-pill px-3 py-2 shadow-sm" style={{ fontSize: '0.65rem' }}>
                      {prop.category_name || 'Asset'}
                    </span>
                  </div>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="fw-bold text-dark text-truncate mb-0" style={{ maxWidth: '75%' }}>{prop.title}</h6>
                    <span className={`badge ${getStatusBadgeClass(prop.status)} rounded-pill px-2 py-1`} style={{ fontSize: '0.55rem' }}>{prop.status}</span>
                  </div>
                  <p className="text-muted small mb-4 text-truncate"><FaLocationDot className="text-primary me-1" />{prop.location_area}, {prop.city}</p>
                  
                  <div className="d-flex gap-3 mb-4">
                    <div className="d-flex align-items-center gap-1">
                      <FaBed className="text-muted small" />
                      <span className="fw-bold text-dark small">{prop.bedrooms}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaBath className="text-muted small" />
                      <span className="fw-bold text-dark small">{prop.bathrooms}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <FaRulerCombined className="text-muted small" />
                      <span className="fw-bold text-dark small">{prop.area_size}</span>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.5rem' }}>Valuation</small>
                      <h6 className="text-primary fw-extrabold mb-0">Rs. {prop.price.toLocaleString()}</h6>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-light rounded-circle shadow-sm border p-0 d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" style={{ width: '32px', height: '32px' }}>
                        <FaEllipsisVertical className="small" />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 p-2">
                        <li><Link to={`/properties/${prop.id || prop._id}`} target="_blank" className="dropdown-item py-2 rounded-3 text-dark"><FaEye className="me-2 text-info" /> Public View</Link></li>
                        <li><button className="dropdown-item py-2 rounded-3 text-dark" onClick={() => handleOpenModal(prop)}><FaPenToSquare className="me-2 text-warning" /> Modify Identity</button></li>
                        <li><hr className="dropdown-divider opacity-50" /></li>
                        <li><button className="dropdown-item py-2 rounded-3 text-danger" onClick={() => handleDelete(prop.id || prop._id)}><FaTrashCan className="me-2" /> Purge Record</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Onboarding Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-5 overflow-hidden">
              <div className="modal-header bg-dark text-white p-4 border-0">
                <h5 className="modal-title fw-bold">
                  {editMode ? 'Modify Asset Record' : 'Asset Onboarding Protocol'}
                </h5>
                <button type="button" className="btn-close btn-close-white shadow-none" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4 p-md-5 bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    {/* Basic Intel */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Listing Title</label>
                      <input type="text" name="title" className="form-control border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-uppercase text-muted">Valuation (Rs)</label>
                      <input type="number" name="price" className="form-control border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.price} onChange={handleInputChange} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-uppercase text-muted">Asset Domain</label>
                      <select name="category_id" className="form-select border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.category_id} onChange={handleInputChange} required>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c._id || c.id} value={c._id || c.id}>{c.name}</option>)}
                      </select>
                    </div>

                    {/* Taxonomy */}
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-uppercase text-muted">Contract Type</label>
                      <select name="type" className="form-select border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.type} onChange={handleInputChange}>
                        <option value="Rent">For Rent</option>
                        <option value="Sale">For Sale</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-uppercase text-muted">Workflow Status</label>
                      <select name="status" className="form-select border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.status} onChange={handleInputChange}>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-uppercase text-muted">City Origin</label>
                      <select name="city" className="form-select border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.city} onChange={handleInputChange}>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Karachi">Karachi</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-uppercase text-muted">Assigned Specialist</label>
                      <select name="agent_id" className="form-select border-0 shadow-sm p-3 rounded-3 fw-bold" value={formData.agent_id} onChange={handleInputChange}>
                        <option value="">Select Agent</option>
                        {agents.map(a => <option key={a._id || a.id} value={a._id || a.id}>{a.full_name}</option>)}
                      </select>
                    </div>

                    {/* Physical Metrics */}
                    <div className="col-md-2">
                      <label className="form-label small fw-bold text-uppercase text-muted">Bedrooms</label>
                      <input type="number" name="bedrooms" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.bedrooms} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold text-uppercase text-muted">Bathrooms</label>
                      <input type="number" name="bathrooms" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.bathrooms} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold text-uppercase text-muted">Kitchens</label>
                      <input type="number" name="kitchens" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.kitchens} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold text-uppercase text-muted">Area Configuration</label>
                      <div className="input-group">
                        <input type="text" name="area_size" className="form-control border-0 shadow-sm p-3 rounded-start-3" value={formData.area_size} onChange={handleInputChange} placeholder="e.g. 10" />
                        <select name="area_unit" className="form-select border-0 shadow-sm p-3 rounded-end-3 bg-white" style={{ maxWidth: '100px' }} value={formData.area_unit} onChange={handleInputChange}>
                          <option value="Sq Ft">Sq Ft</option>
                          <option value="Marla">Marla</option>
                          <option value="Kanal">Kanal</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2 d-flex align-items-end pb-3">
                      <div className="form-check form-switch custom-switch">
                        <input className="form-check-input" type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleInputChange} id="featuredCheck" />
                        <label className="form-check-label small fw-bold text-uppercase text-muted ms-2" htmlFor="featuredCheck">Featured</label>
                      </div>
                    </div>

                    {/* Geolocation */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Location Area</label>
                      <input type="text" name="location_area" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.location_area} onChange={handleInputChange} placeholder="e.g. Phase 6, DHA" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Physical Address</label>
                      <input type="text" name="address" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.address} onChange={handleInputChange} />
                    </div>

                    {/* Detailed Data */}
                    <div className="col-12">
                      <label className="form-label small fw-bold text-uppercase text-muted">Professional Description</label>
                      <textarea name="description" className="form-control border-0 shadow-sm p-3 rounded-3" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Features (Comma Separated)</label>
                      <input type="text" name="features" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.features} onChange={handleInputChange} placeholder="e.g. Garden, Pool, AC" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-uppercase text-muted">Amenities (Comma Separated)</label>
                      <input type="text" name="amenities" className="form-control border-0 shadow-sm p-3 rounded-3" value={formData.amenities} onChange={handleInputChange} placeholder="e.g. Gym, Parking, Security" />
                    </div>

                    {/* Visualization */}
                    <div className="col-12">
                      <label className="form-label small fw-bold text-uppercase text-muted">Primary Visual Identity (Main Image)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white border-0 shadow-sm"><FaUpload /></span>
                        <input type="file" className="form-control border-0 shadow-sm p-3 rounded-3" onChange={(e) => setMainImage(e.target.files[0])} accept="image/*" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-end d-flex gap-2 justify-content-end">
                    <button type="button" className="btn btn-light rounded-pill px-4 fw-bold shadow-sm" onClick={() => setShowModal(false)}>Cancel Protocol</button>
                    <button type="submit" className="btn btn-primary rounded-pill px-5 fw-bold shadow-lg">
                      {editMode ? 'Synchronize Identity' : 'Execute Publishing'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
