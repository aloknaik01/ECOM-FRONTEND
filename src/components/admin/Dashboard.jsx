import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import { adminAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import SalesChart from '../../components/admin/charts/SalesChart';
import OrderStatusChart from '../../components/admin/charts/OrderStatusChart';
import RevenueComparisonChart from '../../components/admin/charts/RevenueComparisonChart';
import CategoryDistributionChart from '../../components/admin/charts/CategoryDistributionChart';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await adminAPI.getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Revenue',
      value: `$${stats?.totalRevenueAllTime?.toLocaleString() || 0}`,
      change: stats?.revenueGrowth || '0%',
      icon: DollarSign,
      color: 'bg-green-500',
      trend: stats?.revenueGrowth?.startsWith('+') ? 'up' : 'down'
    },
    {
      name: 'Total Orders',
      value: Object.values(stats?.orderStatusCounts || {}).reduce((a, b) => a + b, 0),
      change: `${stats?.orderStatusCounts?.Processing || 0} pending`,
      icon: ShoppingCart,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Users',
      value: stats?.totalUsersCount || 0,
      change: `+${stats?.newUsersThisMonth || 0} this month`,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: "Today's Revenue",
      value: `$${stats?.todayRevenue?.toLocaleString() || 0}`,
      change: `Yesterday: $${stats?.yesterdayRevenue?.toLocaleString() || 0}`,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {stat.name}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              {!stat.trend && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.change}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Status
          </h3>
          <div className="space-y-3">
            {Object.entries(stats?.orderStatusCounts || {}).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    status === 'Processing' ? 'bg-yellow-500' :
                    status === 'Shipped' ? 'bg-blue-500' :
                    status === 'Delivered' ? 'bg-green-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">{status}</span>
                </div>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Month Sales */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Month Sales
          </h3>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              ${stats?.currentMonthSales?.toLocaleString() || 0}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Growth: <span className={`font-semibold ${
                stats?.revenueGrowth?.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats?.revenueGrowth || '0%'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Selling Products
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Product
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Category
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Rating
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sold
                </th>
              </tr>
            </thead>
            <tbody>
              {stats?.topSellingProducts?.map((product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || '/placeholder.png'}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {product.category}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-yellow-500">
                      ⭐ {product.ratings?.toFixed(1) || '0.0'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900 dark:text-white">
                    {product.total_sold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Products Alert */}
      {stats?.lowStockProducts?.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                Low Stock Alert
              </h3>
              <p className="text-yellow-800 dark:text-yellow-300 text-sm mb-4">
                {stats.lowStockProducts.length} products are running low on stock
              </p>
              <div className="space-y-2">
                {stats.lowStockProducts.slice(0, 5).map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </span>
                    <span className={`text-sm font-semibold ${
                      product.stock === 0 ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {product.stock === 0 ? 'Out of Stock' : `Only ${product.stock} left`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Monthly Sales Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Monthly Sales Trend
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                chartType === 'line'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                chartType === 'area'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Area
            </button>
          </div>
        </div>
        <SalesChart data={stats?.monthlySales} type={chartType} />
      </div>

      {/* Revenue & Category Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today vs Yesterday Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue Comparison
          </h3>
          <RevenueComparisonChart 
            todayRevenue={stats?.todayRevenue}
            yesterdayRevenue={stats?.yesterdayRevenue}
          />
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sales by Category
          </h3>
          <CategoryDistributionChart topSellingProducts={stats?.topSellingProducts} />
        </div>
      </div>

      {/* Order Status Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Order Status Distribution
        </h3>
        <OrderStatusChart orderStatusCounts={stats?.orderStatusCounts} />
      </div>
    </div>
  );
};

export default Dashboard;