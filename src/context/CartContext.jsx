import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../hooks/useCart';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used inside <CartProvider>');
  return ctx;
}
