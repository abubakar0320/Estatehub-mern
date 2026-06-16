import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const TenantLayout = lazy(() => import('./layouts/TenantLayout'));

// Context & Protection
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Public Pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Properties = lazy(() => import('./pages/public/Properties'));
const PropertyDetails = lazy(() => import('./pages/public/PropertyDetails'));
const PublicAgents = lazy(() => import('./pages/public/Agents'));
const Contact = lazy(() => import('./pages/public/Contact'));
const Developer = lazy(() => import('./pages/public/Developer'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProperties = lazy(() => import('./pages/admin/Properties'));
const AdminTenants = lazy(() => import('./pages/admin/Tenants'));
const AdminAgents = lazy(() => import('./pages/admin/Agents'));
const AdminPayments = lazy(() => import('./pages/admin/Payments'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

// Tenant Pages
const TenantDashboard = lazy(() => import('./pages/tenant/Dashboard'));

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
    <div className="text-center">
      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status"></div>
      <h6 className="fw-bold text-muted text-uppercase small tracking-widest">EstateHub Orchestrator</h6>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="properties" element={<Properties />} />
                  <Route path="properties/:id" element={<PropertyDetails />} />
                  <Route path="agents" element={<PublicAgents />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="developer" element={<Developer />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes (Protected) */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="properties" element={<AdminProperties />} />
                    <Route path="tenants" element={<AdminTenants />} />
                    <Route path="agents" element={<AdminAgents />} />
                    <Route path="payments" element={<AdminPayments />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                {/* Tenant Routes (Protected) */}
                <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
                  <Route path="/tenant" element={<TenantLayout />}>
                    <Route index element={<TenantDashboard />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
