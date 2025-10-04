import React, { useEffect, useState } from 'react';
import styles from './RelatedProducts.module.css';
import ProductCard from '../product_card/ProductCard.jsx';
import { useNavigate } from 'react-router';

const RelatedProducts = ({ id }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const navigate = useNavigate();

  const navigateToProductPage = (productId) => {
    navigate(`/product-details/${productId}`);
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

    if (id) {
      fetchRelatedData();
    }
  }, [id]);

  const productsToShow = showAllProducts ? allProducts : allProducts.slice(0, 8);

  const handleViewAllProducts = () => setShowAllProducts(!showAllProducts);

  const handleAddToCart = (productId, e) => {
    if (e) e.stopPropagation(); // Prevent navigation
    const product = allProducts.find(p => p.id === productId);
    alert(`Added "${product?.title}" to cart!`);
  };

  const handleQuickView = (productId, e) => {
    if (e) e.stopPropagation(); // Prevent navigation
    const product = allProducts.find(p => p.id === productId);
    alert(`Quick view: ${product?.title}`);
  };

  // Don't render if no products
  if (productsToShow.length === 0) {
    return null;
  }

  return (
    <section className={styles.relatedProductsSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Related Products</h2>
          {allProducts.length > 8 && (
            <button
              className={styles.viewAllBtn}
              onClick={handleViewAllProducts}
            >
              {showAllProducts ? 'Show Less' : 'View All Products'} →
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className={styles.relatedProductsGrid}>
          {productsToShow.map(product => (
            <div key={product.id} className={styles.relatedProductItem}>
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
                  originalPrice={product.price + 20}
                  onAddToCart={(productId) => handleAddToCart(productId, window.event)}
                  onQuickView={(productId) => handleQuickView(productId, window.event)}
                />
              </div>

              {/* Product Details Section */}
              <div className={styles.productDetailsSection}>
                <div className={styles.productInfoHeader}>
                  <h3 className={styles.productCategory}>
                    {product?.category?.name || 'PRODUCT'}
                  </h3>
                  <h4 className={styles.productDetailTitle}>{product.title}</h4>
                  <div className={styles.productPriceRange}>${product.price}.00</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {allProducts.length > 8 && (
          <div className={styles.moreLess}>
            <button onClick={handleViewAllProducts}>
              {showAllProducts ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;