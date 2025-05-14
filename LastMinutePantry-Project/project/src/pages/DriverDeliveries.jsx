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