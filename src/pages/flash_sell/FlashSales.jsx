import React from 'react';
import './FlashSales.css';
import ProductCard from '../../components/product_card/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FlashSales = () => {
  const flashSalesProducts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=400&fit=crop', title: 'Full Sleeve Cover Shirt', price: 40.00, originalPrice: 50.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 2, image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop', title: 'Long Sleeve T-Shirt', price: 40.00, originalPrice: 50.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 3, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop', title: 'Grey Check Coat', price: 45.00, originalPrice: 55.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 4, image: 'https://images.unsplash.com/photo-1583743814966-8936f37f8302?w=300&h=400&fit=crop', title: 'Silk White Shirt', price: 35.00, originalPrice: 45.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 5, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop', title: 'Classic Hoodie', price: 55.00, originalPrice: 65.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 6, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop', title: 'Casual T-Shirt', price: 30.00, originalPrice: 40.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 7, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop', title: 'Summer Blazer', price: 75.00, originalPrice: 85.00, badge: { type: 'sale', text: '10% Off' } },
    { id: 8, image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=300&h=400&fit=crop', title: 'Formal Shirt', price: 50.00, originalPrice: 60.00, badge: { type: 'sale', text: '10% Off' } },
  ];

  const handleAddToCart = (productId) => {
    const product = flashSalesProducts.find(p => p.id === productId);
    alert(`Added "${product.title}" to cart!`);
  };

  const handleQuickView = (productId) => {
    const product = flashSalesProducts.find(p => p.id === productId);
    alert(`Quick view: ${product.title}`);
  };

  return (
    <section className="flash-sales-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Flash Sales</h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={4}
          spaceBetween={20}
          loop={false}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="flash-swiper"
        >
          {flashSalesProducts.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                badge={product.badge}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                className="flash-product-card"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FlashSales;
