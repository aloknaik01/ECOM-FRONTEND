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

  // Auto-play with pause on unmount
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[420px] rounded-3xl overflow-hidden group bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.8)]">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 translate-x-6 scale-95'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 md:gap-10 items-center">
              {/* Content */}
              <div className="relative z-10 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-white/5 shadow-[0_22px_60px_rgba(15,23,42,0.95)] px-6 sm:px-8 md:px-10 py-8 md:py-10 backdrop-blur-xl">
                <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.2em] mb-5 text-slate-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  Featured
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 leading-tight text-slate-50">
                  {slide.title}
                </h2>
                <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-slate-200">
                  {slide.subtitle}
                </p>
                <p className="text-sm sm:text-base md:text-lg mb-7 text-slate-300 max-w-xl">
                  {slide.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button className="relative inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-full font-semibold text-slate-900 bg-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(15,23,42,1)]">
                    <span>{slide.buttonText}</span>
                    <span className="ml-2 text-lg">→</span>
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-slate-200/70 opacity-70"></span>
                  </button>
                  <span className="text-xs sm:text-sm text-slate-300">
                    Free shipping on orders over $99
                  </span>
                </div>
              </div>

              {/* Product / image */}
              <div className="relative flex items-center justify-center md:justify-end mt-4 md:mt-0">
                <div className="relative w-48 sm:w-56 md:w-[260px] aspect-[4/5] rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-white/10 shadow-[0_25px_70px_rgba(15,23,42,1)] overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(148,163,184,0.45),transparent_55%),radial-gradient(circle_at_90%_80%,rgba(94,234,212,0.35),transparent_55%)]" />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="relative z-10 h-full w-full object-contain transform transition-transform duration-700 group-hover:scale-[1.04] group-hover:translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/85 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:-translate-x-0.5"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/85 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:translate-x-0.5"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8 shadow-[0_0_12px_rgba(255,255,255,0.9)]'
                : 'bg-white/50 w-2 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;