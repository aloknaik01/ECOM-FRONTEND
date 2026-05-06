import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, MapPin, CreditCard, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
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
            {/* Order Status Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary-600" />
                Track Order
              </h2>

              {order.order_status === 'Cancelled' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                  <XCircle className="w-16 h-16 text-red-500 mb-4" />
                  <h3 className="text-xl font-bold text-red-700 dark:text-red-400">Order Cancelled</h3>
                  <p className="text-red-600 dark:text-red-300 mt-2">This order has been cancelled and will not be delivered.</p>
                </div>
              ) : (
                <div className="relative mt-4">
                  {/* Progress Line Background (Desktop) */}
                  <div className="hidden sm:block absolute top-6 left-[10%] right-[10%] h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
                  
                  {/* Progress Line Active (Desktop) */}
                  <div 
                    className="hidden sm:block absolute top-6 left-[10%] h-1 bg-primary-600 transition-all duration-700 ease-in-out -translate-y-1/2 z-0"
                    style={{ 
                      width: `${(Math.max(0, ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(order.order_status)) / 3) * 80}%` 
                    }}
                  ></div>

                  {/* Progress Line Background (Mobile) */}
                  <div className="sm:hidden absolute left-6 top-6 bottom-6 w-1 bg-gray-200 dark:bg-gray-700 z-0"></div>
                  
                  {/* Progress Line Active (Mobile) */}
                  <div 
                    className="sm:hidden absolute left-6 top-6 w-1 bg-primary-600 transition-all duration-700 ease-in-out z-0"
                    style={{ 
                      height: `${(Math.max(0, ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(order.order_status)) / 3) * 100}%` 
                    }}
                  ></div>

                  <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-0">
                    {[
                      { id: 'Pending', label: 'Order Placed', icon: Clock },
                      { id: 'Processing', label: 'Processing', icon: Package },
                      { id: 'Shipped', label: 'Shipped', icon: Truck },
                      { id: 'Delivered', label: 'Delivered', icon: CheckCircle },
                    ].map((step, index) => {
                      const statusIndex = ['Pending', 'Processing', 'Shipped', 'Delivered'].indexOf(order.order_status);
                      const isCompleted = statusIndex >= index;
                      const isCurrent = statusIndex === index;
                      const StepIcon = step.icon;

                      return (
                        <div key={step.id} className="flex sm:flex-col items-center gap-4 sm:gap-3 w-full sm:w-1/4 group">
                          <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 relative bg-white dark:bg-gray-800 ${
                            isCompleted 
                              ? 'text-white border-none shadow-lg shadow-primary-500/30' 
                              : 'border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                          }`}>
                            {isCompleted && (
                              <div className="absolute inset-0 bg-primary-600 rounded-full animate-in zoom-in duration-300"></div>
                            )}
                            <StepIcon className={`w-5 h-5 relative z-10 ${isCompleted ? 'text-white' : ''}`} />
                          </div>
                          
                          <div className="sm:text-center flex-1">
                            <p className={`font-semibold transition-colors duration-300 ${
                              isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'
                            }`}>
                              {step.label}
                            </p>
                            {isCurrent && order.paid_at && step.id === 'Delivered' && (
                              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-medium animate-in fade-in slide-in-from-bottom-2">
                                {format(new Date(order.paid_at), 'MMM dd, yyyy')}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₹{item.price} each
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
                    ₹
                    {(
                      Number(order.total_price || 0) -
                      Number(order.total_price || 0) * Number(order.tax_price || 0) -
                      Number(order.shipping_price || 0)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Tax ({(Number(order.tax_price || 0) * 100).toFixed(0)}%)</span>
                  <span>
                    ₹{(Number(order.total_price || 0) * Number(order.tax_price || 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>₹{Number(order.shipping_price || 0).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{Number(order.total_price || 0).toFixed(2)}</span>
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