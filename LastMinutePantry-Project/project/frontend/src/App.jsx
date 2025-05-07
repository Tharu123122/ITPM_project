import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
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
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Redirect root to role-selection */}
              <Route path="/" element={<Navigate to="/role-selection" replace />} />
              
              {/* Role Selection Route */}
              <Route path="/role-selection" element={<RoleSelection />} />
              
              {/* Auth Routes */}
              <Route path="/customer/auth" element={<CustomerAuth />} />
              <Route path="/vendor/auth" element={<VendorAuth />} />
              <Route path="/driver/auth" element={<DriverAuth />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              
              {/* Customer Routes with Navbar */}
              <Route
                path="/customer/*"
                element={
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
                }
              />

              {/* Vendor Routes with Navbar */}
              <Route
                path="/vendors/*"
                element={
                  <>
                    <Navbar userType="vendor" />
                    <Routes>
                      <Route path="/" element={<VendorDashboard />} />
                      <Route path="/products" element={<VendorProducts />} />
                      <Route path="/profile" element={<VendorProfile />} />
                    </Routes>
                  </>
                }
              />

              {/* Driver Routes with Navbar */}
              <Route
                path="/drivers/*"
                element={
                  <>
                    <Navbar userType="driver" />
                    <Routes>
                      <Route path="/" element={<DriverDashboard />} />
                      <Route path="/deliveries" element={<DriverDeliveries />} />
                    </Routes>
                  </>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                  </Routes>
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