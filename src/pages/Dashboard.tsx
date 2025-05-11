import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const weeklyData = [
    { name: 'SUN', income: 8000, deposit: 5000, spendings: 4000 },
    { name: 'MON', income: 7000, deposit: 6000, spendings: 5000 },
    { name: 'TUE', income: 9000, deposit: 5500, spendings: 7000 },
    { name: 'WED', income: 8500, deposit: 6500, spendings: 6000 },
    { name: 'THU', income: 10000, deposit: 7000, spendings: 8000 },
    { name: 'FRI', income: 9500, deposit: 6000, spendings: 7500 },
    { name: 'SAT', income: 8000, deposit: 5500, spendings: 6500 },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 5000 },
    { name: 'Mar', sales: 6000 },
    { name: 'Apr', sales: 7000 },
    { name: 'May', sales: 8000 },
  ];

  const pieData = [
    { name: 'Product A', value: 60 },
    { name: 'Product B', value: 40 },
  ];

  const COLORS = ['#0088FE', '#ECEFF1'];

  const recentOrders = [
    { id: '#1', product: 'Teddy Bear XL', customer: 'Ahmed Mohamed', date: '2024-05-10', status: 'Pending' },
    { id: '#2', product: 'Plush Bunny', customer: 'Sarah Johnson', date: '2024-05-09', status: 'Shipped' },
    { id: '#3', product: 'Soft Elephant', customer: 'Mahmoud Ali', date: '2024-05-08', status: 'Delivered' },
  ];

  return (
    <div className="p-6 fade-in slide-in">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your store dashboard</p>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Product Overview</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">50,000$</p>
              <p className="text-xs text-gray-500">Total Sales</p>
            </div>
            <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              +25%
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-right">
            <button className="text-blue-600 text-sm hover:underline">
              See details →
            </button>
          </div>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Active sales</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">28,000$</p>
              <p className="text-xs text-gray-500">per month</p>
            </div>
            <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              +15%
            </div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-right">
            <button className="text-blue-600 text-sm hover:underline">
              See details →
            </button>
          </div>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Product Revenue</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">16,000$</p>
              <p className="text-xs text-gray-500">last month</p>
            </div>
            <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
              +8%
            </div>
          </div>
          <div className="h-24 flex justify-center">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-right">
            <button className="text-blue-600 text-sm hover:underline">
              See details →
            </button>
          </div>
        </div>
      </div>
      
      {/* Analytics Chart */}
      <div className="card mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Analytics</h3>
        <div className="mb-3">
          <h4 className="text-sm text-gray-500">Today's Income</h4>
          <p className="text-2xl font-bold text-blue-600">15,000$</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis hide={true} />
              <Tooltip />
              <Bar dataKey="income" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deposit" fill="#eab308" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spendings" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-sm">Deposit income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm">Spendings</span>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Last Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;