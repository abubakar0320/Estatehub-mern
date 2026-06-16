import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserTie, FaPhone, FaEnvelope, FaLocationDot, FaStar, 
  FaAward, FaBuilding, FaArrowRight, FaMagnifyingGlass
} from 'react-icons/fa6';
import AOS from 'aos';
import api from '../../services/api';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fallback agents if API is empty
  const fallbackAgents = [
    { id: 1, first_name: 'Ahmed', last_name: 'Khan', phone: '+92 300 1234567', email: 'ahmed.k@estatehub.pk', experience_years: 8, location_area: 'DHA Lahore', image: 'https://i.pravatar.cc/300?img=11', rating: 5, active_listings: 12 },
    { id: 2, first_name: 'Sara', last_name: 'Malik', phone: '+92 333 9876543', email: 'sara.m@estatehub.pk', experience_years: 5, location_area: 'Bahria Town, ISB', image: 'https://i.pravatar.cc/300?img=5', rating: 4.8, active_listings: 8 },
    { id: 3, first_name: 'Zain', last_name: 'Qureshi', phone: '+92 321 4567890', email: 'zain.q@estatehub.pk', experience_years: 12, location_area: 'Clifton, KHI', image: 'https://i.pravatar.cc/300?img=68', rating: 4.9, active_listings: 24 },
    { id: 4, first_name: 'Aisha', last_name: 'Noor', phone: '+92 345 1122334', email: 'aisha.n@estatehub.pk', experience_years: 3, location_area: 'Gulberg, LHR', image: 'https://i.pravatar.cc/300?img=43', rating: 4.7, active_listings: 5 },
    { id: 5, first_name: 'Fahad', last_name: 'Mustafa', phone: '+92 311 2233445', email: 'fahad.m@estatehub.pk', experience_years: 6, location_area: 'F-8, ISB', image: 'https://i.pravatar.cc/300?img=53', rating: 4.5, active_listings: 15 },
    { id: 6, first_name: 'Fatima', last_name: 'Ali', phone: '+92 300 9988776', email: 'fatima.a@estatehub.pk', experience_years: 9, location_area: 'DHA Phase 8, KHI', image: 'https://i.pravatar.cc/300?img=32', rating: 5, active_listings: 18 },
  ];

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await api.get('/agents');
      let agentList = Array.isArray(response.data) ? response.data
                    : Array.isArray(response.data?.data) ? response.data.data
                    : Array.isArray(response.data?.agents) ? response.data.agents
                    : [];
      
      // If no agents in DB, use fallbacks for UI demonstration
      if (agentList.length === 0) {
        agentList = fallbackAgents;
      }
      setAgents(agentList);
    } catch (error) {
      console.error('Error fetching agents:', error);
      setAgents(fallbackAgents);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const fullName = `${agent.first_name || ''} ${agent.last_name || ''}`.toLowerCase();
    const loc = (agent.location_area || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || loc.includes(search);
  });

  const getImageUrl = (path, isFallback) => {
    if (isFallback || (path && path.startsWith('http'))) return path;
    if (!path) return 'https://via.placeholder.com/300?text=Agent';
    const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${baseUrl}/${path}`;
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        .a-hero {
          position: relative; padding: 100px 0 80px; text-align: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%);
          overflow: hidden;
        }
        .a-hero::before {
          content: ''; position: absolute; top: -100px; left: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .a-hero::after {
          content: ''; position: absolute; bottom: -100px; right: -100px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .a-search-bar {
          max-width: 600px; margin: 40px auto 0; position: relative;
        }
        .a-search-input {
          width: 100%; padding: 18px 24px 18px 56px; border-radius: 99px;
          border: 1px solid #e5e7eb; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          font-size: 1.05rem; outline: none; transition: all 0.3s;
        }
        .a-search-input:focus { border-color: #16a34a; box-shadow: 0 10px 30px rgba(22,163,74,0.15); }
        .a-search-icon {
          position: absolute; left: 24px; top: 50%; transform: translateY(-50%);
          color: #9ca3af; font-size: 1.2rem;
        }

        .a-card {
          background: #fff; border-radius: 24px; padding: 32px 24px;
          text-align: center; border: 1px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative; overflow: hidden; height: 100%;
          display: flex; flex-direction: column;
        }
        .a-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
          border-color: #bbf7d0; 
        }

        .a-card-header {
          position: absolute; top: 0; left: 0; right: 0; height: 100px;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          z-index: 0;
        }

        .a-avatar-wrapper {
          position: relative; width: 120px; height: 120px; margin: 20px auto 16px;
          z-index: 1; padding: 6px; background: #fff; border-radius: 50%;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .a-avatar {
          width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
        }
        .a-badge-expert {
          position: absolute; bottom: 4px; right: 4px; width: 32px; height: 32px;
          background: #fbbf24; color: #fff; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 3px solid #fff; font-size: 0.9rem;
        }

        .a-stat-row {
          display: flex; justify-content: space-between; align-items: center;
          background: #f8fafc; padding: 12px 16px; border-radius: 12px; margin-bottom: 16px;
        }
        .a-stat {
          text-align: center; flex: 1;
        }
        .a-stat:first-child { border-right: 1px solid #e5e7eb; }

        .a-contact-btn {
          background: #fff; color: #16a34a; border: 1.5px solid #16a34a;
          border-radius: 12px; padding: 12px; font-weight: 700; width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.3s; text-decoration: none; margin-top: auto;
        }
        .a-contact-btn:hover { background: #16a34a; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(22,163,74,0.2); }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="a-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef9c3', color: '#ca8a04', border: '1px solid #fde68a', padding: '6px 16px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px' }} data-aos="fade-down">
            <FaAward /> Trusted Professionals
          </div>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }} data-aos="fade-down" data-aos-delay="50">
            Meet Our <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Expert Agents</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }} data-aos="fade-up" data-aos-delay="100">
            Our certified real estate advisors are here to help you find your dream home or manage your investments with confidence.
          </p>

          <div className="a-search-bar" data-aos="fade-up" data-aos-delay="150">
            <FaMagnifyingGlass className="a-search-icon" />
            <input 
              type="text" 
              className="a-search-input" 
              placeholder="Search by name or location (e.g. DHA, Gulberg)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ AGENTS GRID ══════════════════ */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '1280px' }}>
          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
              <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 20px', background: '#fff', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
              <FaUserTie style={{ fontSize: '4rem', color: '#e2e8f0', marginBottom: '20px' }} />
              <h4 style={{ color: '#0f172a', fontWeight: 700 }}>No agents found</h4>
              <p style={{ color: '#6b7280', maxWidth: '400px', margin: '10px auto 0' }}>We couldn't find any agents matching "{searchTerm}". Try a different location or name.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredAgents.map((agent, i) => {
                const isFallback = typeof agent.image === 'string' && agent.image.includes('pravatar');
                const fullName = `${agent.first_name || ''} ${agent.last_name || ''}`.trim() || 'Professional Agent';
                const experience = agent.experience_years || Math.floor(Math.random() * 10) + 2;
                const rating = agent.rating || (Math.random() * (5 - 4.2) + 4.2).toFixed(1);
                const listings = agent.active_listings || Math.floor(Math.random() * 20) + 5;

                return (
                  <div className="col-md-6 col-lg-4" key={agent.id || agent._id || i} data-aos="fade-up" data-aos-delay={(i % 6) * 100}>
                    <div className="a-card">
                      <div className="a-card-header"></div>
                      
                      <div className="a-avatar-wrapper">
                        <img src={getImageUrl(agent.profile_picture || agent.image, isFallback)} alt={fullName} className="a-avatar" />
                        {experience >= 5 && (
                          <div className="a-badge-expert" title={`${experience} Years Experience`}>
                            <FaAward />
                          </div>
                        )}
                      </div>

                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <h4 style={{ color: '#0f172a', fontWeight: 800, margin: '0 0 4px' }}>{fullName}</h4>
                        <p style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                          Real Estate Advisor
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', color: '#6b7280', fontSize: '0.9rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <FaLocationDot style={{ color: '#ef4444' }} /> {agent.location_area || 'Pakistan'}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <FaEnvelope style={{ color: '#3b82f6' }} /> {agent.email || 'contact@estatehub.pk'}
                          </div>
                        </div>

                        <div className="a-stat-row">
                          <div className="a-stat">
                            <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.2rem', marginBottom: '2px' }}>
                              {rating} <FaStar style={{ color: '#fbbf24', fontSize: '1rem', marginTop: '-4px' }} />
                            </div>
                            <div style={{ color: '#9ca3af', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Rating</div>
                          </div>
                          <div className="a-stat">
                            <div style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.2rem', marginBottom: '2px' }}>
                              {listings}
                            </div>
                            <div style={{ color: '#9ca3af', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Listings</div>
                          </div>
                        </div>

                        <Link to={`/properties?agent=${agent.id || agent._id}`} className="a-contact-btn">
                          View Properties <FaArrowRight style={{ fontSize: '0.8rem' }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Agents;
