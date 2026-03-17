import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendorAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { Box, DollarSign, ListOrdered, TrendingUp, CheckCircle } from 'lucide-react';
import PageLoader from '../../components/ui/PageLoader';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const VendorDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await vendorAPI.getDashboardStats();
            setStats(data.stats);
        } catch (error) {
            toast.error('Failed to load dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    const handlePayout = async () => {
        if (!stats || stats.pendingBalance <= 0) {
            toast.error('No pending balance to payout');
            return;
        }

        try {
            await vendorAPI.requestPayout(stats.pendingBalance);
            toast.success('Payout requested successfully!');
            fetchStats();
        } catch (error) {
            toast.error(error.message || 'Failed to request payout');
        }
    };

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    if (loading) return <PageLoader />;

    return (
        <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Vendor Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Real-time performance metrics</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        to="/admin/products/create"
                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-bold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        View My Products
                    </Link>
                    <Link
                        to="/admin/products/create"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30 flex items-center gap-2"
                    >
                        <Box className="w-4 h-4" />
                        Add Product
                    </Link>
                </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: 'Lifetime Sales', val: `$${stats?.totalSales?.toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                    { label: 'Wallet Balance', val: `$${stats?.pendingBalance?.toLocaleString()}`, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', action: 'Request Payout' },
                    { label: 'Active Orders', val: stats?.totalOrders, icon: ListOrdered, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                    { label: 'Products', val: stats?.totalProducts, icon: Box, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
                ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center group hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-black/20 transition-all duration-300">
                        <div className={`${item.bg} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                            <item.icon className={`w-8 h-8 ${item.color}`} />
                        </div>
                        <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{item.label}</h2>
                        <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">{item.val || 0}</p>
                        {item.action && (
                            <button 
                                onClick={handlePayout}
                                disabled={stats?.pendingBalance <= 0}
                                className="text-xs font-bold text-primary-600 hover:underline disabled:opacity-0"
                            >
                                {item.action}
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Revenue Growth</h3>
                            <p className="text-sm text-gray-500">Earnings for the last 6 months</p>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.monthlyRevenue || []}>
                                <defs>
                                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#9CA3AF'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#9CA3AF'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', background: '#fff' }}
                                />
                                <Area type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorEarnings)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Revenue Pie */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1">Sales by Category</h3>
                    <p className="text-sm text-gray-500 mb-6">Revenue distribution</p>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.categoryRevenue || []}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="earnings"
                                    nameKey="category"
                                >
                                    {(stats?.categoryRevenue || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                         </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Products */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Top Performing Products</h3>
                    <div className="space-y-6">
                        {(stats?.topProducts || []).map((prod, i) => (
                            <div key={i} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center font-black text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-50 transition-colors">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{prod.name}</p>
                                        <p className="text-xs font-bold text-gray-400 uppercase">{prod.total_sold} units sold</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-gray-900 dark:text-white">₹{prod.total_earnings?.toLocaleString()}</p>
                                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                                        <div 
                                            className="h-full bg-primary-500 rounded-full" 
                                            style={{ width: `${(prod.total_earnings / stats.totalSales) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Sales Minimal Table */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Recent Transactions</h3>
                        <Link to="/vendor/orders" className="text-sm font-bold text-primary-600 hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        {(stats?.recentSales || []).map((sale, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/40 rounded-2xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${sale.payout_status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white truncate max-w-[150px]">{sale.product_name}</p>
                                        <p className="text-xs text-gray-500">{new Date(sale.sale_date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-gray-900 dark:text-white">+₹{sale.vendor_earnings}</p>
                                    <p className={`text-[10px] font-black uppercase tracking-tighter ${sale.payout_status === 'paid' ? 'text-green-500' : 'text-amber-500'}`}>
                                        {sale.payout_status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default VendorDashboard;
