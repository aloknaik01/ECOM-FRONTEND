import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../../utils/formatters';
import { ORDER_STATUS_COLORS } from '../../../utils/constants';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchOrder = async () => {
    //   try {
    //     const response = await orderService.getById(id);
    //     setOrder(response.order);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchOrder();

    // Mock data for now
    setTimeout(() => {
      setOrder({
        id: id,
        order_status: 'Shipped',
        total_price: 299.99,
        tax_price: 27.27,
        shipping_price: 10.0,
        created_at: '2024-01-15T10:30:00Z',
        paid_at: '2024-01-15T10:30:00Z',
        shipping_info: {
          full_name: 'John Doe',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          pincode: '10001',
          phone: '1234567890',
        },
        order_items: [
          {
            id: '1',
            title: 'Wireless Headphones',
            image: '/placeholder.png',
            price: 89.99,
            quantity: 2,
            product_id: 'p1',
          },
          {
            id: '2',
            title: 'Smart Watch',
            image: '/placeholder.png',
            price: 199.99,
            quantity: 1,
            product_id: 'p2',
          },
        ],
        payment: {
          payment_type: 'Online',
          payment_status: 'Paid',
        },
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (!order) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link to="/orders">
          <Button>Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const subtotal = order.total_price - order.tax_price - order.shipping_price;

  return (
    <div className="container-custom py-8">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
          <p className="text-gray-600">Placed on {formatDateTime(order.created_at)}</p>
        </div>
        <Badge variant={ORDER_STATUS_COLORS[order.order_status]} className="text-lg px-4 py-2">
          {order.order_status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <h2 className="text-xl font-bold">Order Items</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <Link to={`/product/${item.product_id}`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product_id}`}
                        className="font-semibold hover:text-primary-500"
                      >
                        {item.title}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-bold text-primary-500 mt-2">
                        {formatCurrency(item.price)} × {item.quantity} = {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="text-gray-700">
                <p className="font-semibold mb-2">{order.shipping_info.full_name}</p>
                <p>{order.shipping_info.address}</p>
                <p>
                  {order.shipping_info.city}, {order.shipping_info.state}{' '}
                  {order.shipping_info.pincode}
                </p>
                <p>{order.shipping_info.country}</p>
                <p className="mt-2">Phone: {order.shipping_info.phone}</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 space-y-4">
          {/* Payment Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <h2 className="text-xl font-bold">Payment</h2>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Method</span>
                  <span className="font-semibold">{order.payment.payment_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={order.payment.payment_status === 'Paid' ? 'success' : 'warning'}>
                    {order.payment.payment_status}
                  </Badge>
                </div>
                {order.paid_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paid on</span>
                    <span>{formatDateTime(order.paid_at)}</span>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Order Summary</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">{formatCurrency(order.shipping_price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">{formatCurrency(order.tax_price)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary-500">
                    {formatCurrency(order.total_price)}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;