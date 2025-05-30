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
  const [currentStep, setCurrentStep] = useState<number>(1);
  
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

  // Step validation for multi-step form
  const isStep1Valid = (): boolean => {
    return formData.firstName && formData.lastName && formData.email && 
           !errors.firstName && !errors.lastName && !errors.email;
  };

  const isStep2Valid = (): boolean => {
    return formData.marketName && formData.marketLocation && 
           !errors.marketName && !errors.marketLocation;
  };

  const nextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPasswordStrength = (): { strength: number; label: string; color: string } => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      strength,
      label: labels[strength - 1] || 'Very Weak',
      color: colors[strength - 1] || 'bg-red-500'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Toast notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
          toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center">
            <i className={`bx ${toastType === 'success' ? 'bx-check-circle' : 'bx-error-circle'} mr-2 text-lg`}></i>
            <span className="text-sm sm:text-base">{toastMessage}</span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="px-4 py-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="bx bx-check text-white text-lg sm:text-xl"></i>
            </div>
            <span className="ml-2 text-lg sm:text-xl font-semibold text-blue-600">Nosha</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <Link 
              to="/login" 
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
          
          {/* Progress Steps - Desktop Only */}
          <div className="hidden sm:flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step 
                      ? 'bg-blue-500 border-blue-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > step ? (
                      <i className="bx bx-check text-lg"></i>
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 transition-colors ${
                      currentStep > step ? 'bg-blue-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-lg border border-gray-200 p-6 sm:p-8">
            
            {/* Mobile Step Indicator */}
            <div className="block sm:hidden mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
                <span className="text-sm text-blue-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {currentStep === 1 && "Let's get started"}
                {currentStep === 2 && "Tell us about your business"}
                {currentStep === 3 && "Create your account"}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {currentStep === 1 && "Enter your personal information"}
                {currentStep === 2 && "Set up your marketplace presence"}
                {currentStep === 3 && "Choose a secure password"}
              </p>
            </div>
            
            {signupError && (
              <div className="mb-6 p-3 sm:p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm sm:text-base">
                <div className="flex items-start">
                  <i className="bx bx-error-circle text-lg mr-2 mt-0.5"></i>
                  <span>{signupError}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="bx bx-user mr-1"></i>
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                          hasError('firstName') 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter your first name"
                      />
                      {hasError('firstName') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <i className="bx bx-error-circle mr-1"></i>
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        <i className="bx bx-user mr-1"></i>
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                          hasError('lastName') 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter your last name"
                      />
                      {hasError('lastName') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <i className="bx bx-error-circle mr-1"></i>
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-envelope mr-1"></i>
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                        hasError('email') 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {hasError('email') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <i className="bx bx-error-circle mr-1"></i>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Business Information */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="marketName" className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-store mr-1"></i>
                      Business Name *
                    </label>
                    <input
                      id="marketName"
                      name="marketName"
                      type="text"
                      value={formData.marketName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                        hasError('marketName') 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter your business name"
                    />
                    {hasError('marketName') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <i className="bx bx-error-circle mr-1"></i>
                        {errors.marketName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="marketLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-map mr-1"></i>
                      Business Location *
                    </label>
                    <input
                      id="marketLocation"
                      name="marketLocation"
                      type="text"
                      value={formData.marketLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                        hasError('marketLocation') 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter your business location"
                    />
                    {hasError('marketLocation') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <i className="bx bx-error-circle mr-1"></i>
                        {errors.marketLocation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Password */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-lock-alt mr-1"></i>
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                          hasError('password') 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => togglePasswordVisibility('password')}
                      >
                        <i className={`bx ${showPassword ? 'bx-hide' : 'bx-show'} text-gray-400 hover:text-gray-600 text-lg`}></i>
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength().color}`}
                              style={{ width: `${(getPasswordStrength().strength / 5) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{getPasswordStrength().label}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Password should contain uppercase, lowercase, numbers, and special characters
                        </div>
                      </div>
                    )}
                    
                    {hasError('password') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <i className="bx bx-error-circle mr-1"></i>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-lock-alt mr-1"></i>
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm sm:text-base ${
                          hasError('confirmPassword') 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                      >
                        <i className={`bx ${showConfirmPassword ? 'bx-hide' : 'bx-show'} text-gray-400 hover:text-gray-600 text-lg`}></i>
                      </button>
                    </div>
                    {hasError('confirmPassword') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <i className="bx bx-error-circle mr-1"></i>
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-between space-y-3 space-y-reverse sm:space-y-0 pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                  >
                    <i className="bx bx-chevron-left mr-2"></i>
                    Back
                  </button>
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && !isStep1Valid()) ||
                      (currentStep === 2 && !isStep2Valid())
                    }
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
                  >
                    Continue
                    <i className="bx bx-chevron-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      <>
                        <i className="bx bx-check mr-2"></i>
                        Create Account
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
            
            {/* Additional Links */}
            <div className="mt-6 sm:mt-8">
              {currentStep === 3 && (
                <p className="text-xs sm:text-sm text-center text-gray-600 mb-4">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link>,{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>, and{' '}
                  <Link to="/cookies" className="text-blue-600 hover:text-blue-800">Cookie Policy</Link>.
                </p>
              )}
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Already have an account?
                </p>
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>

          {/* Social Proof Section */}
          <div className="mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              Join thousands of merchants already using Nosha
            </p>
            <div className="flex justify-center items-center space-x-6 opacity-60">
              <div className="flex items-center">
                <i className="bx bx-check-circle text-green-500 mr-1"></i>
                <span className="text-xs text-gray-600">Secure</span>
              </div>
              <div className="flex items-center">
                <i className="bx bx-shield text-blue-500 mr-1"></i>
                <span className="text-xs text-gray-600">Protected</span>
              </div>
              <div className="flex items-center">
                <i className="bx bx-support text-purple-500 mr-1"></i>
                <span className="text-xs text-gray-600">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 px-4 text-center border-t border-gray-200">
        <p className="text-xs text-gray-500">
          © 2024 Nosha. All rights reserved. | Built with security and privacy in mind.
        </p>
      </footer>
    </div>
  );
};

export default SignUp;