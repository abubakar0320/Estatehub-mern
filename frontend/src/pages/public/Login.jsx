import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaBuilding, FaUser, FaLock, FaArrowRight, FaCircleExclamation } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    const result = await login(data);
    if (result.success) {
      const redirectPath = result.user.role === 'admin' ? '/admin' : '/tenant';
      navigate(redirectPath);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100" style={{ background: 'linear-gradient(135deg, #f4f7f6 0%, #e9ecef 100%)' }}>
      <style>{`
        .login-card {
            border: none;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.08);
            width: 100%;
            max-width: 420px;
            overflow: hidden;
            background: white;
            animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .login-header {
            background: var(--primary);
            padding: 3rem 2rem;
            text-align: center;
            color: white;
        }
        .login-body { padding: 3rem 2.5rem; }
        .logo-icon {
            width: 60px;
            height: 60px;
            background: rgba(255,255,255,0.2);
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 1.8rem;
        }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">
            <FaBuilding />
          </div>
          <h3 className="fw-bold mb-1 text-white">EstateHub</h3>
          <p className="mb-0 opacity-75 text-white">Welcome back! Please login</p>
        </div>
        <div className="login-body">
          {error && (
            <div className="alert alert-danger border-0 small py-2 mb-4 rounded-3">
              <FaCircleExclamation className="me-2" />{error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Username</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted"><FaUser /></span>
                <input 
                  type="text" 
                  className={`form-control border-start-0 ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Enter username"
                  {...register("username", { required: "Username is required" })}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted"><FaLock /></span>
                <input 
                  type="password" 
                  className={`form-control border-start-0 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label small text-muted" htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="small text-primary text-decoration-none">Forgot Password?</a>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-100 btn-login text-white py-3 rounded-3 fw-bold">
              {loading ? 'Signing In...' : <>Sign In <FaArrowRight className="ms-2" /></>}
            </button>
          </form>
          
          <div className="text-center mt-5">
            <p className="small text-muted">Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Contact Admin</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
