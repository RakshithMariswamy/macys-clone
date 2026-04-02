import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { StarRating } from '../atoms/StarRating';
import { PriceDisplay } from './PriceDisplay';

export function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200">
      {/* Wishlist button */}
      <button
        type="button"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={(e) => {
          e.preventDefault();
          setWishlisted((w) => !w);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow hover:scale-110 transition-transform"
      >
        <Heart
          size={18}
          className={wishlisted ? 'fill-macys-red text-macys-red' : 'text-macys-gray-light'}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
        <div className="product-image-zoom aspect-[4/5] bg-macys-gray-bg overflow-hidden">
          {!imgError ? (
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-macys-gray-light">
              <span className="text-4xl">🛍️</span>
            </div>
          )}
        </div>
      </Link>

      {/* Badges */}
      {product.badges?.length > 0 && (
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
      )}

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <p className="text-xs text-macys-gray-mid font-medium uppercase tracking-wide">
          {product.brand}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-medium text-macys-gray hover:text-macys-red transition-colors line-clamp-2 leading-snug"
        >
          {product.name}
        </Link>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size={13}
        />
        <div className="mt-auto pt-1">
          <PriceDisplay price={product.price} size="sm" />
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.shape({
      regular: PropTypes.number.isRequired,
      sale: PropTypes.number,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    badges: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
