import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      navigate('/cart');
      return;
    }

    // Auto redirect to success after 2 seconds (demo mode)
    // In production, this would handle real Stripe payment
    const timer = setTimeout(() => {
      navigate('/payment/success');
    }, 2000);

    return () => clearTimeout(timer);
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-10 h-10 text-primary-600 dark:text-primary-400 animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Processing Payment...
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please wait while we process your payment securely.
        </p>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order ID: <span className="font-mono font-semibold text-gray-900 dark:text-white">{orderId}</span>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Secure Payment Gateway
        </div>
      </div>
    </div>
  );
};

export default Payment;