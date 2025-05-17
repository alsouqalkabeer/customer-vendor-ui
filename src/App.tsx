import React, { ReactNode, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';
import Dashboard from './pages/Dashboard';
import AccountSetting from './pages/AccountSetting';
import StoreSetting from './pages/StoreSetting';
import Requests from './pages/Requests';
import MarketProducts from './pages/MarketProducts';
import MerchantServices from './pages/MerchantServices';
import DeliveryAddresses from './pages/DeliveryAddresses';
import SignUp from './pages/SignUp';
import Login from './pages/Login'; // Import the new Login component

// Layout component that wraps the dashboard pages
interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'account':
        return <AccountSetting />;
      case 'store':
        return <StoreSetting />;
      case 'requests':
        return <Requests />;
      case 'products':
        return <MarketProducts />;
      case 'services':
        return <MerchantServices />;
      case 'delivery':
        return <DeliveryAddresses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex-grow flex flex-col">
          {renderPage()}
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Protected Route component to ensure only authenticated users can access dashboard
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get authentication status from localStorage or your auth state
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // If not authenticated, redirect to login page (changed from signup to login)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes - publicly accessible */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> {/* Add login route */}
        
        {/* Dashboard routes - protected by authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } />
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;