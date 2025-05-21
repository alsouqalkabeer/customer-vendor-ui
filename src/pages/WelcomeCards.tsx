import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  primary?: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, icon, link, primary = false }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className={`rounded-lg p-6 mb-4 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
        primary ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border border-gray-100'
      }`}
      onClick={() => navigate(link)}
    >
      <div className="flex items-start">
        <div className={`rounded-full p-3 mr-4 ${primary ? 'bg-blue-500' : 'bg-blue-100'}`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-bold text-lg mb-2 ${primary ? 'text-white' : 'text-blue-600'}`}>{title}</h3>
          <p className={`${primary ? 'text-blue-100' : 'text-gray-600'}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

const WelcomeCards: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Nosha</h1>
        <p className="text-gray-600">Complete these steps to get started with your store</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card
          title="Complete Your Profile"
          description="Add your business details and contact information"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>}
          link="/account"
          primary={true}
        />
        
        <Card
          title="Set Up Your Store"
          description="Configure your store settings and preferences"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>}
          link="/store"
        />
        
        <Card
          title="Add Your Products"
          description="Start listing your products or services"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>}
          link="/products"
        />
        
        <Card
          title="Set Up Delivery Options"
          description="Configure shipping and delivery settings"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>}
          link="/delivery"
        />
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-start">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-blue-600">Need Help?</h3>
            <p className="text-gray-600 mb-4">Check out our guides and tutorials to learn more about setting up your store.</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => window.open('https://help.nosha.com', '_blank')}
            >
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCards;