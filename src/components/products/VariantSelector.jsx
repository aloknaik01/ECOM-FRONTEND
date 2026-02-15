import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { variantAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const VariantSelector = ({ productId, onVariantSelected }) => {
  const [variants, setVariants] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  useEffect(() => {
    if (selectedSize || selectedColor) {
      findVariant();
    }
  }, [selectedSize, selectedColor]);

  const fetchVariants = async () => {
    try {
      const data = await variantAPI.getProductVariants(productId);
      setVariants(data.variants);

      if (data.variants.length > 0) {
        // Find default variant or use first one
        const defaultVariant = data.variants.find(v => v.is_default) || data.variants[0];
        setSelectedVariant(defaultVariant);
        setSelectedSize(defaultVariant.size);
        setSelectedColor(defaultVariant.color);
        onVariantSelected(defaultVariant);

        // Get unique sizes and colors
        const sizes = [...new Set(data.variants.filter(v => v.size).map(v => v.size))];
        const colors = [...new Set(data.variants.filter(v => v.color).map(v => v.color))];
        setAvailableSizes(sizes);
        setAvailableColors(colors);
      }
    } catch (error) {
      console.error('Failed to load variants');
    } finally {
      setLoading(false);
    }
  };

  const findVariant = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedSize) params.append('size', selectedSize);
      if (selectedColor) params.append('color', selectedColor);

      const data = await variantAPI.findVariant(productId, params.toString());
      setSelectedVariant(data.variant);
      onVariantSelected(data.variant);
    } catch (error) {
      toast.error('This combination is not available');
      // Reset to default variant
      const defaultVariant = variants.find(v => v.is_default) || variants[0];
      setSelectedVariant(defaultVariant);
      setSelectedSize(defaultVariant.size);
      setSelectedColor(defaultVariant.color);
      onVariantSelected(defaultVariant);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      </div>
    );
  }

  if (variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Size Selector */}
      {availableSizes.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Size: {selectedSize && <span className="text-primary-600 dark:text-primary-400">{selectedSize}</span>}
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isSelected = selectedSize === size;
              const isAvailable = variants.some(
                v => v.size === size && 
                (!selectedColor || v.color === selectedColor) && 
                v.stock > 0
              );

              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`relative px-6 py-3 border-2 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : isAvailable
                      ? 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-white'
                      : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  {size}
                  {isSelected && (
                    <Check className="absolute top-1 right-1 w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {availableColors.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Color: {selectedColor && <span className="text-primary-600 dark:text-primary-400">{selectedColor}</span>}
          </label>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => {
              const isSelected = selectedColor === color;
              const isAvailable = variants.some(
                v => v.color === color && 
                (!selectedSize || v.size === selectedSize) && 
                v.stock > 0
              );

              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  disabled={!isAvailable}
                  className={`relative px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                    isSelected
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : isAvailable
                      ? 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-white'
                      : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Color dot preview */}
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                    {color}
                  </div>
                  {isSelected && (
                    <Check className="absolute top-1 right-1 w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Variant Info */}
      {selectedVariant && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Price:</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${selectedVariant.price}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Stock:</span>
            <span className={`font-semibold ${
              selectedVariant.stock > 10 
                ? 'text-green-600 dark:text-green-400' 
                : selectedVariant.stock > 0
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {selectedVariant.stock > 0 
                ? `${selectedVariant.stock} available` 
                : 'Out of stock'}
            </span>
          </div>
          {selectedVariant.sku && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">SKU:</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                {selectedVariant.sku}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VariantSelector;