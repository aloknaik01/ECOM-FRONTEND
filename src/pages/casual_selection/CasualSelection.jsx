import React from 'react';
import './CasualSelection.css';

const CasualSelection = () => {
  const handleShopCollection = () => {
    console.log('Shop Collection clicked');
    // Add navigation logic here
    alert('Navigating to Denim Collection...');
  };

  return (
    <section className="casual-selection-section">
      <div className="container">
        <div className="casual-selection-banner">
          {/* Left side - Model Image */}
          <div className="casual-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=500&fit=crop" 
              alt="Casual Denim Collection Model" 
              className="casual-model-image"
            />
          </div>
          
          {/* Right side - Content */}
          <div className="casual-content-wrapper">
            <div className="casual-text-content">
              <span className="collection-label">DENIM COLLECTION</span>
              
              <h2 className="casual-main-title">
                The Casual Selection.
              </h2>
              
              <p className="casual-description">
                Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. 
                Tempor egestas condimentum et ac rutrum dui, odio.
              </p>
              
              <button 
                className="shop-btn"
                onClick={handleShopCollection}
              >
                Shop Collection →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasualSelection;
