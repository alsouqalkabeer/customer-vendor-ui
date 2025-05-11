import React from 'react';
import { IconPower, IconEnvelope, IconBell, IconHome } from '../icons';

const NavIcons = () => {
  return (
    <div className="flex justify-end space-x-3 pr-6 py-4">
      <button className="p-2 border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm">
        <IconPower />
      </button>
      <button className="p-2 border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm relative">
        <IconEnvelope />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          3
        </span>
      </button>
      <button className="p-2 border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm">
        <IconBell />
      </button>
      <button className="p-2 border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-sm">
        <IconHome />
      </button>
    </div>
  );
};

export default NavIcons;