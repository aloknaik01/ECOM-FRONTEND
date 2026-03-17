import React, { useState } from 'react';
import { Star, Camera, X, Upload, Loader2 } from 'lucide-react';
import { productAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const ReviewModal = ({ isOpen, onClose, productId, productName, onSuccess }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 5) {
            return toast.error("Max 5 images allowed");
        }
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
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('product_id', productId);
            formData.append('rating', rating);
            formData.append('comment', comment);
            images.forEach(img => formData.append('images', img));

            await productAPI.postReview(productId, formData, true); // true for isFormData
            toast.success("Review posted successfully!");
            onSuccess?.();
            onClose();
        } catch (err) {
            toast.error(err.message || "Failed to post review");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Write a Review</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Product</p>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{productName}</h3>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Rating</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="transform transition-transform active:scale-90"
                                >
                                    <Star className={`w-10 h-10 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Comment</p>
                        <textarea
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500 h-32 resize-none"
                            placeholder="Share your experience with this product..."
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Photos (Optional)</p>
                            <span className="text-xs text-gray-400">{previews.length}/5 photos</span>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {previews.map((url, i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border-2 border-primary-100">
                                    <img src={url} className="w-full h-full object-cover" alt="preview" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {previews.length < 5 && (
                                <label className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50/50 transition-all">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary-500" />
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading || !comment}
                            className="w-full py-4 bg-primary-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                "Submit Review"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
