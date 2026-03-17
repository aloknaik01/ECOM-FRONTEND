import { useState, useEffect } from 'react';
import ProductCard from '../products/ProductCard';

const RecentlyViewedSection = () => {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('recentlyViewed');
            if (stored) {
                setRecentProducts(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load recently viewed products', error);
        }
    }, []);

    if (!recentProducts || recentProducts.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200 mt-8">
            {/* Section Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Viewed</h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {recentProducts.map((product) => (
                    <ProductCard key={`recent-${product.id}`} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewedSection;
