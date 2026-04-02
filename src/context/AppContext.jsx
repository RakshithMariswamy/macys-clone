import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TOAST_TYPES } from '../constants';

const AppContext = createContext(null);

let toastIdCounter = 0;

export function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 3500) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleCart = useCallback(() => setCartOpen((p) => !p), []);

  return (
    <AppContext.Provider
      value={{ toasts, addToast, removeToast, cartOpen, openCart, closeCart, toggleCart }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside <AppProvider>');
  return ctx;
}
