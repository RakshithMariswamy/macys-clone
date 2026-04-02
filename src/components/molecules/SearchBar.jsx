import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import { SEARCH } from '../../constants';

export function SearchBar({ className = '', autoFocus = false }) {
  const { query, setQuery, suggestions, isSearching, handleSearch, clearSearch } =
    useSearch();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function onKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') clearSearch();
  }

  function goToProduct(product) {
    clearSearch();
    navigate(`/product/${product.id}`);
  }

  return (
    <div className={['relative', className].join(' ')}>
      <div className="flex items-center border-2 border-macys-gray-border rounded-full overflow-hidden bg-white focus-within:border-black transition-colors duration-200">
        <button
          type="button"
          aria-label="Search"
          onClick={() => handleSearch()}
          className="pl-4 pr-2 text-macys-gray-mid hover:text-black transition-colors"
        >
          <Search size={18} />
        </button>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={SEARCH.PLACEHOLDER}
          aria-label="Search products"
          aria-autocomplete="list"
          aria-controls={suggestions.length ? 'search-suggestions' : undefined}
          className="flex-1 py-2.5 pr-2 text-sm text-macys-gray bg-transparent border-none outline-none placeholder-macys-gray-light"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="pr-3 pl-1 text-macys-gray-mid hover:text-macys-red transition-colors"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={() => handleSearch()}
          disabled={isSearching}
          className="bg-black text-white px-5 py-2.5 text-sm font-semibold hover:bg-macys-gray transition-colors disabled:opacity-70"
        >
          {isSearching ? 'Searching…' : 'Search'}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-macys-gray-border rounded-lg shadow-card-hover z-50 overflow-hidden animate-fade-in"
        >
          {suggestions.map((product) => (
            <li key={product.id} role="option">
              <button
                type="button"
                onClick={() => goToProduct(product)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-macys-gray-bg text-left transition-colors"
              >
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-10 h-10 object-cover rounded flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-macys-gray truncate">{product.name}</p>
                  <p className="text-xs text-macys-gray-mid">{product.brand}</p>
                </div>
                <div className="ml-auto flex-shrink-0 text-sm font-semibold text-macys-red">
                  ${(product.price.sale ?? product.price.regular).toFixed(2)}
                </div>
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => handleSearch()}
              className="w-full text-center text-sm text-macys-red font-semibold py-2.5 hover:bg-red-50 border-t border-macys-gray-border"
            >
              See all results for &ldquo;{query}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
};
