import ProductCard from '../products/ProductCard';

const RecommendedSection = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: 'Great product name goes here similar to this',
      price: 76.0,
      originalPrice: 1128.0,
      rating: 4.5,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Great product name goes here similar to this',
      price: 1970.0,
      rating: 4.5,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Great product name goes here similar to this',
      price: 176.0,
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'Great product name goes here similar to this',
      price: 76.0,
      originalPrice: 1128.0,
      rating: 4.5,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    },
    {
      id: 5,
      name: 'Great product name goes here similar to this',
      price: 76.0,
      originalPrice: 1128.0,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
    },
    {
      id: 6,
      name: 'Great product name goes here similar to this',
      price: 89.0,
      rating: 4.3,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    },
    {
      id: 7,
      name: 'Great product name goes here similar to this',
      price: 245.0,
      rating: 4.7,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
    },
    {
      id: 8,
      name: 'Great product name goes here similar to this',
      price: 156.0,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
    },
    {
      id: 9,
      name: 'Great product name goes here similar to this',
      price: 425.0,
      rating: 4.8,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
    },
    {
      id: 10,
      name: 'Great product name goes here similar to this',
      price: 98.0,
      rating: 4.4,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommended items</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-5 gap-4">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;