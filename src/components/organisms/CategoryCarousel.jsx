import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEPARTMENTS } from '../../constants';

export function CategoryCarousel() {
  const scrollRef = useRef(null);

  function scroll(dir) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: 'smooth' });
  }

  return (
    <section className="py-8 px-4 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-macys-gray">Shop by Category</h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="p-2 border border-macys-gray-border rounded-full hover:border-macys-red hover:text-macys-red transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="p-2 border border-macys-gray-border rounded-full hover:border-macys-red hover:text-macys-red transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="carousel-container flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
        role="list"
        aria-label="Product categories"
      >
        {DEPARTMENTS.map((dept) => (
          <Link
            key={dept.id}
            to={`/search?dept=${dept.id}`}
            role="listitem"
            className="snap-start flex-shrink-0 flex flex-col items-center gap-2 group"
          >
            <div
              className={[
                'w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl',
                dept.color,
                'group-hover:ring-2 group-hover:ring-macys-red group-hover:ring-offset-2 transition-all duration-200',
              ].join(' ')}
            >
              {dept.emoji}
            </div>
            <span className="text-xs sm:text-sm font-medium text-macys-gray group-hover:text-macys-red transition-colors text-center w-24 leading-tight">
              {dept.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
