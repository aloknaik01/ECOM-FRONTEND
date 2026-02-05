import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, Truck, Shield, RefreshCw, 
  ChevronLeft, ChevronRight, Minus, Plus, Share2 
} from 'lucide-react';
import { productAPI } from '../utils/api';
import toast from 'react-hot-toast';
import ProductReviews from '../components/products/ProductReviews';
import RelatedProducts from '../components/products/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await productAPI.getProductById(id);
      setProduct(data.product);
    } catch (error) {
      toast.error(error.message);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increment' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    // Cart functionality will be implemented later
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const handleBuyNow = () => {
    // Buy now functionality will be implemented later
    toast.success('Proceeding to checkout');
    navigate('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = product.images || [];
  const reviews = product.reviews || [];
  const stockStatus = product.stock > 5 ? 'In Stock' : product.stock > 0 ? 'Limited Stock' : 'Out of Stock';
  const stockColor = product.stock > 5 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={`/products?category=${product.category}`} className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-4 aspect-square">
              <img
                src={images[selectedImage]?.url || '/placeholder.png'}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary-600'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              {/* Category */}
              <Link
                to={`/products?category=${product.category}`}
                className="inline-block text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mb-2"
              >
                {product.category}
              </Link>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(product.ratings)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.ratings?.toFixed(1) || '0.0'}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${product.price?.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Price per unit, Tax included (18%)
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status:
                  </span>
                  <span className={`text-sm font-semibold ${stockColor}`}>
                    {stockStatus}
                  </span>
                </div>
                {product.stock > 0 && product.stock <= 5 && (
                  <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                    Only {product.stock} left in stock!
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange('decrement')}
                        disabled={quantity === 1}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-16 text-center font-semibold border-x-2 border-gray-300 dark:border-gray-600 py-2 bg-transparent dark:text-white"
                      />
                      <button
                        onClick={() => handleQuantityChange('increment')}
                        disabled={quantity === product.stock}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      ({product.stock} available)
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isWishlisted
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 dark:border-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:text-primary-500 transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {product.stock > 0 && (
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Buy Now
                </button>
              )}

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <Truck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span>Worldwide shipping available</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <RefreshCw className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <span>2 years full warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-8">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'description'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews
                productId={product.id}
                reviews={reviews}
                onReviewSubmit={fetchProduct}
              />
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts productId={product.id} category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetail;