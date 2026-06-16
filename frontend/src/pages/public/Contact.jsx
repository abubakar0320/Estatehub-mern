import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  FaLocationDot, FaPhone, FaEnvelope, FaFacebookF, 
  FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaHeadset 
} from 'react-icons/fa6';
import AOS from 'aos';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style>{`
        .c-hero {
          position: relative; padding: 120px 0 100px; text-align: center;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%);
          overflow: hidden;
        }
        .c-hero::before {
          content: ''; position: absolute; top: -150px; left: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .c-hero::after {
          content: ''; position: absolute; bottom: -150px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .c-section-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: #f0fdf4; color: #16a34a;
          border: 1px solid #bbf7d0; padding: 6px 16px; border-radius: 99px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 24px;
        }

        .c-info-card {
          background: #fff; border-radius: 24px; padding: 32px 24px;
          border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.4s ease; display: flex; align-items: flex-start; gap: 20px;
          position: relative; overflow: hidden; margin-bottom: 20px;
        }
        .c-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: #bbf7d0;
        }
        .c-icon-wrap {
          width: 64px; height: 64px; border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; flex-shrink: 0; transition: transform 0.3s;
        }
        .c-info-card:hover .c-icon-wrap { transform: scale(1.1); }

        .c-form-wrapper {
          background: #fff; border-radius: 30px; padding: 50px 40px;
          border: 1px solid #e5e7eb; box-shadow: 0 20px 50px rgba(0,0,0,0.06);
          position: relative; overflow: hidden;
        }

        .c-input {
          width: 100%; padding: 16px 20px; border-radius: 14px;
          background: #f8fafc; border: 1.5px solid #e5e7eb;
          color: #0f172a; font-size: 0.95rem; outline: none;
          transition: all 0.3s; font-family: 'Inter', sans-serif;
        }
        .c-input:focus {
          border-color: #16a34a; background: #fff;
          box-shadow: 0 0 0 4px rgba(22,163,74,0.1);
        }
        .c-input.error { border-color: #ef4444; background: #fef2f2; }
        
        .c-label {
          display: block; color: #4b5563; font-size: 0.8rem;
          font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
          margin-bottom: 8px; margin-left: 4px;
        }

        .c-btn-submit {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff; border: none; border-radius: 14px;
          padding: 16px 32px; font-weight: 800; font-size: 1rem;
          cursor: pointer; transition: all 0.3s; width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 8px 20px rgba(22,163,74,0.3);
        }
        .c-btn-submit:hover {
          transform: translateY(-3px); box-shadow: 0 12px 28px rgba(22,163,74,0.4);
        }
        .c-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .c-social-btn {
          width: 50px; height: 50px; border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          background: #fff; color: #16a34a; border: 1.5px solid #e5e7eb;
          font-size: 1.2rem; transition: all 0.3s; text-decoration: none;
        }
        .c-social-btn:hover {
          background: #16a34a; color: #fff; border-color: #16a34a;
          transform: translateY(-4px); box-shadow: 0 10px 20px rgba(22,163,74,0.2);
        }

        .c-success-msg {
          background: #f0fdf4; border: 1.5px solid #86efac; color: #16a34a;
          padding: 16px; border-radius: 12px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 10px; font-weight: 600;
          animation: slideDown 0.4s ease;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .c-hero { padding: 80px 0 60px; }
          .c-form-wrapper { padding: 30px 24px; }
        }
      `}</style>

      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section className="c-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="c-section-tag" data-aos="fade-down">
            <FaHeadset /> 24/7 Support
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '20px', lineHeight: 1.1 }} data-aos="fade-down" data-aos-delay="50">
            Let's Start a <span style={{ background: 'linear-gradient(135deg, #16a34a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Conversation</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }} data-aos="fade-up" data-aos-delay="100">
            Whether you are looking to buy, sell, or rent, our team of experts is ready to assist you. Reach out to us today.
          </p>
        </div>
      </section>

      {/* ══════════════════ CONTACT CONTENT ══════════════════ */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="row g-5">
            
            {/* Left: Contact Info */}
            <div className="col-lg-5" data-aos="fade-right">
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '32px' }}>
                Get In Touch
              </h3>

              {[
                { icon: <FaLocationDot />, title: 'Headquarters', desc: '123 EstateHub Boulevard, DHA Phase 6, Lahore, Pakistan', bg: '#f0fdf4', color: '#16a34a' },
                { icon: <FaPhone />, title: 'Direct Line', desc: '+92 300 123 4567\n+92 423 456 7890', bg: '#eff6ff', color: '#2563eb' },
                { icon: <FaEnvelope />, title: 'Email Support', desc: 'hello@estatehub.pk\nsupport@estatehub.pk', bg: '#fdf2f8', color: '#db2777' }
              ].map((info, i) => (
                <div className="c-info-card" key={i}>
                  <div className="c-icon-wrap" style={{ background: info.bg, color: info.color }}>
                    {info.icon}
                  </div>
                  <div>
                    <h5 style={{ color: '#0f172a', fontWeight: 800, margin: '0 0 8px', fontSize: '1.1rem' }}>{info.title}</h5>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{info.desc}</p>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div style={{ marginTop: '48px' }}>
                <h6 style={{ color: '#0f172a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Follow Us</h6>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { icon: <FaFacebookF />, url: '#' },
                    { icon: <FaTwitter />, url: '#' },
                    { icon: <FaInstagram />, url: '#' },
                    { icon: <FaLinkedinIn />, url: '#' }
                  ].map((social, i) => (
                    <a href={social.url} className="c-social-btn" key={i}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="col-lg-7" data-aos="fade-left" data-aos-delay="100">
              <div className="c-form-wrapper">
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>Send Us A Message</h3>
                <p style={{ color: '#6b7280', marginBottom: '32px' }}>Fill out the form below and we'll get back to you within 24 hours.</p>

                {success && (
                  <div className="c-success-msg">
                    <FaPaperPlane /> Thank you! Your message has been sent successfully.
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="c-label">Full Name</label>
                      <input 
                        type="text" 
                        className={`c-input ${errors.name ? 'error' : ''}`}
                        placeholder="e.g. Ali Raza"
                        {...register("name", { required: true })}
                      />
                      {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>Name is required</span>}
                    </div>
                    
                    <div className="col-md-6">
                      <label className="c-label">Email Address</label>
                      <input 
                        type="email" 
                        className={`c-input ${errors.email ? 'error' : ''}`}
                        placeholder="e.g. ali@example.com"
                        {...register("email", { 
                          required: true,
                          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                      />
                      {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>Valid email is required</span>}
                    </div>

                    <div className="col-12">
                      <label className="c-label">Subject</label>
                      <input 
                        type="text" 
                        className={`c-input ${errors.subject ? 'error' : ''}`}
                        placeholder="How can we help you?"
                        {...register("subject", { required: true })}
                      />
                      {errors.subject && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>Subject is required</span>}
                    </div>

                    <div className="col-12">
                      <label className="c-label">Message</label>
                      <textarea 
                        className={`c-input ${errors.message ? 'error' : ''}`}
                        rows="5" 
                        placeholder="Write your message here..."
                        style={{ resize: 'none' }}
                        {...register("message", { required: true })}
                      ></textarea>
                      {errors.message && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>Message cannot be empty</span>}
                    </div>

                    <div className="col-12 mt-2">
                      <button type="submit" className="c-btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                        ) : (
                          <>Send Message <FaPaperPlane /></>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
