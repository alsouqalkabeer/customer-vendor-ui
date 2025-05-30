import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavIconsProps {
  className?: string;
  variant?: 'default' | 'compact' | 'mobile';
}

const NavIcons: React.FC<NavIconsProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [messageCount, setMessageCount] = useState(2);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const quickMenuRef = useRef<HTMLDivElement>(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order #1234 from Ahmed Mohamed',
      time: '2 minutes ago',
      unread: true,
      icon: 'bx-shopping-bag',
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'message',
      title: 'Customer Message',
      message: 'Question about Teddy Bear XL',
      time: '15 minutes ago',
      unread: true,
      icon: 'bx-message',
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'system',
      title: 'Store Analytics',
      message: 'Weekly report is ready',
      time: '1 hour ago',
      unread: false,
      icon: 'bx-line-chart',
      color: 'text-purple-600'
    }
  ];

  // Quick actions for the power/menu button
  const quickActions = [
    { label: 'Dashboard', icon: 'bx-home', path: '/dashboard' },
    { label: 'Products', icon: 'bx-package', path: '/products' },
    { label: 'Orders', icon: 'bx-list-ul', path: '/requests' },
    { label: 'Settings', icon: 'bx-cog', path: '/store' },
    { label: 'Account', icon: 'bx-user', path: '/account' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (quickMenuRef.current && !quickMenuRef.current.contains(event.target as Node)) {
        setShowQuickMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowQuickMenu(false);
  };

  const handleQuickMenuClick = () => {
    setShowQuickMenu(!showQuickMenu);
    setShowNotifications(false);
  };

  const handleMessageClick = () => {
    navigate('/messages');
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  const markNotificationAsRead = (notificationId: number) => {
    // Update notification count
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotificationCount(0);
  };

  // Responsive classes based on variant
  const containerClasses = {
    default: 'flex justify-end space-x-2 sm:space-x-3 pr-4 sm:pr-6 py-3 sm:py-4',
    compact: 'flex justify-end space-x-2 pr-3 py-2',
    mobile: 'flex justify-center space-x-4 px-4 py-3 bg-white border-t border-gray-200'
  };

  const buttonClasses = {
    default: 'p-2 sm:p-2.5 border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm',
    compact: 'p-2 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200',
    mobile: 'p-3 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm'
  };

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      
      {/* Quick Menu / Power Button */}
      <div className="relative" ref={quickMenuRef}>
        <button 
          onClick={handleQuickMenuClick}
          className={`${buttonClasses[variant]} relative group`}
          title="Quick Actions"
        >
          <i className="bx bx-grid-alt text-lg sm:text-xl text-gray-600 group-hover:text-blue-600"></i>
        </button>
        
        {/* Quick Menu Dropdown */}
        {showQuickMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Quick Actions</p>
            </div>
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => {
                  navigate(action.path);
                  setShowQuickMenu(false);
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <i className={`bx ${action.icon} mr-3 text-lg`}></i>
                {action.label}
              </button>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('userData');
                  navigate('/login');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <i className="bx bx-log-out mr-3 text-lg"></i>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <button 
        onClick={handleMessageClick}
        className={`${buttonClasses[variant]} relative group`}
        title="Messages"
      >
        <i className="bx bx-envelope text-lg sm:text-xl text-gray-600 group-hover:text-blue-600"></i>
        {messageCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full min-w-[1rem] h-4 flex items-center justify-center px-1 font-medium">
            {messageCount > 9 ? '9+' : messageCount}
          </span>
        )}
      </button>

      {/* Notifications */}
      <div className="relative" ref={notificationRef}>
        <button 
          onClick={handleNotificationClick}
          className={`${buttonClasses[variant]} relative group`}
          title="Notifications"
        >
          <i className="bx bx-bell text-lg sm:text-xl text-gray-600 group-hover:text-blue-600"></i>
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1rem] h-4 flex items-center justify-center px-1 font-medium">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
        
        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center space-x-2">
                {notificationCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => navigate('/notifications')}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  View all
                </button>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      notification.unread ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        notification.unread ? 'bg-white' : 'bg-gray-100'
                      }`}>
                        <i className={`bx ${notification.icon} text-lg ${notification.color}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <i className="bx bx-bell text-4xl text-gray-300 mb-2"></i>
                  <p className="text-sm text-gray-500">No notifications</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Home/Dashboard */}
      <button 
        onClick={handleHomeClick}
        className={`${buttonClasses[variant]} group`}
        title="Dashboard"
      >
        <i className="bx bx-home text-lg sm:text-xl text-gray-600 group-hover:text-blue-600"></i>
      </button>

      {/* Mobile-only: Additional Actions */}
      {variant === 'mobile' && (
        <>
          <button 
            onClick={() => navigate('/search')}
            className={`${buttonClasses[variant]} group`}
            title="Search"
          >
            <i className="bx bx-search text-lg text-gray-600 group-hover:text-blue-600"></i>
          </button>
          
          <button 
            onClick={() => navigate('/profile')}
            className={`${buttonClasses[variant]} group`}
            title="Profile"
          >
            <i className="bx bx-user text-lg text-gray-600 group-hover:text-blue-600"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default NavIcons;