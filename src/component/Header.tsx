import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  marketName?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userDataString = localStorage.getItem('userData');
  const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false); // Close user menu when opening mobile menu
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = (): string => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
    } else if (userData.firstName) {
      return userData.firstName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                <i className="bx bx-check text-white text-lg"></i>
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold text-blue-800 hidden sm:block">Nosha</h1>
              <h1 className="text-lg font-semibold text-blue-800 sm:hidden">Nosha</h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              
              {/* Common Links */}
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Help
              </button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                Plans
              </button>
              
              {isAuthenticated ? (
                /* Authenticated User Menu */
                <div className="flex items-center space-x-4">
                  
                  {/* Store Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button 
                      onClick={toggleUserMenu}
                      className="px-3 py-2 flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50"
                    >
                      <i className="bx bx-store text-lg"></i>
                      <span className="font-medium">{userData.marketName || 'My Store'}</span>
                      <i className={`bx bx-chevron-down text-sm transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{userData.firstName} {userData.lastName}</p>
                          <p className="text-xs text-gray-500">{userData.email}</p>
                        </div>
                        
                        <Link 
                          to="/store" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="bx bx-cog mr-3"></i>
                          Store Settings
                        </Link>
                        <Link 
                          to="/account" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="bx bx-user mr-3"></i>
                          Account Settings
                        </Link>
                        <Link 
                          to="/billing" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <i className="bx bx-credit-card mr-3"></i>
                          Billing & Plans
                        </Link>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button 
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <i className="bx bx-log-out mr-3"></i>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    <i className="bx bx-bell text-xl"></i>
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[1.25rem] h-5">
                        {notificationCount > 99 ? '99+' : notificationCount}
                      </span>
                    )}
                  </button>
                  
                  {/* User Avatar */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {getUserInitials()}
                    </div>
                  </div>
                </div>
              ) : (
                /* Non-authenticated Menu */
                <div className="flex items-center space-x-4">
                  <button className="px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    Start Selling
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-all duration-200">
                    Explore Stores
                  </button>
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm border border-blue-500 rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm transition-all duration-200 font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {isAuthenticated && (
                <>
                  {/* Mobile Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 rounded-lg">
                    <i className="bx bx-bell text-xl"></i>
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full min-w-[1rem] h-4">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </button>

                  {/* Mobile User Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                </>
              )}
              
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-200 bg-white shadow-lg"
          >
            <div className="px-4 py-3 space-y-3">
              
              {isAuthenticated ? (
                /* Authenticated Mobile Menu */
                <>
                  {/* User Info */}
                  <div className="pb-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{userData.firstName} {userData.lastName}</p>
                        <p className="text-sm text-gray-500">{userData.email}</p>
                        <p className="text-xs text-blue-600">{userData.marketName || 'My Store'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <i className="bx bx-home mr-3 text-lg"></i>
                      Dashboard
                    </Link>
                    <Link 
                      to="/store" 
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <i className="bx bx-cog mr-3 text-lg"></i>
                      Store Settings
                    </Link>
                    <Link 
                      to="/account" 
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <i className="bx bx-user mr-3 text-lg"></i>
                      Account Settings
                    </Link>
                    <Link 
                      to="/products" 
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <i className="bx bx-package mr-3 text-lg"></i>
                      Products
                    </Link>
                    <Link 
                      to="/requests" 
                      className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <i className="bx bx-list-ul mr-3 text-lg"></i>
                      Orders
                    </Link>
                  </div>

                  {/* Common Links */}
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                      <i className="bx bx-help-circle mr-3 text-lg"></i>
                      Help & Support
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                      <i className="bx bx-credit-card mr-3 text-lg"></i>
                      Plans & Billing
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="pt-3 border-t border-gray-200">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <i className="bx bx-log-out mr-3 text-lg"></i>
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                /* Non-authenticated Mobile Menu */
                <>
                  <div className="space-y-2">
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                      <i className="bx bx-store mr-3 text-lg"></i>
                      Start Selling on Nosha
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                      <i className="bx bx-map mr-3 text-lg"></i>
                      Stores in Your City
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                      <i className="bx bx-category mr-3 text-lg"></i>
                      Browse Categories
                    </button>
                    <button className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
                      <i className="bx bx-help-circle mr-3 text-lg"></i>
                      Help & Support
                    </button>
                  </div>

                  {/* Auth Buttons */}
                  <div className="pt-3 border-t border-gray-200 space-y-2">
                    <button 
                      onClick={() => {
                        navigate('/login');
                        closeMobileMenu();
                      }}
                      className="w-full px-4 py-2.5 text-center border border-blue-500 rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/signup');
                        closeMobileMenu();
                      }}
                      className="w-full px-4 py-2.5 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Header;