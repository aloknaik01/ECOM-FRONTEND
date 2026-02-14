import { BarChart3 } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Detailed insights and metrics
        </p>
      </div>

      {/* Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Advanced Analytics Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
            This section will include detailed charts, graphs, and insights about your business performance.
          </p>
          <div className="space-y-3 text-sm text-left max-w-md mx-auto">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-primary-600 rounded-full" />
              Sales trends and forecasting
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-primary-600 rounded-full" />
              Customer behavior analysis
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-primary-600 rounded-full" />
              Product performance metrics
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-primary-600 rounded-full" />
              Revenue growth tracking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;