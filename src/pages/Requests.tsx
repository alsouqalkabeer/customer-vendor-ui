import React, { useState } from 'react';
import NavIcons from '../component/NavIcons';

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const itemsPerPage = 10;

  const [requests, setRequests] = useState([
    { id: 1, product: 'Teddy Bear XL', customer: 'Ahmed Mohamed', date: '2024-05-10', status: 'Pending', priority: 'High', value: 29.99, customerEmail: 'ahmed.mohamed@email.com' },
    { id: 2, product: 'Plush Bunny', customer: 'Sarah Johnson', date: '2024-05-09', status: 'Approved', priority: 'Medium', value: 24.99, customerEmail: 'sarah.johnson@email.com' },
    { id: 3, product: 'Soft Elephant', customer: 'Mahmoud Ali', date: '2024-05-08', status: 'Shipped', priority: 'Low', value: 34.99, customerEmail: 'mahmoud.ali@email.com' },
    { id: 4, product: 'Teddy Bear Small', customer: 'Fatima Zahra', date: '2024-05-07', status: 'Delivered', priority: 'Medium', value: 19.99, customerEmail: 'fatima.zahra@email.com' },
    { id: 5, product: 'Ocean Whale', customer: 'John Smith', date: '2024-05-06', status: 'Pending', priority: 'High', value: 27.99, customerEmail: 'john.smith@email.com' },
    { id: 6, product: 'Lion King', customer: 'Maria Garcia', date: '2024-05-05', status: 'Approved', priority: 'Low', value: 32.99, customerEmail: 'maria.garcia@email.com' },
    { id: 7, product: 'Cute Penguin', customer: 'Ali Hassan', date: '2024-05-04', status: 'Shipped', priority: 'Medium', value: 22.99, customerEmail: 'ali.hassan@email.com' },
    { id: 8, product: 'Pink Unicorn', customer: 'Emma Wilson', date: '2024-05-03', status: 'Delivered', priority: 'High', value: 38.99, customerEmail: 'emma.wilson@email.com' }
  ]);

  // Filter and sort requests
  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = 
        request.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toString().includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'customer':
          aValue = a.customer.toLowerCase();
          bValue = b.customer.toLowerCase();
          break;
        case 'value':
          aValue = a.value;
          bValue = b.value;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Approved': 'bg-blue-100 text-blue-800 border-blue-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Delivered': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-orange-100 text-orange-700',
      'Low': 'bg-green-100 text-green-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const updateRequestStatus = (requestId, newStatus) => {
    setRequests(requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
  };

  const toggleSelectAll = () => {
    if (selectedRequests.length === paginatedRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(paginatedRequests.map(req => req.id));
    }
  };

  const toggleSelectRequest = (requestId) => {
    if (selectedRequests.includes(requestId)) {
      setSelectedRequests(selectedRequests.filter(id => id !== requestId));
    } else {
      setSelectedRequests([...selectedRequests, requestId]);
    }
  };

  // Stats calculation
  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'Pending').length,
    approved: requests.filter(r => r.status === 'Approved').length,
    shipped: requests.filter(r => r.status === 'Shipped').length,
    delivered: requests.filter(r => r.status === 'Delivered').length,
    totalValue: requests.reduce((sum, r) => sum + r.value, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavIcons />
      
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Order Requests
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage and process customer order requests
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-sm font-medium">
                <i className="bx bx-export mr-2"></i>
                Export
              </button>
              <button className="w-full sm:w-auto px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-sm font-medium">
                <i className="bx bx-plus mr-2"></i>
                New Request
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <i className="bx bx-list-ul text-blue-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <i className="bx bx-time text-yellow-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <i className="bx bx-check text-blue-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Approved</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.approved}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <i className="bx bx-package text-purple-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Shipped</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.shipped}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <i className="bx bx-check-double text-green-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Delivered</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.delivered}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <i className="bx bx-dollar text-indigo-600 text-lg"></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs text-gray-500">Value</p>
                  <p className="text-lg font-semibold text-gray-900">${stats.totalValue.toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            
            {/* Search and Filters Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <i className="bx bx-list-ul mr-2 text-blue-500"></i>
                  Recent Requests
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filteredRequests.length} of {requests.length})
                  </span>
                </h2>
                
                {selectedRequests.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {selectedRequests.length} selected
                    </span>
                    <button className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                      Process Selected
                    </button>
                  </div>
                )}
              </div>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                <div className="flex-1 relative">
                  <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    placeholder="Search by ID, product, or customer..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="customer">Sort by Customer</option>
                    <option value="value">Sort by Value</option>
                    <option value="status">Sort by Status</option>
                  </select>
                  
                  <button 
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    <i className={`bx bx-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {filteredRequests.length === 0 ? (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <i className="bx bx-list-ul text-6xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || statusFilter !== 'All' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'No order requests have been submitted yet'
                    }
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="block lg:hidden space-y-4">
                    {paginatedRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedRequests.includes(request.id)}
                              onChange={() => toggleSelectRequest(request.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <div>
                              <h3 className="text-sm font-medium text-gray-900">
                                #{request.id} - {request.product}
                              </h3>
                              <p className="text-xs text-gray-500">{request.customer}</p>
                            </div>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-1 text-gray-900">{new Date(request.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Value:</span>
                            <span className="ml-1 text-gray-900 font-medium">${request.value}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Priority:</span>
                            <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${getPriorityColor(request.priority)}`}>
                              {request.priority}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Email:</span>
                            <span className="ml-1 text-gray-900 text-xs truncate">{request.customerEmail}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <button className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            <i className="bx bx-show mr-1"></i>View
                          </button>
                          <button 
                            onClick={() => updateRequestStatus(request.id, 'Approved')}
                            className="px-3 py-1.5 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600"
                          >
                            <i className="bx bx-check mr-1"></i>Process
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectedRequests.length === paginatedRequests.length && paginatedRequests.length > 0}
                              onChange={toggleSelectAll}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </th>
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
                            Value
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
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
                        {paginatedRequests.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedRequests.includes(request.id)}
                                onChange={() => toggleSelectRequest(request.id)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{request.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{request.product}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{request.customer}</div>
                              <div className="text-xs text-gray-500">{request.customerEmail}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(request.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ${request.value}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">
                                <i className="bx bx-show mr-1"></i>View
                              </button>
                              <button 
                                onClick={() => updateRequestStatus(request.id, 'Approved')}
                                className="text-green-600 hover:text-green-900"
                              >
                                <i className="bx bx-check mr-1"></i>Process
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 space-y-3 sm:space-y-0">
                      <div className="text-sm text-gray-500">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results
                      </div>
                      <div className="flex justify-center sm:justify-end space-x-1">
                        <button 
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <i className="bx bx-chevron-left"></i>
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 border rounded-lg text-sm ${
                                currentPage === page
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        
                        <button 
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                          <i className="bx bx-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;