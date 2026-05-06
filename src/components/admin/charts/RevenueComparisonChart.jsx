import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const RevenueComparisonChart = ({ todayRevenue, yesterdayRevenue }) => {
  const chartData = [
    {
      name: 'Yesterday',
      revenue: parseFloat(yesterdayRevenue) || 0
    },
    {
      name: 'Today',
      revenue: parseFloat(todayRevenue) || 0
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {payload[0].payload.name}
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
        <XAxis 
          type="number" 
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
          tickFormatter={(value) => `$${value}`}
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          className="text-xs text-gray-600 dark:text-gray-400"
          tick={{ fill: 'currentColor' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="revenue" 
          fill="#0ea5e9" 
          radius={[0, 8, 8, 0]}
          name="Revenue"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueComparisonChart;