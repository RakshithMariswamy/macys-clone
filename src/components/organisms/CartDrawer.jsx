import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../atoms/Button';
import { CART } from '../../constants';

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, qualifiesForFreeShipping } =
    useCartContext();
  const { cartOpen, closeCart } = useAppContext();

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 animate-fade-in"
          onClick={closeCart}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        id="cart-drawer"
        aria-label="Shopping bag"
        className={[
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-modal',
          'transition-transform duration-300',
          cartOpen ? 'translate-x-0 animate-slide-in-right' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-macys-gray-border">
          <h2 className="text-lg font-bold text-macys-gray flex items-center gap-2">
            <ShoppingBag size={20} />
            My Bag{' '}
            {totalItems > 0 && (
              <span className="text-sm font-normal text-macys-gray-mid">({totalItems} items)</span>
            )}
          </h2>
          <button
            type="button"
            aria-label="Close bag"
            onClick={closeCart}
            className="p-1.5 text-macys-gray-mid hover:text-macys-red transition-colors rounded focus:outline-none focus:ring-2 focus:ring-macys-red"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping banner */}
        <div
          className={[
            'text-xs text-center py-2 px-4 font-medium',
            qualifiesForFreeShipping
              ? 'bg-green-50 text-green-700'
              : 'bg-amber-50 text-amber-700',
          ].join(' ')}
        >
          {qualifiesForFreeShipping
            ? '✓ You qualify for FREE shipping!'
            : `Add ${fmt(CART.FREE_SHIPPING_THRESHOLD - subtotal)} more for FREE shipping`}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-macys-gray-mid">
              <ShoppingBag size={48} className="opacity-30" />
              <div>
                <p className="font-semibold text-macys-gray">Your bag is empty</p>
                <p className="text-sm mt-1">Add items to get started</p>
              </div>
              <Button variant="primary" size="md" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartKey}
                className="flex gap-3 pb-4 border-b border-macys-gray-border last:border-0"
              >
                <Link
                  to={`/product/${item.productId}`}
                  onClick={closeCart}
                  className="flex-shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-macys-gray-mid uppercase font-medium">{item.brand}</p>
                  <Link
                    to={`/product/${item.productId}`}
                    onClick={closeCart}
                    className="text-sm font-medium text-macys-gray hover:text-macys-red line-clamp-2 leading-snug"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-macys-gray-mid mt-0.5">
                    {item.color} • {item.size}
                  </p>
                  <p className="text-sm font-bold text-macys-red mt-1">
                    {fmt(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty */}
                    <div className="flex items-center border border-macys-gray-border rounded">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-macys-gray-bg transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-sm font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                        disabled={item.quantity >= CART.MAX_QTY_PER_ITEM}
                        className="px-2 py-1 hover:bg-macys-gray-bg transition-colors disabled:opacity-40"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeItem(item.cartKey)}
                      className="text-macys-gray-light hover:text-macys-red transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-macys-gray-border px-4 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-macys-gray-mid">Subtotal ({totalItems} items)</span>
              <span className="font-bold text-macys-gray">{fmt(subtotal)}</span>
            </div>
            <p className="text-xs text-macys-gray-light">Taxes & shipping calculated at checkout</p>
            <Button variant="primary" fullWidth size="lg">
              Proceed to Checkout
            </Button>
            <Button variant="secondary" fullWidth size="md" onClick={closeCart}>
              Continue Shopping
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
