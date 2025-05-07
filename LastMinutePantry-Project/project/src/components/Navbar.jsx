import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, ShoppingCart, Store, Truck, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export function Navbar({ userType = 'customer' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const cartItemsCount = getCartItemsCount();

  const handleLogout = () => {
    logout();
    navigate('/role-selection');
  };

  const renderCustomerNav = () => (
    <div className="flex items-center justify-between h-16">
      <Link to="/customer/home" className="flex items-center space-x-2">
        <ShoppingBag className="h-8 w-8" />
        <span className="text-xl font-bold">LastMinutePantry</span>
      </Link>
      
      <div className="flex space-x-6">
        <Link 
          to="/customer/home" 
          className={`hover:text-green-200 px-3 py-2 rounded-md ${
            location.pathname === '/customer/home' ? 'text-green-200' : ''
          }`}
        >
          Home
        </Link>
        <Link 
          to="/customer/marketplace" 
          className={`hover:text-green-200 px-3 py-2 rounded-md ${
            location.pathname === '/customer/marketplace' ? 'text-green-200' : ''
          }`}
        >
          Marketplace
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/customer/cart" className="hover:text-green-200 relative">
          <ShoppingCart className="h-6 w-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Link>
        <Link to="/customer/profile" className="hover:text-green-200">
          <User className="h-6 w-6" />
        </Link>
        <button onClick={handleLogout} className="hover:text-green-200">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );

  const renderVendorNav = () => (
    <div className="flex items-center justify-between h-16">
      <Link to="/vendors" className="flex items-center space-x-2">
        <Store className="h-8 w-8" />
        <span className="text-xl font-bold">LastMinutePantry Vendor</span>
      </Link>
      
      <div className="flex space-x-6">
        <Link 
          to="/vendors" 
          className={`hover:text-green-200 px-3 py-2 rounded-md ${
            location.pathname === '/vendors' ? 'text-green-200' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/vendors/products" 
          className={`hover:text-green-200 px-3 py-2 rounded-md ${
            location.pathname === '/vendors/products' ? 'text-green-200' : ''
          }`}
        >
          Products
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/vendors/profile" className="hover:text-green-200">
          <User className="h-6 w-6" />
        </Link>
        <button onClick={handleLogout} className="hover:text-green-200">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );

  const renderDriverNav = () => (
    <div className="flex items-center justify-between h-16">
      <Link to="/drivers" className="flex items-center space-x-2">
        <Truck className="h-8 w-8" />
        <span className="text-xl font-bold">LastMinutePantry Driver</span>
      </Link>
      
      <div className="flex space-x-6">
        <Link 
          to="/drivers" 
          className={`hover:text-green-200 px-3 py-2 rounded-md ${
            location.pathname === '/drivers' ? 'text-green-200' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link 
          to="/drivers/deliveries" 
          className={`hover:text-green-200 px-3 py-2 rounded-md ${
            location.pathname === '/drivers/deliveries' ? 'text-green-200' : ''
          }`}
        >
          Deliveries
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/drivers/profile" className="hover:text-green-200">
          <User className="h-6 w-6" />
        </Link>
        <button onClick={handleLogout} className="hover:text-green-200">
          <LogOut className="h-6 w-6" />
        </button>
      </div>
    </div>
  );

  return (
    <nav className="bg-green-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {userType === 'customer' && renderCustomerNav()}
        {userType === 'vendor' && renderVendorNav()}
        {userType === 'driver' && renderDriverNav()}
      </div>
    </nav>
  );
}