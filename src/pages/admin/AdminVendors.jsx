import { useState, useEffect } from 'react';
import { vendorAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { Building2, Search, CheckCircle, XCircle, Clock } from 'lucide-react';
import PageLoader from '../../components/ui/PageLoader';

const AdminVendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const data = await vendorAPI.admin.getAll();
            setVendors(data.vendors || []);
        } catch (error) {
            toast.error('Failed to load vendors');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (vendorId, status) => {
        if (!window.confirm(`Are you sure you want to ${status} this vendor?`)) {
            return;
        }

        try {
            let commission_rate = 10; // default
            if (status === 'active') {
                const input = window.prompt("Enter commission rate (%) for this vendor:", "10");
                if (input === null) return;
                commission_rate = parseFloat(input);
                if (isNaN(commission_rate) || commission_rate < 0 || commission_rate > 100) {
                    toast.error("Invalid commission rate");
                    return;
                }
            }

            await vendorAPI.admin.updateStatus(vendorId, status, commission_rate);
            toast.success(`Vendor ${status} successfully!`);
            fetchVendors();
        } catch (error) {
            toast.error(error.message || `Failed to update vendor status`);
        }
    };

    const filteredVendors = vendors.filter(v => {
        const matchSearch = v.store_name?.toLowerCase().includes(search.toLowerCase()) ||
            v.business_email?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || v.status === filter;
        return matchSearch && matchFilter;
    });

    if (loading) {
        return <PageLoader />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-primary-500" />
                    Vendors Management
                </h1>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search stores or emails..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:w-48"
                >
                    <option value="all">All Vendors</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Vendors Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Store</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Contact</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Tax ID & Bank</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Applied Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredVendors.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No vendors found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredVendors.map((vendor) => (
                                    <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {vendor.store_logo && vendor.store_logo.url ? (
                                                    <img
                                                        src={vendor.store_logo.url}
                                                        alt={vendor.store_name}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                                        <Building2 className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {vendor.store_name}
                                                    </div>
                                                    {vendor.commission_rate && (
                                                        <div className="text-xs text-primary-600 font-medium">
                                                            Comm: {vendor.commission_rate}%
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-white">{vendor.business_email}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{vendor.business_phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div><span className="font-medium text-gray-900 dark:text-gray-300">Tax ID:</span> {vendor.tax_id || '-'}</div>
                                            <div><span className="font-medium text-gray-900 dark:text-gray-300">Bank:</span> {vendor.bank_name || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(vendor.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${vendor.status === 'active' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                                    vendor.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                                        vendor.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                                            'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                                }`}>
                                                {vendor.status === 'active' && <CheckCircle className="w-3.5 h-3.5" />}
                                                {vendor.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                                                {(vendor.status === 'rejected' || vendor.status === 'suspended') && <XCircle className="w-3.5 h-3.5" />}
                                                {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {vendor.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleUpdateStatus(vendor.id, 'active')}
                                                            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleUpdateStatus(vendor.id, 'rejected')}
                                                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {vendor.status === 'active' && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(vendor.id, 'suspended')}
                                                        className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800/50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Suspend
                                                    </button>
                                                )}
                                                {(vendor.status === 'suspended' || vendor.status === 'rejected') && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(vendor.id, 'active')}
                                                        className="px-3 py-1.5 border border-green-200 text-green-600 hover:bg-green-50 dark:border-green-800/50 dark:hover:bg-green-900/20 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Re-activate
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminVendors;
