import { useState } from 'react';
import { Filter, MapPin } from 'lucide-react';
import { TrackingModal } from '../components/TrackingModal';

export function DriverDeliveries() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
