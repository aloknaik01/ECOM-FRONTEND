import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'recently_viewed_products';
const MAX_ITEMS = 8;

export const useRecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setRecentProducts(stored);
  }, []);

  const addToRecent = (product) => {
    if (!product || !product.id) return;

    let stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    
    // Remove if already exists to move to front
    stored = stored.filter(p => p.id !== product.id);
    
    // Add to front
    stored.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      ratings: product.ratings,
      category: product.category
    });

    // Keep only MAX_ITEMS
    stored = stored.slice(0, MAX_ITEMS);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
    setRecentProducts(stored);
  };

  return { recentProducts, addToRecent };
};
