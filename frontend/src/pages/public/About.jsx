import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaHeart, FaRocket, FaStar, FaBuilding, FaHandshake, FaArrowRight, FaShield, FaChartLine } from 'react-icons/fa6';
import AOS from 'aos';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <Helmet>
        <title>About Us | EstateHub - Pakistan's Premier Real Estate Platform</title>
        <meta name="description" content="Learn about EstateHub's mission to redefine the real estate experience in Pakistan through transparency, innovation, and elite professional service." />
        <link rel="canonical" href="https://estatehub.site/about" />
      </Helmet>
      <style>{`
        .ab-hero {
          position: relative; padding: 120px 0 100px; text-align: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%);
          overflow: hidden;
        }
        .ab-hero::before {
          content: ''; position: absolute; top: -150px; left: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ab-hero::after {
          content: ''; position: absolute; bottom: -150px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .ab-section-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: #f0fdf4; color: #16a34a;
          border: 1px solid #bbf7d0; padding: 6px 16px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 24px;
        }

        .ab-value-card {
          background: #fff; border-radius: 24px; padding: 40px 30px;
          text-align: center; border: 1px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%; position: relative; overflow: hidden;
        }
        .ab-value-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: #bbf7d0;
        }

        .ab-icon-wrap {
          width: 72px; height: 72px; border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px; font-size: 1.8rem;
          transition: transform 0.3s ease;
        }
        .ab-value-card:hover .ab-icon-wrap { transform: scale(1.1) rotate(5deg); }

        .ab-stat-box {
          padding: 24px; background: #fff; border-radius: 20px;
          border: 1px solid #e5e7eb; text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .ab-btn-primary {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff !important; border: none; border-radius: 12px;
          padding: 14px 32px; font-weight: 700; font-size: 0.95rem;
          cursor: pointer; transition: all 0.3s; text-decoration: none;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow: 0 4px 14px rgba(22,163,74,0.3);
        }
        .ab-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); filter: brightness(1.05); }

        .ab-image-wrapper {
          position: relative; border-radius: 30px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }
        .ab-image-wrapper img {
          width: 100%; height: auto; display: block;
          transition: transform 0.7s ease;
        }
        .ab-image-wrapper:hover img { transform: scale(1.03); }
        
        .ab-floating-card {
          position: absolute; bottom: -30px; left: -30px;
          background: #fff; padding: 24px; border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
          border: 1px solid #e5e7eb; display: flex; align-items: center; gap: 16px;
          z-index: 2; animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 991px) {
          .ab-floating-card { left: 10px; bottom: 10px; padding: 16px; }
          .ab-hero { padding: 80px 0 60px; }
        }
      `}</style>

      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section className="ab-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ab-section-tag" data-aos="fade-down">
            <FaBuilding /> Our Story
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '20px', lineHeight: 1.1 }} data-aos="fade-down" data-aos-delay="100">
            Redefining the <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Real Estate</span> Experience
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.15rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.8 }} data-aos="fade-up" data-aos-delay="200">
            EstateHub is Pakistan's premier platform for luxury properties, seamless transactions, and trusted agent networking. We don't just sell houses; we deliver dreams.
          </p>
        </div>
      </section>

      {/* ══════════════════ MISSION / VISION SECTION ══════════════════ */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="row align-items-center g-5">
            
            <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-right">
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>
                A Vision Built on <span style={{ color: '#16a34a' }}>Trust & Innovation</span>
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
                Founded in 2026, EstateHub emerged from a simple idea: to make real estate transactions transparent, secure, and effortless. Today, we are a leading marketplace connecting millions of buyers, sellers, and elite agents.
              </p>
              <p style={{ color: '#6b7280', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '40px' }}>
                By integrating cutting-edge AI search, automated payment flows, and rigorous verification processes, we ensure that every property listed is a property you can trust.
              </p>
              
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="ab-stat-box">
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#16a34a', marginBottom: '4px' }}>15k+</h3>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Properties Sold</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="ab-stat-box">
                    <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2563eb', marginBottom: '4px' }}>99%</h3>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left">
              <div style={{ position: 'relative', padding: '0 0 30px 30px' }}>
                <div className="ab-image-wrapper">
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Luxury Home" />
                </div>
                <div className="ab-floating-card">
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                    <FaShield />
                  </div>
                  <div>
                    <h5 style={{ color: '#0f172a', fontWeight: 800, margin: '0 0 4px', fontSize: '1.1rem' }}>100% Verified</h5>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem' }}>Secure Listings</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ CORE VALUES ══════════════════ */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }} data-aos="fade-up">
            <span className="ab-section-tag"><FaStar /> The EstateHub Way</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Our Core Values</h2>
          </div>

          <div className="row g-4">
            {[
              { icon: <FaHandshake />, title: 'Transparency', desc: 'No hidden fees, no fake listings. We believe in 100% honest and open communication in every transaction.', color: '#16a34a', bg: '#f0fdf4' },
              { icon: <FaRocket />,    title: 'Innovation',   desc: 'We constantly evolve our platform using cutting-edge AI and data analytics to serve you faster and better.', color: '#2563eb', bg: '#eff6ff' },
              { icon: <FaHeart />,     title: 'Client First', desc: 'Your dream home is our priority. Our elite concierge team is available 24/7 to guide you at every step.', color: '#db2777', bg: '#fdf2f8' },
              { icon: <FaChartLine />, title: 'Excellence',   desc: 'We don’t settle for average. From property photography to legal paperwork, we guarantee premium quality.', color: '#d97706', bg: '#fffbeb' },
            ].map((val, i) => (
              <div className="col-md-6 col-lg-3" key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="ab-value-card">
                  <div className="ab-icon-wrap" style={{ background: val.bg, color: val.color }}>
                    {val.icon}
                  </div>
                  <h4 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '12px', fontSize: '1.2rem' }}>{val.title}</h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA SECTION ══════════════════ */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div data-aos="zoom-in" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '30px', padding: '60px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15,23,42,0.2)'
          }}>
            {/* Dark theme CTA for contrast */}
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(22,163,74,0.2)', filter: 'blur(40px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(37,99,235,0.2)', filter: 'blur(40px)' }}></div>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '16px' }}>Ready to Find Your Dream Property?</h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
                Join thousands of satisfied clients who found their perfect home with EstateHub's premium network.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/properties" className="ab-btn-primary">
                  Browse Properties <FaArrowRight />
                </Link>
                <Link to="/agents" style={{
                  background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px', padding: '14px 32px', fontWeight: 700, fontSize: '0.95rem',
                  textDecoration: 'none', transition: 'all 0.3s'
                }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                   onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}>
                  Meet Our Agents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
