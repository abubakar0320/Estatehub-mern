import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, 
  FaLocationDot, FaEnvelope, FaPhone, FaPaperPlane, FaHeart 
} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #e5e7eb', paddingTop: '80px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        .f-link {
          color: #6b7280; text-decoration: none; font-size: 0.95rem; font-weight: 500;
          transition: all 0.25s; display: inline-flex; align-items: center; gap: 6px;
        }
        .f-link:hover { color: #16a34a; transform: translateX(4px); }

        .f-social-btn {
          width: 42px; height: 42px; border-radius: 12px; background: #f8fafc;
          border: 1px solid #e5e7eb; color: #6b7280; display: flex;
          align-items: center; justify-content: center; text-decoration: none;
          transition: all 0.3s; font-size: 1.1rem;
        }
        .f-social-btn:hover {
          background: #16a34a; color: #fff; border-color: #16a34a;
          transform: translateY(-3px); box-shadow: 0 8px 16px rgba(22,163,74,0.2);
        }

        .f-heading { color: #0f172a; font-weight: 800; font-size: 1.1rem; margin-bottom: 24px; }

        .f-contact-item {
          display: flex; gap: 14px; margin-bottom: 16px;
          color: #6b7280; font-size: 0.95rem; line-height: 1.6;
        }
        .f-contact-icon {
          color: #16a34a; font-size: 1.1rem; margin-top: 4px; flex-shrink: 0;
        }

        .f-newsletter {
          display: flex; background: #f8fafc; border: 1.5px solid #e5e7eb;
          border-radius: 14px; padding: 6px; transition: all 0.3s;
        }
        .f-newsletter:focus-within {
          border-color: #16a34a; background: #fff; box-shadow: 0 0 0 4px rgba(22,163,74,0.1);
        }
        .f-news-input {
          flex: 1; border: none; background: transparent; padding: 8px 16px;
          color: #0f172a; font-size: 0.9rem; outline: none;
        }
        .f-news-btn {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff; border: none; border-radius: 10px; width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: all 0.2s; box-shadow: 0 4px 10px rgba(22,163,74,0.2);
        }
        .f-news-btn:hover { transform: scale(1.05); }

        .f-bottom {
          margin-top: 60px; padding: 24px 0; border-top: 1px solid #e5e7eb;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        
        @media (max-width: 768px) {
          .f-bottom { flex-direction: column; text-align: center; justify-content: center; }
        }
      `}</style>

      <div className="container" style={{ maxWidth: '1280px' }}>
        <div className="row g-5">
          
          {/* Brand Column */}
          <div className="col-lg-4 col-md-12">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', color: '#fff', padding: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(22,163,74,0.2)' }}>
                <FaBuilding size={22} />
              </div>
              <div>
                <h3 style={{ fontWeight: 900, color: '#0f172a', margin: 0, fontSize: '1.6rem', letterSpacing: '-0.5px' }}>EstateHub</h3>
                <span style={{ color: '#16a34a', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>Smart Real Estate</span>
              </div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '32px', maxWidth: '350px' }}>
              Pakistan's most trusted premium real estate platform. We connect buyers, sellers, and agents through innovative technology and unparalleled transparency.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" className="f-social-btn"><FaFacebookF /></a>
              <a href="#" className="f-social-btn"><FaInstagram /></a>
              <a href="#" className="f-social-btn"><FaTwitter /></a>
              <a href="#" className="f-social-btn"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="f-heading">Explore</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><Link to="/" className="f-link">Home</Link></li>
              <li><Link to="/properties" className="f-link">Properties</Link></li>
              <li><Link to="/agents" className="f-link">Elite Agents</Link></li>
              <li><Link to="/about" className="f-link">About Us</Link></li>
              <li><Link to="/contact" className="f-link">Contact Support</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="col-lg-2 col-md-4 col-6">
            <h5 className="f-heading">Services</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li><Link to="/properties" className="f-link">Buy a Property</Link></li>
              <li><Link to="/properties" className="f-link">Rent a Home</Link></li>
              <li><Link to="/login" className="f-link">Tenant Portal</Link></li>
              <li><Link to="/developer" className="f-link">API & Developer</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="col-lg-4 col-md-4">
            <h5 className="f-heading">Get in Touch</h5>
            
            <div className="f-contact-item">
              <FaLocationDot className="f-contact-icon" />
              <span>DHA Phase 6, Main Boulevard<br />Lahore, Pakistan</span>
            </div>
            
            <div className="f-contact-item">
              <FaPhone className="f-contact-icon" />
              <span>+92 300 1234567<br />+92 423 4567890</span>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h6 style={{ color: '#0f172a', fontWeight: 800, fontSize: '0.9rem', marginBottom: '16px' }}>Subscribe to Newsletter</h6>
              <div className="f-newsletter">
                <input type="email" placeholder="Enter your email address" className="f-news-input" />
                <button className="f-news-btn">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="f-bottom">
          <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500 }}>
            &copy; {new Date().getFullYear()} <span style={{ color: '#0f172a', fontWeight: 700 }}>EstateHub</span>. All Rights Reserved.
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            Designed & Developed with <FaHeart style={{ color: '#ef4444', fontSize: '0.9rem' }} /> by 
            <Link to="/developer" style={{ color: '#16a34a', fontWeight: 800, textDecoration: 'none', marginLeft: '2px' }}>Sumaira Ghazal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
