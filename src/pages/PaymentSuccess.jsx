import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentIntent, amount } = location.state || {};

  useEffect(() => {
    // If no payment data, redirect to home
    if (!paymentIntent) {
      navigate('/');
    }
  }, [paymentIntent, navigate]);

  if (!paymentIntent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Successful! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Thank you for your purchase
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-500">
            Your order has been confirmed and will be processed soon
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Order Confirmed
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Payment ID
                </p>
                <p className="font-mono text-sm text-gray-900 dark:text-white">
                  {paymentIntent.slice(0, 20)}...
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Amount Paid
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${amount?.toFixed(2) || '0.00'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Payment Method
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Credit Card
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Status
                </p>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              What's Next?
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Order Confirmation Email
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    We've sent a confirmation email with your order details
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Order Processing
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Your order is being prepared for shipment
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Shipping Notification
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    You'll receive tracking info once your order ships
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/orders"
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-5 h-5" />
              View My Orders
            </Link>
            
            <Link
              to="/products"
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help with your order?{' '}
            <Link to="/support" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
              Contact Support
            </Link>
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;