import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function CustomerHome() {
  const { user } = useAuth();
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    if (user) {
      const hour = new Date().getHours();
      let greeting = '';
      if (hour < 12) greeting = 'Good morning';
      else if (hour < 18) greeting = 'Good afternoon';
      else greeting = 'Good evening';
      
      setWelcomeMessage(`${greeting}, ${user.name}!`);
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="grid grid-cols-2">
        <div className="bg-green-800 p-12 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-white mb-2">
              {welcomeMessage}
            </h1>
            <p className="text-green-100 mb-6">
              Find great deals on quality products in {user?.city || 'your area'}
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 rounded-lg pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
        <div className="bg-yellow-300">
          <img
            src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Fresh food"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Terms and About Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Terms & Conditions */}
          <div>
            <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
            <ul className="space-y-2">
              <li>By using Last Minute Pantry, you agree to our terms.</li>
              <li>Orders are subject to availability and vendor policies.</li>
              <li>AI-based demand predictions help optimize stock but do not guarantee item availability.</li>
              <li>No refunds or exchanges for perishable items unless faulty.</li>
              <li>Users must provide accurate details for orders and delivery.</li>
              <li>Promotions and discounts may change without prior notice.</li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h2 className="text-xl font-bold mb-4">About us</h2>
            <ul className="space-y-2">
              <li>✓ Our Mission – Reduce food waste and provide affordable, last-minute grocery deals.</li>
              <li>✓ How It Works – Connects vendors with surplus stock to customers seeking discounts.</li>
              <li>✓ AI-Powered Predictions – Helps vendors optimize inventory and prevent waste.</li>
              <li>✓ Customer Benefits – Access fresh products at lower prices.</li>
              <li>✓ Vendor Support – Efficient stock management and reduced losses.</li>
              <li>✓ Our Vision – A smarter, more sustainable way to shop and save food.</li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Follow Us On</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-pink-500 hover:text-pink-600">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Add other social media icons here */}
          </div>
        </div>
      </div>
    </div>
  );
}