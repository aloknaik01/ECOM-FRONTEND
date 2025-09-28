import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ 
  id, 
  image, 
  title, 
  badge, 
  onAddToCart, 
  onQuickView,
  className = '' 
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={`product-card ${className}`}>
      {/* Product Image Container */}
      <div className="product-image-container">
        <img 
          src={image} 
          alt={title}
          className="product-image"
        />

        {/* Badge */}
        {badge && (
          <span className={`product-badge ${badge.type}`}>
            {badge.text}
          </span>
        )}

        {/* Hover Actions */}
        <div className="product-actions">
          <button 
            className="action-btn quick-view-btn"
            onClick={() => onQuickView && onQuickView(id)}
            aria-label="Quick view"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
            </svg>
          </button>
          <button 
            className="action-btn add-to-cart-btn"
            onClick={() => onAddToCart && onAddToCart(id)}
            aria-label="Add to cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          <button 
            className={`action-btn wishlist-btn ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
            aria-label="Add to wishlist"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>

      </div>     
    </div>
  );
};

export default ProductCard;