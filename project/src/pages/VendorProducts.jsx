import { useState } from 'react';
import { Plus } from 'lucide-react';
import { VendorSidebar } from '../components/VendorSidebar';
import { ProductCard } from '../components/ProductCard';
import { AddProductModal } from '../components/AddProductModal';

export function VendorProducts() {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Fresh Bread Bundle',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      originalPrice: 1599.00,
      discountedPrice: 799.00,
      expiryDate: '2024-03-25',
      quantity: '1kg',
      description: 'Freshly baked bread bundle including sourdough and whole wheat varieties.'
    },
    {
      id: '2',
      name: 'Organic Vegetables Pack',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      originalPrice: 2499.00,
      discountedPrice: 1249.00,
      expiryDate: '2024-03-24',
      quantity: '2kg',
      description: 'Fresh organic vegetables including carrots, tomatoes, and leafy greens.'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, ...updatedProduct } : product
    ));
  };

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProducts([...products, product]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorSidebar />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">My Products</h1>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add New Product
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteProduct}
              onUpdate={handleUpdateProduct}
            />
          ))}
        </div>

        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProduct}
        />
      </div>
    </div>
  );
}