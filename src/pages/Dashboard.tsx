import React, { useState, useEffect } from 'react';
import { apiCall, dashboardService } from '../services/apiService';
import { VENDOR_ENDPOINTS } from '../config/apiConfig';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get the vendor ID from localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const vendorId = userData?.id;
        
        if (!vendorId) {
          throw new Error('Vendor ID not found');
        }
        
        // Use the dashboardService to fetch data
        const response = await dashboardService.getDashboardData(vendorId);
        
        setDashboardData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      </div>
    );
  }
  
  const { vendor, dashboard } = dashboardData as any;
  const { overview, analytics, lastOrders } = dashboard;
  
  return (
    <>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to your store dashboard</p>
        
        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="flex justify-between">
              <h3 className="text-sm text-gray-500 font-medium">Product Overview</h3>
              <span className="text-green-500 text-xs">+25%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-500">{overview.totalSales.toLocaleString()}$</div>
              <div className="text-xs text-gray-500">Total Sales</div>
            </div>
            <div className="mt-4 h-16 bg-blue-100 bg-opacity-50"></div>
            <div className="mt-2 text-right">
              <a href="#" className="text-xs text-blue-500">See details →</a>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="flex justify-between">
              <h3 className="text-sm text-gray-500 font-medium">Active sales</h3>
              <span className="text-blue-500 text-xs">+15%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-500">{overview.activeSales.toLocaleString()}$</div>
              <div className="text-xs text-gray-500">per month</div>
            </div>
            <div className="mt-4 h-16 flex space-x-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex-1 bg-blue-500 rounded-sm" style={{ height: `${60 + i * 8}%` }}></div>
              ))}
            </div>
            <div className="mt-2 text-right">
              <a href="#" className="text-xs text-blue-500">See details →</a>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded shadow-sm">
            <div className="flex justify-between">
              <h3 className="text-sm text-gray-500 font-medium">Product Revenue</h3>
              <span className="text-green-500 text-xs">+8%</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-blue-500">{overview.productRevenue.toLocaleString()}$</div>
              <div className="text-xs text-gray-500">last month</div>
            </div>
            <div className="mt-4 h-16 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full"></div>
            </div>
            <div className="mt-2 text-right">
              <a href="#" className="text-xs text-blue-500">See details →</a>
            </div>
          </div>
        </div>
        
        {/* Analytics section */}
        <div className="bg-white p-6 rounded shadow-sm mb-8">
          <h3 className="text-sm text-gray-500 font-medium mb-2">Analytics</h3>
          <div>
            <div className="text-2xl font-bold text-blue-500">{overview.dailyIncome.toLocaleString()}$</div>
            <div className="text-xs text-gray-500">Today's Income</div>
          </div>
          
          <div className="mt-4 h-48">
            <div className="flex h-full items-end space-x-8">
              {analytics.chartData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                  <div className="w-full bg-green-400" style={{ height: `${day.income/200}px` }}></div>
                  <div className="w-full bg-yellow-400" style={{ height: `${day.depositIncome/200}px` }}></div>
                  <div className="w-full bg-red-400" style={{ height: `${day.spendings/200}px` }}></div>
                  <div className="text-xs text-gray-500 mt-1">{day.dayOfWeek}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Deposit Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-500">Spendings</span>
            </div>
          </div>
        </div>
        
        {/* Orders table */}
        <div className="bg-white p-6 rounded shadow-sm">
          <h3 className="text-sm text-gray-500 font-medium mb-4">Last Orders</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="pb-2">ID</th>
                <th className="pb-2">PRODUCT</th>
                <th className="pb-2">CUSTOMER</th>
                <th className="pb-2">DATE</th>
                <th className="pb-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {lastOrders.map((order, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-3 text-sm">#{order.orderNumber}</td>
                  <td className="py-3 text-sm">Product Name</td>
                  <td className="py-3 text-sm">{order.customerName}</td>
                  <td className="py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;