import React from 'react';
import NavIcons from '../component/NavIcons';

const MerchantServices = () => {
  const services = [
    { id: 1, name: 'Express Delivery', status: 'Active', description: 'Same-day delivery for local orders' },
    { id: 2, name: 'Gift Wrapping', status: 'Active', description: 'Premium gift wrapping services' },
    { id: 3, name: 'Custom Embroidery', status: 'Inactive', description: 'Personalized embroidery on plush toys' },
    { id: 4, name: 'Bulk Orders', status: 'Active', description: 'Special pricing for bulk purchases' }
  ];

  return (
    <div className="flex-grow">
      <NavIcons />
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Merchant Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
            <div className="p-3 bg-blue-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-1">Total Revenue</h2>
            <p className="text-3xl font-bold text-blue-600 mb-2">$12,450</p>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
            <div className="p-3 bg-green-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-1">Completed Orders</h2>
            <p className="text-3xl font-bold text-green-600 mb-2">142</p>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
            <div className="p-3 bg-purple-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-1">Avg. Processing Time</h2>
            <p className="text-3xl font-bold text-purple-600 mb-2">1.8 days</p>
            <p className="text-sm text-gray-500">From order to delivery</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Available Services</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-sm transition-all duration-200">
              + Add New Service
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{service.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                      {service.status === 'Active' ? (
                        <button className="text-red-600 hover:text-red-900">Deactivate</button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">Activate</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantServices;