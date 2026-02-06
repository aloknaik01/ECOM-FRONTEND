import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove, viewMode = 'default' }) => {
  const itemTotal = Number(item.product.price) * item.quantity;

  return (
    <div
      className={`flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow ${
        viewMode === 'compact' ? 'flex-row' : 'flex-col sm:flex-row'
      }`}
    >
      {/* Product Image */}
      <Link
        to={`/product/${item.product.id}`}
        className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden group"
      >
        <img
          src={item.product.images?.[0]?.url || '/placeholder.png'}
          alt={item.product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Left side - Product info */}
          <div className="flex-1 min-w-0">
            <Link
              to={`/product/${item.product.id}`}
              className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2 mb-2 block"
            >
              {item.product.name}
            </Link>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>Category: {item.product.category}</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                ${Number(item.product.price).toFixed(2)} each
              </p>
              
              {/* Stock Warning */}
              {item.product.stock <= 5 && item.product.stock > 0 && (
                <p className="text-orange-600 dark:text-orange-400 font-medium">
                  Only {item.product.stock} left in stock!
                </p>
              )}
              {item.product.stock === 0 && (
                <p className="text-red-600 dark:text-red-400 font-medium">
                  Out of stock
                </p>
              )}
            </div>
          </div>

          {/* Right side - Price & Actions */}
          <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-4">
            {/* Item Total */}
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${itemTotal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Quantity Controls & Remove */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity:
            </span>
            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                disabled={item.quantity === 1}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center font-semibold text-gray-900 dark:text-white border-x-2 border-gray-300 dark:border-gray-600 py-2">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.product.id)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;