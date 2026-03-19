import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    tag: 'Hot Deal',
    title: 'Next-Gen',
    titleHighlight: 'Electronics',
    description: 'Experience cutting-edge tech at unbeatable prices. Shop our curated collection of premium gadgets.',
    buttonText: 'Shop Electronics',
    buttonLink: '/products?category=Electronics',
    secondaryText: 'Free Delivery',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&h=700&fit=crop&q=80',
    overlay: 'linear-gradient(125deg, #0f172a 0%, #1e3a5f 40%, #0c4a6e 70%, transparent 100%)',
    accent: '#38bdf8',
    accentDark: '#0369a1',
    badge: 'Up to 40% OFF',
  },
  {
    id: 2,
    tag: 'New Season',
    title: 'Fashion',
    titleHighlight: 'Redefined',
    description: "Stay ahead of every trend. Discover exclusive styles from the world's top designers.",
    buttonText: 'Explore Fashion',
    buttonLink: '/products?category=Fashion',
    secondaryText: 'New Arrivals Daily',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=700&fit=crop&q=80',
    overlay: 'linear-gradient(125deg, #1a0533 0%, #4c1d95 40%, #7c3aed 70%, transparent 100%)',
    accent: '#c4b5fd',
    accentDark: '#7c3aed',
    badge: 'New Collection',
  },
  {
    id: 3,
    tag: 'Home Living',
    title: 'Transform',
    titleHighlight: 'Your Space',
    description: 'Premium home décor and furniture. Make every corner of your home a story worth telling.',
    buttonText: 'Shop Home',
    buttonLink: '/products?category=Home & Garden',
    secondaryText: 'Interior Inspirations',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=700&fit=crop&q=80',
    overlay: 'linear-gradient(125deg, #0f2918 0%, #14532d 40%, #166534 70%, transparent 100%)',
    accent: '#86efac',
    accentDark: '#16a34a',
    badge: 'Free Shipping',
  },
  {
    id: 4,
    tag: 'Active Life',
    title: 'Sports &',
    titleHighlight: 'Fitness Gear',
    description: 'Fuel your fitness journey with top-of-the-line equipment and activewear for every goal.',
    buttonText: 'Get Active',
    buttonLink: '/products?category=Sports',
    secondaryText: 'Pro-Grade Equipment',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&h=700&fit=crop&q=80',
    // overlay: 'linear-gradient(125deg, #1c0a00 0%, #78350f 40%, #b45309 70%, transparent 100%)',
    accent: '#fde68a',
    accentDark: '#d97706',
    badge: 'Best Sellers',
  },
  {
    id: 5,
    tag: 'Beauty',
    title: 'Glow Up',
    titleHighlight: 'Collection',
    description: 'Luxury beauty essentials, skincare and cosmetics that nourish and inspire confidence.',
    buttonText: 'Shop Beauty',
    buttonLink: '/products?category=Beauty',
    secondaryText: 'Premium Brands',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&h=700&fit=crop&q=80',
    overlay: 'linear-gradient(125deg, #2d0716 0%, #881337 40%, #be185d 70%, transparent 100%)',
    accent: '#fbcfe8',
    accentDark: '#be185d',
    badge: 'Up to 30% OFF',
  },
];

const AUTO_PLAY_INTERVAL = 5000;

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState('next');
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  // Drag/touch state
  const dragStart = useRef(null);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback(
    (index, dir = 'next') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 50);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next');
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, goTo]);

  // Auto-play
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
  }, [next]);

  useEffect(() => {
    if (isPlaying) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isPlaying, startTimer]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') setIsPlaying((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Drag/touch handlers
  const onPointerDown = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX;
    dragDelta.current = 0;
    isDragging.current = true;
    clearInterval(timerRef.current);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (x != null) dragDelta.current = x - dragStart.current;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDelta.current < -60) next();
    else if (dragDelta.current > 60) prev();
    if (isPlaying) startTimer();
  };

  const slide = slides[current];

  return (
    <div
      className="relative w-full overflow-hidden select-none rounded-2xl shadow-xl"
      style={{ height: 'clamp(220px, 34vw, 400px)' }}
      onMouseDown={onPointerDown}
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={onPointerDown}
      onTouchMove={onPointerMove}
      onTouchEnd={onPointerUp}
      role="region"
      aria-label="Hero Carousel"
    >
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1)]"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current
              ? 'translateX(0) scale(1)'
              : direction === 'next'
                ? 'translateX(6%) scale(0.97)'
                : 'translateX(-6%) scale(0.97)',
            zIndex: i === current ? 2 : 1,
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          {/* Background image */}
          <img
            src={s.image}
            alt={s.title + ' ' + s.titleHighlight}
            className="absolute inset-0 w-full h-full object-cover object-center"
            draggable={false}
          />

          {/* Subtle dark gradient for text readability (left to right) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative h-full flex items-center px-5 sm:px-10 md:px-16 lg:px-20 max-w-screen-2xl mx-auto">
            <div
              className="max-w-lg space-y-2.5 sm:space-y-3 transition-all duration-700"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: i === current ? '200ms' : '0ms',
              }}
            >
              {/* Tag */}
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm"
                style={{
                  background: `${s.accent}22`,
                  borderColor: `${s.accent}55`,
                  color: s.accent,
                }}
              >
                {s.tag}
              </span>

              {/* Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white drop-shadow-lg">
                {s.title}
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${s.accent}, #fff)`,
                  }}
                >
                  {s.titleHighlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed">
                {s.description}
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to={s.buttonLink}
                  className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] active:scale-95"
                  style={{
                    background: `linear-gradient(135deg, ${s.accent}, ${s.accentDark})`,
                    color: '#fff',
                  }}
                >
                  {s.buttonText}
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Badge */}
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold border"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                  }}
                >
                  🏷 {s.badge}
                </span>
              </div>

              {/* Secondary info */}
              <p className="text-xs text-white/50 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: s.accent }}
                />
                {s.secondaryText} · Free Returns · Secure Checkout
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* ── Navigation Arrows ── */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full backdrop-blur-md border border-white/20 bg-black/30 text-white shadow-xl transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full backdrop-blur-md border border-white/20 bg-black/30 text-white shadow-xl transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ── Bottom Controls ── */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-4">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              className="relative overflow-hidden rounded-full transition-all duration-500"
              style={{
                width: i === current ? '2.5rem' : '0.55rem',
                height: '0.55rem',
                background:
                  i === current
                    ? slides[current].accent
                    : 'rgba(255,255,255,0.35)',
              }}
            >
              {i === current && (
                <span
                  className="absolute inset-0 rounded-full origin-left"
                  style={{
                    background: 'rgba(255,255,255,0.3)',
                    animation: isPlaying
                      ? `carousel-progress ${AUTO_PLAY_INTERVAL}ms linear forwards`
                      : 'none',
                    key: current,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Play / Pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex items-center justify-center w-7 h-7 rounded-full backdrop-blur-md border border-white/20 bg-black/30 text-white transition-all duration-200 hover:bg-white/20 hover:scale-110"
          aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>

        {/* Slide count */}
        <span className="text-white/50 text-xs tabular-nums">
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Inject keyframes */}
      <style>{`
        @keyframes carousel-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;