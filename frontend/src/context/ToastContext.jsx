import React, { createContext, useContext, useState, useCallback } from 'react';
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaXmark } from 'react-icons/fa6';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        {toasts.map((t) => (
          <div key={t.id} className={`toast show align-items-center text-white bg-${t.type === 'error' ? 'danger' : t.type} border-0 shadow-lg mb-2`} role="alert">
            <div className="d-flex">
              <div className="toast-body p-3 fw-bold d-flex align-items-center">
                {t.type === 'success' && <FaCircleCheck className="me-2" />}
                {t.type === 'error' && <FaCircleExclamation className="me-2" />}
                {t.type === 'info' && <FaCircleInfo className="me-2" />}
                {t.message}
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto shadow-none" onClick={() => removeToast(t.id)}></button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
