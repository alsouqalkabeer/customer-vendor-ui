import React from 'react';
import NavIcons from '../component/NavIcons';

const MarketProducts = () => {
  const products = [
    { id: 1, name: 'Teddy Bear XL', price: 29.99, stock: 15, category: 'Bears', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Plush Bunny', price: 24.99, stock: 8, category: 'Rabbits', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Soft Elephant', price: 34.99, stock: 12, category: 'Jungle', image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Teddy Bear Small', price: 19.99, stock: 20, category: 'Bears', image: 'https://via.placeholder.com/50' }
  ];

  return (
    <div className="flex-grow">
      <NavIcons />
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Market Products</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200">
            + Add New Product
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span>Bears</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">35</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Rabbits</span>
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">18</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Jungle</span>
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Sea Animals</span>
                <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full">8</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Product Inventory</h2>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>All Categories</option>
                  <option>Bears</option>
                  <option>Rabbits</option>
                  <option>Jungle</option>
                </select>
              </div>
            </div>
            
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
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">SKU #{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 5 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketProducts;