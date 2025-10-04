import React, { useEffect, useState } from 'react';
import styles from './RelatedProducts.module.css';
import ProductCard from '../product_card/ProductCard.jsx';
import { useNavigate } from 'react-router';

const RelatedProducts = ({ id }) => {
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  const navigateToProductPage = (productId) => {
    navigate(`product-details/${productId}`);
  };

  useEffect(() => {
    async function fetchRelatedData() {
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}/related`);
        const data = await res.json();
        setAllProducts(data);
      } catch (e) {
        console.log("Failed to fetch data", e);
      }
    }

    fetchRelatedData();
  }, []);


  const [showAllProducts, setShowAllProducts] = useState(false);

  let productsToShow = [];

  if (allProducts.length > 0) {
    productsToShow = showAllProducts ? allProducts : allProducts.slice(0, 8);
  } else {
    productsToShow = []
  }

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
    productsToShow.length > 0 &&
    <section className={styles.featuredProductsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Related Products</h2>
          <div>
            <button
              className={styles.viewAllBtn}
              onClick={handleViewAllProducts}
            >
              {showAllProducts.length > 0 ? 'Show Less' : 'View All Products'} →
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
                  image={product.images?.[0] || product.image}
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
                  <div className={styles.productPriceRange}>{product.price}</div>
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

export default RelatedProducts;
