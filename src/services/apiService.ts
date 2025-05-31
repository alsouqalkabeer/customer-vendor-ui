// src/services/apiService.ts
import { AUTH_ENDPOINTS } from '../config/apiConfig';

// Get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Common headers
const getHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API call function
const apiCall = async (url: string, method: string, data?: any, requiresAuth = true) => {
  try {
    const options: RequestInit = {
      method,
      headers: getHeaders(requiresAuth),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: `Request failed with status: ${response.status}` };
      }
      
      throw new Error(errorData.message || 'API request failed');
    }
    
    // Return JSON response
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Auth service functions
const authService = {
  // Login
  login: (email: string, password: string) => {
    return apiCall(AUTH_ENDPOINTS.LOGIN, 'POST', { email, password }, false);
  },
  
  // Register
  register: (userData: any) => {
    return apiCall(AUTH_ENDPOINTS.REGISTER, 'POST', userData, false);
  },
  
  // Get current user
  getCurrentUser: () => {
    return apiCall(AUTH_ENDPOINTS.ME, 'GET');
  },
  
  // Validate token
  validateToken: () => {
    return apiCall(AUTH_ENDPOINTS.VALIDATE, 'GET');
  }
};

// Dashboard service functions
const dashboardService = {
  getDashboardData: (vendorId: string | number) => {
    return apiCall(`/api/dashboard/${vendorId}`, 'GET');
  }
};

const vendorSettingsService = {
  getVendorSettings: (vendorId) => {
    return apiCall(`/api/vendors/${vendorId}/settings`, 'GET');
  },
  
  updateVendorSettings: (vendorId, categoryKey, settingsData) => {
    return apiCall(`/api/vendors/${vendorId}/settings/${categoryKey}`, 'PUT', settingsData);
  },
  
  getVendorSettingsByCategory: (vendorId, categoryKey) => {
    return apiCall(`/api/vendors/${vendorId}/settings/${categoryKey}`, 'GET');
  }
};

export {
  apiCall,
  authService,
  dashboardService,
  vendorSettingsService
};