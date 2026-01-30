import { useState, useEffect } from 'react';
import ProductCard from '../products/ProductCard';

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    minutes: 58,
    seconds: 2,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const deals = [
    {
      id: 1,
      name: 'Smart watch with the sleek and stylish your perfect assistant',
      price: 99.99,
      originalPrice: 149.99,
      rating: 4.5,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Xiaomi Smartphone Pro Max 256GB memory and Ultra clarity',
      price: 459.99,
      originalPrice: 599.99,
      rating: 4.8,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Smart watch with the sleek and stylish your perfect assistant',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'Galaxy Set, designed for both work and play with effortless ease',
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.7,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    },
    {
      id: 5,
      name: 'Smart watch with the sleek and stylish your perfect assistant',
      price: 349.99,
      originalPrice: 499.99,
      rating: 4.5,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?w=400&h=400&fit=crop',
    },
  ];

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg min-w-[60px] text-center">
        <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs text-gray-600 mt-1 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Deals and offers</h2>
          <p className="text-gray-600">Electronics & Gadgets</p>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center gap-3">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Min" />
          <TimeBox value={timeLeft.seconds} label="Sec" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-5 gap-4">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} showDiscount={true} />
        ))}
      </div>
    </div>
  );
};

export default DealsSection;