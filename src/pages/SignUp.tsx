import React, { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  // Check if user is already authenticated - if yes, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/');
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
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
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
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Save user data (excluding password) to localStorage
        const userData = { ...formData };
        delete (userData as any).password;
        delete (userData as any).confirmPassword;
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Navigate to dashboard
        navigate('/');
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (show message, etc.)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Demo login for quick testing
  const handleDemoLogin = (): void => {
    setIsSubmitting(true);
    
    // Create demo user data
    const demoUserData = {
      firstName: 'Ahmed',
      lastName: 'Amer',
      email: 'demo@example.com',
      marketName: 'Teddy store',
      marketLocation: 'Cairo, Egypt',
      rememberMe: true
    };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(demoUserData));
    localStorage.setItem('isAuthenticated', 'true');
    
    // Add slight delay for better UX
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  // Navigate to login page
  const handleSignInClick = (): void => {
    navigate('/login');
  };

  // Check if field has error
  const hasError = (field: keyof FormData): boolean => Boolean(touched[field] && errors[field]);

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

        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                className={`w-full px-3 py-2 border ${hasError('firstName') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
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
                required
                className={`w-full px-3 py-2 border ${hasError('lastName') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
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
              required
              className={`w-full px-3 py-2 border ${hasError('email') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
              placeholder="ahmed.amer@gmail.com"
            />
            {hasError('email') && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="marketName" className="block text-sm font-medium text-gray-700 mb-1">
                Market Name
              </label>
              <input
                id="marketName"
                name="marketName"
                type="text"
                value={formData.marketName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border ${hasError('marketName') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Ahmed"
              />
              {hasError('marketName') && (
                <p className="mt-1 text-xs text-red-500">{errors.marketName}</p>
              )}
            </div>
            <div>
              <label htmlFor="marketLocation" className="block text-sm font-medium text-gray-700 mb-1">
                Market Location
              </label>
              <input
                id="marketLocation"
                name="marketLocation"
                type="text"
                value={formData.marketLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border ${hasError('marketLocation') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Cairo, Egypt"
              />
              {hasError('marketLocation') && (
                <p className="mt-1 text-xs text-red-500">{errors.marketLocation}</p>
              )}
            </div>
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
                placeholder="************"
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
            {!errors.password && touched.password && formData.password && (
              <div className="mt-2">
                <div className="flex items-center mb-1">
                  <div className={`h-1 w-1/3 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'} mr-1`}></div>
                  <div className={`h-1 w-1/3 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'} mr-1`}></div>
                  <div className={`h-1 w-1/3 rounded-full ${/\d/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
                <p className="text-xs text-gray-500">Password must be at least 8 characters with uppercase, lowercase and numbers</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-3 py-2 border ${hasError('confirmPassword') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 transition-all`}
                placeholder="************"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleConfirmPasswordVisibility}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showConfirmPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
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
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
          
          {/* Demo login button for easy testing */}
          <div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Demo Login (Skip Registration)
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
