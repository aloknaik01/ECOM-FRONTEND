import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product, showDiscount = false }) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  // Calculate discount percentage if original price exists
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-200 dark:border-gray-700"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        <img
          src={product.images?.[0]?.url || product.image || '/placeholder.png'}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
            Out of Stock
          </div>
        )}

        {/* Discount Badge */}
        {showDiscount && discountPercent && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            -{discountPercent}%
          </div>
        )}

        {/* Limited Stock Badge */}
        {product.stock > 0 && product.stock <= 5 && !showDiscount && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
            Only {product.stock} left!
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'
            }`}
          />
        </button>

        {/* Quick Add to Cart */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 hover:bg-primary-700 text-sm font-medium shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-gray-800 dark:text-gray-200 font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {(product.rating || product.ratings) && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating || product.ratings)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
              {(product.rating || product.ratings)?.toFixed(1)}
            </span>
            {(product.reviews || product.review_count) && (
              <span className="text-xs text-gray-400">
                ({product.reviews || product.review_count})
              </span>
            )}
          </div>
        )}

        {/* Category */}
        {product.category && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {product.category}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock === 0 && (
          <p className="text-sm text-red-600 dark:text-red-400 font-medium mt-2">
            Out of Stock
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;