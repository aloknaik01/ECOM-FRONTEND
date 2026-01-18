import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, Package, MapPin, CreditCard } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { ORDER_STATUS_COLORS, ORDER_STATUS } from '../../utils/constants';
import toast from 'react-hot-toast';

const AdminOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        // TODO: Replace with actual API call
        // const fetchOrder = async () => {
        //   try {
        //     const response = await adminService.getOrderById(id);
        //     setOrder(response.order);
        //     setNewStatus(response.order.order_status);
        //   } catch (error) {
        //     console.error(error);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // };
        // fetchOrder();

        // Mock data
        setTimeout(() => {
            const mockOrder = {
                id: id,
                order_status: 'Processing',
                total_price: 299.99,
                tax_price: 27.27,
                shipping_price: 10.0,
                created_at: '2024-01-15T10:30:00Z',
                paid_at: '2024-01-15T10:30:00Z',
                buyer: {
                    name: 'John Doe',
                    email: 'john@example.com',
                },
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
            };
            setOrder(mockOrder);
            setNewStatus(mockOrder.order_status);
            setIsLoading(false);
        }, 1000);
    }, [id]);

    const handleUpdateStatus = async () => {
        if (newStatus === order.order_status) {
            toast.error('Please select a different status');
            return;
        }

        setIsUpdating(true);

        try {
            // TODO: Replace with actual API call
            // await adminService.updateOrderStatus(id, newStatus);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOrder({ ...order, order_status: newStatus });
            toast.success('Order status updated successfully');
        } 
        catch (error) {
            console.error(error);
            toast.error('Failed to update order status');
        }
        finally {
            setIsUpdating(false);
        }
    }

    if (isLoading) {
return <Loader fullScreen />;
}
if (!order) {
return (
<div className="text-center py-16">
<h2 className="text-2xl font-bold mb-4">Order not found</h2>
<Button onClick={() => navigate('/admin/orders')}>Back to Orders</Button>
</div>
);
}
const statusOptions = Object.values(ORDER_STATUS).map(status => ({
value: status,
label: status,
}));
const subtotal = order.total_price - order.tax_price - order.shipping_price;

return (
<div>
<button
onClick={() => navigate('/admin/orders')}
className="inline-flex items-center gap-2 text-primary-500 hover:underline mb-6"
>
<ArrowLeft className="w-4 h-4" />
Back to Orders
</button>
  <div className="flex justify-between items-start mb-8">
    <div>
      <h1 className="text-3xl font-bold mb-2">Order #{order.id}</h1>
      <p className="text-gray-600">
        Placed on {formatDateTime(order.created_at)}
      </p>
      <p className="text-gray-600">
        Customer: {order.buyer.name} ({order.buyer.email})
      </p>
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
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-bold text-primary-500 mt-2">
                    {formatCurrency(item.price)} × {item.quantity} ={' '}
                    {formatCurrency(item.price * item.quantity)}
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

    {/* Order Summary & Actions */}
    <div className="lg:col-span-1 space-y-4">
      {/* Update Status */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Update Status</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Select
            label="Order Status"
            options={statusOptions}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleUpdateStatus}
            isLoading={isUpdating}
            disabled={newStatus === order.order_status}
          >
            Update Status
          </Button>
        </CardBody>
      </Card>

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
              <span className="font-semibold">
                {formatCurrency(order.shipping_price)}
              </span>
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
export default AdminOrderDetails;