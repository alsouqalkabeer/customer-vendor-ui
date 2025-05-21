import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  change?: {
    value: number;
    positive: boolean;
  };
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, change, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-center mb-1">
        <div className="text-2xl font-bold text-blue-600">{value}</div>
        {change && (
          <div className={`ml-2 px-2 py-1 text-xs rounded-full ${
            change.positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </div>
        )}
      </div>
      <p className="text-gray-500 text-sm">{subtext}</p>
      {onClick && (
        <div className="mt-4 text-blue-600 text-sm font-medium flex items-center cursor-pointer">
          See details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

interface AnalyticsCardProps {
  todayIncome: string;
  chartData?: number[];
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ todayIncome, chartData = [30, 40, 45, 50, 55, 60, 65] }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h3 className="text-gray-600 text-sm font-medium mb-2">Analytics</h3>
      <div className="text-2xl font-bold text-blue-600 mb-4">{todayIncome}</div>
      <p className="text-gray-500 text-sm mb-4">Today's Income</p>
      
      <div className="flex items-end h-32 mt-4">
        {chartData.map((value, index) => (
          <div 
            key={index} 
            className="flex-1 mx-0.5"
            style={{ height: `${value}%` }}
          >
            <div className="bg-green-400 h-full rounded-t-sm"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardCards: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to your store dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Product Overview"
          value="50000.00$"
          subtext="Total Sales"
          change={{ value: 25, positive: true }}
          onClick={() => console.log('Product Overview clicked')}
        />
        
        <StatCard
          title="Active sales"
          value="28000.00$"
          subtext="per month"
          change={{ value: 15, positive: true }}
          onClick={() => console.log('Active sales clicked')}
        />
        
        <StatCard
          title="Product Revenue"
          value="16000.00$"
          subtext="last month"
          change={{ value: 8, positive: true }}
          onClick={() => console.log('Product Revenue clicked')}
        />
      </div>
      
      <AnalyticsCard todayIncome="15000.00$" />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-medium mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center p-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-medium">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-medium">Order #{Math.floor(Math.random() * 10000)}</h4>
                  <p className="text-sm text-gray-500">Customer purchased {Math.floor(Math.random() * 5) + 1} items</p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-blue-600 text-sm font-medium flex items-center cursor-pointer">
            View all orders
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-gray-800 font-medium mb-4">Popular Products</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center p-3 border-b border-gray-100">
                <div className="w-12 h-12 rounded-md bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-medium">Product #{index + 1}</h4>
                  <p className="text-sm text-gray-500">${Math.floor(Math.random() * 100) + 20}.00</p>
                </div>
                <div className="ml-auto">
                  <span className="text-gray-600">
                    {Math.floor(Math.random() * 100) + 20} sold
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-blue-600 text-sm font-medium flex items-center cursor-pointer">
            View all products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;