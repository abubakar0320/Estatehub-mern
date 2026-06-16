import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaMagnifyingGlass, FaSliders, FaLocationDot, FaBed, FaBath, FaHeart,
  FaVectorSquare, FaCrown, FaBuilding, FaArrowUpRightFromSquare, FaFilter
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const Properties = () => {
  const [maxPrice, setMaxPrice] = useState(150000000);
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    type: '',
    category_id: '',
    bedrooms: '',
    bathrooms: ''
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    fetchCategories();
    fetchProperties();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      // Ensure we have an array
      const catList = Array.isArray(response.data) ? response.data
                    : Array.isArray(response.data?.data) ? response.data.data
                    : [];
      setCategories(catList);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchProperties = async (currentFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentFilters.city) params.append('city', currentFilters.city);
      if (currentFilters.type) params.append('type', currentFilters.type);
      if (currentFilters.category_id) params.append('category_id', currentFilters.category_id);
      if (currentFilters.search) params.append('search', currentFilters.search);
      if (currentFilters.bedrooms) params.append('bedrooms', currentFilters.bedrooms);
      if (currentFilters.bathrooms) params.append('bathrooms', currentFilters.bathrooms);
      params.append('maxPrice', maxPrice);

      const response = await api.get(`/properties?${params.toString()}`);
      
      // Safely extract properties array
      const propList = Array.isArray(response.data) ? response.data
                     : Array.isArray(response.data?.data) ? response.data.data
                     : Array.isArray(response.data?.properties) ? response.data.properties
                     : [];
      
      setProperties(propList);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    fetchProperties();
    setIsSidebarOpen(false); // Close sidebar on mobile after applying
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80';
    if (typeof path === 'string' && path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Helmet>
        <title>Browse Properties | EstateHub - Real Estate Inventory</title>
        <meta name="description" content="Explore our extensive inventory of luxury homes, apartments, and commercial spaces. Use our advanced filters to find the perfect property in Lahore, Karachi, Islamabad and more." />
        <meta name="keywords" content="Properties for sale Pakistan, Houses for rent, Real estate listings, EstateHub inventory" />
        <link rel="canonical" href="https://estatehub.site/properties" />
      </Helmet>
      <style>{`
        .p-btn-primary {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff !important; border: none; border-radius: 12px;
          padding: 12px 24px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; transition: all 0.3s; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }
        .p-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); filter: brightness(1.05); }

        .p-card {
          background: #fff; border-radius: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: all 0.35s ease; overflow: hidden; height: 100%;
          display: flex; flex-direction: column;
        }
        .p-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); border-color: #bbf7d0; }

        .p-search-input {
          width: 100%; padding: 12px 16px; border-radius: 10px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          color: #111827; font-size: 0.9rem; outline: none;
          transition: all 0.25s; box-sizing: border-box;
        }
        .p-search-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.1); background: #fff; }

        .p-prop-spec {
          text-align: center; padding: 10px 6px; background: #f8fafc;
          border-radius: 10px; border: 1px solid #e5e7eb; flex: 1;
        }

        .p-sidebar {
          background: #fff; border-radius: 24px; padding: 32px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;
          position: sticky; top: 100px;
        }

        .p-hero {
          position: relative; padding: 100px 0 80px; text-align: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%);
          overflow: hidden;
        }
        .p-hero::before {
          content: ''; position: absolute; top: -100px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .p-hero::after {
          content: ''; position: absolute; bottom: -100px; right: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Custom Range Slider */
        input[type=range].p-range {
          -webkit-appearance: none; width: 100%; background: transparent; margin: 10px 0;
        }
        input[type=range].p-range::-webkit-slider-runnable-track {
          width: 100%; height: 6px; cursor: pointer; background: #e5e7eb; border-radius: 10px;
        }
        input[type=range].p-range::-webkit-slider-thumb {
          height: 20px; width: 20px; border-radius: 50%; background: #16a34a;
          cursor: pointer; -webkit-appearance: none; margin-top: -7px;
          box-shadow: 0 2px 6px rgba(22,163,74,0.4); border: 2px solid #fff;
        }

        .mobile-filter-toggle { display: none; }
        
        @media (max-width: 991px) {
          .p-sidebar-wrapper {
            position: fixed; top: 0; left: -100%; width: 100%; height: 100vh;
            background: rgba(15, 23, 42, 0.6); z-index: 2000; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(4px);
            display: flex; align-items: center; justify-content: flex-start;
            visibility: hidden; opacity: 0;
          }
          .p-sidebar-wrapper.open { left: 0; visibility: visible; opacity: 1; }
          .p-sidebar {
            width: 85%; max-width: 320px; height: 100%; border-radius: 0;
            overflow-y: auto; padding: 30px 20px; position: relative; top: 0;
            box-shadow: 20px 0 50px rgba(0,0,0,0.2);
          }
          .mobile-filter-toggle { display: flex; }
          .p-hero h1 { font-size: 2.2rem !important; }
        }

        @media (max-width: 576px) {
          .p-card img { height: 200px !important; }
          .p-card h5 { font-size: 0.95rem !important; }
          .p-hero { padding: 80px 0 60px !important; }
        }
      `}</style>

      {/* ══════════════════ HEADER ══════════════════ */}
      <section className="p-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }} data-aos="fade-down">
            Explore <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Premium Listings</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }} data-aos="fade-up" data-aos-delay="100">
            Discover a curated selection of the finest real estate across Pakistan. Use the advanced filters to find your perfect match.
          </p>
        </div>
      </section>

      {/* Mobile Filter Toggle */}
      <div className="container mt-4 mobile-filter-toggle">
        <button 
          className="p-btn-primary w-100 shadow-lg" 
          onClick={() => setIsSidebarOpen(true)}
          style={{ padding: '16px', borderRadius: '15px' }}
        >
          <FaFilter /> Refine Your Search
        </button>
      </div>

      {/* ══════════════════ MAIN CONTENT ══════════════════ */}
      <section className="py-5">
        <div className="container" style={{ maxWidth: '1320px' }}>
          <div className="row g-4">
            
            {/* Sidebar (Filters) */}
            <div className={`col-lg-3 p-sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
              <div className="p-sidebar">
                {isSidebarOpen && (
                  <button 
                    className="btn-close position-absolute top-0 end-0 m-4 d-lg-none" 
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close"
                  ></button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', paddingBottom: '16px', borderBottom: '1.5px solid #f3f4f6' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                    <FaSliders />
                  </div>
                  <h5 style={{ fontWeight: 800, margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>Elite Search</h5>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
                  {/* Search */}
                  <div className="mb-4">
                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Keywords</label>
                    <div style={{ position: 'relative' }}>
                      <FaMagnifyingGlass style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                      <input 
                        type="text" name="search" className="p-search-input" 
                        placeholder="e.g. Modern Villa..." 
                        style={{ paddingLeft: '40px' }}
                        value={filters.search} onChange={handleFilterChange} 
                      />
                    </div>
                  </div>

                  {/* Bed & Bath */}
                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Bedrooms</label>
                      <select name="bedrooms" className="p-search-input" value={filters.bedrooms} onChange={handleFilterChange}>
                        <option value="">Any</option>
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}+</option>)}
                      </select>
                    </div>
                    <div className="col-6">
                      <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Bathrooms</label>
                      <select name="bathrooms" className="p-search-input" value={filters.bathrooms} onChange={handleFilterChange}>
                        <option value="">Any</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Category</label>
                    <select name="category_id" className="p-search-input" value={filters.category_id} onChange={handleFilterChange}>
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div className="mb-4">
                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>City</label>
                    <select name="city" className="p-search-input" value={filters.city} onChange={handleFilterChange}>
                      <option value="">All Regions</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                    </select>
                  </div>

                  {/* Type Toggle */}
                  <div className="mb-4">
                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Acquisition Type</label>
                    <div style={{ display: 'flex', background: '#f9fafb', border: '1.5px solid #e5e7eb', borderRadius: '10px', padding: '4px' }}>
                      {[
                        { val: '', label: 'Both' },
                        { val: 'Rent', label: 'Rent' },
                        { val: 'Sale', label: 'Sale' }
                      ].map(t => (
                        <button
                          key={t.label}
                          type="button"
                          style={{
                            flex: 1, padding: '8px', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600,
                            background: filters.type === t.val ? '#fff' : 'transparent',
                            color: filters.type === t.val ? '#16a34a' : '#6b7280',
                            boxShadow: filters.type === t.val ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                            transition: 'all 0.2s'
                          }}
                          onClick={() => handleFilterChange({ target: { name: 'type', value: t.val } })}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Slider */}
                  <div className="mb-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <label style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Max Budget</label>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#16a34a', background: '#f0fdf4', padding: '4px 10px', borderRadius: '6px' }}>
                        Rs. {(maxPrice/1000000).toFixed(1)}M
                      </span>
                    </div>
                    <input 
                      type="range" className="p-range" 
                      min="1000000" max="200000000" step="1000000" 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                  </div>

                  <button type="submit" className="p-btn-primary w-100" style={{ marginTop: '10px' }}>
                    <FaMagnifyingGlass /> Apply Filters
                  </button>
                </form>
              </div>
            </div>

            {/* Grid */}
            <div className="col-lg-9">
              {/* Results Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
                <h5 style={{ fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  Showing <span style={{ color: '#16a34a' }}>{properties.length}</span> Properties
                </h5>
              </div>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                  <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}></div>
                </div>
              ) : properties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '100px 20px', background: '#fff', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                  <FaBuilding style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '20px' }} />
                  <h4 style={{ color: '#0f172a', fontWeight: 700 }}>No properties found</h4>
                  <p style={{ color: '#6b7280', maxWidth: '400px', margin: '10px auto 0' }}>We couldn't find any properties matching your current filter criteria. Try adjusting your search.</p>
                  <button onClick={() => {
                    setFilters({ search: '', city: '', type: '', category_id: '', bedrooms: '', bathrooms: '' });
                    setMaxPrice(150000000);
                    setTimeout(applyFilters, 100);
                  }} className="p-btn-primary mt-4">Clear All Filters</button>
                </div>
              ) : (
                <div className="row g-4">
                  {properties.map((prop, i) => (
                    <div className="col-md-6 col-xl-4" key={prop.id || prop._id} data-aos="fade-up" data-aos-delay={(i % 12) * 50}>
                      <div className="p-card">
                        {/* Image Wrapper */}
                        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                          <img 
                            src={getImageUrl(prop.main_image || prop.image)} 
                            alt={prop.title || 'Property'} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                          />
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)', pointerEvents: 'none' }} />
                          
                          {/* Top Badges */}
                          <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ background: '#16a34a', color: '#fff', padding: '5px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                              FOR {(prop.type || 'SALE').toUpperCase()}
                            </span>
                            {(prop.price || 0) > 50000000 && (
                              <span style={{ background: '#fbbf24', color: '#78350f', padding: '5px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                                <FaCrown style={{ marginRight: '4px' }} />LUXURY
                              </span>
                            )}
                          </div>
                          
                          {/* Heart Button */}
                          <button style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                            onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}>
                            <FaHeart />
                          </button>

                          {/* Price */}
                          <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                              Rs. {(prop.price || 0).toLocaleString()}
                            </div>
                            <span style={{ background: 'rgba(255,255,255,0.9)', color: '#0f172a', padding: '4px 10px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                              {prop.category_name || 'Property'}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h5 style={{ color: '#0f172a', fontWeight: 700, margin: '0 0 8px', fontSize: '1.05rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {prop.title || 'Untitled Property'}
                          </h5>
                          <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FaLocationDot style={{ color: '#ef4444' }} />{prop.city || 'N/A'} {prop.location_area ? `- ${prop.location_area}` : ''}
                          </p>
                          
                          {/* Specs */}
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px', marginTop: 'auto' }}>
                            {[
                              { icon: <FaBed />, val: `${prop.bedrooms || 0} Bed` },
                              { icon: <FaBath />, val: `${prop.bathrooms || 1} Bath` },
                              { icon: <FaVectorSquare />, val: prop.area_size || 'N/A' },
                            ].map((spec, si) => (
                              <div key={si} className="p-prop-spec">
                                <div style={{ color: '#16a34a', marginBottom: '4px', fontSize: '0.9rem' }}>{spec.icon}</div>
                                <span style={{ color: '#4b5563', fontSize: '0.75rem', fontWeight: 700 }}>{spec.val}</span>
                              </div>
                            ))}
                          </div>

                          <Link to={`/properties/${prop.id || prop._id}`} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            width: '100%', padding: '12px', borderRadius: '12px',
                            background: '#f0fdf4', border: '1.5px solid #86efac',
                            color: '#16a34a', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', transition: 'all 0.25s'
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                            View Details <FaArrowUpRightFromSquare style={{ fontSize: '0.8rem' }} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
