import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { findProduct, searchProducts } from '../data/products';
import { SEARCH, REGEX } from '../constants';

/**
 * Detect whether a query string looks like a UPC.
 */
function isUpc(query) {
  return REGEX.UPC.test(query.trim());
}

/**
 * Sanitize a search query to prevent XSS.
 */
export function sanitizeQuery(raw) {
  return raw
    .replace(/[<>"'`]/g, '')   // strip HTML/script-relevant chars
    .trim()
    .slice(0, 100);             // cap length
}

/**
 * Central search hook.
 * - Accepts UPC (12-digit) or Product ID → redirects to PDP.
 * - Accepts keyword query → redirects to search results page.
 */
export function useSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  // Live suggestions while typing (debounced)
  useEffect(() => {
    clearTimeout(debounceRef.current);
    const safe = sanitizeQuery(query);

    if (safe.length < SEARCH.MIN_QUERY_LENGTH) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      // Direct lookup first
      const direct = findProduct(safe);
      if (direct) {
        setSuggestions([direct]);
        return;
      }
      // Otherwise keyword search
      setSuggestions(searchProducts(safe).slice(0, 6));
    }, SEARCH.DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSearch = useCallback(
    (rawQuery) => {
      const safe = sanitizeQuery(rawQuery || query);
      if (!safe) return;

      setIsSearching(true);
      setSuggestions([]);

      // Simulate async lookup
      setTimeout(() => {
        if (isUpc(safe)) {
          // UPC exact match → PDP
          const product = findProduct(safe);
          if (product) {
            navigate(`/product/${product.id}`);
          } else {
            navigate(`/search?q=${encodeURIComponent(safe)}&notfound=true`);
          }
        } else {
          // Could be product ID
          const direct = findProduct(safe);
          if (direct) {
            navigate(`/product/${direct.id}`);
          } else {
            navigate(`/search?q=${encodeURIComponent(safe)}`);
          }
        }
        setIsSearching(false);
      }, 300);
    },
    [query, navigate]
  );

  const clearSearch = useCallback(() => {
    setQuery('');
    setSuggestions([]);
  }, []);

  return {
    query,
    setQuery,
    suggestions,
    isSearching,
    handleSearch,
    clearSearch,
  };
}
