import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Download, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, paymentIntentId } = location.state || {};

  useEffect(() => {
    // Redirect if accessed directly without payment data
    if (!amount || !paymentIntentId) {
      navigate('/orders');
    }
  }, [amount, paymentIntentId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Payment Details */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Amount Paid
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${amount?.toFixed(2)}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Payment ID
                </p>
                <p className="text-sm font-mono text-gray-900 dark:text-white break-all">
                  {paymentIntentId?.slice(0, 20)}...
                </p>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              What's Next?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Order Confirmation Email
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You'll receive a confirmation email with your order details shortly.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Order Processing
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We're preparing your items for shipment. This usually takes 1-2 business days.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Shipping Updates
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track your order status and get shipping updates in your orders page.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              <Package className="w-5 h-5" />
              View Order Details
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Receipt Download (Optional) */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Need help with your order?
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

export default PaymentSuccess;