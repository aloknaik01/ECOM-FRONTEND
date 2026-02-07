import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import StripeCheckout from '../components/payment/StripeCheckout';

// Initialize Stripe with your publishable key
// TODO: Replace with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE');



const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get payment data from navigation state
  const { clientSecret, totalAmount } = location.state || {};

  useEffect(() => {
    // Redirect if no payment data
    if (!clientSecret || !totalAmount) {
      navigate('/cart');
    }
  }, [clientSecret, totalAmount, navigate]);

  if (!clientSecret) {
    return null;
  }

  // Stripe Elements appearance customization
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#0284c7',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Checkout
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You're almost there! Enter your payment details to complete the purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise} options={options}>
              <StripeCheckout 
                clientSecret={clientSecret} 
                amount={totalAmount}
              />
            </Elements>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Total Amount</span>
                  <span className="font-semibold">${totalAmount?.toFixed(2)}</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>You Pay</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      ${totalAmount?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-200 mb-3">
                  Your payment is secure
                </h4>
                
                <div className="space-y-2 text-xs text-green-800 dark:text-green-300">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                    </svg>
                    <span>256-bit SSL encryption</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                    </svg>
                    <span>PCI DSS compliant</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    <span>Verified by Stripe</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Accepted payment methods
                </p>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">AMEX</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">DISC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{' '}
            <Link to="/support" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;