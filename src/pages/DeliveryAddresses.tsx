import React, { useState } from 'react';
import NavIcons from '../component/NavIcons';

const DeliveryAddresses = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Main Warehouse', address: '123 Cairo St, Cairo', city: 'Cairo', country: 'Egypt', isDefault: true },
    { id: 2, name: 'Secondary Storage', address: '456 Alexandria Rd, Alexandria', city: 'Alexandria', country: 'Egypt', isDefault: false },
    { id: 3, name: 'Local Pickup', address: '789 Giza Blvd, Giza', city: 'Giza', country: 'Egypt', isDefault: false }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    country: 'Egypt',
    isDefault: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If new address is set as default, update other addresses
    let updatedAddresses = [...addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({
        ...addr,
        isDefault: false
      }));
    }
    
    if (editingAddress) {
      // Update existing address
      setAddresses(updatedAddresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...newAddress, id: editingAddress.id }
          : addr
      ));
    } else {
      // Add new address with a new ID
      const newId = Math.max(...addresses.map(addr => addr.id), 0) + 1;
      setAddresses([
        ...updatedAddresses,
        {
          ...newAddress,
          id: newId
        }
      ]);
    }
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setNewAddress({
      name: '',
      address: '',
      city: '',
      country: 'Egypt',
      isDefault: false
    });
    setShowForm(false);
    setEditingAddress(null);
  };

  const startEdit = (address) => {
    setNewAddress({ ...address });
    setEditingAddress(address);
    setShowForm(true);
  };

  const setAsDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    if (addressToDelete?.isDefault && addresses.length > 1) {
      // If deleting default and there are other addresses, make the first one default
      const remainingAddresses = addresses.filter(addr => addr.id !== id);
      remainingAddresses[0].isDefault = true;
      setAddresses(remainingAddresses);
    } else if (!addressToDelete?.isDefault) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavIcons />
      
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Delivery Addresses
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage your pickup and delivery locations
              </p>
            </div>
            
            <button 
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                       shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center
                       text-sm sm:text-base font-medium"
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setShowForm(true);
                }
              }}
            >
              <i className={`bx ${showForm ? 'bx-x' : 'bx-plus'} mr-2 text-lg`}></i>
              {showForm ? 'Cancel' : 'Add New Address'}
            </button>
          </div>
          
          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
              <div className="flex items-center mb-4">
                <i className="bx bx-map-pin text-blue-500 text-xl mr-2"></i>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-tag mr-1"></i>
                      Location Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newAddress.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                               focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                               text-sm sm:text-base"
                      placeholder="e.g. Main Warehouse, Home Office"
                    />
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-current-location mr-1"></i>
                      Country *
                    </label>
                    <select
                      name="country"
                      value={newAddress.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                               focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                               text-sm sm:text-base"
                    >
                      <option value="Egypt">Egypt</option>
                      <option value="UAE">UAE</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Lebanon">Lebanon</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-map mr-1"></i>
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newAddress.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                               focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                               text-sm sm:text-base"
                      placeholder="Enter full street address"
                    />
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="bx bx-buildings mr-1"></i>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 
                               focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors
                               text-sm sm:text-base"
                      placeholder="City name"
                    />
                  </div>
                  
                  <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={newAddress.isDefault}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        <i className="bx bx-star mr-1"></i>
                        Set as default address
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 
                             hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white rounded-lg 
                             hover:bg-blue-600 transition-colors text-sm sm:text-base font-medium"
                  >
                    <i className="bx bx-check mr-2"></i>
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Addresses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 
                          p-4 sm:p-6 border-2 ${address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-100'}`}
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate pr-2">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                        <i className="bx bx-star mr-1"></i>
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    <button 
                      onClick={() => startEdit(address)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Edit address"
                    >
                      <i className="bx bx-edit text-lg"></i>
                    </button>
                  </div>
                </div>
                
                {/* Address Details */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600 flex items-start">
                    <i className="bx bx-map mr-2 mt-0.5 text-gray-400"></i>
                    <span className="break-words">{address.address}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <i className="bx bx-current-location mr-2 text-gray-400"></i>
                    {address.city}, {address.country}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  {!address.isDefault && (
                    <button 
                      onClick={() => setAsDefault(address.id)}
                      className="flex items-center justify-center px-3 py-2 text-sm text-blue-600 
                               hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <i className="bx bx-star mr-2"></i>
                      Set as Default
                    </button>
                  )}
                  
                  <button 
                    onClick={() => deleteAddress(address.id)}
                    className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-colors
                              ${address.isDefault 
                                ? 'text-gray-400 cursor-not-allowed' 
                                : 'text-red-600 hover:text-red-800 hover:bg-red-50'}`}
                    disabled={address.isDefault}
                    title={address.isDefault ? 'Cannot delete default address' : 'Delete address'}
                  >
                    <i className="bx bx-trash mr-2"></i>
                    {address.isDefault ? 'Cannot Delete' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {addresses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <i className="bx bx-map-pin text-6xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
              <p className="text-gray-600 mb-6">Add your first delivery address to get started</p>
              <button 
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <i className="bx bx-plus mr-2"></i>
                Add First Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddresses;