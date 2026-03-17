import React from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
    const { recentProducts } = useRecentlyViewed();

    if (recentProducts.length === 0) return null;

    return (
        <section className="py-12 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Recently Viewed</h2>
                        <p className="text-gray-600 mt-2">Based on your browsing history</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentlyViewed;
