import axios from "axios";

/**
 * Axios instance for SkillForge API
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach JWT token to every request if available
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Global response error handling
 * (Can be expanded later for refresh tokens, redirects, etc.)
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle unauthorized globally
    if (error.response?.status === 401) {
      // Token might be invalid or expired
      // We DO NOT auto-logout here to avoid UI issues
      console.warn("Unauthorized request - 401");
    }

    return Promise.reject(error);
  }
);

export default api;
