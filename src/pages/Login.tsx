import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Define interfaces for our form data and errors
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

// Dynamically set the API URL based on the environment
const isDevelopment = window.location.hostname === 'localhost';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5001' 
  : 'http://157.245.108.130:5173';
const API_LOGIN_URL = `${API_BASE_URL}/api/auth/login`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  // Validation and UI state
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Check if user is already authenticated - if yes, redirect to dashboard
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Create a memoized validation function to prevent unnecessary re-renders
  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (touched.email && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (touched.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    // Password validation
    if (touched.password && !formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.email, formData.password, touched]);

  // Validate form when specific dependencies change
  useEffect(() => {
    // Only validate if at least one field has been touched
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [validateForm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear any login error when the user types
    if (loginError) {
      setLoginError('');
    }
    if (apiError) {
      setApiError('');
    }
    if (debugInfo) {
      setDebugInfo('');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched(prevTouched => ({
      ...prevTouched,
      [name]: true
    }));
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prevState => !prevState);
  };

  // Function to test API connection
  const testApiConnection = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/test`);
      const data = await response.json();
      setDebugInfo(`API connection test: ${data.message}`);
    } catch (error) {
      setDebugInfo(`API connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const loginWithCredentials = async (email: string, password: string): Promise<void> => {
    setIsSubmitting(true);
    setLoginError('');
    setApiError('');
    setDebugInfo('');
    
    try {
      console.log(`Attempting to login with: ${email}`);
      console.log(`API URL: ${API_LOGIN_URL}`);
      
      // Create the request payload
      const payload = { email, password };
      console.log('Request payload:', payload);
      
      // Set up fetch options with proper headers
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      };
      
      // Log the request details
      console.log('Request options:', {
        method: requestOptions.method,
        headers: requestOptions.headers,
        bodyLength: requestOptions.body.length
      });
      
      // Make the request
      const response = await fetch(API_LOGIN_URL, requestOptions);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      // Get response body as text first
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      // Then parse as JSON if possible
      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        data = { success: false, message: 'Invalid response format from server' };
      }
      
      if (!response.ok) {
        // Handle error response
        throw new Error(data.message || `Login failed with status: ${response.status}`);
      }
      
      if (!data.success) {
        // API returned success:false
        throw new Error(data.message || 'Login failed');
      }
      
      console.log('Login successful:', data);
      
      // Save auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          const serverUrl = isDevelopment ? 'localhost:5001' : '157.245.108.130:5173';
          setApiError(`Cannot connect to the server. Please make sure the backend server is running on ${serverUrl}.`);
        } else if (error.message.includes('401') || error.message.includes('Invalid email or password')) {
          setLoginError('Invalid email or password. Please try again.');
        } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
          setLoginError('Access forbidden. You may not have permission to access this resource.');
          setDebugInfo('403 Forbidden: The server understood the request but refuses to authorize it. Try using different credentials or check if CORS is properly configured.');
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Mark fields as touched to show validation errors
    setTouched({
      email: true,
      password: true
    });
    
    // Manually validate before submission
    const isValid = validateForm();
    
    if (isValid) {
      await loginWithCredentials(formData.email, formData.password);
    }
  };

  // Demo login for quick testing
  const handleDemoLogin = async (): Promise<void> => {
    await loginWithCredentials('demo@example.com', 'Demo123');
  };

  // Check if field has error
  const hasError = (field: keyof FormData): boolean => {
    return Boolean(touched[field] && errors[field]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-all duration-300">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-2 text-lg font-medium text-blue-600">Nosha</span>
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Sign In</h2>
        
        {apiError && (
          <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-md">
            <p className="font-medium">Connection Error</p>
            <p>{apiError}</p>
            <button 
              onClick={testApiConnection}
              className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-500"
            >
              Test API Connection
            </button>
          </div>
        )}
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {loginError}
          </div>
        )}
        
        {debugInfo && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-xs">
            <p className="font-medium">Debug Info:</p>
            <p>{debugInfo}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              onBlur={handleBlur}
              required
              className={`w-full px-3 py-2 border ${hasError('email') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="Email address"
            />
            {hasError('email') && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border ${hasError('password') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 transition-all`}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
            </div>
            {hasError('password') && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
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
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          
          {/* Demo login button for easy testing */}
          <div>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              Demo Login
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;