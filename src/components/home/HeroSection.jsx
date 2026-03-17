import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Premium Collection',
      subtitle: 'Modern Electronics',
      description: 'Experience cutting-edge technology with our curated gadgets.',
      buttonText: 'Shop Tech',
      bgColor: 'from-cyan-300 to-blue-400',
      image: 'https://images.unsplash.com/photo-1526733170375-be81ef7d96af?w=600&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'First Order Offer',
      subtitle: 'Get $10 Off',
      description: 'Subscribe to our newsletter and get a discount on your first purchase.',
      buttonText: 'Claim Discount',
      bgColor: 'from-gray-600 to-gray-700',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'New Arrivals',
      subtitle: 'Season Trends',
      description: 'Stay ahead of the curve with our latest seasonal collections.',
      buttonText: 'View New',
      bgColor: 'from-orange-400 to-pink-500',
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=600&fit=crop',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] rounded-2xl overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}>
            <div className="container mx-auto h-full flex items-center px-8">
              <div className="flex-1 text-white z-10">
                <h2 className="text-5xl font-bold mb-2 animate-fade-in">
                  {slide.title}
                </h2>
                <p className="text-4xl font-bold mb-4">{slide.subtitle}</p>
                <p className="text-lg mb-6 opacity-90">{slide.description}</p>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  {slide.buttonText}
                </button>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-[350px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;