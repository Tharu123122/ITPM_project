import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold">Last Minute Pantry</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About Last Minute Pantry</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact us</Link>
              <Link to="/about-waste" className="text-gray-600 hover:text-gray-900">About Food waste</Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">Your Profile</Link>
              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                <ShoppingBag className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="grid grid-cols-2">
        <div className="bg-green-800 p-12 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold text-white mb-6">
              Food From Bakeries, Restaurant, Supermarkets and More
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 rounded-lg pl-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
        <div 
          className="bg-yellow-300"
          style={{
            backgroundImage: "url('path-to-your-pattern.png')",
            backgroundSize: 'cover'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Pasta dish"
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
            <a href="#" className="text-blue-500 hover:text-blue-600">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-red-500 hover:text-red-600">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-red-600 hover:text-red-700">
              <span className="sr-only">Google</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}