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
      earnings: 12.50,
      status: "pending",
      orderTime: "2024-03-20 14:30"
    },
    {
      id: 2,
      customer: "Jane Smith",
      pickup: "Green Market",
      dropoff: "456 Oak Ave",
      items: 2,
      earnings: 15.00,
      status: "in-progress",
      orderTime: "2024-03-20 15:15"
    },
    {
      id: 3,
      customer: "Mike Johnson",
      pickup: "Fresh Foods",
      dropoff: "789 Pine St",
      items: 4,
      earnings: 18.75,
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