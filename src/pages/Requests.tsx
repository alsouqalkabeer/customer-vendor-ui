import React from 'react';
import NavIcons from '../component/NavIcons';

const Requests = () => {
  const requests = [
    { id: 1, product: 'Teddy Bear XL', customer: 'Ahmed Mohamed', date: '2024-05-10', status: 'Pending' },
    { id: 2, product: 'Plush Bunny', customer: 'Sarah Johnson', date: '2024-05-09', status: 'Approved' },
    { id: 3, product: 'Soft Elephant', customer: 'Mahmoud Ali', date: '2024-05-08', status: 'Shipped' },
    { id: 4, product: 'Teddy Bear Small', customer: 'Fatima Zahra', date: '2024-05-07', status: 'Delivered' }
  ];

  return (
    <div className="flex-grow">
      <NavIcons />
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold mb-6">Order Requests</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Requests</h2>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search requests..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Search
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      #{request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        request.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900">Process</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-500">
              Showing 1 to 4 of 4 results
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;