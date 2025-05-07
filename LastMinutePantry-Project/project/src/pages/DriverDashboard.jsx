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

  useEffect(() => {
    // Fetch driver stats
    // This would be replaced with actual API call in production
    setStats({
      totalDeliveries: 8,
      earnings: 145.50,
      activeHours: 6.5,
      totalDistance: 45
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Hi, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome to your driver dashboard
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Today's Deliveries</p>
                <p className="text-2xl font-bold">{stats.totalDeliveries}</p>
              </div>
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold">LKR {stats.earnings.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Hours</p>
                <p className="text-2xl font-bold">{stats.activeHours}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Distance</p>
                <p className="text-2xl font-bold">{stats.totalDistance} km</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Weekly Performance Chart Placeholder */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Performance metrics visualization will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}