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

      {/* Success Message */}
      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-2">
              Charts Now Available!
            </h3>
            <p className="text-green-800 dark:text-green-300 mb-4">
              Beautiful, interactive charts have been added to your Dashboard using Recharts.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-sm">Monthly Sales Trend (Line & Area charts)</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-sm">Order Status Distribution (Bar chart)</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-sm">Revenue Comparison (Horizontal bars)</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-sm">Sales by Category (Pie chart)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigate to Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            View Your Charts
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All your analytics charts are now live on the Dashboard page.
          </p>
          <a
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Dashboard
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Additional Analytics Ideas */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Additional Analytics (Future Enhancements)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Customer Insights
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track user behavior, repeat purchases, and customer lifetime value
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Product Performance
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analyze best sellers, slow movers, and inventory turnover rates
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Sales Forecasting
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Predict future sales based on historical trends and seasonality
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Geographic Analysis
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Heat maps showing sales distribution by region or city
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;  