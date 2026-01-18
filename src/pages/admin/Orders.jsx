import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Loader } from '../../components/common/Loader';
import { Eye, Search } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ORDER_STATUS_COLORS, ORDER_STATUS } from '../../utils/constants';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchOrders = async () => {
    //   try {
    //     const response = await adminService.getAllOrders();
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
          buyer_name: 'John Doe',
          buyer_email: 'john@example.com',
          total_price: 299.99,
          order_status: 'Processing',
          created_at: '2024-01-15T10:30:00Z',
          items_count: 3,
        },
        {
          id: '2',
          buyer_name: 'Jane Smith',
          buyer_email: 'jane@example.com',
          total_price: 149.99,
          order_status: 'Shipped',
          created_at: '2024-01-16T14:20:00Z',
          items_count: 1,
        },
        {
          id: '3',
          buyer_name: 'Bob Johnson',
          buyer_email: 'bob@example.com',
          total_price: 89.99,
          order_status: 'Delivered',
          created_at: '2024-01-17T09:15:00Z',
          items_count: 2,
        },
        {
          id: '4',
          buyer_name: 'Alice Williams',
          buyer_email: 'alice@example.com',
          total_price: 199.99,
          order_status: 'Cancelled',
          created_at: '2024-01-18T11:45:00Z',
          items_count: 1,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const statusOptions = [
    { value: '', label: 'All Status' },
    ...Object.values(ORDER_STATUS).map(status => ({
      value: status,
      label: status,
    })),
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || order.order_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by order ID, customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="md:w-48"
            />
          </div>
        </CardHeader>

        <CardBody>
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm">#{order.id}</td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{order.buyer_name}</p>
                          <p className="text-sm text-gray-600">{order.buyer_email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.items_count}</td>
                      <td className="px-4 py-3 font-semibold">
                        {formatCurrency(order.total_price)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={ORDER_STATUS_COLORS[order.order_status]}>
                          {order.order_status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <Link to={`/admin/order/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminOrders;