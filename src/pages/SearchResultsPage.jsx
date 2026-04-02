import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Frown, ArrowRight } from 'lucide-react';
import { resolveQuery } from '../features/search/searchUtils';
import { ProductCard } from '../components/molecules/ProductCard';
import { SearchBar } from '../components/molecules/SearchBar';
import { SUGGESTED_PRODUCTS } from '../data/products';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const dept = searchParams.get('dept') || '';
  const isSale = searchParams.get('sale') === 'true';

  const [resolution, setResolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate async resolution
    const timer = setTimeout(() => {
      const result = resolveQuery(rawQuery || dept || (isSale ? 'sale' : ''));
      setResolution(result);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [rawQuery, dept, isSale]);

  const displayQuery = rawQuery || dept || (isSale ? 'Sale Items' : '');

  return (
    <main id="main-content" className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Re-search bar */}
      <SearchBar className="mb-8 max-w-2xl" autoFocus={false} />

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <LoadingSpinner size="xl" />
        </div>
      ) : resolution?.type === 'not_found' ? (
        <NotFoundState query={displayQuery} />
      ) : (
        <ResultsGrid results={resolution?.results || []} query={displayQuery} />
      )}
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ResultsGrid({ results, query }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h1 className="text-xl font-bold text-macys-gray">
          {query ? (
            <>
              Results for <span className="text-macys-red">"{query}"</span>
            </>
          ) : (
            'All Products'
          )}
          <span className="text-sm font-normal text-macys-gray-mid ml-2">
            ({results.length} items)
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function NotFoundState({ query }) {
  return (
    <div className="animate-fade-in">
      {/* Not Found Hero */}
      <div className="text-center py-12 max-w-lg mx-auto">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-macys-gray-bg rounded-full flex items-center justify-center">
            <Frown size={40} className="text-macys-gray-mid" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-macys-gray mb-3">
          No results found
          {query && (
            <span className="block text-macys-red mt-1">"{query}"</span>
          )}
        </h1>
        <p className="text-macys-gray-mid mb-2">We couldn&apos;t find what you&apos;re looking for. Here are some suggestions:</p>
        <ul className="text-sm text-macys-gray-mid space-y-1 mb-6 text-left inline-block">
          <li>• Check the spelling of your search term</li>
          <li>• Try a more general keyword</li>
          <li>• Search by product category or brand</li>
          <li>• Enter a 12-digit UPC barcode number</li>
        </ul>
        <div className="flex items-center justify-center gap-2">
          <Search size={16} className="text-macys-gray-mid" />
          <span className="text-sm text-macys-gray-mid">
            Or try one of our popular searches:
          </span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {['Dresses', 'Suits', 'Handbags', 'Sneakers', 'Bedding', 'Watches'].map((term) => (
            <Link
              key={term}
              to={`/search?q=${encodeURIComponent(term)}`}
              className="text-sm border border-macys-gray-border rounded-full px-4 py-1.5 hover:border-macys-red hover:text-macys-red transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold text-macys-gray">You Might Like</h2>
          <ArrowRight size={18} className="text-macys-gray-mid" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SUGGESTED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

import PropTypes from 'prop-types';

ResultsGrid.propTypes = {
  results: PropTypes.array.isRequired,
  query: PropTypes.string,
};

NotFoundState.propTypes = {
  query: PropTypes.string,
};
