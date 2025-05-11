import React, { useState } from 'react';
import NavIcons from '../component/NavIcons';

const DeliveryAddresses = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Main Warehouse', address: '123 Cairo St, Cairo', city: 'Cairo', country: 'Egypt', isDefault: true },
    { id: 2, name: 'Secondary Storage', address: '456 Alexandria Rd, Alexandria', city: 'Alexandria', country: 'Egypt', isDefault: false },
    { id: 3, name: 'Local Pickup', address: '789 Giza Blvd, Giza', city: 'Giza', country: 'Egypt', isDefault: false }
  ]);

  const [showForm, setShowForm] = useState(false);
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
    
    // Add new address with a new ID
    const newId = Math.max(...addresses.map(addr => addr.id)) + 1;
    setAddresses([
      ...updatedAddresses,
      {
        ...newAddress,
        id: newId
      }
    ]);
    
    // Reset form
    setNewAddress({
      name: '',
      address: '',
      city: '',
      country: 'Egypt',
      isDefault: false
    });
    setShowForm(false);
  };

  const setAsDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="flex-grow">
      <NavIcons />
      <div className="px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Delivery Addresses</h1>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add New Address'}
          </button>
        </div>
        
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g. Main Warehouse"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Street address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="country"
                    value={newAddress.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="Egypt">Egypt</option>
                    <option value="UAE">UAE</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={newAddress.isDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className={`bg-white rounded-lg shadow-sm p-6 border-2 ${address.isDefault ? 'border-blue-500' : 'border-transparent'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{address.name}</h3>
                {address.isDefault && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Default</span>
                )}
              </div>
              <p className="text-gray-600 mb-1">{address.address}</p>
              <p className="text-gray-600 mb-4">{address.city}, {address.country}</p>
              
              <div className="flex justify-between pt-4 border-t border-gray-100">
                {!address.isDefault && (
                  <button 
                    onClick={() => setAsDefault(address.id)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Set as Default
                  </button>
                )}
                <button 
                  onClick={() => deleteAddress(address.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                  disabled={address.isDefault}
                >
                  {address.isDefault ? 'Cannot Delete Default' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddresses;