import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
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
  
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      {/* Vendor info */}
      <div className="flex flex-col items-center p-6 border-b border-blue-700">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-800 text-xl">
            {vendorName.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="mt-2 font-medium">{vendorName}</h3>
        <div className="text-xs text-blue-300">
          Last seen: {lastSeen.toLocaleTimeString()}
        </div>
      </div>
      
      {/* Navigation menu */}
      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-1">
              <Link
                to={item.path}
                className={`
                  flex items-center px-6 py-3 text-sm
                  ${location.pathname === item.path
                    ? 'bg-blue-900 text-white'
                    : 'text-blue-200 hover:bg-blue-700'}
                  transition duration-150
                `}
              >
                <i className={`bx ${item.icon} mr-3`}></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Logout button */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
            window.location.href = '/login';
          }}
          className="flex items-center text-sm text-blue-200 hover:text-white"
        >
          <i className="bx bx-log-out mr-3"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
