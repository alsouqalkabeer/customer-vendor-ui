// src/config/apiConfig.ts

// Determine if we're in development or production
const isDevelopment = window.location.hostname === 'localhost';

// Base API URL
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5001/api' 
  : 'http://157.245.108.130:5001/api';

// Auth endpoints
const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  VALIDATE: `${API_BASE_URL}/auth/validate`,
  ME: `${API_BASE_URL}/auth/me`,
};

// Vendor endpoints
const VENDOR_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/vendors`,
  GET_BY_ID: (id: string | number) => `${API_BASE_URL}/vendors/${id}`,
  CREATE: `${API_BASE_URL}/vendors`,
  UPDATE: (id: string | number) => `${API_BASE_URL}/vendors/${id}`,
  DELETE: (id: string | number) => `${API_BASE_URL}/vendors/${id}`,
  DASHBOARD: (id: string | number) => `${API_BASE_URL}/vendors/${id}/dashboard`,
};

// Product endpoints
const PRODUCT_ENDPOINTS = {
  GET_ALL: `${API_BASE_URL}/products`,
  GET_BY_ID: (id: string | number) => `${API_BASE_URL}/products/${id}`,
  GET_BY_VENDOR: (vendorId: string | number) => `${API_BASE_URL}/products/vendor/${vendorId}`,
  CREATE: `${API_BASE_URL}/products`,
  UPDATE: (id: string | number) => `${API_BASE_URL}/products/${id}`,
  DELETE: (id: string | number) => `${API_BASE_URL}/products/${id}`,
};

export {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  VENDOR_ENDPOINTS,
  PRODUCT_ENDPOINTS,
  isDevelopment
};