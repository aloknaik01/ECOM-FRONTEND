import React from 'react';
import './CollectionCard.css';

const CollectionCard = ({ 
  id,
  image, 
  category, 
  title, 
  description, 
  buttonText,
  onShopCollection,
  size = 'medium',
  className = '' 
}) => {
  
  const handleShopClick = () => {
    if (onShopCollection) {
      onShopCollection(id);
    }
  };

  return (
    <div className={`collection-card ${size} ${className}`}>
      <div className="collection-image-container">
        <img 
          src={image} 
          alt={title}
          className="collection-image"
        />
    
        <div className="collection-content">
          <div className="collection-category">{category}</div>
          <h3 className="collection-title">{title}</h3>
          {description && (
            <p className="collection-description">{description}</p>
          )}
          <button 
            className="collection-button"
            onClick={handleShopClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
