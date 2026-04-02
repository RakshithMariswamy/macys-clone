import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ShoppingBag, Heart, User, MapPin, Menu, X, ChevronDown,
} from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';
import { useCartContext } from '../../context/CartContext';
import { useAppContext } from '../../context/AppContext';
import { NAV_CATEGORIES, BRAND } from '../../constants';

export function Header() {
  const { totalItems } = useCartContext();
  const { toggleCart } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* Promo Bar */}
      <div className="bg-black text-white text-center py-1.5 text-xs font-medium tracking-wide">
        FREE SHIPPING ON ORDERS $25+ &nbsp;|&nbsp; USE CODE: <strong>FREESHIP</strong>
      </div>

      {/* Main Header */}
      <div className="border-b border-macys-gray-border">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden text-macys-gray hover:text-black transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-1.5"
            aria-label={`${BRAND.NAME} home`}
          >
            <MacysStarLogo />
          </Link>

          {/* Search Bar */}
          <SearchBar className="flex-1 hidden sm:block max-w-2xl mx-auto" />

          {/* Icon Actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0 flex-shrink-0">
            <IconBtn icon={<User size={20} />} label="Account" onClick={() => navigate('/')} />
            <IconBtn icon={<MapPin size={20} />} label="Stores" onClick={() => navigate('/')} />
            <IconBtn icon={<Heart size={20} />} label="Wishlist" onClick={() => navigate('/')} />
            <button
              type="button"
              aria-label={`Shopping bag, ${totalItems} items`}
              onClick={toggleCart}
              className="relative p-2 text-macys-gray hover:text-black transition-colors"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-macys-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </div>

      {/* Desktop Nav */}
      <nav aria-label="Main navigation" className="hidden lg:block bg-black">
        <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex items-center">
            {NAV_CATEGORIES.map((cat) => (
              <li
                key={cat.label}
                className="relative"
                onMouseEnter={() => setActiveNav(cat.label)}
                onMouseLeave={() => setActiveNav(null)}
              >
                <Link
                  to={cat.href}
                  className={[
                    'flex items-center gap-0.5 px-4 py-3 text-sm font-semibold transition-colors',
                    cat.label === 'Sale'
                      ? 'text-macys-red'
                      : 'text-white hover:text-gray-300',
                    activeNav === cat.label ? 'border-b-2 border-white' : '',
                  ].join(' ')}
                >
                  {cat.label}
                  {cat.subcategories.length > 0 && (
                    <ChevronDown size={14} className="opacity-60" aria-hidden />
                  )}
                </Link>

                {/* Dropdown */}
                {cat.subcategories.length > 0 && activeNav === cat.label && (
                  <div className="absolute top-full left-0 min-w-[180px] bg-white border border-macys-gray-border shadow-card-hover rounded-b-lg animate-fade-in z-50">
                    <ul className="py-2">
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/search?q=${encodeURIComponent(sub)}`}
                            className="block px-4 py-2 text-sm text-macys-gray hover:text-macys-red hover:bg-macys-gray-bg transition-colors"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/10 animate-slide-up">
          <ul className="divide-y divide-white/10">
            {NAV_CATEGORIES.map((cat) => (
              <li key={cat.label}>
                <Link
                  to={cat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={[
                    'block px-4 py-3 text-sm font-semibold',
                    cat.label === 'Sale' ? 'text-macys-red' : 'text-white',
                  ].join(' ')}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function MacysStarLogo() {
  return (
    <div className="flex items-center gap-1 select-none">
      {/* Five-pointed star */}
      <svg
        viewBox="0 0 28 28"
        className="h-8 w-8 flex-shrink-0"
        aria-hidden
        focusable="false"
      >
        <polygon
          points="14,2 16.9,10.1 25.5,10.1 18.8,15.3 21.3,23.5 14,18.6 6.7,23.5 9.2,15.3 2.5,10.1 11.1,10.1"
          fill="#E01121"
        />
      </svg>
      {/* Logotype */}
      <span className="text-macys-black font-bold text-[1.85rem] italic font-serif leading-none tracking-tight">
        macy&apos;s
      </span>
    </div>
  );
}

function IconBtn({ icon, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="hidden sm:flex flex-col items-center p-2 text-macys-gray hover:text-black transition-colors"
    >
      {icon}
      <span className="text-[10px] mt-0.5 font-medium leading-none">{label}</span>
    </button>
  );
}

IconBtn.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
