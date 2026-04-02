import { REGEX } from '../../constants';
import { findProduct, searchProducts } from '../../data/products';

/**
 * Sanitize a raw search string to prevent XSS.
 * Strips HTML-significant characters and trims whitespace.
 */
export function sanitizeQuery(raw = '') {
  return raw
    .replace(/[<>"'`]/g, '')
    .trim()
    .slice(0, 100);
}

/**
 * Determine the type of search query.
 * Returns 'upc' | 'id' | 'keyword'.
 */
export function classifyQuery(query) {
  const q = query.trim();
  if (REGEX.UPC.test(q)) return 'upc';
  if (REGEX.PRODUCT_ID.test(q)) return 'id';
  return 'keyword';
}

/**
 * Resolve a sanitized query to a result object:
 *   { type: 'product', product } — exact match, redirect to PDP
 *   { type: 'results', results } — keyword results
 *   { type: 'not_found' }        — no results at all
 */
export function resolveQuery(rawQuery) {
  const query = sanitizeQuery(rawQuery);
  if (!query) return { type: 'not_found' };

  const kind = classifyQuery(query);

  if (kind === 'upc' || kind === 'id') {
    const product = findProduct(query);
    if (product) return { type: 'product', product };
    // Fall through to keyword search for ID-like strings
  }

  const results = searchProducts(query);
  if (results.length > 0) return { type: 'results', results };

  return { type: 'not_found' };
}
