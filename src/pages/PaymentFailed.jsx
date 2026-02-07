import { useLocation, Link } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, HelpCircle } from 'lucide-react';

const PaymentFailed = () => {
  const location = useLocation();
  const { error, amount } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Failed Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Failed Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>

          {/* Failed Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We couldn't process your payment. Please try again.
          </p>

          {/* Error Details */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-8">
              <p className="text-sm text-red-800 dark:text-red-300">
                <strong>Error:</strong> {error}
              </p>
            </div>
          )}

          {/* Common Reasons */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              Common Reasons for Payment Failure
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mt-1">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mt-1">•</span>
                <span>Incorrect card details (number, CVV, or expiry date)</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mt-1">•</span>
                <span>Card has been declined by your bank</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mt-1">•</span>
                <span>Network or connection issues</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <span className="text-red-500 mt-1">•</span>
                <span>Card has expired or been blocked</span>
              </li>
            </ul>
          </div>

          {/* What to Do Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              What Should I Do?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Check Your Card Details
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Make sure your card number, CVV, and expiry date are correct.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Contact Your Bank
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your bank may have blocked the transaction for security reasons.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Try a Different Payment Method
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Use another card or payment method to complete your purchase.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>

          {/* Amount Info */}
          {amount && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Amount: <strong className="text-gray-900 dark:text-white">${amount.toFixed(2)}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Still having issues?
          </p>
          <Link
            to="/support"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;