import React from 'react';
import './CollectionsGrid.css';
import CollectionCard from '../../components/collection_card/CollectionCard';

const CollectionsGrid = () => {
  const collectionsData = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=500&fit=crop',
      category: 'CASUAL COLLECTION',
      title: 'Street Wear.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.',
      buttonText: 'Shop Collection',
      size: 'large'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      category: 'BASIC COLLECTION',
      title: 'Basic Shoes.',
      description: null,
      buttonText: 'Shop Collection',
      size: 'medium'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=300&fit=crop',
      category: 'BEST SELLING PRODUCT',
      title: 'Woolen Hat.',
      description: null,
      buttonText: 'Shop Collection',
      size: 'medium'
    }
  ];

  const handleShopCollection = (collectionId) => {
    const collection = collectionsData.find(c => c.id === collectionId);
    alert(`Shopping ${collection.title} collection!`);
  };

  return (
    <section className="collections-section">
      <div className="container">
        <div className="collections-grid">
          {collectionsData.map(collection => (
            <CollectionCard
              key={collection.id}
              {...collection}
              onShopCollection={handleShopCollection}
              className="collection-grid-item"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
