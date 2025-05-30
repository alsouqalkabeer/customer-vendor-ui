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
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="max-w-md w-full">
          <div className="p-4 md:p-6 bg-red-50 text-red-700 rounded-lg shadow-sm">
            <div className="flex items-center">
              <i className="bx bx-error-circle text-xl mr-2"></i>
              <span className="font-medium">Error</span>
            </div>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  const { vendor, dashboard } = dashboardData as any;
  const { overview, analytics, lastOrders } = dashboard;
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Welcome to your store dashboard
          </p>
        </div>
        
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Product Overview Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xs md:text-sm text-gray-500 font-medium">Product Overview</h3>
              <span className="text-green-500 text-xs bg-green-50 px-2 py-1 rounded-full">+25%</span>
            </div>
            <div className="mb-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500">
                ${overview.totalSales.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-500">Total Sales</div>
            </div>
            <div className="h-12 md:h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded mb-3"></div>
            <div className="text-right">
              <a href="#" className="text-xs md:text-sm text-blue-500 hover:text-blue-700 transition-colors">
                See details →
              </a>
            </div>
          </div>
          
          {/* Active Sales Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xs md:text-sm text-gray-500 font-medium">Active sales</h3>
              <span className="text-blue-500 text-xs bg-blue-50 px-2 py-1 rounded-full">+15%</span>
            </div>
            <div className="mb-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500">
                ${overview.activeSales.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-500">per month</div>
            </div>
            <div className="h-12 md:h-16 flex items-end space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div 
                  key={i} 
                  className="flex-1 bg-blue-500 rounded-sm transition-all hover:bg-blue-600" 
                  style={{ height: `${40 + i * 8}%` }}
                ></div>
              ))}
            </div>
            <div className="text-right">
              <a href="#" className="text-xs md:text-sm text-blue-500 hover:text-blue-700 transition-colors">
                See details →
              </a>
            </div>
          </div>
          
          {/* Product Revenue Card */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xs md:text-sm text-gray-500 font-medium">Product Revenue</h3>
              <span className="text-green-500 text-xs bg-green-50 px-2 py-1 rounded-full">+8%</span>
            </div>
            <div className="mb-4">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500">
                ${overview.productRevenue.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-500">last month</div>
            </div>
            <div className="h-12 md:h-16 flex items-center justify-center mb-3">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500 rounded-full relative">
                <div className="absolute inset-2 bg-blue-100 rounded-full"></div>
              </div>
            </div>
            <div className="text-right">
              <a href="#" className="text-xs md:text-sm text-blue-500 hover:text-blue-700 transition-colors">
                See details →
              </a>
            </div>
          </div>
        </div>
        
        {/* Analytics section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
            <div>
              <h3 className="text-sm md:text-base text-gray-700 font-medium mb-2">Analytics</h3>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-4">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-500">
                  ${overview.dailyIncome.toLocaleString()}
                </div>
                <div className="text-xs md:text-sm text-gray-500">Today's Income</div>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="overflow-x-auto">
            <div className="min-w-full h-32 md:h-48">
              <div className="flex h-full items-end space-x-2 md:space-x-4 lg:space-x-8 px-2">
                {analytics.chartData.map((day, index) => (
                  <div key={index} className="flex-1 min-w-8 flex flex-col items-center space-y-1">
                    <div className="w-full bg-green-400 rounded-t transition-all hover:bg-green-500" 
                         style={{ height: `${Math.max(day.income/200, 8)}px` }}></div>
                    <div className="w-full bg-yellow-400 transition-all hover:bg-yellow-500" 
                         style={{ height: `${Math.max(day.depositIncome/200, 4)}px` }}></div>
                    <div className="w-full bg-red-400 rounded-b transition-all hover:bg-red-500" 
                         style={{ height: `${Math.max(day.spendings/200, 4)}px` }}></div>
                    <div className="text-xs text-gray-500 mt-2 text-center truncate w-full">
                      {day.dayOfWeek}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 md:mt-6 flex flex-wrap gap-3 md:gap-4 justify-center sm:justify-start">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs md:text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-xs md:text-sm text-gray-600">Deposit Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              <span className="text-xs md:text-sm text-gray-600">Spendings</span>
            </div>
          </div>
        </div>
        
        {/* Orders table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h3 className="text-sm md:text-base text-gray-700 font-medium">Last Orders</h3>
          </div>
          
          {/* Mobile view - Card layout */}
          <div className="block md:hidden">
            {lastOrders.map((order, index) => (
              <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-gray-900">#{order.orderNumber}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Product:</span> Product Name
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Customer:</span> {order.customerName}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop view - Table layout */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lastOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      Product Name
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
          
          {/* Empty state */}
          {lastOrders.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <i className="bx bx-package text-4xl"></i>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">No orders yet</h3>
              <p className="text-sm text-gray-500">Your recent orders will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;