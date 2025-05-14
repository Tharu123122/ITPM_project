import { AdminSidebar } from '../components/AdminSidebar';
import { Users, Store, Truck, ShoppingBag } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold">56</p>
              </div>
              <Store className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Drivers</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">2,567</p>
              </div>
              <ShoppingBag className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-500">Activity feed will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}