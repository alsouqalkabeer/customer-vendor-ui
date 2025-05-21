import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SetupStepProps {
  title: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  completed: boolean;
  isLast?: boolean;
}

const SetupStep: React.FC<SetupStepProps> = ({ 
  title, 
  description, 
  route, 
  icon, 
  completed, 
  isLast = false 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="relative mb-6">
      {!isLast && (
        <div className={`absolute top-9 left-6 h-full w-0.5 -ml-px ${
          completed ? 'bg-blue-500' : 'bg-gray-200'
        }`}></div>
      )}
      
      <div className="flex">
        <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full ${
          completed ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'
        }`}>
          {completed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            icon
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          
          <button
            onClick={() => navigate(route)}
            className={`px-4 py-2 rounded-md transition-colors ${
              completed 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {completed ? 'Edit' : 'Complete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const OnboardingProgress: React.FC = () => {
  const [progress, setProgress] = useState(25); // Assuming user just completed first step
  
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full mb-8">
      <div 
        className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

const SetupCompletionCards: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState({
    profile: true,
    store: false,
    products: false,
    delivery: false
  });
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Nosha!</h1>
        <p className="text-gray-600 mb-6">Complete these steps to get your store up and running</p>
        
        <OnboardingProgress />
        
        <div className="space-y-4">
          <SetupStep
            title="Complete your profile"
            description="Add business info and contact details"
            route="/account"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            completed={completedSteps.profile}
          />
          
          <SetupStep
            title="Set up your store"
            description="Configure store settings and appearance"
            route="/store"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            completed={completedSteps.store}
          />
          
          <SetupStep
            title="Add your products"
            description="Create your first product listings"
            route="/products"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            completed={completedSteps.products}
          />
          
          <SetupStep
            title="Set up delivery options"
            description="Configure shipping methods and zones"
            route="/delivery"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            }
            completed={completedSteps.delivery}
            isLast={true}
          />
        </div>
        
        <div className="mt-8 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Go to Dashboard
          </button>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Enable notifications</h3>
              <p className="text-gray-600 mb-4">Get alerts about new orders, customer messages, and other important updates</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Enable Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Watch quick tutorial</h3>
              <p className="text-gray-600 mb-4">Learn how to make the most of your Nosha store in under 5 minutes</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to mark onboarding as complete and redirect to dashboard
const completeOnboarding = () => {
  localStorage.setItem('isNewUser', 'false');
  window.location.href = '/dashboard';
};

export default SetupCompletionCards;