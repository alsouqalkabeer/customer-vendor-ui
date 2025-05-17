import React, { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Define interfaces for our form data and errors
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

// Dynamically set the API URL based on the environment
const isDevelopment = window.location.hostname === 'localhost';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5001' 
  : 'http://157.245.108.130:5173';
const API_REGISTER_URL = `${API_BASE_URL}/api/auth/register`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
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
        // In a real app, make an API call to register the user
        console.log(`Attempting to register with email: ${formData.email}`);
        console.log(`API URL: ${API_REGISTER_URL}`);
        
        // Create request payload (omit confirmPassword)
        const payload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        };
        
        // Set up fetch options
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        };
        
        // Make the API request
        const response = await fetch(API_REGISTER_URL, requestOptions);
        
        // Process the response
        if (!response.ok) {
          const errorText = await response.text();
          let errorData;
          
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { message: `Registration failed with status: ${response.status}` };
          }
          
          throw new Error(errorData.message || 'Registration failed');
        }
        
        const data = await response.json();
        
        // Save user data to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Error submitting form:', error);
        
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            const serverUrl = isDevelopment ? 'localhost:5001' : '157.245.108.130:5173';
            setSignupError(`Cannot connect to the server. Please make sure the backend server is running on ${serverUrl}.`);
          } else if (error.message.includes('Email already registered')) {
            setSignupError('This email is already registered. Please use a different email or try signing in.');
          } else {
            setSignupError(error.message || 'Registration failed. Please try again.');
          }
        } else {
          setSignupError('An unknown error occurred. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleSignUp = (): void => {
    // In a real app, you would implement Google OAuth here
    console.log('Google sign up clicked');
  };

  const handleFacebookSignUp = (): void => {
    // In a real app, you would implement Facebook OAuth here
    console.log('Facebook sign up clicked');
  };

  // Demo login for quick testing
  const handleDemoLogin = (): void => {
    setIsSubmitting(true);
    
    // Create demo user data
    const demoUserData = {
      firstName: 'Ahmed',
      lastName: 'Amer',
      email: 'demo@example.com',
      rememberMe: true
    };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(demoUserData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('token', `demo-token-${Date.now()}`);
    
    // Add slight delay for better UX
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  // Check if field has error
  const hasError = (field: keyof FormData): boolean => Boolean(touched[field] && errors[field]);

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
            <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              Sign Up
            </button>
            <button className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
              Start free trial
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        
        {signupError && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {signupError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ahmed"
              />
              {hasError('firstName') && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Amer"
              />
              {hasError('lastName') && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ahmed.amer@gmail.com"
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
                  onBlur={handleBlur}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
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
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
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
                Creating Account...
              </div>
            ) : (
              'Agree & Join'
            )}
          </button>
          
          <p className="text-sm text-center text-gray-600 mt-2">
            By clicking Agree & Join or Continue, you agree to the Nosha{' '}
            <a href="#" className="text-blue-600 hover:underline">User Agreement</a>,{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, and{' '}
            <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>.
          </p>

          <div className="flex items-center justify-center mt-4 mb-4">
            <div className="grow h-0.5 bg-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm uppercase">OR</span>
            <div className="grow h-0.5 bg-gray-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-3"
          >
            <svg width="20" height="20" className="mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={handleFacebookSignUp}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" className="mr-2">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            Facebook
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already on Hire Flow? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;