import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    headline: 'Summer Style, Made for You',
    subhead: 'Up to 60% off select dresses, swimwear & accessories',
    cta: 'Shop the Sale',
    href: '/search?sale=true',
    bg: 'from-rose-900 to-red-600',
    image: 'https://picsum.photos/seed/hero1/1400/500',
    badge: 'SUMMER SALE',
  },
  {
    id: 2,
    headline: "Men's Suit Separates Event",
    subhead: 'Mix and match to build your perfect look. Starting at $199.99',
    cta: "Shop Men's Suits",
    href: '/search?dept=men',
    bg: 'from-slate-900 to-slate-700',
    image: 'https://picsum.photos/seed/hero2/1400/500',
    badge: 'LIMITED TIME',
  },
  {
    id: 3,
    headline: 'Home Refresh Event',
    subhead: "Transform every room with Hotel Collection luxuries. Free shipping on $25+",
    cta: 'Shop Home',
    href: '/search?dept=home',
    bg: 'from-emerald-900 to-teal-700',
    image: 'https://picsum.photos/seed/hero3/1400/500',
    badge: 'NEW ARRIVALS',
  },
  {
    id: 4,
    headline: 'Beauty Bonanza',
    subhead: 'Discover top brands at prices you\'ll love. Complimentary samples with every purchase.',
    cta: 'Shop Beauty',
    href: '/search?dept=beauty',
    bg: 'from-purple-900 to-pink-700',
    image: 'https://picsum.photos/seed/hero4/1400/500',
    badge: 'TOP PICKS',
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [paused, next]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Promotional banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[280px] sm:h-[380px] lg:h-[480px]">
        {/* Background image */}
        <img
          src={slide.image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          key={slide.id}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-70`} />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-12">
            <div className="max-w-lg animate-slide-up" key={`content-${slide.id}`}>
              <span className="inline-block bg-macys-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3 rounded-sm">
                {slide.badge}
              </span>
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                {slide.headline}
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed">
                {slide.subhead}
              </p>
              <Link
                to={slide.href}
                className="inline-block bg-white text-macys-red font-bold text-sm sm:text-base px-7 py-3 rounded hover:bg-macys-red hover:text-white transition-colors duration-200"
              >
                {slide.cta} →
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 py-3 bg-white" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={[
              'rounded-full transition-all duration-200',
              i === current
                ? 'bg-macys-red w-6 h-2'
                : 'bg-macys-gray-border w-2 h-2 hover:bg-macys-gray-mid',
            ].join(' ')}
          />
        ))}
      </div>
    </section>
  );
}
