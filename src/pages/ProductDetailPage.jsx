import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Heart, Share2, Truck, RotateCcw, ShieldCheck, Video,
} from 'lucide-react';

import { PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/organisms/ProductGallery';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { StarRating } from '../components/atoms/StarRating';
import { PriceDisplay } from '../components/molecules/PriceDisplay';
import { SizeSelector } from '../components/molecules/SizeSelector';
import { ColorSelector } from '../components/molecules/ColorSelector';
import { Breadcrumb } from '../components/molecules/Breadcrumb';
import { AppointmentModal } from '../features/concierge/AppointmentModal';
import { FeaturedOffers } from '../components/organisms/FeaturedOffers';
import { useCartContext } from '../context/CartContext';
import { useAppContext } from '../context/AppContext';
import { ADD_TO_BAG_STATES, TOAST_TYPES } from '../constants';

// ─── Presenter ────────────────────────────────────────────────────────────────

function ProductDetailPresenter({
  product,
  selectedColor,
  selectedSize,
  addState,
  wishlisted,
  apptOpen,
  onColorChange,
  onSizeChange,
  onAddToBag,
  onToggleWishlist,
  onOpenAppt,
  onCloseAppt,
}) {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...(product.category
      ? product.category
          .split('>')
          .slice(0, -1)
          .map((seg) => ({ label: seg.trim(), href: `/search?q=${encodeURIComponent(seg.trim())}` }))
      : []),
    { label: product.name },
  ];

  const addLabel = {
    [ADD_TO_BAG_STATES.IDLE]: 'Add to Bag',
    [ADD_TO_BAG_STATES.LOADING]: 'Adding…',
    [ADD_TO_BAG_STATES.SUCCESS]: '✓ Added to Bag!',
    [ADD_TO_BAG_STATES.ERROR]: 'Select size & color',
  }[addState];

  return (
    <main id="main-content" className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb crumbs={breadcrumbs} />

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14">
        {/* Left — Gallery */}
        <ProductGallery images={product.images} productName={product.name} />

        {/* Right — Product Info */}
        <div className="flex flex-col gap-5">
          {/* Badges */}
          {product.badges?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.badges.map((b) => <Badge key={b} label={b} />)}
            </div>
          )}

          {/* Brand & Name */}
          <div>
            <Link
              to={`/search?q=${encodeURIComponent(product.brand)}`}
              className="text-sm font-semibold text-macys-gray-mid uppercase tracking-wide hover:text-macys-red transition-colors"
            >
              {product.brand}
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-macys-gray mt-1 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />

          {/* Price */}
          <PriceDisplay price={product.price} size="lg" />

          {/* Color Selector */}
          <ColorSelector
            colors={product.colors}
            selected={selectedColor}
            onChange={onColorChange}
          />

          {/* Size Selector */}
          {product.sizes.length > 1 || product.sizes[0] !== 'One Size' ? (
            <SizeSelector
              sizes={product.sizes}
              outOfStockSizes={product.outOfStockSizes}
              selected={selectedSize}
              onChange={onSizeChange}
            />
          ) : null}

          {/* Selection error hint */}
          {addState === ADD_TO_BAG_STATES.ERROR && (
            <p role="alert" className="text-sm text-macys-red font-medium animate-fade-in">
              Please select a color and size before adding to bag.
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              variant={addState === ADD_TO_BAG_STATES.SUCCESS ? 'dark' : 'primary'}
              size="xl"
              fullWidth
              loading={addState === ADD_TO_BAG_STATES.LOADING}
              onClick={onAddToBag}
              ariaLabel={addLabel}
            >
              {addLabel}
            </Button>

            {/* ★ Concierge Commerce CTA ★ */}
            <button
              type="button"
              onClick={onOpenAppt}
              className="flex items-center justify-center gap-2 w-full border-2 border-macys-red text-macys-red font-semibold py-3 px-6 rounded hover:bg-macys-red hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-macys-red focus:ring-offset-2 group"
            >
              <Video
                size={20}
                className="group-hover:scale-110 transition-transform"
                aria-hidden
              />
              Book a Personal Stylist — Free
            </button>

            <button
              type="button"
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={onToggleWishlist}
              className="flex items-center justify-center gap-2 text-sm text-macys-gray-mid hover:text-macys-red transition-colors py-2"
            >
              <Heart
                size={18}
                className={wishlisted ? 'fill-macys-red text-macys-red' : ''}
              />
              {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="border border-macys-gray-border rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: <Truck size={16} />, text: 'Free shipping on $25+' },
              { icon: <RotateCcw size={16} />, text: 'Free 365-day returns' },
              { icon: <ShieldCheck size={16} />, text: 'Secure checkout' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-macys-gray-mid">
                <span className="text-macys-red flex-shrink-0">{icon}</span>
                {text}
              </div>
            ))}
          </div>

          {/* Share */}
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-macys-gray-mid hover:text-macys-red transition-colors"
          >
            <Share2 size={16} />
            Share this item
          </button>

          {/* Description */}
          <div className="border-t border-macys-gray-border pt-5">
            <h2 className="font-semibold text-macys-gray mb-2">Product Details</h2>
            <p className="text-sm text-macys-gray-mid leading-relaxed">{product.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-macys-gray-bg text-macys-gray-mid px-2.5 py-1 rounded-full hover:bg-macys-red hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Product IDs */}
          <p className="text-xs text-macys-gray-light">
            Product ID: {product.id} &nbsp;|&nbsp; UPC: {product.upc}
          </p>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-16">
        <FeaturedOffers
          title="You May Also Like"
          filter={(p) => p.id !== product.id && p.department === product.department}
          maxItems={4}
        />
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={apptOpen}
        onClose={onCloseAppt}
        productId={product.id}
        productName={product.name}
      />
    </main>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartContext();
  const { addToast, openCart } = useAppContext();

  const product = PRODUCTS.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [addState, setAddState] = useState(ADD_TO_BAG_STATES.IDLE);
  const [wishlisted, setWishlisted] = useState(false);
  const [apptOpen, setApptOpen] = useState(false);

  // Set defaults when product loads
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      const defaultSize = product.sizes.find(
        (s) => !product.outOfStockSizes.includes(s)
      ) || product.sizes[0];
      setSelectedSize(defaultSize || '');
    }
  }, [product]);

  const handleAddToBag = useCallback(() => {
    if (!selectedColor || !selectedSize) {
      setAddState(ADD_TO_BAG_STATES.ERROR);
      return;
    }

    setAddState(ADD_TO_BAG_STATES.LOADING);
    setTimeout(() => {
      addItem(product, selectedColor, selectedSize);
      setAddState(ADD_TO_BAG_STATES.SUCCESS);
      addToast(`${product.name} added to your bag!`, TOAST_TYPES.SUCCESS);
      openCart();
      setTimeout(() => setAddState(ADD_TO_BAG_STATES.IDLE), 2500);
    }, 600);
  }, [product, selectedColor, selectedSize, addItem, addToast, openCart]);

  if (!product) {
    navigate('/search?notfound=true');
    return null;
  }

  return (
    <ProductDetailPresenter
      product={product}
      selectedColor={selectedColor}
      selectedSize={selectedSize}
      addState={addState}
      wishlisted={wishlisted}
      apptOpen={apptOpen}
      onColorChange={setSelectedColor}
      onSizeChange={setSelectedSize}
      onAddToBag={handleAddToBag}
      onToggleWishlist={() => setWishlisted((w) => !w)}
      onOpenAppt={() => setApptOpen(true)}
      onCloseAppt={() => setApptOpen(false)}
    />
  );
}

ProductDetailPresenter.propTypes = {
  product: PropTypes.object.isRequired,
  selectedColor: PropTypes.string.isRequired,
  selectedSize: PropTypes.string.isRequired,
  addState: PropTypes.string.isRequired,
  wishlisted: PropTypes.bool.isRequired,
  apptOpen: PropTypes.bool.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onAddToBag: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
  onOpenAppt: PropTypes.func.isRequired,
  onCloseAppt: PropTypes.func.isRequired,
};
