import React, { useState } from 'react';
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

function App() {
  const [activePage, setActivePage] = useState('dashboard');

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
}

export default App;