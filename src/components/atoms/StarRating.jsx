import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

export function StarRating({ rating, reviewCount, showCount = true, size = 16 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars${reviewCount ? `, ${reviewCount} reviews` : ''}`}
    >
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="text-macys-gold fill-macys-gold"
            aria-hidden
          />
        ))}
        {hasHalf && (
          <span className="relative inline-block" aria-hidden style={{ width: size, height: size }}>
            <Star size={size} className="text-macys-gray-border fill-macys-gray-border absolute inset-0" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: '50%' }}
            >
              <Star size={size} className="text-macys-gold fill-macys-gold" />
            </span>
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-macys-gray-border fill-macys-gray-border"
            aria-hidden
          />
        ))}
      </div>
      {showCount && reviewCount != null && (
        <span className="text-sm text-macys-gray-mid underline cursor-pointer hover:text-macys-red">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number,
  showCount: PropTypes.bool,
  size: PropTypes.number,
};
