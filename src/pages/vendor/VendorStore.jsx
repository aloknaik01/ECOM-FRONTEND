import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vendorAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { Store, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import PageLoader from '../../components/ui/PageLoader';
import ProductCard from '../../components/products/ProductCard';

const VendorStore = () => {
    const { vendorId } = useParams();
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStore();
    }, [vendorId]);

    const fetchStore = async () => {
        try {
            const data = await vendorAPI.getStore(vendorId);
            setStore(data.vendor);
            setProducts(data.products || []);
        } catch (error) {
            toast.error('Failed to load store profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <PageLoader />;

    if (!store) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Store Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400">The store you are looking for does not exist or has been removed.</p>
                    <Link to="/products" className="mt-6 inline-block text-primary-600 hover:text-primary-700 font-medium">
                        Browse All Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-12">
            {/* Store Banner & Profile Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="h-48 bg-gradient-to-r from-primary-600 to-indigo-700 w-full relative">
                    <div className="absolute -bottom-16 left-8 sm:left-12 flex items-end">
                        <div className="w-32 h-32 rounded-xl bg-white dark:bg-gray-800 p-2 shadow-lg border-2 border-white dark:border-gray-800">
                            {store.store_logo ? (
                                <img
                                    src={store.store_logo.url}
                                    alt={store.store_name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <Store className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {store.store_name}
                            </h1>
                            {store.store_description && (
                                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-4">
                                    {store.store_description}
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                                {store.business_address && (
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        <span>{store.business_address}</span>
                                    </div>
                                )}
                                {store.business_email && (
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4" />
                                        <span>{store.business_email}</span>
                                    </div>
                                )}
                                {store.business_phone && (
                                    <div className="flex items-center gap-1.5">
                                        <Phone className="w-4 h-4" />
                                        <span>{store.business_phone}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {new Date(store.created_at).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Store Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Store Products ({products.length})</h2>

                {products.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <Store className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products yet</h3>
                        <p className="text-gray-500 dark:text-gray-400">This vendor hasn't added any products to their store.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorStore;
