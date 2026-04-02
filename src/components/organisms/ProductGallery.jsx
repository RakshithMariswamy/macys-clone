import { useState } from 'react';
import PropTypes from 'prop-types';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductGallery({ images, productName }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  function prev() {
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
    setZoomed(false);
  }

  function next() {
    setActiveIdx((i) => (i + 1) % images.length);
    setZoomed(false);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div
        className={[
          'relative overflow-hidden rounded-lg bg-macys-gray-bg aspect-[4/5] cursor-zoom-in',
          zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
        ].join(' ')}
        onClick={() => setZoomed((z) => !z)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomed(false)}
        role="img"
        aria-label={`${productName} — image ${activeIdx + 1} of ${images.length}`}
      >
        <img
          src={images[activeIdx]}
          alt={`${productName} view ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-transform duration-200"
          style={
            zoomed
              ? {
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: 'scale(2)',
                }
              : {}
          }
          draggable={false}
        />

        {/* Zoom hint */}
        {!zoomed && (
          <div className="absolute bottom-3 right-3 bg-white/80 rounded-full p-1.5 shadow text-macys-gray-mid">
            <ZoomIn size={18} aria-hidden />
          </div>
        )}

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 rounded-full shadow hover:bg-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto carousel-container">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === activeIdx}
              onClick={() => { setActiveIdx(i); setZoomed(false); }}
              className={[
                'flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all',
                i === activeIdx
                  ? 'border-macys-red shadow-sm'
                  : 'border-macys-gray-border hover:border-macys-gray-mid',
              ].join(' ')}
            >
              <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  productName: PropTypes.string.isRequired,
};
