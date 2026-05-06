import React, { useState, useEffect } from 'react';
import { Package, RefreshCw, Clock, CheckCircle, XCircle, ChevronRight, ArrowLeft, Camera } from 'lucide-react';
import { returnAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Returns = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReturns();
    }, []);

    const fetchReturns = async () => {
        setLoading(true);
        try {
            const data = await returnAPI.getMy();
            setReturns(data.returns || []);
        } catch (err) {
            toast.error('Failed to load returns');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Approved': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Refunded': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading returns...</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/profile')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Returns & Refunds</h1>
                    <p className="text-gray-600 dark:text-gray-400">Track and manage your return requests</p>
                </div>
            </div>

            {returns.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-100 dark:border-gray-700">
                    <RefreshCw className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">No return requests found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Returnable orders will appear in your order history</p>
                    <button onClick={() => navigate('/orders')} className="mt-6 px-8 py-3 bg-primary-600 text-white font-bold rounded-2xl">Go to Orders</button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {returns.map((req) => (
                        <div key={req.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-xl text-primary-600">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Return ID</p>
                                        <p className="text-lg font-black text-gray-900 dark:text-white">#{req.id.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:items-end">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getStatusStyle(req.status)}`}>
                                        {req.status}
                                    </span>
                                    <p className="text-sm text-gray-500 mt-2">Requested on {new Date(req.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-50 dark:border-gray-700 pt-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">Reason for Return</h4>
                                    <p className="text-gray-900 dark:text-white font-medium">{req.reason}</p>
                                    {req.description && <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">{req.description}</p>}
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">Order Details</h4>
                                        <p className="text-gray-900 dark:text-white font-medium">Order Total: ₹{req.total_price}</p>
                                        {req.status === 'Refunded' && (
                                            <p className="text-green-600 font-bold mt-1">Refund Amount: ₹{req.refund_amount}</p>
                                        )}
                                    </div>
                                    {req.admin_note && (
                                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Admin Response</p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{req.admin_note}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Returns;
