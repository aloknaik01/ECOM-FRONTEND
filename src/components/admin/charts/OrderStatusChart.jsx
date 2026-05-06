import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const OrderStatusChart = ({ orderStatusCounts }) => {
  // Format data for Recharts
  const chartData = [
    { status: 'Processing', count: orderStatusCounts?.Processing || 0, color: '#eab308' },
    { status: 'Shipped', count: orderStatusCounts?.Shipped || 0, color: '#3b82f6' },
    { status: 'Delivered', count: orderStatusCounts?.Delivered || 0, color: '#22c55e' },
    { status: 'Cancelled', count: orderStatusCounts?.Cancelled || 0, color: '#ef4444' },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].payload.status}
          </p>
          <p className="text-sm" style={{ color: payload[0].payload.color }}>
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          dataKey="status" 
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
        />
        <YAxis 
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrderStatusChart;