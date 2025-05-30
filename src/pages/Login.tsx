import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { authService } from '../services/apiService';
import { isDevelopment } from '../config/apiConfig';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Check for registration success or demo mode from navigation state
  useEffect(() => {
    if (state && state.registrationSuccess) {
      setSuccessMessage(state.message || 'Account created successfully! Please sign in with your credentials.');
      
      if (state.email) {
        setFormData(prev => ({
          ...prev,
          email: state.email
        }));
      }
    }
    
    if (state && state.demoMode) {
      setSuccessMessage(state.message || 'Demo mode activated. Use the default password.');
      
      if (state.email) {
        setFormData({
          email: state.email,
          password: 'Password123',
          rememberMe: true
        });
      }
    }
  }, [state]);
  
  // Check if user is already authenticated
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear any login error when the user types
    if (loginError) {
      setLoginError('');
    }
    
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
  };
  
  const togglePasswordVisibility = (): void => {
    setShowPassword(prevState => !prevState);
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setLoginError('Email and password are required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log(`Attempting to login with email: ${formData.email}`);
      
      // Use the auth service to login
      const data = await authService.login(formData.email, formData.password);
      
      // Save user data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          const serverUrl = isDevelopment ? 'localhost:5001' : '157.245.108.130:5001';
          setLoginError(`Cannot connect to the server. Please make sure the backend server is running on ${serverUrl}.`);
        } else if (error.message.includes('Invalid email or password')) {
          setLoginError('Invalid email or password. Please try again.');
        } else {
          setLoginError(error.message || 'Login failed. Please try again.');
        }
      } else {
        setLoginError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Demo login for quick testing
  const handleDemoLogin = (): void => {
    setFormData({
      email: 'ahmed.amer@gmail.com',
      password: 'Password123',
      rememberMe: true
    });
    
    // Submit the form programmatically after a brief delay
    setTimeout(() => {
      const form = document.getElementById('login-form') as HTMLFormElement;
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Mobile-first responsive container */}
      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
          
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            {/* Logo and Navigation */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-lg sm:text-xl font-semibold text-blue-600">Nosha</span>
              </div>
              
              <div className="flex justify-center sm:justify-end space-x-2">
                <Link 
                  to="/signup" 
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  Sign Up
                </Link>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-600 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-200 transition-colors">
                  Start free trial
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Sign in to your account to continue
              </p>
            </div>
          </div>
          
          {/* Form Container */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-lg border border-gray-200 p-6 sm:p-8">
            
            {/* Success message from registration */}
            {successMessage && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm sm:text-base">
                <div className="flex items-start">
                  <i className="bx bx-check-circle text-lg mr-2 mt-0.5 text-green-600"></i>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}
            
            {/* Error message */}
            {loginError && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm sm:text-base">
                <div className="flex items-start">
                  <i className="bx bx-error-circle text-lg mr-2 mt-0.5 text-red-600"></i>
                  <span>{loginError}</span>
                </div>
              </div>
            )}
            
            <form id="login-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="bx bx-envelope mr-1"></i>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="bx bx-lock-alt mr-1"></i>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    <i className={`bx ${showPassword ? 'bx-hide' : 'bx-show'} text-gray-400 hover:text-gray-600 text-lg`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 sm:py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <i className="bx bx-log-in mr-2"></i>
                    Sign In
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center my-4 sm:my-6">
                <div className="grow h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500 text-xs sm:text-sm uppercase font-medium">OR</span>
                <div className="grow h-px bg-gray-200"></div>
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg width="18" height="18" className="mr-2 sm:mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                New to Nosha?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Create an account
                </Link>
              </p>
            </div>
            
            {/* Demo Account Link */}
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={handleDemoLogin}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
              >
                <i className="bx bx-test-tube mr-1"></i>
                Try demo account (Password123)
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 px-4 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          © 2024 Nosha. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;