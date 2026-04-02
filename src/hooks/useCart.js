import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { CART } from '../constants';

/**
 * Cart management hook backed by localStorage.
 * Each cart item: { cartKey, productId, upc, name, brand, price, color, size, quantity, image }
 */
export function useCart() {
  const [items, setItems] = useLocalStorage(CART.LOCAL_STORAGE_KEY, []);

  /** Generate a unique key per product+color+size combo */
  const makeKey = (id, color, size) => `${id}__${color}__${size}`;

  const addItem = useCallback(
    (product, color, size, qty = 1) => {
      const cartKey = makeKey(product.id, color, size);
      setItems((prev) => {
        const existing = prev.find((i) => i.cartKey === cartKey);
        if (existing) {
          return prev.map((i) =>
            i.cartKey === cartKey
              ? {
                  ...i,
                  quantity: Math.min(
                    i.quantity + qty,
                    CART.MAX_QTY_PER_ITEM
                  ),
                }
              : i
          );
        }
        return [
          ...prev,
          {
            cartKey,
            productId: product.id,
            upc: product.upc,
            name: product.name,
            brand: product.brand,
            price: product.price.sale ?? product.price.regular,
            color,
            size,
            quantity: qty,
            image: product.images[0],
          },
        ];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (cartKey) => {
      setItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (cartKey, quantity) => {
      if (quantity < 1) {
        removeItem(cartKey);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.cartKey === cartKey
            ? { ...i, quantity: Math.min(quantity, CART.MAX_QTY_PER_ITEM) }
            : i
        )
      );
    },
    [setItems, removeItem]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const qualifiesForFreeShipping = subtotal >= CART.FREE_SHIPPING_THRESHOLD;

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    qualifiesForFreeShipping,
  };
}
