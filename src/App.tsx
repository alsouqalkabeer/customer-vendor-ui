import React from 'react';
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
import WelcomeCards from './pages/WelcomeCards';
import SetupCompletionCards from './pages/SetupCompletionCards';

// Layout component that wraps the dashboard pages
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          <main className="flex-grow p-6">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Protected Route component to ensure only authenticated users can access dashboard
interface ProtectedRouteProps {
  children: React.ReactNode;
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

// Route to handle newly signed up users
interface NewUserRouteProps {
  children: React.ReactNode;
}

const NewUserRoute: React.FC<NewUserRouteProps> = ({ children }) => {
  // Check if user is new (just completed signup)
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  
  // If new user, show setup completion cards
  if (isNewUser) {
    return <SetupCompletionCards />;
  }
  
  return <>{children}</>;
};

// Home route to handle root path redirections based on authentication
const HomeRoute: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const isNewUser = localStorage.getItem('isNewUser') === 'true';
  
  // Redirect based on user status
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (isNewUser) {
    return <Navigate to="/welcome" replace />;
  }
  
  return <Navigate to="/dashboard" replace />;
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
        
        {/* Onboarding routes for new users */}
        <Route path="/welcome" element={
          <ProtectedRoute>
            <SetupCompletionCards />
          </ProtectedRoute>
        } />
        
        {/* Dashboard routes - protected by authentication */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        <Route path="/account" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <AccountSetting />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        <Route path="/store" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <StoreSetting />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        <Route path="/requests" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <Requests />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        <Route path="/products" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <MarketProducts />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        <Route path="/services" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <MerchantServices />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        <Route path="/delivery" element={
          <ProtectedRoute>
            <NewUserRoute>
              <DashboardLayout>
                <DeliveryAddresses />
              </DashboardLayout>
            </NewUserRoute>
          </ProtectedRoute>
        } />
        
        {/* Redirect any unknown routes based on authentication */}
        <Route path="*" element={<HomeRoute />} />
      </Routes>
    </Router>
  );
};

export default App;