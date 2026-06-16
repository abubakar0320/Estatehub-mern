import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaArrowRight, FaMagnifyingGlass, FaLocationDot, FaBed, FaBath,
  FaVectorSquare, FaShield, FaRobot, FaFileInvoiceDollar, FaHeadset,
  FaBuilding, FaStar, FaCrown, FaPhone, FaChartLine, FaKey,
  FaHouseChimney, FaCity, FaHandshake, FaCircleCheck,
  FaArrowUpRightFromSquare, FaQuoteLeft, FaRocket
} from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';
import api from '../../services/api';

import 'swiper/css';
import 'swiper/css/pagination';

/* ─── Animated Counter ─── */
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const safeTarget = Number(target) || 0;
    if (safeTarget === 0) { setCount(0); return; }
    let startTime = null;
    let rafId;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * safeTarget));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => { if (rafId) cancelAnimationFrame(rafId); };
  }, [target, duration, start]);
  return count;
};

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [stats, setStats] = useState({ properties: 0, agents: 0, clients: 1250 });
  const [loading, setLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({ city: '', type: '' });

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
    fetchHomeData();
    let observer;
    if (statsRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
        { threshold: 0.3 }
      );
      observer.observe(statsRef.current);
    }
    return () => { if (observer) observer.disconnect(); };
  }, []);

  const fetchHomeData = async () => {
    try {
      const [propRes, agentRes] = await Promise.all([
        api.get('/properties'),
        api.get('/agents')
      ]);
      const propList = Array.isArray(propRes.data) ? propRes.data
        : Array.isArray(propRes.data?.data) ? propRes.data.data
        : Array.isArray(propRes.data?.properties) ? propRes.data.properties : [];
      const agentList = Array.isArray(agentRes.data) ? agentRes.data
        : Array.isArray(agentRes.data?.data) ? agentRes.data.data
        : Array.isArray(agentRes.data?.agents) ? agentRes.data.agents : [];
      let featured = propList.filter(p => p && p.is_featured).slice(0, 3);
      if (featured.length === 0) featured = propList.slice(0, 3);
      setFeaturedProperties(featured);
      setStats({ properties: propList.length, agents: agentList.length, clients: 1250 });
    } catch (err) {
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?${new URLSearchParams(searchParams).toString()}`);
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80';
    if (typeof path === 'string' && path.startsWith('http')) return path;
    const base = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
    return `${base}/${path}`;
  };

  const propCount   = useCounter(stats.properties || 120, 2000, statsVisible);
  const agentCount  = useCounter(stats.agents || 45,      2000, statsVisible);
  const clientCount = useCounter(1250, 2200, statsVisible);

  const testimonials = [
    { name: 'Sarah Malik',    role: 'Luxury Home Buyer',    location: 'DHA Phase 6, Lahore',    text: 'The property search engine is incredible. I found my dream home within days. The visit booking system made the entire process organized and stress-free.', stars: 5, img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Ahmed Khan',     role: 'Real Estate Investor', location: 'Bahria Town, Islamabad',  text: 'Managing multiple rentals has never been easier. The dashboard analytics provide clear insights into my ROI and property performance.', stars: 5, img: 'https://i.pravatar.cc/150?u=ahmed' },
    { name: 'Emily Thompson', role: 'International Tenant', location: 'Emaar Canyon Views',      text: 'Renting as an expat can be tough, but EstateHub made it transparent. The automated payment system and professional agent support were life-savers.', stars: 5, img: 'https://i.pravatar.cc/150?u=emily' },
    { name: 'Zain Ali',       role: 'Commercial Client',   location: 'Gulberg, Lahore',          text: 'The most reliable platform for verified listings. No fake ads, just premium properties and honest agents. Found a perfect office space.', stars: 5, img: 'https://i.pravatar.cc/150?u=zain' },
  ];

  const features = [
    { icon: <FaShield />,            title: 'Verified Listings',   desc: 'Every property is manually verified by our expert team before going live.',         color: '#16a34a', bg: '#f0fdf4' },
    { icon: <FaRobot />,             title: 'AI-Powered Search',   desc: 'Smart recommendations based on your preferences and browsing patterns.',            color: '#2563eb', bg: '#eff6ff' },
    { icon: <FaFileInvoiceDollar />, title: 'Transparent Billing', desc: 'Automated, secure payments with full transaction history at your fingertips.',      color: '#d97706', bg: '#fffbeb' },
    { icon: <FaHeadset />,           title: 'VIP Support',         desc: '24/7 dedicated concierge service for all your real estate inquiries.',               color: '#7c3aed', bg: '#f5f3ff' },
    { icon: <FaChartLine />,         title: 'Market Analytics',    desc: 'Real-time pricing trends and neighborhood data to help you invest wisely.',         color: '#db2777', bg: '#fdf2f8' },
    { icon: <FaHandshake />,         title: 'Expert Agents',       desc: 'Connect with certified professionals who know every corner of the market.',         color: '#059669', bg: '#ecfdf5' },
  ];

  const categories = [
    { icon: <FaHouseChimney />, label: 'Residential', count: '120+ Homes',   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    { icon: <FaBuilding />,     label: 'Commercial',  count: '48+ Offices',  color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { icon: <FaCity />,         label: 'Apartments',  count: '85+ Units',    color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
    { icon: <FaKey />,          label: 'For Rent',    count: '60+ Listings', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  ];

  return (
    <div style={{ background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <Helmet>
        <title>EstateHub | Luxury Real Estate & Properties in Pakistan</title>
        <meta name="description" content="Discover premium villas, apartments, and commercial properties in Pakistan. EstateHub connects you with verified listings and elite agents for a seamless real estate experience." />
        <meta name="keywords" content="Real Estate Pakistan, Luxury Villas Lahore, Apartments for sale, Rent Property Pakistan, EstateHub" />
        <link rel="canonical" href="https://estatehub.site/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://estatehub.site/" />
        <meta property="og:title" content="EstateHub | Luxury Real Estate & Properties in Pakistan" />
        <meta property="og:description" content="Discover premium villas, apartments, and commercial properties in Pakistan. EstateHub connects you with verified listings and elite agents." />
        <meta property="og:image" content="https://estatehub.site/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://estatehub.site/" />
        <meta property="twitter:title" content="EstateHub | Luxury Real Estate & Properties in Pakistan" />
        <meta property="twitter:description" content="Discover premium villas, apartments, and commercial properties in Pakistan." />
        <meta property="twitter:image" content="https://estatehub.site/og-image.jpg" />
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        @keyframes h-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes h-scroll { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(8px);opacity:0.4} }
        @keyframes h-shimmer { 0%{opacity:0.6} 50%{opacity:1} 100%{opacity:0.6} }

        .h-btn-primary {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff !important; border: none; border-radius: 12px;
          padding: 14px 32px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; transition: all 0.3s; text-decoration: none;
          display: inline-flex; align-items: center; gap: 9px; box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }
        .h-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(22,163,74,0.35); filter: brightness(1.05); }

        .h-btn-outline {
          background: #fff; color: #374151 !important;
          border: 1.5px solid #d1d5db; border-radius: 12px;
          padding: 14px 32px; font-weight: 600; font-size: 0.95rem;
          cursor: pointer; transition: all 0.3s; text-decoration: none;
          display: inline-flex; align-items: center; gap: 9px; box-shadow: 0 2px 6px rgba(0,0,0,0.06);
        }
        .h-btn-outline:hover { border-color: #16a34a; color: #16a34a !important; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }

        .h-section-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: #f0fdf4; color: #16a34a;
          border: 1px solid #bbf7d0; padding: 6px 16px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 14px;
        }
        .h-card {
          background: #fff; border-radius: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: all 0.35s ease; overflow: hidden;
        }
        .h-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); border-color: #bbf7d0; }

        .h-feature-card {
          background: #fff; border-radius: 18px; padding: 30px;
          border: 1px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .h-feature-card:hover { transform: translateY(-5px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); }

        .h-search-input {
          width: 100%; padding: 13px 16px; border-radius: 10px;
          background: #f9fafb; border: 1.5px solid #e5e7eb;
          color: #111827; font-size: 0.9rem; outline: none;
          transition: all 0.25s; font-family: 'Inter', sans-serif; box-sizing: border-box;
        }
        .h-search-input:focus { border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.1); background: #fff; }
        .h-search-input option { background: #fff; color: #111827; }

        .h-stat-card {
          text-align: center; padding: 28px 16px; background: #fff;
          border: 1px solid #e5e7eb; border-radius: 18px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s;
        }
        .h-stat-card:hover { border-color: #86efac; transform: translateY(-4px); box-shadow: 0 12px 28px rgba(22,163,74,0.12); }

        .h-testimonial-card {
          background: #fff; border: 1px solid #e5e7eb; border-radius: 20px;
          padding: 28px; height: 100%; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s;
        }
        .h-testimonial-card:hover { box-shadow: 0 12px 28px rgba(0,0,0,0.1); transform: translateY(-4px); }

        .h-prop-spec {
          text-align: center; padding: 10px 6px; background: #f8fafc;
          border-radius: 10px; border: 1px solid #e5e7eb;
        }
        .swiper-pagination-bullet { background: #d1d5db !important; opacity: 1 !important; }
        .swiper-pagination-bullet-active { background: #16a34a !important; }

        @media (max-width: 768px) {
          .h-hero-title { font-size: 2.2rem !important; line-height: 1.2 !important; }
          .h-hero-grid  { flex-direction: column !important; gap: 40px !important; }
          .h-section-h2 { font-size: 1.8rem !important; }
          .h-feature-card { padding: 20px !important; }
          .h-stat-card { padding: 20px 10px !important; }
          .h-stat-card div:nth-child(2) { font-size: 1.8rem !important; }
          section { padding: 60px 0 !important; }
          .h-hero-section { padding-top: 100px !important; padding-bottom: 50px !important; }
        }

        @media (max-width: 480px) {
          .h-hero-title { font-size: 1.8rem !important; }
          .h-btn-primary, .h-btn-outline { width: 100% !important; justify-content: center !important; }
          .h-search-input { font-size: 0.85rem !important; }
        }
      `}</style>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="h-hero-section" style={{
        position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center',
        padding: '130px 0 80px', overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%)'
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '40%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="h-hero-grid" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>

            {/* Left */}
            <div style={{ flex: '1 1 460px' }} data-aos="fade-right">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef9c3', color: '#ca8a04', border: '1px solid #fde68a', padding: '7px 18px', borderRadius: '99px', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px' }}>
                <FaCrown /> Elite Real Estate Platform
              </div>

              <h1 className="h-hero-title" style={{ fontSize: '3.0rem', fontWeight: 900, lineHeight: 1.1, color: '#0f172a', marginBottom: '20px' }}>
                Find Your Perfect<br />
                <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Dream Property
                </span>
              </h1>

              <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '500px', marginBottom: '32px' }}>
                Pakistan's most trusted real estate platform. Browse verified properties, connect with expert agents, and close deals with total confidence.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
                {['Verified Listings', 'No Hidden Fees', '24/7 Support'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <FaCircleCheck style={{ color: '#16a34a', fontSize: '0.9rem' }} />
                    <span style={{ color: '#374151', fontSize: '0.87rem', fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link to="/properties" className="h-btn-primary">Explore Properties <FaArrowRight /></Link>
                <Link to="/contact"    className="h-btn-outline"><FaPhone /> Contact Agent</Link>
              </div>

              {/* Mini floating stats */}
              <div style={{ display: 'flex', gap: '28px', marginTop: '48px', flexWrap: 'wrap' }}>
                {[
                  { val: '200+', label: 'Properties' },
                  { val: '50+',  label: 'Expert Agents' },
                  { val: '1k+',  label: 'Happy Clients' },
                ].map((s, i) => (
                  <div key={i} style={{ paddingLeft: i > 0 ? '28px' : 0, borderLeft: i > 0 ? '1.5px solid #e5e7eb' : 'none' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a' }}>{s.val}</div>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Search Card */}
            <div style={{ flex: '0 1 420px', width: '100%' }} data-aos="fade-left" data-aos-delay="150">
              <div style={{ background: '#fff', borderRadius: '24px', padding: '36px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaMagnifyingGlass style={{ color: '#16a34a', fontSize: '1rem' }} />
                  </div>
                  <div>
                    <h4 style={{ color: '#0f172a', fontWeight: 800, margin: 0, fontSize: '1.05rem' }}>Find Your Property</h4>
                    <p style={{ color: '#9ca3af', fontSize: '0.76rem', margin: 0 }}>Search across 200+ listings</p>
                  </div>
                </div>

                <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '7px' }}>
                      <FaLocationDot style={{ color: '#16a34a', marginRight: '5px' }} />City / Location
                    </label>
                    <select className="h-search-input" value={searchParams.city} onChange={e => setSearchParams({ ...searchParams, city: e.target.value })}>
                      <option value="">All Cities</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '7px' }}>Type</label>
                      <select className="h-search-input" value={searchParams.type} onChange={e => setSearchParams({ ...searchParams, type: e.target.value })}>
                        <option value="">Any Type</option>
                        <option value="Rent">For Rent</option>
                        <option value="Sale">For Sale</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '7px' }}>Budget</label>
                      <select className="h-search-input">
                        <option value="">Any Budget</option>
                        <option value="5M">Under 5M</option>
                        <option value="20M">Under 20M</option>
                        <option value="50M">50M+</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="h-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px', borderRadius: '10px' }}>
                    <FaMagnifyingGlass /> Search Properties
                  </button>
                </form>

                <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                  <p style={{ color: '#9ca3af', fontSize: '0.72rem', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Popular</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {['DHA Lahore', 'Bahria Town', 'Gulberg', 'F-7 Islamabad'].map(tag => (
                      <button key={tag} onClick={() => navigate(`/properties?city=${tag}`)} style={{
                        padding: '5px 12px', borderRadius: '7px', fontSize: '0.76rem', fontWeight: 600,
                        background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#6b7280',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                        onMouseEnter={e => { e.target.style.background = '#f0fdf4'; e.target.style.color = '#16a34a'; e.target.style.borderColor = '#86efac'; }}
                        onMouseLeave={e => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#6b7280'; e.target.style.borderColor = '#e5e7eb'; }}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section ref={statsRef} style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {[
              { val: propCount,   suffix: '+', label: 'Properties Listed',  icon: <FaBuilding />,  color: '#16a34a' },
              { val: agentCount,  suffix: '+', label: 'Expert Agents',      icon: <FaHandshake />, color: '#2563eb' },
              { val: clientCount, suffix: '+', label: 'Happy Clients',      icon: <FaStar />,      color: '#d97706' },
              { val: 100,         suffix: '%', label: 'Verified Listings',  icon: <FaShield />,    color: '#7c3aed' },
            ].map((stat, i) => (
              <div key={i} className="h-stat-card" data-aos="zoom-in" data-aos-delay={i * 80}>
                <div style={{ fontSize: '1.5rem', color: stat.color, marginBottom: '10px' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1, marginBottom: '6px' }}>{stat.val}{stat.suffix}</div>
                <div style={{ fontSize: '0.76rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CATEGORIES ══════════════════ */}
      <section style={{ padding: '90px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
            <span className="h-section-tag"><FaBuilding /> Browse By Category</span>
            <h2 className="h-section-h2" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              Explore <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Property Types</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {categories.map((cat, i) => (
              <Link to="/properties" key={i} data-aos="fade-up" data-aos-delay={i * 70}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '32px 20px', borderRadius: '18px', border: `1.5px solid ${cat.border}`, background: cat.bg, cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 16px 32px rgba(0,0,0,0.1)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', color: cat.color, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  {cat.icon}
                </div>
                <h5 style={{ color: '#0f172a', fontWeight: 700, margin: 0, fontSize: '1rem' }}>{cat.label}</h5>
                <span style={{ color: cat.color, fontSize: '0.8rem', fontWeight: 700 }}>{cat.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURED LISTINGS ══════════════════ */}
      <section style={{ padding: '90px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }} data-aos="fade-up">
            <div>
              <span className="h-section-tag"><FaCrown /> Elite Showcase</span>
              <h2 className="h-section-h2" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                Featured <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Listings</span>
              </h2>
            </div>
            <Link to="/properties" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#16a34a', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', border: '1.5px solid #86efac', padding: '10px 20px', borderRadius: '10px', background: '#f0fdf4', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              View All <FaArrowRight style={{ fontSize: '0.78rem' }} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="spinner-border text-success" role="status" />
            </div>
          ) : featuredProperties.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <FaBuilding style={{ fontSize: '3rem', color: '#d1d5db', display: 'block', margin: '0 auto 16px' }} />
              <p style={{ color: '#9ca3af' }}>No featured properties yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {featuredProperties.map((prop, i) => (
                <div key={prop.id || prop._id} className="h-card" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img src={getImageUrl(prop.main_image || prop.image)} alt={prop.title || 'Property'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                      <span style={{ background: '#16a34a', color: '#fff', padding: '5px 12px', borderRadius: '7px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        FOR {(prop.type || 'SALE').toUpperCase()}
                      </span>
                      {(prop.price || 0) > 50000000 && (
                        <span style={{ background: '#fbbf24', color: '#78350f', padding: '5px 12px', borderRadius: '7px', fontSize: '0.7rem', fontWeight: 800 }}>
                          <FaCrown style={{ marginRight: '4px' }} />LUXURY
                        </span>
                      )}
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff' }}>
                        Rs. {(prop.price || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <span style={{ color: '#16a34a', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{prop.category_name || 'Property'}</span>
                    <h5 style={{ color: '#0f172a', fontWeight: 700, margin: '7px 0 5px', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.title || 'Untitled'}</h5>
                    <p style={{ color: '#9ca3af', fontSize: '0.83rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FaLocationDot style={{ color: '#ef4444' }} />{prop.city || 'N/A'}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px', marginBottom: '16px' }}>
                      {[
                        { icon: <FaBed />,         val: `${prop.bedrooms || 0} Bed` },
                        { icon: <FaBath />,        val: `${prop.bathrooms || 2} Bath` },
                        { icon: <FaVectorSquare />, val: prop.area_size || 'N/A' },
                      ].map((s, si) => (
                        <div key={si} className="h-prop-spec">
                          <div style={{ color: '#16a34a', marginBottom: '3px', fontSize: '0.85rem' }}>{s.icon}</div>
                          <span style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 600 }}>{s.val}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={`/properties/${prop.id || prop._id}`} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                      width: '100%', padding: '11px', borderRadius: '10px',
                      background: '#f0fdf4', border: '1.5px solid #86efac',
                      color: '#16a34a', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', transition: 'all 0.25s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#dcfce7'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      View Details <FaArrowUpRightFromSquare style={{ fontSize: '0.76rem' }} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════ WHY CHOOSE US ══════════════════ */}
      <section style={{ padding: '90px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }} data-aos="fade-up">
            <span className="h-section-tag"><FaShield /> Why EstateHub</span>
            <h2 className="h-section-h2" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
              Defining <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Next-Gen</span> Real Estate
            </h2>
            <p style={{ color: '#6b7280', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
              We combine cutting-edge technology with deep market expertise for an unmatched property experience.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
            {features.map((feat, i) => (
              <div key={i} className="h-feature-card" data-aos="fade-up" data-aos-delay={i * 70}
                onMouseEnter={e => { e.currentTarget.style.borderColor = feat.color + '66'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', borderRadius: '0 18px 0 60px', background: feat.bg }} />
                <div style={{ width: '50px', height: '50px', borderRadius: '13px', background: feat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: feat.color, marginBottom: '16px' }}>
                  {feat.icon}
                </div>
                <h5 style={{ color: '#0f172a', fontWeight: 700, marginBottom: '8px', fontSize: '0.97rem' }}>{feat.title}</h5>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BANNER ══════════════════ */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div data-aos="zoom-in" style={{
            borderRadius: '28px', padding: '64px 48px', textAlign: 'center',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%)',
            border: '1.5px solid #e5e7eb', position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
          }}>
            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(22,163,74,0.08)', filter: 'blur(30px)' }} />
            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(124,58,237,0.06)', filter: 'blur(30px)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="h-section-tag"><FaRocket /> Limited Time</span>
              <h2 className="h-section-h2" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
                List Your Property <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>For Free Today</span>
              </h2>
              <p style={{ color: '#6b7280', maxWidth: '480px', margin: '0 auto 32px', lineHeight: 1.8 }}>
                Join 1,000+ property owners who trust EstateHub to maximize their real estate value.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <Link to="/register" className="h-btn-primary">Get Started Free <FaArrowRight /></Link>
                <Link to="/properties" className="h-btn-outline">Browse Listings</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section style={{ padding: '90px 0 100px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }} data-aos="fade-up">
            <span className="h-section-tag"><FaStar /> Client Stories</span>
            <h2 className="h-section-h2" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a' }}>
              What Our <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Members Say</span>
            </h2>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={22}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
            style={{ paddingBottom: '48px' }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} style={{ height: 'auto' }}>
                <div className="h-testimonial-card">
                  <div style={{ color: '#16a34a', fontSize: '1.3rem', marginBottom: '14px' }}><FaQuoteLeft /></div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '14px' }}>
                    {Array.from({ length: t.stars }).map((_, si) => <FaStar key={si} style={{ color: '#fbbf24', fontSize: '0.82rem' }} />)}
                  </div>
                  <p style={{ color: '#6b7280', lineHeight: 1.8, fontSize: '0.88rem', marginBottom: '20px' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                    <img src={t.img} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #86efac' }} />
                    <div>
                      <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.88rem' }}>{t.name}</div>
                      <div style={{ color: '#16a34a', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{t.role}</div>
                      <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>{t.location}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

    </div>
  );
};

export default Home;
