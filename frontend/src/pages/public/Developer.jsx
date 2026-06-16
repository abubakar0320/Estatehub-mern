import React, { useEffect, useRef, useState } from 'react';
import {
  FaLinkedinIn, FaGithub, FaEnvelope, FaReact, FaNodeJs,
  FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaGitAlt,
  FaDocker, FaPhp, FaBootstrap, FaCode, FaServer,
  FaShield, FaRocket, FaBuilding, FaUsers, FaUserTie, 
  FaCreditCard, FaCalendarDays, FaChartLine, FaArrowRight,
  FaCircleCheck, FaStar, FaLocationDot, FaGraduationCap,
  FaTrophy, FaLayerGroup, FaTerminal, FaFire,
  FaLightbulb, FaWrench, FaHeart
} from 'react-icons/fa6';
import AOS from 'aos';

/* ─── Animated Counter Hook ─── */
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

/* ─── Skill Progress Bar ─── */
const SkillBar = ({ name, level, color, delay }) => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>{name}</span>
        <span style={{ fontSize: '0.85rem', color: color, fontWeight: 800 }}>{level}%</span>
      </div>
      <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: animate ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          borderRadius: '99px',
          transition: `width 1.4s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          boxShadow: `0 0 10px ${color}44`
        }} />
      </div>
    </div>
  );
};

/* ─── Tech Badge ─── */
const TechBadge = ({ icon, name, color }) => (
  <div
    style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '12px 18px', borderRadius: '14px',
      background: '#fff', border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease', cursor: 'default',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = `${color}11`;
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 12px 24px ${color}22`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '#fff';
      e.currentTarget.style.borderColor = '#e2e8f0';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
    }}
  >
    <span style={{ fontSize: '1.4rem', color }}>{icon}</span>
    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{name}</span>
  </div>
);

/* ─── Module Card ─── */
const ModuleCard = ({ icon, title, desc, color, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 80}
    style={{
      padding: '30px', borderRadius: '24px', background: '#fff',
      border: '1px solid #e2e8f0', transition: 'all 0.35s ease',
      position: 'relative', overflow: 'hidden', height: '100%',
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.boxShadow = `0 20px 40px ${color}15`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = '#e2e8f0';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.02)';
    }}
  >
    <div style={{
      width: '60px', height: '60px', borderRadius: '16px',
      background: `${color}15`, color: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '1.6rem', marginBottom: '20px'
    }}>
      {icon}
    </div>
    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>{title}</h4>
    <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{desc}</p>
  </div>
);

const Developer = () => {
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const linesCode = useCounter(124500, 2500, statsVisible);
  const commits = useCounter(840, 2500, statsVisible);
  const cupsCoffee = useCounter(1250, 2500, statsVisible);
  const projects = useCounter(45, 2500, statsVisible);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <style>{`
        .dev-hero {
          position: relative; padding: 140px 0 80px;
          background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 50%, #fdf4ff 100%);
          overflow: hidden;
        }
        .dev-hero::before {
          content: ''; position: absolute; top: -200px; right: -100px;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%);
        }
        .dev-profile-img {
          width: 220px; height: 220px; border-radius: 50%;
          object-fit: cover; border: 8px solid #fff;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .dev-stat-box {
          background: #fff; border-radius: 20px; padding: 24px;
          text-align: center; border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s;
        }
        .dev-stat-box:hover { transform: translateY(-5px); border-color: #16a34a; }
      `}</style>

      {/* ─── HERO SECTION ─── */}
      <section className="dev-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-5 text-center text-lg-start" data-aos="fade-right">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src="https://i.ibb.co/b3KxR7y/profile.jpg" alt="Sumaira Ghazal" className="dev-profile-img" 
                     onError={(e)=>{ e.target.src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" }}/>
                <div style={{
                  position: 'absolute', bottom: '15px', right: '15px',
                  background: '#16a34a', color: '#fff', padding: '10px',
                  borderRadius: '50%', boxShadow: '0 4px 15px rgba(22,163,74,0.4)',
                  fontSize: '1.2rem', display: 'flex'
                }}>
                  <FaCode />
                </div>
              </div>
            </div>
            
            <div className="col-lg-7 text-center text-lg-start" data-aos="fade-left">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', color: '#16a34a', padding: '6px 16px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '20px', border: '1px solid #bbf7d0' }}>
                <FaRocket /> Lead Developer & Architect
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, marginBottom: '16px' }}>
                Sumaira Ghazal
              </h1>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#16a34a', marginBottom: '24px' }}>
                Full Stack MERN Engineer
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.8, marginBottom: '32px', maxWidth: '600px' }}>
                Architecting intelligent, scalable, and beautifully designed web applications. 
                Passionate about clean code, robust backend systems, and modern UI/UX design.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', '@media (min-width: 992px)': { justifyContent: 'flex-start' } }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0f172a', color: '#fff', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700, transition: 'all 0.3s' }}>
                  <FaGithub size={20} /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0a66c2', color: '#fff', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', fontWeight: 700, transition: 'all 0.3s' }}>
                  <FaLinkedinIn size={20} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a' }}>Tech Arsenal</h2>
            <p style={{ color: '#64748b' }}>Technologies I use to bring ideas to life.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <TechBadge icon={<FaReact />} name="React.js" color="#61dafb" />
            <TechBadge icon={<FaNodeJs />} name="Node.js" color="#339933" />
            <TechBadge icon={<FaJs />} name="JavaScript" color="#f7df1e" />
            <TechBadge icon={<FaDatabase />} name="MongoDB" color="#47a248" />
            <TechBadge icon={<FaServer />} name="Express.js" color="#000000" />
            <TechBadge icon={<FaBootstrap />} name="Bootstrap" color="#7952b3" />
            <TechBadge icon={<FaHtml5 />} name="HTML5" color="#e34f26" />
            <TechBadge icon={<FaCss3Alt />} name="CSS3" color="#1572b6" />
            <TechBadge icon={<FaGitAlt />} name="Git" color="#f05032" />
            <TechBadge icon={<FaDocker />} name="Docker" color="#2496ed" />
            <TechBadge icon={<FaPhp />} name="PHP" color="#777bb4" />
          </div>
        </div>
      </section>

      {/* ─── SKILLS & EXPERTISE ─── */}
      <section style={{ padding: '100px 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '32px' }}>
                Engineering <span style={{ color: '#16a34a' }}>Proficiency</span>
              </h3>
              <SkillBar name="Frontend Development (React, UI/UX)" level={95} color="#3b82f6" delay={100} />
              <SkillBar name="Backend Architecture (Node.js, Express)" level={92} color="#16a34a" delay={200} />
              <SkillBar name="Database Design (MongoDB, SQL)" level={88} color="#eab308" delay={300} />
              <SkillBar name="API Development & Security" level={94} color="#8b5cf6" delay={400} />
              <SkillBar name="DevOps & Deployment" level={80} color="#f97316" delay={500} />
            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '32px' }}>
                Why Work With Me?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '16px', background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}><FaLightbulb /></div>
                  <div>
                    <h5 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', marginBottom: '6px' }}>Problem Solver</h5>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>I approach complex challenges with logical, scalable, and elegant solutions.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}><FaRocket /></div>
                  <div>
                    <h5 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', marginBottom: '6px' }}>Performance Driven</h5>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Optimizing applications for speed, SEO, and exceptional user experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ESTATEHUB ARCHITECTURE ─── */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span style={{ color: '#16a34a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem' }}>Project Highlights</span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>EstateHub Architecture</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>A comprehensive overview of the modules powering this enterprise MERN application.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4"><ModuleCard icon={<FaBuilding />} title="Property Engine" desc="Advanced listing management with image uploads, dynamic filtering, and location-based queries." color="#3b82f6" index={0} /></div>
            <div className="col-md-6 col-lg-4"><ModuleCard icon={<FaShield />} title="Secure Auth" desc="JWT-based role authentication isolating Admin, Agent, and Tenant environments securely." color="#8b5cf6" index={1} /></div>
            <div className="col-md-6 col-lg-4"><ModuleCard icon={<FaCreditCard />} title="Financial Ledger" desc="Integrated rent collection, payment tracking, and automated digital receipts for tenants." color="#10b981" index={2} /></div>
            <div className="col-md-6 col-lg-4"><ModuleCard icon={<FaUserTie />} title="Agent Network" desc="A dedicated portal for agents to manage portfolios, track leads, and monitor profile ratings." color="#f59e0b" index={3} /></div>
            <div className="col-md-6 col-lg-4"><ModuleCard icon={<FaCalendarDays />} title="Booking System" desc="Real-time property visit scheduling system avoiding conflicts with calendar sync." color="#ef4444" index={4} /></div>
            <div className="col-md-6 col-lg-4"><ModuleCard icon={<FaChartLine />} title="Admin Analytics" desc="A comprehensive dashboard offering real-time insights, user management, and platform analytics." color="#0ea5e9" index={5} /></div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section ref={statsRef} style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#fff' }}>
        <div className="container">
          <div className="row g-4">
            {[
              { icon: <FaCode />, val: linesCode, suffix: '+', label: 'Lines of Code' },
              { icon: <FaGitAlt />, val: commits, suffix: '', label: 'Git Commits' },
              { icon: <FaFire />, val: projects, suffix: '+', label: 'Projects Completed' },
              { icon: <FaStar />, val: cupsCoffee, suffix: '', label: 'Cups of Coffee' }
            ].map((st, i) => (
              <div className="col-6 col-md-3" key={i} data-aos="zoom-in" data-aos-delay={i*100}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', color: '#16a34a', marginBottom: '16px' }}>{st.icon}</div>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>{st.val.toLocaleString()}{st.suffix}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }}>{st.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section style={{ padding: '100px 0', background: '#f8fafc', textAlign: 'center' }}>
        <div className="container" data-aos="fade-up">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '20px' }}>Let's Build Something Amazing</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Looking for a dedicated MERN Stack developer for your next big project? I am available for freelance opportunities and full-time roles.
          </p>
          <a href="mailto:sumaira.ghazal@example.com" style={{
            background: 'linear-gradient(135deg, #16a34a, #2563eb)', color: '#fff',
            padding: '16px 40px', borderRadius: '99px', fontSize: '1.1rem', fontWeight: 800,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px',
            boxShadow: '0 10px 25px rgba(22,163,74,0.3)', transition: 'transform 0.3s'
          }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
            <FaEnvelope /> Contact Me
          </a>
        </div>
      </section>
    </div>
  );
};

export default Developer;
