import React, { useState } from 'react';
import './BestSellingProducts.css';
import ProductCard from '../../components/product_card/ProductCard';

const BestSellingProducts = () => {
  // Dummy products data with categories
  const allProducts = [
    // T-Shirts
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      title: 'Half Sleeve T-Shirt',
      price: 40.00,
      category: 'tshirts',
      badge: { type: 'new', text: 'New' }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=400&fit=crop',
      title: 'Stylish Grey T-Shirt',
      price: 35.00,
      category: 'tshirts'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=300&h=400&fit=crop',
      title: 'Silk White Shirt',
      price: 35.00,
      category: 'tshirts'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop',
      title: 'White Half T-Shirt',
      price: 30.00,
      category: 'tshirts'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop',
      title: 'Ghee Half T-Shirt',
      price: 40.00,
      category: 'tshirts',
      badge: { type: 'sale', text: 'Sale' }
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop',
      title: 'Long Sleeve T-Shirt',
      price: 40.00,
      category: 'tshirts'
    },

    // Shoes
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
      title: 'Orange White Nike',
      price: 55.00,
      category: 'shoes',
      badge: { type: 'featured', text: 'Featured' }
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=400&fit=crop',
      title: 'Running Shoe',
      price: 65.00,
      category: 'shoes'
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=400&fit=crop',
      title: 'Tennis Shoe',
      price: 80.00,
      category: 'shoes',
      badge: { type: 'new', text: 'New' }
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop',
      title: 'Nike Brand Shoe',
      price: 65.00,
      category: 'shoes'
    },

    // Hoodies
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop',
      title: 'Grunge Hoodie',
      price: 30.00,
      category: 'hoodie',
      badge: { type: 'sale', text: 'Sale' }
    },
    {
      id: 12,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      title: 'Classic Black Hoodie',
      price: 45.00,
      category: 'hoodie'
    },

    // Pants
    {
      id: 13,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop',
      title: 'Casual Jeans',
      price: 75.00,
      category: 'pants'
    },
    {
      id: 14,
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=300&h=400&fit=crop',
      title: 'Formal Pants',
      price: 85.00,
      category: 'pants',
      badge: { type: 'new', text: 'New' }
    },

    // Outer
    {
      id: 15,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
      title: 'Leather Jacket',
      price: 120.00,
      category: 'outer',
      badge: { type: 'featured', text: 'Featured' }
    },
    {
      id: 16,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=400&fit=crop',
      title: 'Winter Coat',
      price: 150.00,
      category: 'outer'
    },

    // Jackets
    {
      id: 17,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
      title: 'Denim Jacket',
      price: 95.00,
      category: 'jackets'
    },
    {
      id: 18,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop',
      title: 'Bomber Jacket',
      price: 110.00,
      category: 'jackets',
      badge: { type: 'sale', text: 'Sale' }
    },

    // Accessories
    {
      id: 19,
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=400&fit=crop',
      title: 'Woolen Hat',
      price: 25.00,
      category: 'accessories'
    },
    {
      id: 20,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      title: 'Leather Belt',
      price: 35.00,
      category: 'accessories',
      badge: { type: 'new', text: 'New' }
    }
  ];

  // Categories for navigation
  const categories = [
    { id: 'all', label: 'All', count: allProducts.length },
    { id: 'shoes', label: 'Shoes', count: allProducts.filter(p => p.category === 'shoes').length },
    { id: 'tshirts', label: 'Tshirts', count: allProducts.filter(p => p.category === 'tshirts').length },
    { id: 'pants', label: 'Pants', count: allProducts.filter(p => p.category === 'pants').length },
    { id: 'hoodie', label: 'Hoodie', count: allProducts.filter(p => p.category === 'hoodie').length },
    { id: 'outer', label: 'Outer', count: allProducts.filter(p => p.category === 'outer').length },
    { id: 'jackets', label: 'Jackets', count: allProducts.filter(p => p.category === 'jackets').length },
    { id: 'accessories', label: 'Accessories', count: allProducts.filter(p => p.category === 'accessories').length }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === activeCategory);

  // Show limited products or all based on showAllProducts state
  const productsToShow = showAllProducts ? filteredProducts : filteredProducts.slice(0, 8);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setShowAllProducts(false); // Reset to show limited products when changing category
  };

  const handleViewAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  const handleAddToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    console.log('Added to cart:', product);
    alert(`Added "${product.title}" to cart!`);
  };

  const handleQuickView = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    console.log('Quick view:', product);
    alert(`Quick view: ${product.title}`);
  };

  return (
    <section className="best-selling-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Best Selling Products</h2>
        </div>

        {/* Category Navigation */}
        <div className="category-navigation">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="best-selling-grid">
          {productsToShow.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              badge={product.badge}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
              className="best-selling-card"
            />
          ))}
        </div>

        {/* View All Products Button */}
        {filteredProducts.length > 8 && (
          <div className="products-count">
            <p className="count-text">
              Showing {productsToShow.length} of {filteredProducts.length} products
            </p>
            <button 
              className="view-all-btn"
              onClick={handleViewAllProducts}
            >
              {showAllProducts ? 'Show Less' : 'View All Products'} →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellingProducts;
