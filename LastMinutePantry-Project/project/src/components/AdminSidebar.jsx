import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package,
  ShoppingBag,
  Truck,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'User Management', path: '/admin/users' },
    { icon: Package, label: 'Product Management', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Order Management', path: '/admin/orders' },
    { icon: Truck, label: 'Delivery Management', path: '/admin/deliveries' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help Center', path: '/admin/help' },
    { icon: LogOut, label: 'Log Out', path: '/role-selection', onClick: logout },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="px-4 text-xs font-semibold text-gray-400 mb-4">SUPPORT</p>
          <nav className="space-y-1">
            {supportItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={item.onClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}