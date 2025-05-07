import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  HelpCircle, 
  LogOut,
  Store
} from 'lucide-react';

export function VendorSidebar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/vendors' },
    { icon: Package, label: 'My Products', path: '/vendors/products' },
    { icon: TrendingUp, label: 'Performance', path: '/vendors/performance' },
    { icon: DollarSign, label: 'Financials', path: '/vendors/financials' },
    { icon: Settings, label: 'Settings', path: '/vendors/settings' },
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help Center', path: '/vendors/help' },
    { icon: LogOut, label: 'Log Out', path: '/role-selection' },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 border-r border-gray-200">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Store className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-xl font-semibold">Store Name</span>
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
                    ? 'bg-green-50 text-green-600'
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