import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, MapPin, CreditCard, Calendar } from 'lucide-react';
import { orderAPI } from '../utils/api';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const data = await orderAPI.getSingle(orderId);
      setOrder(data.orders);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Order not found
          </h2>
          <Link
            to="/orders"
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/orders"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 mb-4 inline-block"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Order Details
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Order ID: {order.id}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Order Status
              </h2>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {order.order_status}
                </span>
                {order.paid_at && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Paid on {format(new Date(order.paid_at), 'MMM dd, yyyy')}
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Items Ordered
              </h2>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div
                    key={item.order_item_id}
                    className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    <img
                      src={item.image || '/placeholder.png'}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Shipping Address
              </h2>
              {order.shipping_info && (
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="font-semibold">
                    {order.shipping_info.full_name}
                  </p>
                  <p>{order.shipping_info.address}</p>
                  <p>
                    {order.shipping_info.city}, {order.shipping_info.state}{' '}
                    {order.shipping_info.pincode}
                  </p>
                  <p>{order.shipping_info.country}</p>
                  <p className="mt-2">Phone: {order.shipping_info.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>
                    $
                    {(
                      order.total_price -
                      order.total_price * order.tax_price -
                      order.shipping_price
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax ({(order.tax_price * 100).toFixed(0)}%)</span>
                  <span>
                    ${(order.total_price * order.tax_price).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>${order.shipping_price.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${order.total_price}</span>
                </div>
              </div>
            </div>

            {/* Order Date */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Order Date
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {format(new Date(order.created_at), 'MMMM dd, yyyy')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {format(new Date(order.created_at), 'hh:mm a')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;