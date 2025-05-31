import React, { ReactNode } from 'react';
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
import Login from './pages/Login';

// Layout component that wraps the dashboard pages
interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="min-h-screen">
            {children}
          </div>
          
          {/* Footer */}
          <Footer />
        </main>
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
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Home route to handle root path redirections based on authentication
const HomeRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Root path - redirect based on authentication status */}
        <Route path="/" element={<HomeRoute />} />
        
        {/* Auth routes - publicly accessible */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard routes - protected by authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/account" element={
          <ProtectedRoute>
            <DashboardLayout>
              <AccountSetting />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/store" element={
          <ProtectedRoute>
            <DashboardLayout>
              <StoreSetting />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/requests" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Requests />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/products" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MarketProducts />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/services" element={
          <ProtectedRoute>
            <DashboardLayout>
              <MerchantServices />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/delivery" element={
          <ProtectedRoute>
            <DashboardLayout>
              <DeliveryAddresses />
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* Redirect any unknown routes based on authentication */}
        <Route path="*" element={<HomeRoute />} />
      </Routes>
    </Router>
  );
};

export default App;