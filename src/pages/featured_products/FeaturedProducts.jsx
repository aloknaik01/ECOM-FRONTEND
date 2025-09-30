import React, { useEffect, useState } from 'react';
import './FeaturedProducts.css';
import ProductCard from '../../components/product_card/ProductCard';
import { useNavigate } from 'react-router';

const FeaturedProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  
  const others = {
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#ffdd44', '#ffffff', '#000000'],
    priceRange: '$18.00 - $20.00'
  };

  const navigate = useNavigate();

  function navigateToProductPage(productId) {
navigate(`product-details/${productId}`)
  }

  useEffect(() => {
    async function fetchAllData() {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        
        // Add "others" to every product and format properly
        const updated = data.map((item, index) => ({
          ...item,
          ...others,
          // Add some variety to make it look more realistic
          priceRange: index % 2 === 0 ? '$18.00 - $20.00' : '$15.00 - $25.00',
          colors: index % 3 === 0 ? ['#000000', '#ffffff', '#808080'] : 
                 index % 3 === 1 ? ['#ff0000', '#00ff00', '#0000ff'] : 
                 ['#ffdd44', '#ffffff', '#000000']
        }));
        
        setAllProducts(updated);
        console.log("fetched", updated);
      } catch (e) {
        console.log("Failed to fetch data", e);
      }
    }
    
    fetchAllData();
  }, []);

  const [showAllProducts, setShowAllProducts] = useState(false);
  
  // Show first 8 products by default, all when showAllProducts is true
  const productsToShow = showAllProducts ? allProducts : allProducts.slice(0, 8);

  const handleViewAllProducts = () => {
    setShowAllProducts(!showAllProducts);
  };

  const handleAddToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    console.log(`Added to cart: ${product.title}`);
    alert(`Added "${product.title}" to cart!`);
  };

  const handleQuickView = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    console.log('Quick view:', product);
    alert(`Quick view: ${product.title}`);
  };

  return (
    <section className="featured-products-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <div>
            <button className="view-all-btn" onClick={handleViewAllProducts}>
            {showAllProducts ? 'Show Less' : 'View All Products'} →
          </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="featured-products-grid">
          {productsToShow.map(product => (
            <div key={product.id} className="featured-product-item">
              {/* Product Card */}
              
              <div className="product-card-wrapper"
              onClick={() => navigateToProductPage(product.id)}>
                <ProductCard
                  id={product.id}
                  image={product.images?.[0] || product.image}
                  title={product.title}
                  price={product.price}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              </div>

              {/* Product Details Section */}
              <div className="product-details-section">
                {/* Product Title and Price Range */}
                <div className="product-info-header">
                  <h3 className="product-detail-title">{product.title}</h3>
                  <div className="product-price-range">{product.priceRange}</div>
                </div>

                {/* Color Options */}
                <div className="product-colors">
                  {product.colors.map((color, index) => (
                    <button 
                      key={index} 
                      className="color-option" 
                      style={{ backgroundColor: color }}
                      title={`Color ${index + 1}`}
                      aria-label={`Color option ${index + 1}`}
                    ></button>
                  ))}
                </div>

                {/* Size Options */}
                <div className="product-sizes">
                  {product.sizes.map(size => (
                    <button 
                      key={size} 
                      className="size-option"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

          <div className='more-less'>
            {
              allProducts.length > 8 && !showAllProducts ?  (<button onClick={handleViewAllProducts}>
                show more
              </button>) : (<button  onClick={handleViewAllProducts}>
                show less
              </button>)
            }
            </div>
         
        
      </div>
    </section>
  );
};

export default FeaturedProducts;
