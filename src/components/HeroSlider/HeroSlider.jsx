<<<<<<< HEAD
=======
// Save as: src/components/HeroSlider/HeroSlider.jsx

>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './HeroSlider.css';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Summer",
      subtitle: "Collection",
<<<<<<< HEAD
      description: "Discover the season's freshest looks — light, breezy, and made for sunshine.",
=======
      description: "Discover the season’s freshest looks — light, breezy, and made for sunshine.",
>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 2,
      title: "Autumn",
      subtitle: "Essentials",
      description: "Warm tones, cozy vibes, and timeless layers to define your fall wardrobe.",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1920&q=80"
    },
    {
      id: 3,
      title: "Winter",
      subtitle: "Luxury Wear",
      description: "Wrap yourself in comfort with premium fabrics and bold winter designs.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
<<<<<<< HEAD
    const interval = setInterval(nextSlide, 5000);
=======
    const interval = setInterval(nextSlide, 6000);
>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider">
<<<<<<< HEAD
      <div className="container">
        <div className="hero-slider-inner">
          <div
            className="hero-slider-wrapper"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="hero-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-slide-overlay"></div>

                <div className="hero-content">
                  <h1 className="hero-title">
                    {slide.title} <span className="highlight">{slide.subtitle}</span>
                  </h1>
                  <p className="hero-description">{slide.description}</p>
                  <button className="hero-button">Shop Now</button>
                </div>
              </div>
            ))}
          </div>

          <button className="hero-arrow left" onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-arrow right" onClick={nextSlide} aria-label="Next slide">
            <ChevronRight size={24} />
          </button>

          <div className="hero-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`hero-dot ${index === current ? 'active' : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
=======
      <div
        className="hero-slider-wrapper"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="hero-slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-slide-overlay"></div>

            <div className="container hero-content">
              <h1 className="hero-title">
                {slide.title} <span className="highlight">{slide.subtitle}</span>
              </h1>
              <p className="hero-description">{slide.description}</p>
              <button className="hero-button">Shop Now</button>
            </div>
          </div>
        ))}
      </div>

      <button className="hero-arrow left" onClick={prevSlide}>
        <ChevronLeft size={28} />
      </button>
      <button className="hero-arrow right" onClick={nextSlide}>
        <ChevronRight size={28} />
      </button>

      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`hero-dot ${index === current ? 'active' : ''}`}
          ></button>
        ))}
>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default HeroSlider;
=======
export default HeroSlider;
>>>>>>> b9bb26afde6c0219d68c81a85d2fe737ccdd670b
