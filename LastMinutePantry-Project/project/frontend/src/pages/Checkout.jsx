import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { PaymentPortal } from '../components/PaymentPortal';

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, getCartSavings, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Choose type, 2: Delivery details
  const [checkoutType, setCheckoutType] = useState('order'); // 'order' or 'reserve'
  const [showPayment, setShowPayment] = useState(false);
  
  // Customer Information
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // Delivery Information
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    if (checkoutType === 'order') {
      setStep(2);
    } else {
      // For reservations, show payment portal directly
      setShowPayment(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkoutType === 'order') {
      // For orders, show payment after delivery details
      setShowPayment(true);
    }
  };

  const handlePaymentSuccess = () => {
    // Handle successful payment
    clearCart();
    navigate('/customer/home');
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {showPayment && (
        <PaymentPortal
          amount={getCartTotal()}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/customer/cart" className="text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        {checkoutType === 'order' && (
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`flex items-center ${step === 2 ? 'text-gray-400' : 'text-green-600'}`}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                  1
                </div>
                <span className="ml-2">Order Details</span>
              </div>
              <div className={`w-24 h-1 mx-4 ${step === 2 ? 'bg-green-600' : 'bg-gray-200'}`} />
              <div className={`flex items-center ${step === 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-current">
                  2
                </div>
                <span className="ml-2">Delivery Details</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Order/Delivery Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              {step === 1 ? (
                <>
                  <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                  <form onSubmit={handleContinue} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Choose Option</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setCheckoutType('order')}
                          className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                            checkoutType === 'order'
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-500'
                          }`}
                        >
                          <Truck className={`h-6 w-6 ${
                            checkoutType === 'order' ? 'text-green-600' : 'text-gray-400'
                          }`} />
                          <span className={checkoutType === 'order' ? 'text-green-600' : 'text-gray-600'}>
                            Order Now
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutType('reserve')}
                          className={`p-4 border rounded-lg flex flex-col items-center gap-2 ${
                            checkoutType === 'reserve'
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-500'
                          }`}
                        >
                          <Clock className={`h-6 w-6 ${
                            checkoutType === 'reserve' ? 'text-green-600' : 'text-gray-400'
                          }`} />
                          <span className={checkoutType === 'reserve' ? 'text-green-600' : 'text-gray-600'}>
                            Reserve for Later
                          </span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold mt-6"
                    >
                      Continue
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Delivery Time
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select a time slot</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 8 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Instructions (Optional)
                      </label>
                      <textarea
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Any special instructions for delivery?"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-green-600 font-medium">
                      LKR {(item.discountedPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>LKR {getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">You Save</span>
                    <span className="text-green-600">LKR {getCartSavings().toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>LKR {getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}