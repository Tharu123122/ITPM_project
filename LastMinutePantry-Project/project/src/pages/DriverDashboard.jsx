import { useState, useEffect } from 'react';
import { MapPin, Clock, DollarSign, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function DriverDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    earnings: 0,
    activeHours: 0,
    totalDistance: 0
  });
