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
  
  // Add state for success message
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // Check for registration success or demo mode from navigation state
  useEffect(() => {
    if (state && state.registrationSuccess) {
      setSuccessMessage(state.message || 'Account created successfully! Please sign in with your credentials.');
      
      // If email was passed, pre-fill it
      if (state.email) {
        setFormData(prev => ({
          ...prev,
          email: state.email
        }));
      }
    }
    
    if (state && state.demoMode) {
      setSuccessMessage(state.message || 'Demo mode activated. Use the default password.');
      
      // Pre-fill with demo credentials
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
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }, 500);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-2 text-lg font-medium text-blue-600">Nosha</span>
          </div>
          
          <div className="flex space-x-2">
            <Link to="/signup" className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              Sign Up
            </Link>
            <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              Start free trial
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        
        {/* Success message from registration */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-md">
            {successMessage}
          </div>
        )}
        
        {/* Error message */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {loginError}
          </div>
        )}
        
        <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ahmed.amer@gmail.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="flex">
                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••••••••"
                />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
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
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="flex items-center justify-center mt-4 mb-4">
            <div className="grow h-0.5 bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm uppercase">OR</span>
            <div className="grow h-0.5 bg-gray-200"></div>
          </div>

          <button
            type="button"
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-3"
          >
            <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            New to Nosha? <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link>
          </p>
          
          <div className="text-center mt-6">
            <button 
              type="button" 
              onClick={handleDemoLogin}
              className="text-sm text-blue-600 hover:underline"
            >
              Use demo account for testing (Password123)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;