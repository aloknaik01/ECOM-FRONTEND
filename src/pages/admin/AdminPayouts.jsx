import { useState, useEffect } from 'react';
import { vendorAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import PageLoader from '../../components/ui/PageLoader';

const AdminPayouts = () => {
    const [payouts, setPayouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayouts();
    }, []);

    const fetchPayouts = async () => {
        try {
            const data = await vendorAPI.admin.getPayouts();
            setPayouts(data.payouts || []);
        } catch (error) {
            toast.error('Failed to load payouts');
        } finally {
            setLoading(false);
        }
    };

    const handleProcess = async (payoutId, status) => {
        try {
            let txId = null;
            if (status === 'completed') {
                txId = window.prompt("Enter Transaction ID:");
                if (!txId) return; // Cancelled
            }

            await vendorAPI.admin.processPayout(payoutId, { status: status, transaction_id: txId });
            toast.success(`Payout marked as ${status}`);
            fetchPayouts();
        } catch (error) {
            toast.error(error.message || 'Failed to process payout');
        }
    };

    if (loading) return <PageLoader />;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary-500" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Payouts</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Store</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Requested Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {payouts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No payouts requested at this time.
                                    </td>
                                </tr>
                            ) : (
                                payouts.map((payout) => (
                                    <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {payout.store_name}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {payout.business_email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                                            ₹{Number(payout.amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(payout.requested_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${payout.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                                    payout.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                                        payout.status === 'failed' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                                                            'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                                }`}>
                                                {payout.status === 'completed' && <CheckCircle className="w-3.5 h-3.5" />}
                                                {payout.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                                                {payout.status === 'failed' && <XCircle className="w-3.5 h-3.5" />}
                                                {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                                            </div>
                                            {payout.transaction_id && (
                                                <div className="text-xs text-gray-500 mt-1 truncate max-w-[150px]" title={payout.transaction_id}>
                                                    TX: {payout.transaction_id}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {payout.status === 'pending' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleProcess(payout.id, 'completed')}
                                                        className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Mark Paid
                                                    </button>
                                                    <button
                                                        onClick={() => handleProcess(payout.id, 'failed')}
                                                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Fail
                                                    </button>
                                                </div>
                                            )}
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

export default AdminPayouts;
