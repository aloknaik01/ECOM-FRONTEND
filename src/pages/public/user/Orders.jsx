import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../../../components/common/Card';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { Loader } from '../../../components/common/Loader';
import { Package, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { ORDER_STATUS_COLORS } from '../../../utils/constants';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchOrders = async () => {
    //   try {
    //     const response = await orderService.getMyOrders();
    //     setOrders(response.orders);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchOrders();

    // Mock data for now
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          total_price: 299.99,
          order_status: 'Delivered',
          created_at: '2024-01-15T10:30:00Z',
          order_items: [
            { title: 'Product 1', quantity: 2 },
            { title: 'Product 2', quantity: 1 },
          ],
        },
        {
          id: '2',
          total_price: 149.99,
          order_status: 'Shipped',
          created_at: '2024-01-20T14:20:00Z',
          order_items: [{ title: 'Product 3', quantity: 1 }],
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (orders.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center max-w-md mx-auto">
          <Package className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders. Start shopping now!
          </p>
          <Link to="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardBody>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <Badge variant={ORDER_STATUS_COLORS[order.order_status]}>
                      {order.order_status}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">
                    Placed on {formatDate(order.created_at, 'MMM dd, yyyy')}
                  </p>

                  <div className="text-sm text-gray-600">
                    {order.order_items.length} item(s)
                    {order.order_items.slice(0, 2).map((item, index) => (
                      <span key={index}>
                        {index === 0 ? ': ' : ', '}
                        {item.title} x{item.quantity}
                      </span>
                    ))}
                    {order.order_items.length > 2 && (
                      <span> and {order.order_items.length - 2} more</span>
                    )}
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-primary-500">
                      {formatCurrency(order.total_price)}
                    </p>
                  </div>

                  <Link to={`/order/${order.id}`}>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;