import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import LucideIcon from '../components/common/LucideIcon';
import VariantSelector from '../components/products/VariantSelector';
import { productAPI } from '../utils/api';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems = [] } = useSelector(state => state.wishlist || {});
  const isInWishlist = wishlistItems.some(item => item.id === id);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await productAPI.getById(id);
      const prod = data.product;
      setProduct(prod);

      // --- Add to Recently Viewed ---
      if (prod) {
        try {
          const STORAGE_KEY = 'recently_viewed_products';
          let stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
          stored = stored.filter(p => p.id !== prod.id); // remove duplicates
          stored.unshift({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            images: prod.images,
            ratings: prod.ratings || 0,
            category: prod.category
          });
          if (stored.length > 8) stored = stored.slice(0, 8);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch (err) {
          console.error('Error saving recent history:', err);
        }
      }
      // -----------------------------
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleVariantSelected = (variant) => {
    setSelectedVariant(variant);
    // Update displayed price and stock
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) return navigate('/login');

    if (selectedVariant && selectedVariant.stock === 0) {
      toast.error('This variant is out of stock');
      return;
    }

    const itemToAdd = selectedVariant ? {
      ...product,
      id: selectedVariant.id,
      price: selectedVariant.price,
      stock: selectedVariant.stock,
      variant: {
        size: selectedVariant.size,
        color: selectedVariant.color
      }
    } : product;

    dispatch(addToCart({ product: itemToAdd, quantity }));
    toast.success('Added to cart!');
  };

  const handleWishlist = () => {
    if (!isAuthenticated) return navigate('/login');

    if (isInWishlist) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayStock = selectedVariant ? selectedVariant.stock : product.stock;
  const images = selectedVariant?.images?.length > 0
    ? selectedVariant.images
    : product.images || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]?.url}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <LucideIcon 
                    name={product.icon} 
                    className="w-32 h-32 text-gray-400 dark:text-gray-500" 
                    defaultIcon="Package"
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx
                        ? 'border-primary-600'
                        : 'border-transparent'
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.ratings || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                        }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({product.review_count || 0} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                ₹{displayPrice}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${displayStock > 10
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : displayStock > 0
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                {displayStock > 0 ? `${displayStock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {product.specifications.map((spec, index) => (
                    <div 
                      key={index} 
                      className={`flex border-b last:border-0 border-gray-200 dark:border-gray-700 ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'
                      }`}
                    >
                      <div className="w-1/3 px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">
                        {spec.title}
                      </div>
                      <div className="w-2/3 px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {spec.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selector */}
            <VariantSelector
              productId={id}
              onVariantSelected={handleVariantSelected}
            />

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(displayStock, quantity + 1))}
                  disabled={quantity >= displayStock}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sticky bottom-4 sm:relative sm:bottom-0 z-10 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                disabled={displayStock === 0}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3.5 sm:py-4 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg sm:shadow-none"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`p-3.5 sm:p-4 border-2 rounded-xl transition-colors shadow-lg sm:shadow-none ${isInWishlist
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 bg-white dark:bg-gray-800'
                  }`}
              >
                <Heart
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${isInWishlist
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-600 dark:text-gray-400'
                    }`}
                />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Orders over ₹100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">100% Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;