import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on load
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Setup axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // This will call our future Node.js API
      // const res = await axios.post('/api/auth/login', credentials);
      // const { token, user } = res.data;
      
      // MOCK LOGIN FOR NOW
      const mockUser = { id: 1, username: credentials.username, role: credentials.username === 'admin' ? 'admin' : 'tenant' };
      const mockToken = "mock-jwt-token";
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
