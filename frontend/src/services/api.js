import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // We handle the token setting primarily in AuthContext, 
    // but this ensures it's always caught if missed.
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Can dispatch to a global Redux/Zustand store or Toast Context if connected here
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized (e.g., clear token, redirect to login)
        console.error('Authentication Error: 401 Unauthorized');
        // Avoid circular dependency with AuthContext by dispatching event or simple localStorage clear
      }
      if (error.response.status === 500) {
        console.error('Server Error: 500 Internal Server Error');
      }
    } else if (error.request) {
      console.error('Network Error: No response received from API');
    }
    
    return Promise.reject(error);
  }
);

export default api;
