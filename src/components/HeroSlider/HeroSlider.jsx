import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Summer",
      subtitle: "Collection",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
      bgColor: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    },
    {
      id: 2,
      title: "Winter",
      subtitle: "Collection",
      description: "Discover our latest winter collection with cozy and stylish pieces perfect for the cold season.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 3,
      title: "Spring",
      subtitle: "Collection",
      description: "Fresh and vibrant pieces that celebrate the beauty of spring. Light, airy, and perfect for any occasion.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '80vh' }}>
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          height: '80vh'
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex items-center justify-center px-8"
            style={{ background: slide.bgColor }}
          >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12">
              {/* Left Content */}
              <div className="text-left space-y-6 z-10">
                <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
                  <span className="bg-blue-600 text-white px-4 py-2 inline-block mb-2">
                    {slide.title}
                  </span>
                  <br />
                  <span className="text-gray-800">{slide.subtitle}</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                  {slide.description}
                </p>
                <button className="bg-gray-800 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-900 transition-all hover:-translate-y-1 hover:shadow-lg">
                  SHOP IT NOW →
                </button>
              </div>

              {/* Right Image */}
              <div className="flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  <img
                    src={slide.image}
                    alt={`${slide.title} Collection`}
                    className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                    style={{ maxHeight: '600px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 hover:text-white transition-all z-20 border border-gray-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 hover:text-white transition-all z-20 border border-gray-200"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-gray-800 w-8'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator (optional) */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .min-w-full > div > div:first-child > * {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;