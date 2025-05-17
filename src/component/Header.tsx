import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  marketName?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userDataString = localStorage.getItem('userData');
  const userData: UserData = userDataString ? JSON.parse(userDataString) : {};
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    // Don't remove userData to allow easier login
    navigate('/login'); // Navigate to login instead of signup
  };

  return (
    <div className="bg-white py-4 px-6 flex justify-between items-center border-b shadow-sm">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-blue-800">Nosha</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">Help</button>
        <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">Plans</button>
        
        {isAuthenticated ? (
          // Show these options when user is logged in
          <>
            <div className="relative group">
              <button className="px-4 py-2 flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <span>{userData.marketName || 'My Store'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Store Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Billing</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="relative p-1 text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">3</span>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
                {userData.firstName ? userData.firstName.charAt(0) : 'U'}
              </div>
              
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          // Show these options when user is not logged in
          <>
            <button className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">Start selling on Nosha</button>
            <button className="px-3 py-2 border border-gray-200 rounded-full text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">Stores in your city</button>
            <button className="px-3 py-2 border border-gray-200 rounded-full text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all duration-200">Platform category</button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-sm transition-all duration-200"
            >
              Sign Up
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;