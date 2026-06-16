import React, { Component } from 'react';
import { FaCircleExclamation, FaRotateLeft } from 'react-icons/fa6';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("System Exception Captured:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
          <div className="text-center p-5 bg-white rounded-5 shadow-lg border" style={{ maxWidth: '500px' }}>
            <div className="bg-danger-subtle text-danger p-4 rounded-circle d-inline-flex mb-4">
              <FaCircleExclamation size={40} />
            </div>
            <h3 className="fw-bold text-dark mb-2">Protocol Disruption</h3>
            <p className="text-muted mb-4 small">The system encountered an unexpected structural exception. Our diagnostic engine has been notified.</p>
            <button
              className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm"
              onClick={() => window.location.reload()}
            >
              <FaRotateLeft className="me-2" /> Re-initialize System
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
