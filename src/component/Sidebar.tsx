import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Array of sidebar menu items
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'bx-home' },
    { path: '/account', label: 'Account Setting', icon: 'bx-user' },
    { path: '/store', label: 'Store Setting', icon: 'bx-store' },
    { path: '/requests', label: 'Requests', icon: 'bx-list-ul' },
    { path: '/products', label: 'Market Products', icon: 'bx-package' },
    { path: '/services', label: 'Merchant Services', icon: 'bx-cog' },
    { path: '/delivery', label: 'Delivery Addresses', icon: 'bx-map' },
  ];

  // Get the vendor data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const vendorName = userData?.name || 'Vendor';
  const lastSeen = userData?.lastSeen ? new Date(userData.lastSeen) : new Date();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close mobile menu on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking on a link (mobile only)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-800 text-white
          transition-all duration-300 md:hidden
          ${isOpen ? 'left-60' : 'left-4'}
        `}
        aria-label="Toggle menu"
      >
        <i className={`bx ${isOpen ? 'bx-x' : 'bx-menu'} text-xl`}></i>
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-blue-800 text-white flex flex-col z-40
          transition-transform duration-300 ease-in-out
          ${isMobile ? 'w-64' : 'w-64'}
          ${isOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        {/* Vendor info */}
        <div className="flex flex-col items-center p-6 border-b border-blue-700 mt-12 md:mt-0">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-800 text-lg md:text-xl font-semibold">
              {vendorName.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="mt-2 font-medium text-sm md:text-base text-center">
            {vendorName}
          </h3>
          <div className="text-xs text-blue-300 text-center">
            Last seen: {lastSeen.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
        
        {/* Navigation menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center px-4 md:px-6 py-3 mx-2 rounded-lg text-sm
                    transition-all duration-200
                    ${location.pathname === item.path
                      ? 'bg-blue-900 text-white shadow-lg'
                      : 'text-blue-200 hover:bg-blue-700 hover:text-white'}
                  `}
                >
                  <i className={`bx ${item.icon} mr-3 text-lg`}></i>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="
              flex items-center w-full px-2 py-2 text-sm text-blue-200 
              hover:text-white hover:bg-blue-700 rounded-lg
              transition-all duration-200
            "
          >
            <i className="bx bx-log-out mr-3 text-lg"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Spacer for desktop to prevent content overlap */}
      <div className="hidden md:block w-64 flex-shrink-0"></div>
    </>
  );
};

export default Sidebar;