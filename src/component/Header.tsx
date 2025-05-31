import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : {};

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
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
    // navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
    } else if (userData.firstName) {
      return userData.firstName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const mockNotifications = [
    { id: 1, title: 'New order received', description: 'Order #1234 from John Doe', time: '2 min ago', type: 'order', unread: true },
    { id: 2, title: 'Payment received', description: '$125.00 payment confirmed', time: '1 hour ago', type: 'payment', unread: true },
    { id: 3, title: 'Low stock alert', description: 'iPhone 15 Pro has only 2 items left', time: '3 hours ago', type: 'warning', unread: false },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Logo */}
            <div className="flex items-center flex-shrink-0 group cursor-pointer">
              <div className="relative">
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Nosha
                </h1>
                <div className="text-xs text-gray-500 font-medium -mt-1">Marketplace</div>
              </div>
              <h1 className="text-xl font-bold text-gray-900 sm:hidden">Nosha</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              
              {/* Common Links */}
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                Help Center
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                Pricing
              </button>
              
              {isAuthenticated ? (
                /* Authenticated User Menu */
                <div className="flex items-center space-x-2 xl:space-x-3 ml-4 pl-4 border-l border-gray-200">
                  
                  {/* Quick Actions */}
                  <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="hidden xl:inline">Add Product</span>
                  </button>

                  {/* Notifications */}
                  <div className="relative" ref={notificationRef}>
                    <button 
                      onClick={toggleNotifications}
                      className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse">
                          {notificationCount > 9 ? '9+' : notificationCount}
                        </span>
                      )}
                    </button>
                    
                    {/* Notifications Dropdown */}
                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 backdrop-blur-xl">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                          <p className="text-sm text-gray-500">{notificationCount} unread</p>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                          {mockNotifications.map((notification) => (
                            <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 border-l-4 transition-all duration-200 ${
                              notification.unread 
                                ? notification.type === 'order' ? 'border-l-blue-500 bg-blue-50/30' :
                                  notification.type === 'payment' ? 'border-l-green-500 bg-green-50/30' :
                                  'border-l-yellow-500 bg-yellow-50/30'
                                : 'border-l-transparent'
                            }`}>
                              <div className="flex items-start space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                                  notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                                  'bg-yellow-100 text-yellow-600'
                                }`}>
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    {notification.type === 'order' ? (
                                      <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
                                    ) : notification.type === 'payment' ? (
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    ) : (
                                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                                    )}
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                  <p className="text-sm text-gray-600 truncate">{notification.description}</p>
                                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                                </div>
                                {notification.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="px-4 py-2 border-t border-gray-100">
                          <button className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-2">
                            View all notifications
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Store Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button 
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/25">
                          {getUserInitials()}
                        </div>
                        <div className="hidden xl:block text-left">
                          <p className="text-sm font-semibold text-gray-900">{userData.marketName || 'My Store'}</p>
                          <p className="text-xs text-gray-500">{userData.firstName} {userData.lastName}</p>
                        </div>
                      </div>
                      <svg className={`w-4 h-4 transition-transform duration-200 group-hover:text-blue-600 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 backdrop-blur-xl">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-500/25">
                              {getUserInitials()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{userData.firstName} {userData.lastName}</p>
                              <p className="text-xs text-gray-500">{userData.email}</p>
                              <p className="text-xs text-blue-600 font-medium">{userData.marketName || 'My Store'}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                          </div>
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Store Settings
                          </div>
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            Products
                          </div>
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Orders
                          </div>
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Analytics
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 py-2">
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Account Settings
                          </div>
                          <div className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Billing & Plans
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-2">
                          <button 
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Non-authenticated Menu */
                <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                    Start Selling
                  </button>
                  <button className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                    Explore Stores
                  </button>
                  <button className="px-5 py-2 text-sm font-medium border border-blue-500 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200">
                    Login
                  </button>
                  <button className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-105">
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {isAuthenticated && (
                <>
                  {/* Mobile Notifications */}
                  <button 
                    onClick={toggleNotifications}
                    className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </button>

                  {/* Mobile User Avatar */}
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/25">
                    {getUserInitials()}
                  </div>
                </>
              )}
              
              <button 
                onClick={toggleMobileMenu}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isMobileMenuOpen 
                    ? 'text-blue-600 bg-blue-50 rotate-90' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div 
            ref={mobileMenuRef}
            className="border-t border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              
              {isAuthenticated ? (
                /* Authenticated Mobile Menu */
                <>
                  {/* User Info */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-900">{userData.firstName} {userData.lastName}</p>
                        <p className="text-sm text-gray-600">{userData.email}</p>
                        <p className="text-sm text-blue-600 font-semibold">{userData.marketName || 'My Store'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Dashboard
                    </div>
                    <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Store Settings
                    </div>
                    <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      Products
                    </div>
                    <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      Orders
                    </div>
                    <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Analytics
                    </div>
                  </div>

                  {/* Common Links */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium">
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </button>
                    <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium cursor-pointer"
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Plans & Billing
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="pt-4 border-t border-gray-200">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                    >
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                /* Non-authenticated Mobile Menu */
                <>
                  <div className="space-y-2">
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium">
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Start Selling on Nosha
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium">
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Stores in Your City
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium">
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Browse Categories
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium">
                      <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </button>
                  </div>

                  {/* Auth Buttons */}
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <button className="w-full px-6 py-3 text-center border border-blue-500 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-200 font-semibold">
                      Login
                    </button>
                    <button className="w-full px-6 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25">
                      Sign Up
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-18"></div>
    </>
  );
};

export default Header;