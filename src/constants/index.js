// ─── Brand ────────────────────────────────────────────────────────────────────
export const BRAND = {
  NAME: "Macy's",
  TAGLINE: "The Magic of Everyday",
  PHONE: '1-800-289-6229',
  EMAIL: 'customer.service@macys.com',
};

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product/:id',
  SEARCH: '/search',
  NOT_FOUND: '*',
};

// ─── Search ───────────────────────────────────────────────────────────────────
export const SEARCH = {
  UPC_LENGTH: 12,
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_MS: 350,
  PLACEHOLDER: 'Search by keyword, product ID, or 12-digit UPC',
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const CART = {
  LOCAL_STORAGE_KEY: 'macys_cart',
  MAX_QTY_PER_ITEM: 10,
  FREE_SHIPPING_THRESHOLD: 25,
};

// ─── Appointment ──────────────────────────────────────────────────────────────
export const APPOINTMENT = {
  LOCAL_STORAGE_KEY: 'macys_appointments',
  BUSINESS_HOURS: { open: 9, close: 20 }, // 9 AM – 8 PM
  TIME_SLOTS: [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',
    '3:00 PM',  '3:30 PM',  '4:00 PM',  '4:30 PM',
    '5:00 PM',  '5:30 PM',  '6:00 PM',  '6:30 PM',
    '7:00 PM',  '7:30 PM',
  ],
  TOPICS: [
    'Outfit Styling',
    'Sizing & Fit Consultation',
    'Gift Selection',
    'Wedding & Special Events',
    'Wardrobe Planning',
    'Product Inquiry',
  ],
  TYPES: ['Virtual', 'In store'],
  DURATIONS: ['1 hour', '2 hours', '3 hours'],
  SHOPPING_FOR: [
    'Casual / Everyday Wear',
    'Work / Business Attire',
    'Formal / Evening Wear',
    'Active / Athleisure',
    'Seasonal Refresh',
    'Accessories & Jewelry',
    'Home & Gifts',
  ],
  SPECIAL_OCCASIONS: [
    'Wedding',
    'Birthday',
    'Anniversary',
    'Holiday / Festive',
    'Graduation',
    'Job Interview',
    'Date Night',
    'Baby Shower',
  ],
};

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_CATEGORIES = [
  { label: "Women's", href: '/search?dept=women', subcategories: ['Tops', 'Dresses', 'Pants', 'Shoes', 'Handbags', 'Jewelry'] },
  { label: "Men's", href: '/search?dept=men', subcategories: ['Suits', 'Shirts', 'Pants', 'Shoes', 'Watches', 'Ties'] },
  { label: 'Kids', href: '/search?dept=kids', subcategories: ['Girls', 'Boys', 'Baby', 'Shoes'] },
  { label: 'Home', href: '/search?dept=home', subcategories: ['Bedding', 'Kitchen', 'Furniture', 'Décor', 'Luggage'] },
  { label: 'Beauty', href: '/search?dept=beauty', subcategories: ['Makeup', 'Skincare', 'Fragrance', 'Hair'] },
  { label: 'Jewelry', href: '/search?dept=jewelry', subcategories: ['Rings', 'Necklaces', 'Bracelets', 'Earrings'] },
  { label: 'Shoes', href: '/search?dept=shoes', subcategories: ["Women's", "Men's", 'Kids'] },
  { label: 'Sale', href: '/search?sale=true', subcategories: [] },
];

// ─── Departments (category icons) ─────────────────────────────────────────────
export const DEPARTMENTS = [
  { id: 'women', label: "Women's", emoji: '👗', color: 'bg-pink-50' },
  { id: 'men', label: "Men's", emoji: '👔', color: 'bg-blue-50' },
  { id: 'kids', label: 'Kids', emoji: '🧸', color: 'bg-yellow-50' },
  { id: 'home', label: 'Home', emoji: '🏠', color: 'bg-green-50' },
  { id: 'beauty', label: 'Beauty', emoji: '💄', color: 'bg-purple-50' },
  { id: 'jewelry', label: 'Jewelry', emoji: '💍', color: 'bg-amber-50' },
  { id: 'shoes', label: 'Shoes', emoji: '👠', color: 'bg-rose-50' },
  { id: 'sale', label: 'Sale', emoji: '🏷️', color: 'bg-red-50' },
];

// ─── Add-to-Bag states ─────────────────────────────────────────────────────────
export const ADD_TO_BAG_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// ─── Toast types ──────────────────────────────────────────────────────────────
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// ─── Regex ────────────────────────────────────────────────────────────────────
export const REGEX = {
  UPC: /^\d{12}$/,
  PRODUCT_ID: /^[A-Za-z0-9]{5,10}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// ─── Promotions ───────────────────────────────────────────────────────────────
export const PROMO_CODES = ['SAVE20', 'SUMMER10', 'WELCOME15'];
