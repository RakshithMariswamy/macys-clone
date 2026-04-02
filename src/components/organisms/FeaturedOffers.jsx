import PropTypes from 'prop-types';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../molecules/ProductCard';
import { Link } from 'react-router-dom';

export function FeaturedOffers({ title = 'Featured Offers', filter, maxItems = 4 }) {
  const products = (filter ? PRODUCTS.filter(filter) : PRODUCTS).slice(0, maxItems);

  return (
    <section className="py-8 px-4 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-macys-gray">{title}</h2>
        <Link
          to="/search"
          className="text-sm font-semibold text-macys-red hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

FeaturedOffers.propTypes = {
  title: PropTypes.string,
  filter: PropTypes.func,
  maxItems: PropTypes.number,
};
