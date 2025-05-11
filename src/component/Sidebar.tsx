import React from 'react';
import { IconHome, IconUserCog, IconStore, IconCart, IconTags, IconTruck } from '../icons';

// Helper Components
const SidebarItem = ({ icon, label, active, onClick }) => {
  return (
    <div 
      className={`flex items-center px-4 py-3 my-1 cursor-pointer rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-white text-blue-800 shadow-md' 
          : 'text-white hover:bg-blue-700/50 hover:translate-x-1'
      }`}
      onClick={onClick}
    >
      <span className={`mr-3 ${active ? 'text-blue-600' : 'text-blue-300'}`}>{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white h-screen shadow-xl">
      <div className="flex flex-col items-center py-8 bg-blue-900/80 border-b border-blue-700">
        <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mb-4 shadow-md">
          <div className="text-purple-700 text-3xl font-bold flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
            </svg>
            <span className="mt-1">Teddyful</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold">Teddy store</h2>
        <p className="text-sm text-blue-200 flex items-center mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Last Seen 5:00 Am
        </p>
      </div>
      
      <nav className="mt-4 px-2">
        <SidebarItem 
          icon={<IconHome />} 
          label="Dash Board" 
          active={activePage === 'dashboard'} 
          onClick={() => setActivePage('dashboard')}
        />
        <SidebarItem 
          icon={<IconUserCog />} 
          label="Account Setting" 
          active={activePage === 'account'} 
          onClick={() => setActivePage('account')}
        />
        <SidebarItem 
          icon={<IconStore />} 
          label="Store Setting" 
          active={activePage === 'store'} 
          onClick={() => setActivePage('store')}
        />
        <SidebarItem 
          icon={<IconCart />} 
          label="Requests" 
          active={activePage === 'requests'} 
          onClick={() => setActivePage('requests')}
        />
        <SidebarItem 
          icon={<IconTags />} 
          label="Market Products" 
          active={activePage === 'products'} 
          onClick={() => setActivePage('products')}
        />
        <SidebarItem 
          icon={<IconStore />} 
          label="Merchant Services" 
          active={activePage === 'services'} 
          onClick={() => setActivePage('services')}
        />
        <SidebarItem 
          icon={<IconTruck />} 
          label="Delivery Addresses" 
          active={activePage === 'delivery'} 
          onClick={() => setActivePage('delivery')}
        />
      </nav>
    </div>
  );
};

export default Sidebar;