import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaChevronRight, FaHouse } from 'react-icons/fa6';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    alert('Account creation logic will be implemented in the backend phase.');
    navigate('/login');
  };

  return (
    <div className="register-page">
      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 80px 0;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
        }
        .auth-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 550px;
          padding: 50px;
        }
        .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06) !important; }
      `}</style>

      <div className="auth-wrapper">
        <div className="container d-flex justify-content-center">
          <div className="auth-card">
            <div className="text-center mb-5">
              <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg mb-4" style={{ width: '80px', height: '80px' }}>
                <FaUserPlus size={32} />
              </div>
              <h2 className="fw-bold text-dark display-6">Create Account</h2>
              <p className="text-muted fs-5">Join the elite real estate marketplace</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase tracking-widest ms-2">Account Username</label>
                <div className="input-group bg-light rounded-pill px-4 border-0 shadow-inner">
                  <span className="input-group-text bg-transparent border-0 text-muted"><FaUser /></span>
                  <input 
                    type="text" 
                    className={`form-control bg-transparent border-0 py-3 fw-bold ${errors.username ? 'is-invalid' : ''}`}
                    placeholder="e.g. john_doe"
                    {...register("username", { required: "Username is required" })}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase tracking-widest ms-2">Email Address</label>
                <div className="input-group bg-light rounded-pill px-4 border-0 shadow-inner">
                  <span className="input-group-text bg-transparent border-0 text-muted"><FaEnvelope /></span>
                  <input 
                    type="email" 
                    className={`form-control bg-transparent border-0 py-3 fw-bold ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="name@luxury.com"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                    })}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase tracking-widest ms-2">Secure Password</label>
                <div className="input-group bg-light rounded-pill px-4 border-0 shadow-inner">
                  <span className="input-group-text bg-transparent border-0 text-muted"><FaLock /></span>
                  <input 
                    type="password" 
                    className={`form-control bg-transparent border-0 py-3 fw-bold ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="••••••••"
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
                  />
                </div>
              </div>

              <div className="form-check mb-5 px-4">
                <input className="form-check-input" type="checkbox" id="terms" {...register("terms", { required: true })} />
                <label className="form-check-label small text-muted" htmlFor="terms">
                  I accept the <a href="#" className="text-primary text-decoration-none fw-bold">Privacy Policy</a> and <a href="#" className="text-primary text-decoration-none fw-bold">Terms of Service</a>
                </label>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-lg mb-4 transition-all hover-scale text-white">
                Begin Journey <FaChevronRight className="ms-2" />
              </button>

              <div className="text-center">
                <p className="small text-muted mb-0">Already an elite member? <Link to="/login" className="text-primary fw-bold text-decoration-none border-bottom border-primary pb-1">Sign In Now</Link></p>
              </div>
            </form>
            
            <div className="mt-5 pt-4 border-top border-light text-center">
              <Link to="/" className="btn btn-link btn-sm text-decoration-none text-muted fw-bold"><FaHouse className="me-2" />Return to Homepage</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
