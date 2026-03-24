import { useEffect, useMemo, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Wallet, Building2, Landmark, CheckCircle, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { orderAPI } from '../utils/api';
import { clearCart } from '../store/slices/cartSlice';

const stripePromise = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  : null;

const OnlinePaymentForm = ({ amount, onSuccess, onFailure }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleOnlinePay = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    setProcessing(false);

    if (error) {
      onFailure(error.message || 'Payment failed.');
      return;
    }

    if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
      onSuccess(paymentIntent?.id || 'stripe-payment');
      return;
    }

    onFailure(`Payment status: ${paymentIntent?.status || 'unknown'}`);
  };

  return (
    <div className="mt-4">
      <div className="mb-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700">
        <PaymentElement />
      </div>
      <button
        type="button"
        onClick={handleOnlinePay}
        disabled={processing || !stripe || !elements}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
      >
        {processing ? 'Processing payment...' : `Pay ₹${amount.toFixed(2)}`}
      </button>
    </div>
  );
};

const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amountParam = searchParams.get('amount');
  const clientSecret =
    location.state?.clientSecret ||
    (orderId ? sessionStorage.getItem(`paymentIntent_${orderId}`) : null);
  const amount = useMemo(() => {
    const parsed = Number(amountParam);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }, [amountParam]);
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!orderId) {
      navigate('/cart');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  const paymentMethods = [
    {
      key: 'cod',
      label: 'Cash on Delivery',
      description: 'Pay at your doorstep when order is delivered.',
      icon: Wallet
    },
    {
      key: 'upi',
      label: 'UPI',
      description: 'Pay instantly using any UPI app.',
      icon: Building2
    },
    {
      key: 'netbanking',
      label: 'Net Banking',
      description: 'Pay directly from your bank account.',
      icon: Landmark
    },
    {
      key: 'card',
      label: 'Credit / Debit Card',
      description: 'Secure card payment via payment gateway.',
      icon: CreditCard
    }
  ];

  const isOnlineMethod = selectedMethod !== 'cod';

  const handleCodPayment = async () => {
    setProcessing(true);
    try {
      await orderAPI.confirmCOD(orderId);
      dispatch(clearCart());
      sessionStorage.removeItem(`paymentIntent_${orderId}`);
      toast.success('Order confirmed with Cash on Delivery.');
      navigate('/payment/success', {
        state: {
          amount,
          paymentIntentId: `COD-${orderId}`
        }
      });
    } catch (error) {
      toast.error(error.message || 'Failed to confirm Cash on Delivery.');
      navigate('/payment/failed', {
        state: {
          amount,
          error: error.message || 'COD confirmation failed'
        }
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleOnlineSuccess = (paymentIntentId) => {
    dispatch(clearCart());
    sessionStorage.removeItem(`paymentIntent_${orderId}`);
    toast.success('Payment successful!');
    navigate('/payment/success', {
      state: { amount, paymentIntentId }
    });
  };

  const handleOnlineFailure = (errorMessage) => {
    toast.error(errorMessage);
    navigate('/payment/failed', {
      state: { amount, error: errorMessage }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Payment Method
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select one method to complete payment for your order.
          </p>

          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const active = selectedMethod === method.key;
              return (
                <button
                  key={method.key}
                  type="button"
                  onClick={() => setSelectedMethod(method.key)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    active
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 text-primary-600 dark:text-primary-400" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{method.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {isOnlineMethod ? (
            <>
              {!clientSecret || !stripePromise ? (
                <div className="mt-6 p-4 rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Online payment is unavailable. Make sure `VITE_STRIPE_PUBLISHABLE_KEY` is set and start payment from checkout again.
                  </p>
                </div>
              ) : (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <OnlinePaymentForm
                    amount={amount}
                    onSuccess={handleOnlineSuccess}
                    onFailure={handleOnlineFailure}
                  />
                </Elements>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={handleCodPayment}
              disabled={processing}
              className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {processing ? 'Confirming...' : 'Confirm Cash on Delivery'}
            </button>
          )}

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {isOnlineMethod ? (
              <>
                <Lock className="w-4 h-4 text-green-500" />
                Secure payment via Stripe
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                COD order confirmation enabled
              </>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Order ID
          </p>
          <p className="font-mono text-sm text-gray-900 dark:text-white break-all mb-4">{orderId}</p>

          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>Total Payable</span>
            <span className="font-bold">₹{amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;