import React, { useState } from 'react';
import NavIcons from '../component/NavIcons';

const MarketProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const products = [
    { id: 1, name: 'Teddy Bear XL', price: 29.99, stock: 15, category: 'Bears', image: 'https://via.placeholder.com/150', sku: 'TB001' },
    { id: 2, name: 'Plush Bunny', price: 24.99, stock: 8, category: 'Rabbits', image: 'https://via.placeholder.com/150', sku: 'PB002' },
    { id: 3, name: 'Soft Elephant', price: 34.99, stock: 12, category: 'Jungle', image: 'https://via.placeholder.com/150', sku: 'SE003' },
    { id: 4, name: 'Teddy Bear Small', price: 19.99, stock: 20, category: 'Bears', image: 'https://via.placeholder.com/150', sku: 'TB004' },
    { id: 5, name: 'Ocean Whale', price: 27.99, stock: 6, category: 'Sea Animals', image: 'https://via.placeholder.com/150', sku: 'OW005' },
    { id: 6, name: 'Lion King', price: 32.99, stock: 3, category: 'Jungle', image: 'https://via.placeholder.com/150', sku: 'LK006' }
  ];

  const categories = [
    { name: 'Bears', count: 35, color: 'blue' },
    { name: 'Rabbits', count: 18, color: 'purple' },
    { name: 'Jungle', count: 12, color: 'green' },
    { name: 'Sea Animals', count: 8, color: 'cyan' }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockColor = (stock) => {
    if (stock > 10) return 'bg-green-100 text-green-800';
    if (stock > 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getCategoryColor = (name) => {
    const category = categories.find(cat => cat.name === name);
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700'
    };
    return colorMap[category?.color] || 'bg-gray-50 border-gray-200 text-gray-700';
  };

  const getCategoryBadgeColor = (name) => {
    const category = categories.find(cat => cat.name === name);
    const colorMap = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      green: 'bg-green-500',
      cyan: 'bg-cyan-500'
    };
    return colorMap[category?.color] || 'bg-gray-500';
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
                Market Products
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage your product inventory and catalog
              </p>
            </div>
            
            <button className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-sm sm:text-base font-medium">
              <i className="bx bx-plus mr-2 text-lg"></i>
              Add New Product
            </button>
          </div>

          {/* Mobile Category Pills */}
          <div className="block lg:hidden mb-6">
            <div className="flex overflow-x-auto space-x-3 pb-2">
              <button
                onClick={() => setSelectedCategory('All Categories')}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'All Categories'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}
              >
                All ({products.length})
              </button>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 border border-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Categories Sidebar - Hidden on mobile */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="bx bx-category mr-2 text-blue-500"></i>
                  Product Categories
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory('All Categories')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === 'All Categories'
                        ? 'bg-blue-50 border border-blue-200 text-blue-700'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-medium">All Categories</span>
                    <span className={`text-white text-xs px-2 py-1 rounded-full ${
                      selectedCategory === 'All Categories' ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {products.length}
                    </span>
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors border ${
                        selectedCategory === category.name
                          ? getCategoryColor(category.name)
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-white text-xs px-2 py-1 rounded-full ${getCategoryBadgeColor(category.name)}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                
                {/* Search and Filters Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <i className="bx bx-package mr-2 text-blue-500"></i>
                      Product Inventory
                      <span className="ml-2 text-sm font-normal text-gray-500">
                        ({filteredProducts.length} products)
                      </span>
                    </h2>
                    
                    {/* View Mode Toggle - Desktop only */}
                    <div className="hidden sm:flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <i className="bx bx-grid-alt text-lg"></i>
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <i className="bx bx-list-ul text-lg"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Search and Filter Controls */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
                    <div className="flex-1 relative">
                      <i className="bx bx-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                      />
                    </div>
                    
                    {/* Category filter for larger screens */}
                    <div className="hidden lg:block">
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm sm:text-base"
                      >
                        <option>All Categories</option>
                        {categories.map(cat => (
                          <option key={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Products Content */}
                <div className="p-4 sm:p-6">
                  {filteredProducts.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <i className="bx bx-package text-6xl"></i>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                      <p className="text-gray-600 mb-6">
                        {searchTerm || selectedCategory !== 'All Categories' 
                          ? 'Try adjusting your search or filter criteria'
                          : 'Add your first product to get started'
                        }
                      </p>
                      {!searchTerm && selectedCategory === 'All Categories' && (
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          <i className="bx bx-plus mr-2"></i>
                          Add First Product
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Mobile Grid View */}
                      <div className="block sm:hidden">
                        <div className="grid grid-cols-1 gap-4">
                          {filteredProducts.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                              <div className="flex items-start space-x-4">
                                <img 
                                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0" 
                                  src={product.image} 
                                  alt={product.name} 
                                />
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-medium text-gray-900 truncate">
                                    {product.name}
                                  </h3>
                                  <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-lg font-semibold text-gray-900">
                                      ${product.price}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockColor(product.stock)}`}>
                                      {product.stock} in stock
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between mt-3">
                                    <span className="text-xs text-gray-500">{product.category}</span>
                                    <div className="flex space-x-2">
                                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                                        <i className="bx bx-edit text-lg"></i>
                                      </button>
                                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                                        <i className="bx bx-trash text-lg"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Grid View */}
                      <div className={`hidden sm:block ${viewMode === 'grid' ? '' : 'hidden'}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredProducts.map((product) => (
                            <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <img 
                                className="w-full h-48 object-cover" 
                                src={product.image} 
                                alt={product.name} 
                              />
                              <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xl font-semibold text-gray-900">
                                    ${product.price}
                                  </span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockColor(product.stock)}`}>
                                    {product.stock} in stock
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">{product.category}</span>
                                  <div className="flex space-x-2">
                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                      <i className="bx bx-edit"></i>
                                    </button>
                                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                      <i className="bx bx-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Desktop Table View */}
                      <div className={`hidden sm:block ${viewMode === 'list' ? '' : 'hidden'}`}>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Product
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0 h-12 w-12">
                                        <img className="h-12 w-12 rounded-lg object-cover" src={product.image} alt={product.name} />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    ${product.price}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStockColor(product.stock)}`}>
                                      {product.stock} in stock
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.category}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                                      <i className="bx bx-edit mr-1"></i>Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                      <i className="bx bx-trash mr-1"></i>Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketProducts;