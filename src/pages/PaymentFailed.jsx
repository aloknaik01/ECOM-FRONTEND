import { useLocation, useNavigate, Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, AlertTriangle, Home } from 'lucide-react';

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, orderId } = location.state || {};

  const handleRetry = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <XCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Failed
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            We couldn't process your payment
          </p>
          
          <p className="text-lg text-gray-500 dark:text-gray-500">
            Don't worry, your order is saved and no charges were made
          </p>
        </div>

        {/* Error Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">
                    Error Details
                  </h3>
                  <p className="text-red-800 dark:text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order ID if available */}
          {orderId && (
            <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Order ID (Pending Payment)
              </p>
              <p className="font-mono text-sm text-gray-900 dark:text-white">
                {orderId.slice(0, 20)}...
              </p>
            </div>
          )}

          {/* Common Reasons */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Common Reasons for Payment Failure
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Insufficient funds in your account</p>
              </div>
              
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Incorrect card details (number, expiry, or CVV)</p>
              </div>
              
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Card declined by your bank</p>
              </div>
              
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Card has expired or reached its limit</p>
              </div>
              
              <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                <p>Network connectivity issues</p>
              </div>
            </div>
          </div>

          {/* What to Do Next */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-4">
              What You Can Do
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Check Your Card Details
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Verify card number, expiry date, and CVV are correct
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Contact Your Bank
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Ensure your card is activated and has sufficient funds
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-200">
                    Try a Different Card
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    Use an alternative payment method if available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <Link
              to="/cart"
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Still having issues?{' '}
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

export default PaymentFailed;