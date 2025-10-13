import React, { useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css'; // CSS Module
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

  const navigateToProductPage = (productId) => {
    navigate(`product-details/${productId}`);
  };

  useEffect(() => {
    async function fetchAllData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        const updated = data.map((item, index) => ({
          ...item,
          ...others,
          priceRange: index % 2 === 0 ? '$18.00 - $20.00' : '$15.00 - $25.00',
          colors: index % 3 === 0 ? ['#000000', '#ffffff', '#808080'] :
          index % 3 === 1 ? ['#ff0000', '#00ff00', '#0000ff'] :
          ['#ffdd44', '#ffffff', '#000000']
        }));
        
        setAllProducts(updated);
        console.log(updated)
      } catch (e) {
        console.log("Failed to fetch data", e);
      }
    }

    fetchAllData();
  }, []);

  const [showAllProducts, setShowAllProducts] = useState(false);
  const productsToShow = showAllProducts ? allProducts : allProducts.slice(0, 8);

  const handleViewAllProducts = () => setShowAllProducts(!showAllProducts);
  const handleAddToCart = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    alert(`Added "${product.title}" to cart!`);
  };
  const handleQuickView = (productId) => {
    const product = allProducts.find(p => p.id === productId);
    alert(`Quick view: ${product.title}`);
  };

  return (
    <section className={styles.featuredProductsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <div>
            <button
              className={styles.viewAllBtn}
              onClick={handleViewAllProducts}
            >
              {showAllProducts ? 'Show Less' : 'View All Products'} →
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.featuredProductsGrid}>
          {productsToShow.map(product => (
            <div key={product.id} className={styles.featuredProductItem}>
              {/* Product Card */}
              <div
                className={styles.productCardWrapper}
                onClick={() => navigateToProductPage(product.id)}
              >
                <ProductCard
                  id={product.id}
                  image={product?.image}
                  title={product.title}
                  price={product.price}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                />
              </div>

              {/* Product Details Section */}
              <div className={styles.productDetailsSection}>
                <div className={styles.productInfoHeader}>
                  <h3 className={styles.productDetailTitle}>{product.title}</h3>
                  <div className={styles.productPriceRange}>{product.priceRange}</div>
                </div>

                {/* Color Options */}
                <div className={styles.productColors}>
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={styles.colorOption}
                      style={{ backgroundColor: color }}
                      title={`Color ${index + 1}`}
                      aria-label={`Color option ${index + 1}`}
                    ></button>
                  ))}
                </div>

                {/* Size Options */}
                <div className={styles.productSizes}>
                  {product.sizes.map(size => (
                    <button key={size} className={styles.sizeOption}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More/Less Button */}
        <div className={styles.moreLess}>
          <button onClick={handleViewAllProducts}>
            {allProducts.length > 8 && !showAllProducts ? 'Show More' : 'Show Less'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
