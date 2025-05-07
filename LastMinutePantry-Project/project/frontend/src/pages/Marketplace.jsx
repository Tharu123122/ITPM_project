import { useState } from 'react';
import { ShoppingBag, Store, Clock, Filter, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function Marketplace() {
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  // Mock data
  const vendors = [
    { id: '1', name: "Joe's Bakery", type: 'Bakery' },
    { id: '2', name: "Green Market", type: 'Grocery' },
    { id: '3', name: "Fresh Foods", type: 'Supermarket' },
    { id: '4', name: "Nature's Best", type: 'Organic Store' }
  ];

  const products = [
    {
      id: '1',
      name: 'Fresh Bread Bundle',
      vendor: "Joe's Bakery",
      vendorId: '1',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      originalPrice: 1500.00,
      discountedPrice: 750.00,
      expiryDate: '2024-03-25',
      quantity: '1kg',
      description: 'A bundle of freshly baked artisan bread including sourdough, whole wheat, and rye varieties.'
    },
    {
      id: '2',
      name: 'Organic Vegetables Pack',
      vendor: "Green Market",
      vendorId: '2',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      originalPrice: 2400.00,
      discountedPrice: 1200.00,
      expiryDate: '2024-03-24',
      quantity: '2kg',
      description: 'Fresh organic vegetables including carrots, tomatoes, and leafy greens.'
    },
    {
      id: '3',
      name: 'Premium Fruit Box',
      vendor: "Fresh Foods",
      vendorId: '3',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      originalPrice: 3000.00,
      discountedPrice: 2000.00,
      expiryDate: '2024-03-23',
      quantity: '3kg',
      description: 'Selection of premium seasonal fruits perfect for a healthy lifestyle.'
    },
    {
      id: '4',
      name: 'Organic Dairy Pack',
      vendor: "Nature's Best",
      vendorId: '4',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      originalPrice: 3500.00,
      discountedPrice: 2500.00,
      expiryDate: '2024-03-26',
      quantity: 'Various',
      description: 'Organic dairy products including milk, yogurt, and cheese.'
    }
  ];

  const filteredProducts = products
    .filter(product => 
      selectedVendor === 'all' || product.vendorId === selectedVendor
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products or vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedVendor('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedVendor === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Vendors
              </button>
              {vendors.map(vendor => (
                <button
                  key={vendor.id}
                  onClick={() => setSelectedVendor(vendor.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    selectedVendor === vendor.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {vendor.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
                  {Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)}% OFF
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{product.vendor}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center gap-2 text-orange-600 mb-3">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Expires: {product.expiryDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 line-through text-sm">
                      LKR {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xl font-bold text-green-600 ml-2">
                      LKR {product.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}