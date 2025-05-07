import { Package, DollarSign, Users, TrendingUp } from 'lucide-react';
import { VendorSidebar } from '../components/VendorSidebar';

export function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorSidebar />
      
      <div className="ml-64 p-8">
        <h1 className="text-2xl font-bold mb-8">Vendor Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">LKR 123,400</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Orders</p>
                <p className="text-2xl font-bold">56</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Sales Growth</p>
                <p className="text-2xl font-bold">12%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}