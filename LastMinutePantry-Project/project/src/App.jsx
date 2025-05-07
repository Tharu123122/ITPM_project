import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { RoleSelection } from './pages/RoleSelection';
import { CustomerAuth } from './pages/CustomerAuth';
import { VendorAuth } from './pages/VendorAuth';
import { DriverAuth } from './pages/DriverAuth';
import { AdminAuth } from './pages/AdminAuth';
import { CustomerHome } from './pages/CustomerHome';
import { CustomerProfile } from './pages/CustomerProfile';
import { Marketplace } from './pages/Marketplace';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { VendorDashboard } from './pages/VendorDashboard';
import { VendorProducts } from './pages/VendorProducts';
import { VendorProfile } from './pages/VendorProfile';
import { DriverDashboard } from './pages/DriverDashboard';
import { DriverDeliveries } from './pages/DriverDeliveries';
import { DriverProfile } from './pages/DriverProfile';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { AdminOrders } from './pages/AdminOrders';
import { AdminDeliveries } from './pages/AdminDeliveries';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/role-selection" replace />} />
              <Route path="/role-selection" element={<RoleSelection />} />
              <Route path="/customer/auth" element={<CustomerAuth />} />
              <Route path="/vendor/auth" element={<VendorAuth />} />
              <Route path="/driver/auth" element={<DriverAuth />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              
              {/* Protected Customer Routes */}
              <Route
                path="/customer/*"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <>
                      <Navbar userType="customer" />
                      <Routes>
                        <Route path="/home" element={<CustomerHome />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/profile" element={<CustomerProfile />} />
                      </Routes>
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Protected Vendor Routes */}
              <Route
                path="/vendors/*"
                element={
                  <ProtectedRoute allowedRoles={['vendor']}>
                    <>
                      <Navbar userType="vendor" />
                      <Routes>
                        <Route path="/" element={<VendorDashboard />} />
                        <Route path="/products" element={<VendorProducts />} />
                        <Route path="/profile" element={<VendorProfile />} />
                      </Routes>
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Protected Driver Routes */}
              <Route
                path="/drivers/*"
                element={
                  <ProtectedRoute allowedRoles={['driver']}>
                    <>
                      <Navbar userType="driver" />
                      <Routes>
                        <Route path="/" element={<DriverDashboard />} />
                        <Route path="/deliveries" element={<DriverDeliveries />} />
                        <Route path="/profile" element={<DriverProfile />} />
                      </Routes>
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Routes>
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/products" element={<AdminProducts />} />
                      <Route path="/orders" element={<AdminOrders />} />
                      <Route path="/deliveries" element={<AdminDeliveries />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;