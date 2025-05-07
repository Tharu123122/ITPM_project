import { useState } from 'react';
import { Filter, MapPin } from 'lucide-react';
import { TrackingModal } from '../components/TrackingModal';

export function DriverDeliveries() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // Mock data for demonstration
  const deliveries = [
    {
      id: 1,
      customer: "John Doe",
      pickup: "Joe's Bakery",
      dropoff: "123 Main St",
      items: 3,
      earnings: 1250.00,
      status: "pending",
      orderTime: "2024-03-20 14:30"
    },
    {
      id: 2,
      customer: "Jane Smith",
      pickup: "Green Market",
      dropoff: "456 Oak Ave",
      items: 2,
      earnings: 1500.00,
      status: "in-progress",
      orderTime: "2024-03-20 15:15"
    },
    {
      id: 3,
      customer: "Mike Johnson",
      pickup: "Fresh Foods",
      dropoff: "789 Pine St",
      items: 4,
      earnings: 1875.00,
      status: "pending",
      orderTime: "2024-03-20 15:45"
    }
  ];

  const filteredDeliveries = deliveries.filter(delivery => 
    statusFilter === 'all' || delivery.status === statusFilter
  );

  const handleTrackDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setIsTrackingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Deliveries</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">Order #{delivery.id}</h3>
                  <p className="text-gray-600">{delivery.orderTime}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  delivery.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {delivery.status === 'pending' ? 'Pending' : 'In Progress'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Customer</p>
                    <p className="font-medium">{delivery.customer}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Pickup Location</p>
                    <p className="font-medium">{delivery.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Dropoff Location</p>
                    <p className="font-medium">{delivery.dropoff}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">Items</p>
                    <p className="font-medium">{delivery.items} items</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Earnings</p>
                    <p className="font-medium text-green-600">LKR {delivery.earnings.toFixed(2)}</p>
                  </div>
                  <div className="pt-4 space-y-2">
                    {delivery.status === 'in-progress' && (
                      <button 
                        onClick={() => handleTrackDelivery(delivery)}
                        className="w-full py-2 px-4 rounded-lg font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center justify-center gap-2"
                      >
                        <MapPin className="h-5 w-5" />
                        Track Delivery
                      </button>
                    )}
                    <button 
                      className={`w-full py-2 px-4 rounded-lg font-medium ${
                        delivery.status === 'pending'
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {delivery.status === 'pending' ? 'Accept Delivery' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TrackingModal
          isOpen={isTrackingModalOpen}
          onClose={() => setIsTrackingModalOpen(false)}
          delivery={selectedDelivery}
        />
      </div>
    </div>
  );
}