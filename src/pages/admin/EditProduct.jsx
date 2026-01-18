import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct, clearCurrentProduct } from '../../redux/slices/productSlice';
import { useForm } from '../../hooks/useForm';
import { validateProductForm } from '../../utils/validators';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Loader } from '../../components/common/Loader';
import { Upload, X } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProduct, isLoading: productLoading } = useSelector((state) => state.products);
  
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useForm(
    {
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
    },
    validateProductForm
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct) {
      setFieldValue('name', currentProduct.name);
      setFieldValue('description', currentProduct.description);
      setFieldValue('price', currentProduct.price);
      setFieldValue('category', currentProduct.category);
      setFieldValue('stock', currentProduct.stock);
      setExistingImages(currentProduct.images || []);
    }
  }, [currentProduct, setFieldValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const totalImages = existingImages.length + images.length + files.length;
    if (totalImages > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setImages([...images, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (formValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('price', formValues.price);
    formData.append('category', formValues.category);
    formData.append('stock', formValues.stock);

    // Append existing images (as JSON string)
    formData.append('existingImages', JSON.stringify(existingImages));

    // Append new images
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await dispatch(updateProduct({ id, formData })).unwrap();
      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (productLoading) {
    return <Loader fullScreen />;
  }

  if (!currentProduct) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/admin/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      <div className="max-w-3xl">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Product Information</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Product Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                placeholder="Enter product name"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                    touched.description && errors.description
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Enter product description"
                />
                {touched.description && errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Price ($)"
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && errors.price}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />

                <Input
                  label="Stock Quantity"
                  type="number"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.stock && errors.stock}
                  placeholder="0"
                  min="0"
                />
              </div>

              <Select
                label="Category"
                name="category"
                options={PRODUCT_CATEGORIES.filter(cat => cat.value !== '')}
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.category && errors.category}
              />

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images (Max 5)
                </label>

                <div className="space-y-4">
                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Current Images</p>
                      <div className="grid grid-cols-5 gap-4">
                        {existingImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={`Existing ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Images */}
                  {imagePreviews.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">New Images</p>
                      <div className="grid grid-cols-5 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`New ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-primary-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  {(existingImages.length + images.length) < 5 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                      <div className="flex flex-col items-center">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload more images
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ({existingImages.length + images.length}/5)
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" size="lg" className="flex-1" isLoading={isLoading}>
                  Update Product
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/admin/products')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;