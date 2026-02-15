import { useState } from 'react';
import { Ticket, X, Check } from 'lucide-react';
import { couponAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const CouponInput = ({ cartTotal, onCouponApplied, onCouponRemoved }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    setLoading(true);
    try {
      const data = await couponAPI.validate({ code, cart_total: cartTotal });
      
      setAppliedCoupon({
        ...data.coupon,
        discount: data.discount,
        final_total: data.final_total
      });
      
      onCouponApplied(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || 'Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCode('');
    onCouponRemoved();
    toast.success('Coupon removed');
  };

  const handleShowAvailable = async () => {
    if (showAvailable) {
      setShowAvailable(false);
      return;
    }

    try {
      const data = await couponAPI.getAvailable();
      setAvailableCoupons(data.coupons);
      setShowAvailable(true);
    } catch (error) {
      toast.error('Failed to load available coupons');
    }
  };

  const handleSelectCoupon = (couponCode) => {
    setCode(couponCode);
    setShowAvailable(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 space-y-4">
      {/* Applied Coupon Display */}
      {appliedCoupon ? (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="font-semibold text-green-900 dark:text-green-200">
                Coupon Applied!
              </span>
            </div>
            <button
              onClick={handleRemove}
              className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded transition-colors"
            >
              <X className="w-4 h-4 text-green-600 dark:text-green-400" />
            </button>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-green-700 dark:text-green-300">Code:</span>
              <span className="font-mono font-bold text-green-900 dark:text-green-200">
                {appliedCoupon.code}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-700 dark:text-green-300">Discount:</span>
              <span className="font-semibold text-green-900 dark:text-green-200">
                -${appliedCoupon.discount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Coupon Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Have a coupon code?
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={loading}
                />
                <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={handleApply}
                disabled={loading || !code.trim()}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Checking...' : 'Apply'}
              </button>
            </div>
          </div>

          {/* Available Coupons Toggle */}
          <button
            onClick={handleShowAvailable}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            {showAvailable ? 'Hide available coupons' : 'View available coupons'}
          </button>

          {/* Available Coupons List */}
          {showAvailable && (
            <div className="space-y-2">
              {availableCoupons.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  No coupons available at the moment
                </p>
              ) : (
                availableCoupons.map((coupon) => (
                  <button
                    key={coupon.id}
                    onClick={() => handleSelectCoupon(coupon.code)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:border-primary-500 dark:hover:border-primary-400 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-primary-600 dark:text-primary-400">
                        {coupon.code}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {coupon.discount_type === 'percentage'
                          ? `${coupon.discount_value}% OFF`
                          : `$${coupon.discount_value} OFF`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>
                        Min: ${coupon.min_purchase_amount || 0}
                      </span>
                      {coupon.max_discount_amount && (
                        <span>Max: ${coupon.max_discount_amount}</span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CouponInput;