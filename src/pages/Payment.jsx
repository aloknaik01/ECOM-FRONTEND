import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "../components/payment/StripeCheckout";
import { ArrowLeft, ShoppingBag } from "lucide-react";

// Load Stripe - use environment variable or test key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51QnmKSD6B2jjw9MevSMjT3zvCVvAkRWCqz6fD4tW7bNpvHPNGMLqMEy9oL9sZP3E6PqhKQOxAzgvWPzChDo9DWtH00i1YvDIAq",
);

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clientSecret, totalAmount } = location.state || {};

  useEffect(() => {
    // Redirect if accessed directly without payment data
    if (!clientSecret || !totalAmount) {
      navigate("/checkout");
    }
  }, [clientSecret, totalAmount, navigate]);

  if (!clientSecret || !totalAmount) {
    return null;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#0284c7",
        colorBackground: "#ffffff",
        colorText: "#1f2937",
        colorDanger: "#ef4444",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        spacingUnit: "4px",
        borderRadius: "8px",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Checkout
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Complete Your Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Securely pay for your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise} options={options}>
              <StripeCheckout
                clientSecret={clientSecret}
                totalAmount={totalAmount}
              />
            </Elements>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Total Amount</span>
                  <span className="font-semibold">
                    ${totalAmount?.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                    <span>Total to Pay</span>
                    <span>${totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>SSL encrypted payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>100% secure checkout</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  We accept
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">
                      VISA
                    </span>
                  </div>
                  <div className="w-12 h-8 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-red-600">MC</span>
                  </div>
                  <div className="w-12 h-8 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-700">
                      AMEX
                    </span>
                  </div>
                  <div className="w-12 h-8 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                    <span className="text-xs font-bold text-orange-600">
                      DISC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
