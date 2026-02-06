import { Link } from 'react-router-dom';
import { ShoppingCart, Tag, Truck } from 'lucide-react';
import { useSelector } from 'react-redux';

const CartSummary = ({ onApplyCoupon }) => {
  const { items, couponDiscount } = useSelector((state) => state.cart);

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const TAX_RATE = 0.18; // 18% tax
  const FREE_SHIPPING_THRESHOLD = 50;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2;
  const taxAmount = subtotal * TAX_RATE;
  const discount = couponDiscount;
  const total = subtotal + taxAmount + shipping - discount;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Order Summary
      </h2>

      {/* Summary Items */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal ({items.length} items)</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
          <span>Tax (18%)</span>
          <span className="font-semibold">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Shipping</span>
          </div>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600 dark:text-green-400">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for
              free shipping!
            </p>
            <div className="w-full bg-blue-200 dark:bg-blue-900 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {discount > 0 && (
          <div className="flex items-center justify-between text-green-600 dark:text-green-400">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Discount</span>
            </div>
            <span className="font-semibold">-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between text-lg">
          <span className="font-bold text-gray-900 dark:text-white">Total</span>
          <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          Including all taxes and fees
        </p>
      </div>

      {/* Checkout Button */}
      <Link
        to="/checkout"
        className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center px-6 py-4 rounded-lg font-semibold transition-colors mb-3"
      >
        Proceed to Checkout
      </Link>

      <Link
        to="/products"
        className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        Continue Shopping
      </Link>

      {/* Trust Badges */}
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
          <span>Secure checkout</span>
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <span>Multiple payment options</span>
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Easy returns within 30 days</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;