import React, { useState } from 'react';
import NavIcons from '../component/NavIcons';

const MerchantServices = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Express Delivery', status: 'Active', description: 'Same-day delivery for local orders', category: 'Delivery', orders: 45 },
    { id: 2, name: 'Gift Wrapping', status: 'Active', description: 'Premium gift wrapping services', category: 'Enhancement', orders: 28 },
    { id: 3, name: 'Custom Embroidery', status: 'Inactive', description: 'Personalized embroidery on plush toys', category: 'Customization', orders: 12 },
    { id: 4, name: 'Bulk Orders', status: 'Active', description: 'Special pricing for bulk purchases', category: 'Pricing', orders: 67 },
    { id: 5, name: 'Product Assembly', status: 'Active', description: 'Pre-assembly service for complex toys', category: 'Enhancement', orders: 23 },
    { id: 6, name: 'Extended Warranty', status: 'Inactive', description: '12-month extended warranty coverage', category: 'Support', orders: 8 }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter services based on search and status
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleServiceStatus = (serviceId) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, status: service.status === 'Active' ? 'Inactive' : 'Active' }
        : service
    ));
  };

  const statsData = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      subtitle: 'Last 30 days',
      icon: 'bx-dollar-circle',
      color: 'blue',
      trend: '+12.5%'
    },
    {
      title: 'Completed Orders',
      value: '142',
      subtitle: 'Last 30 days',
      icon: 'bx-check-circle',
      color: 'green',
      trend: '+8.3%'
    },
    {
      title: 'Processing Time',
      value: '1.8 days',
      subtitle: 'Average delivery',
      icon: 'bx-time-five',
      color: 'purple',
      trend: '-0.2 days'
    },
    {
      title: 'Active Services',
      value: services.filter(s => s.status === 'Active').length.toString(),
      subtitle: `of ${services.length} total`,
      icon: 'bx-cog',
      color: 'indigo',
      trend: `${Math.round((services.filter(s => s.status === 'Active').length / services.length) * 100)}%`
    }
  ];

  const getStatCardStyles = (color) => {
    const styles = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600',
      green: 'bg-green-50 border-green-200 text-green-600',
      purple: 'bg-purple-50 border-purple-200 text-purple-600',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600'
    };
    return styles[color] || styles.blue;
  };

  const getStatIconBg = (color) => {
    const styles = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
      indigo: 'bg-indigo-100'
    };
    return styles[color] || styles.blue;
  };

  const getStatTextColor = (color) => {
    const styles = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      indigo: 'text-indigo-600'
    };
    return styles[color] || styles.blue;
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
                Merchant Services
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage and configure your service offerings
              </p>
            </div>
            
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-sm sm:text-base font-medium"
            >
              <i className={`bx ${showAddForm ? 'bx-x' : 'bx-plus'} mr-2 text-lg`}></i>
              {showAddForm ? 'Cancel' : 'Add New Service'}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {statsData.map((stat, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-sm border-2 p-4 sm:p-6 hover:shadow-md transition-shadow ${getStatCardStyles(stat.color)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 sm:p-3 rounded-lg ${getStatIconBg(stat.color)}`}>
                    <i className={`bx ${stat.icon} text-xl sm:text-2xl ${getStatTextColor(stat.color)}`}></i>
                  </div>
                  <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                    stat.trend.includes('+') ? 'bg-green-100 text-green-600' : 
                    stat.trend.includes('-') ? 'bg-red-100 text-red-600' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-700 mb-1">
                    {stat.title}
                  </h3>
                  <p className={`text-2xl sm:text-3xl font-bold mb-1 ${getStatTextColor(stat.color)}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Service Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="bx bx-plus-circle text-blue-500 mr-2"></i>
                Add New Service
              </h3>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter service name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>Select category</option>
                    <option>Delivery</option>
                    <option>Enhancement</option>
                    <option>Customization</option>
                    <option>Pricing</option>
                    <option>Support</option>
                  </select>
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Describe the service offering"
                  ></textarea>
                </div>
                
                <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Services Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            
            {/* Services Header with Search and Filters */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4 sm:mb-0">
                  <i className="bx bx-cog mr-2 text-blue-500"></i>
                  Available Services
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({filteredServices.length} services)
                  </span>
                </h2>
              </div>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    placeholder="Search services..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  />
                </div>
                
                <div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Services Content */}
            <div className="p-4 sm:p-6">
              {filteredServices.length === 0 ? (
                /* Empty State */
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <i className="bx bx-cog text-6xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || statusFilter !== 'All' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Add your first service to get started'
                    }
                  </p>
                  {!searchTerm && statusFilter === 'All' && (
                    <button 
                      onClick={() => setShowAddForm(true)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <i className="bx bx-plus mr-2"></i>
                      Add First Service
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Mobile Card View */}
                  <div className="block md:hidden space-y-4">
                    {filteredServices.map((service) => (
                      <div key={service.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                              {service.name}
                            </h3>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                              {service.category}
                            </span>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            service.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {service.status}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            <i className="bx bx-package mr-1"></i>
                            {service.orders} orders
                          </span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <i className="bx bx-edit text-lg"></i>
                            </button>
                            <button 
                              onClick={() => toggleServiceStatus(service.id)}
                              className={`p-2 rounded-lg ${
                                service.status === 'Active'
                                  ? 'text-red-600 hover:bg-red-50'
                                  : 'text-green-600 hover:bg-green-50'
                              }`}
                            >
                              <i className={`bx ${service.status === 'Active' ? 'bx-pause' : 'bx-play'} text-lg`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
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
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Orders
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
                        {filteredServices.map((service) => (
                          <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{service.name}</div>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <div className="text-sm text-gray-600 truncate">{service.description}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                                {service.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {service.orders}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                service.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {service.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-4">
                                <i className="bx bx-edit mr-1"></i>Edit
                              </button>
                              <button 
                                onClick={() => toggleServiceStatus(service.id)}
                                className={service.status === 'Active' 
                                  ? 'text-red-600 hover:text-red-900' 
                                  : 'text-green-600 hover:text-green-900'
                                }
                              >
                                <i className={`bx ${service.status === 'Active' ? 'bx-pause' : 'bx-play'} mr-1`}></i>
                                {service.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantServices;