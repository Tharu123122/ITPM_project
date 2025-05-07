import { Link } from 'react-router-dom';
import { Store, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

export function RoleSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to LastMinutePantry</h1>
          <p className="text-xl text-gray-600">Choose how you'd like to use our platform</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Vendor Card */}
          <Link
            to="/vendor/auth"
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-8 text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Store className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I am selling near-expired goods</h2>
              <p className="text-gray-600 mb-6">
                List your near-expiry items and reduce waste while maintaining profitability
              </p>
              <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                Join as Vendor
              </span>
            </div>
          </Link>

          {/* Customer Card */}
          <Link
            to="/customer/auth"
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-8 text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I am buying near-expired goods</h2>
              <p className="text-gray-600 mb-6">
                Get great deals on quality products while helping reduce food waste
              </p>
              <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Driver Card */}
          <Link
            to="/driver/auth"
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="p-8 text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">I am delivering near-expired goods</h2>
              <p className="text-gray-600 mb-6">
                Join our delivery network and earn money while helping the community
              </p>
              <span className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700">
                Become a Driver
              </span>
            </div>
          </Link>
        </div>

        {/* Admin Login Link */}
        <div className="text-center mt-12">
          <Link
            to="/admin/auth"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Log in as Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}