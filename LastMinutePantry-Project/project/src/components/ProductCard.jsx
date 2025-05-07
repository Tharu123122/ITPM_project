import { useState } from 'react';
import { Edit2, Trash2, Clock, Package } from 'lucide-react';
import { ProductEditModal } from './ProductEditModal';

export function ProductCard({ product, onDelete, onUpdate }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const calculateDiscount = () => {
    const discount = ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100;
    return Math.round(discount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
            {calculateDiscount()}% OFF
          </div>
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
            {product.category}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Original Price</span>
              <span className="line-through text-gray-400">LKR {product.originalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Discounted Price</span>
              <span className="text-green-600 font-semibold">LKR {product.discountedPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Quantity</span>
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4 text-gray-400" />
                <span>{product.quantity}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Expires</span>
              <div className="flex items-center gap-1 text-orange-600">
                <Clock className="h-4 w-4" />
                <span>{formatDate(product.expiryDate)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ProductEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={product}
        onUpdate={onUpdate}
      />
    </>
  );
}