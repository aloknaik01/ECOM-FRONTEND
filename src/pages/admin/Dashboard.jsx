import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // const fetchStats = async () => {
    //   try {
    //     const response = await adminService.getDashboardStats();
    //     setStats(response.stats);
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchStats();

    // Mock data for now
    setTimeout(() => {
      setStats({
        totalRevenue: 45678.99,
        totalOrders: 234,
        totalUsers: 567,
        totalProducts: 89,
        recentOrders: [
          { id: '1', customer: 'John Doe', total: 299.99, status: 'Processing' },
          { id: '2', customer: 'Jane Smith', total: 149.99, status: 'Shipped' },
          { id: '3', customer: 'Bob Johnson', total: 89.99, status: 'Delivered' },
        ],
        lowStockProducts: [
          { id: '1', name: 'Product A', stock: 3 },
          { id: '2', name: 'Product B', stock: 1 },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader fullScreen />;
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Recent Orders</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-500">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Low Stock Products */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Low Stock Alert</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {stats.lowStockProducts.length > 0 ? (
                stats.lowStockProducts.map((product) => (
                  <div key={product.id} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                    <p className="font-semibold">{product.name}</p>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                      {product.stock} left
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">All products are well stocked</p>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;