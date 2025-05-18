import React, { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/apiService';
import { isDevelopment } from '../config/apiConfig';

// Define interfaces for our form data and errors
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  marketName: string;
  marketLocation: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  marketName?: string;
  marketLocation?: string;
  password?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    marketName: '',
    marketLocation: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  // Validation and UI state
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<string>('');
  
  // Toast notification state
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Check if user is already authenticated - if yes, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Validate form when values change and form has been touched
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [formData, touched]);
  
  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear any signup error when the user types
    if (signupError) {
      setSignupError('');
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched(prevState => ({
      ...prevState,
      [name]: true
    }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword'): void => {
    if (field === 'password') {
      setShowPassword(prevState => !prevState);
    } else {
      setShowConfirmPassword(prevState => !prevState);
    }
  };
  
  // Show toast notification
  const showToastNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const validateForm = (): boolean => {
    let newErrors: FormErrors = {};
    
    // First Name validation
    if (touched.firstName && !formData.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (touched.firstName && formData.firstName.length < 2) {
      newErrors.firstName = 'First Name must be at least 2 characters';
    }
    
    // Last Name validation
    if (touched.lastName && !formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (touched.lastName && formData.lastName.length < 2) {
      newErrors.lastName = 'Last Name must be at least 2 characters';
    }
    
    // Email validation
    if (touched.email && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (touched.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    // Market Name validation
    if (touched.marketName && !formData.marketName) {
      newErrors.marketName = 'Market Name is required';
    }
    
    // Market Location validation
    if (touched.marketLocation && !formData.marketLocation) {
      newErrors.marketLocation = 'Market Location is required';
    }
    
    // Password validation
    if (touched.password && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (touched.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (touched.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and numbers';
    }
    
    // Confirm Password validation
    if (touched.confirmPassword && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (touched.confirmPassword && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Mark all fields as touched to show validation errors
    const allTouched: TouchedFields = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as TouchedFields);
    
    setTouched(allTouched);
    
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      
      try {
        // Use provided market name or generate if empty
        const finalMarketName = formData.marketName || `${formData.firstName}'s Store`;
        const finalMarketLocation = formData.marketLocation || 'Cairo, Egypt';
        
        // Create request payload (omit confirmPassword)
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          marketName: finalMarketName,
          marketLocation: finalMarketLocation
        };
        
        console.log(`Attempting to register with email: ${formData.email}`);
        
        // Use the auth service to register
        const data = await authService.register(payload);
        
        // Log response for debugging
        console.log('Registration successful:', data);
        
        // Show success toast
        showToastNotification(`Account created successfully! Redirecting to login...`);
        
        // Instead of saving to localStorage and going to dashboard,
        // we'll redirect to login page with a success message
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              registrationSuccess: true, 
              email: formData.email,
              message: 'Account created successfully! Please sign in with your credentials.'
            } 
          });
        }, 2000); // Give some time for the user to see the toast
        
      } catch (error) {
        console.error('Error submitting form:', error);
        
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            const serverUrl = isDevelopment ? 'localhost:5001' : '157.245.108.130:5001';
            setSignupError(`Cannot connect to the server. Please make sure the backend server is running on ${serverUrl}.`);
          } else if (error.message.includes('Email already registered')) {
            setSignupError('This email is already registered. Please use a different email or try signing in.');
          } else {
            setSignupError(error.message || 'Registration failed. Please try again.');
          }
          // Show error toast
          showToastNotification(error.message || 'Registration failed. Please try again.', 'error');
        } else {
          setSignupError('An unknown error occurred. Please try again.');
          showToastNotification('An unknown error occurred. Please try again.', 'error');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Check if field has error
  const hasError = (field: keyof FormData): boolean => Boolean(touched[field] && errors[field]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Toast notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-md z-50 ${
          toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center">
            {toastType === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-xl bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
        
        {signupError && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {signupError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ahmed"
              />
              {hasError('firstName') && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Amer"
              />
              {hasError('lastName') && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ahmed.amer@gmail.com"
            />
            {hasError('email') && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="marketName" className="block text-sm font-medium text-gray-700 mb-2">
                Market Name
              </label>
              <input
                id="marketName"
                name="marketName"
                type="text"
                value={formData.marketName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ahmed"
              />
              {hasError('marketName') && (
                <p className="mt-1 text-xs text-red-500">{errors.marketName}</p>
              )}
            </div>
            <div>
              <label htmlFor="marketLocation" className="block text-sm font-medium text-gray-700 mb-2">
                Market Location
              </label>
              <input
                id="marketLocation"
                name="marketLocation"
                type="text"
                value={formData.marketLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cairo, Egypt"
              />
              {hasError('marketLocation') && (
                <p className="mt-1 text-xs text-red-500">{errors.marketLocation}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="flex">
                <span className="inline-flex items-center justify-center px-4 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
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
                  onBlur={handleBlur}
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••••••••"
                />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('password')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {hasError('password') && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="flex">
                <span className="inline-flex items-center justify-center px-4 py-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-md bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••••••••"
                />
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {hasError('confirmPassword') && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              'Agree & Join'
            )}
          </button>
          
          <p className="text-sm text-center text-gray-600 mt-4">
            By clicking Agree & Join or Continue, you agree to the Nosha{' '}
            <a href="#" className="text-blue-600 hover:underline">User Agreement</a>,{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>,{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>.
          </p>

          <div className="text-center mt-6">
            <p className="text-gray-600 mb-2">Already have an account?</p>
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;