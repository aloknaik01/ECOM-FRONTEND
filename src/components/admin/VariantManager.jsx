import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { variantAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const VariantManager = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  
  const [formData, setFormData] = useState({
    sku: '',
    size: '',
    color: '',
    material: '',
    price: '',
    stock: '',
    is_default: false
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchVariants();
  }, [productId]);

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const data = await variantAPI.getProductVariants(productId);
      setVariants(data.variants);
    } catch (error) {
      toast.error('Failed to load variants');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + images.length > 3) {
      toast.error('Maximum 3 images per variant');
      return;
    }

    setImages(prev => [...prev, ...files]);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('size', formData.size);
    formDataToSend.append('color', formData.color);
    formDataToSend.append('material', formData.material);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('is_default', formData.is_default);
    
    if (formData.sku) {
      formDataToSend.append('sku', formData.sku);
    }

    images.forEach(image => {
      formDataToSend.append('images', image);
    });

    try {
      if (editingVariant) {
        await variantAPI.admin.update(editingVariant.id, formDataToSend);
        toast.success('Variant updated successfully');
      } else {
        await variantAPI.admin.add(productId, formDataToSend);
        toast.success('Variant added successfully');
      }

      setShowModal(false);
      resetForm();
      fetchVariants();
    } catch (error) {
      toast.error(error.message || 'Failed to save variant');
    }
  };

  const handleEdit = (variant) => {
    setEditingVariant(variant);
    setFormData({
      sku: variant.sku || '',
      size: variant.size || '',
      color: variant.color || '',
      material: variant.material || '',
      price: variant.price,
      stock: variant.stock,
      is_default: variant.is_default
    });
    
    // Show existing images
    if (variant.images && variant.images.length > 0) {
      setImagePreviews(variant.images.map(img => img.url));
    }
    
    setShowModal(true);
  };

  const handleDelete = async (variantId) => {
    if (!window.confirm('Are you sure you want to delete this variant?')) {
      return;
    }

    try {
      await variantAPI.admin.delete(variantId);
      toast.success('Variant deleted successfully');
      fetchVariants();
    } catch (error) {
      toast.error('Failed to delete variant');
    }
  };

  const resetForm = () => {
    setFormData({
      sku: '',
      size: '',
      color: '',
      material: '',
      price: '',
      stock: '',
      is_default: false
    });
    setImages([]);
    setImagePreviews([]);
    setEditingVariant(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Product Variants
        </h3>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Variant
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : variants.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            No variants yet. Add size, color options for this product.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {variant.size && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
                        {variant.size}
                      </span>
                    )}
                    {variant.color && (
                      <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs font-medium rounded">
                        {variant.color}
                      </span>
                    )}
                    {variant.is_default && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Price:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">${variant.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Stock:</span>
                      <span className={`font-semibold ${
                        variant.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {variant.stock}
                      </span>
                    </div>
                    {variant.sku && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">SKU:</span>
                        <span className="font-mono text-xs text-gray-900 dark:text-white">{variant.sku}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(variant)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(variant.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              {/* Variant Images */}
              {variant.images && variant.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {variant.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`Variant ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingVariant ? 'Edit Variant' : 'Add New Variant'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* SKU */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="SKU-001"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Size & Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Size
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="M, L, XL"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Red, Blue"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material (Optional)
                </label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="Cotton, Polyester"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Default Variant */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={formData.is_default}
                  onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                />
                <label htmlFor="is_default" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Set as default variant
                </label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variant Images (Max 3)
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={images.length >= 3}
                  />
                </label>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        {!editingVariant && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingVariant ? 'Update Variant' : 'Add Variant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantManager;