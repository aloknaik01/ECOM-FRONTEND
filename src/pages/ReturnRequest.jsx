import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { orderAPI, returnAPI } from '../utils/api';
import toast from 'react-hot-toast';

const ReturnRequest = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const reasons = [
        "Defective/Not Working",
        "Wrong Product Received",
        "Quality not as expected",
        "Changed my mind",
        "Damaged in transit",
        "Better price elsewhere"
    ];

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const data = await orderAPI.getById(orderId);
            setOrder(data.orders);
            if (data.orders.order_status !== 'Delivered') {
                toast.error('Only delivered orders can be returned');
                navigate('/orders');
            }
        } catch (err) {
            toast.error('Failed to load order');
            navigate('/orders');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!reason) return toast.error('Please select a reason');

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('order_id', orderId);
            formData.append('reason', reason);
            formData.append('description', description);
            images.forEach(img => formData.append('images', img));

            await returnAPI.create(formData, true);
            toast.success('Return request submitted!');
            navigate('/returns');
        } catch (err) {
            toast.error(err.message || 'Failed to submit request');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-20 text-center">Loading order...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6">
                <ArrowLeft className="w-5 h-5" />
                Back to Order
            </button>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-primary-600 p-8 text-white">
                    <h1 className="text-3xl font-bold">Request Return</h1>
                    <p className="opacity-90 mt-1">Order #{orderId.slice(0, 8).toUpperCase()}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Reason Selection */}
                    <div className="space-y-4">
                        <label className="text-lg font-bold text-gray-900 dark:text-white">Why are you returning this?</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {reasons.map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setReason(r)}
                                    className={`p-4 text-left rounded-2xl border-2 transition-all ${reason === r 
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                                        : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'}`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <div className="space-y-3">
                        <label className="text-lg font-bold text-gray-900 dark:text-white">Tell us more (Optional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 h-32 resize-none"
                            placeholder="Please provide more details about the issue..."
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                        <label className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Camera className="w-5 h-5" />
                            Add Photos
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {previews.map((url, i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                                    <img src={url} alt="Return preview" className="w-full h-full object-cover" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XCircle className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {previews.length < 4 && (
                                <label className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all text-gray-400 hover:text-primary-500">
                                    <Upload className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-bold">Upload</span>
                                    <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 italic flex items-center gap-2">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Upload up to 4 photos showing the issue clearily
                        </p>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <button
                            type="submit"
                            disabled={submitting || !reason}
                            className="w-full py-5 bg-primary-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {submitting ? (
                                <>
                                    <RefreshCw className="w-6 h-6 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-6 h-6" />
                                    Submit Return Request
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReturnRequest;
