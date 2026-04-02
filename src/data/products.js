/**
 * Mock product catalog.
 * In production this would be fetched from a REST / GraphQL API.
 */

export const PRODUCTS = [
  {
    upc: '123456789012',
    id: 'M12345',
    name: "Men's Classic Crew-Neck Graphic T-Shirt",
    brand: 'Club Room',
    department: 'men',
    category: "Men's Clothing > T-Shirts",
    description:
      'A wardrobe essential, this versatile crew-neck tee is crafted from 100% combed cotton for all-day comfort. Features a classic fit with ribbed collar, short sleeves, and a subtle chest graphic. Preshrunk to maintain its shape wash after wash — perfect for everyday wear, layering, or weekend outings.',
    price: { regular: 39.5, sale: 19.99 },
    rating: 4.5,
    reviewCount: 512,
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#1B2A4A' },
      { name: 'Black', hex: '#1A1A1A' },
      { name: 'Heather Grey', hex: '#AEAEAE' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    outOfStockSizes: ['3XL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'New Arrival'],
    inStock: true,
    tags: ['t-shirt', 'tee', 'cotton', 'casual', 'graphic', 'men'],
  },
  {
    upc: '098765432101',
    id: 'W98765',
    name: "Women's Relaxed-Fit V-Neck T-Shirt",
    brand: 'Bar III',
    department: 'women',
    category: "Women's Clothing > T-Shirts",
    description:
      'Effortlessly chic, this relaxed-fit V-neck tee is made from a soft jersey fabric with a hint of stretch for a comfortable, flattering silhouette. The dropped shoulders and slightly longer hem make it easy to tuck or wear loose. A go-to layering piece or standalone summer staple.',
    price: { regular: 34.5, sale: 17.99 },
    rating: 4.7,
    reviewCount: 389,
    colors: [
      { name: 'Blush Pink', hex: '#EDAEC0' },
      { name: 'Sage Green', hex: '#8FAA8B' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Lavender', hex: '#C8A2C8' },
    ],
    sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    outOfStockSizes: ['XXS'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'Best Seller'],
    inStock: true,
    tags: ['t-shirt', 'tee', 'v-neck', 'women', 'casual', 'jersey'],
  },
  {
    upc: '112233445566',
    id: 'J54321',
    name: "Women's Diamond Pavé Tennis Bracelet",
    brand: 'Macy\'s Fine Jewelry',
    department: 'jewelry',
    category: 'Jewelry > Bracelets > Tennis Bracelets',
    description:
      'A timeless classic, this stunning tennis bracelet showcases round brilliant-cut diamonds set in a single-row pavé setting crafted in 14K white gold. Each diamond is hand-selected for its exceptional sparkle and clarity. The secure box clasp with safety mechanism keeps this heirloom piece safely on your wrist.',
    price: { regular: 1299.0, sale: 899.0 },
    rating: 4.9,
    reviewCount: 203,
    colors: [
      { name: '14K White Gold', hex: '#E8E8E8' },
      { name: '14K Yellow Gold', hex: '#FFD700' },
      { name: '14K Rose Gold', hex: '#E8A090' },
    ],
    sizes: ['6.5 inch', '7 inch', '7.5 inch'],
    outOfStockSizes: [],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'Exclusive'],
    inStock: true,
    tags: ['jewelry', 'bracelet', 'diamond', 'gold', 'tennis bracelet', 'fine jewelry'],
  },
  {
    upc: '667788990011',
    id: 'J77654',
    name: "Women's Pearl Drop Earrings in Sterling Silver",
    brand: 'Macy\'s Fine Jewelry',
    department: 'jewelry',
    category: 'Jewelry > Earrings > Drop Earrings',
    description:
      'Elegant and versatile, these cultured freshwater pearl drop earrings are set in polished sterling silver. Each luminous pearl measures 8–9mm and is hand-matched for uniform luster and color. The secure lever-back closure ensures all-day comfort and security — perfect for both everyday elegance and special occasions.',
    price: { regular: 180.0, sale: 99.99 },
    rating: 4.8,
    reviewCount: 467,
    colors: [
      { name: 'White Pearl / Silver', hex: '#F5F5F5' },
      { name: 'Pink Pearl / Silver', hex: '#F4A5B9' },
      { name: 'Black Pearl / Silver', hex: '#2D2D2D' },
    ],
    sizes: ['One Size'],
    outOfStockSizes: [],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'Best Seller'],
    inStock: true,
    tags: ['jewelry', 'earrings', 'pearl', 'sterling silver', 'drop earrings', 'fine jewelry'],
  },
  {
    upc: '445566778899',
    id: 'H22987',
    name: 'Platform Storage Bed Frame with Upholstered Headboard',
    brand: 'Hotel Collection',
    department: 'home',
    category: 'Home > Furniture > Beds & Headboards',
    description:
      'Transform your bedroom into a luxurious retreat with this stunning platform bed. The tufted button upholstered headboard creates an elegant focal point, while the sturdy wooden slat system eliminates the need for a box spring. Four underbed drawers (two on each side) provide generous hidden storage — ideal for linens, pillows, and seasonal items.',
    price: { regular: 1499.0, sale: 999.0 },
    rating: 4.6,
    reviewCount: 341,
    colors: [
      { name: 'Ivory Linen', hex: '#F5F0E8' },
      { name: 'Charcoal Grey', hex: '#4A4A4A' },
      { name: 'Navy Blue', hex: '#1B2A4A' },
      { name: 'Blush Pink', hex: '#EDAEC0' },
    ],
    sizes: ['Twin', 'Full', 'Queen', 'King', 'California King'],
    outOfStockSizes: ['Twin'],
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'New Arrival'],
    inStock: true,
    tags: ['bed', 'bed frame', 'platform bed', 'upholstered', 'headboard', 'storage', 'bedroom', 'furniture', 'home'],
  },
  {
    upc: '334455667788',
    id: 'H33401',
    name: 'Canopy Wooden Slat King Bed with Bookcase Headboard',
    brand: 'Thomasville',
    department: 'home',
    category: 'Home > Furniture > Beds & Headboards',
    description:
      'Make a bold statement with this architectural canopy bed crafted from solid acacia wood with a warm walnut finish. The dramatic four-post canopy frame adds height and grandeur to any master bedroom. The integrated open-shelf headboard keeps books, alarm clocks, and nighttime essentials within easy reach.',
    price: { regular: 2199.0, sale: 1599.0 },
    rating: 4.7,
    reviewCount: 178,
    colors: [
      { name: 'Walnut', hex: '#773F1A' },
      { name: 'Natural Oak', hex: '#C8A96E' },
      { name: 'Espresso', hex: '#3B1A0A' },
    ],
    sizes: ['Queen', 'King', 'California King'],
    outOfStockSizes: [],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'Exclusive'],
    inStock: true,
    tags: ['bed', 'canopy bed', 'king bed', 'wood', 'walnut', 'bookcase headboard', 'bedroom', 'furniture', 'home'],
  },
  {
    upc: '556677889900',
    id: 'F44512',
    name: '3-Seat Velvet Chesterfield Sofa with Tufted Back',
    brand: 'Macy\'s Home',
    department: 'home',
    category: 'Home > Furniture > Sofas & Couches',
    description:
      'Make a statement with this glamorous Chesterfield sofa upholstered in plush crushed velvet. The classic tufted back and rolled arms lend timeless elegance, while the solid hardwood frame and eight-way hand-tied coil spring system deliver lasting durability. Seats three comfortably with deep, generously cushioned seating.',
    price: { regular: 1899.0, sale: 1299.0 },
    rating: 4.5,
    reviewCount: 289,
    colors: [
      { name: 'Emerald Green', hex: '#2E7D52' },
      { name: 'Dusty Rose', hex: '#C9808B' },
      { name: 'Navy Blue', hex: '#1B2A4A' },
      { name: 'Champagne', hex: '#E8D5A3' },
      { name: 'Charcoal', hex: '#4A4A4A' },
    ],
    sizes: ['One Size'],
    outOfStockSizes: [],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'Best Seller'],
    inStock: true,
    tags: ['sofa', 'couch', 'chesterfield', 'velvet', 'tufted', 'living room', 'furniture', 'home'],
  },
  {
    upc: '778899001122',
    id: 'F55678',
    name: 'Mid-Century Modern L-Shaped Sectional Sofa',
    brand: 'Macy\'s Home',
    department: 'home',
    category: 'Home > Furniture > Sofas & Couches',
    description:
      'Combining timeless mid-century style with contemporary comfort, this L-shaped sectional is the perfect centerpiece for any living room. The low-profile silhouette features tapered wooden legs, clean lines, and deep foam-filled cushions wrapped in a durable performance fabric. Reversible chaise configuration adapts to your space.',
    price: { regular: 2499.0, sale: 1749.0 },
    rating: 4.6,
    reviewCount: 432,
    colors: [
      { name: 'Heather Grey', hex: '#AEAEAE' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Slate Blue', hex: '#6B7FA3' },
      { name: 'Cream White', hex: '#F5F0E8' },
    ],
    sizes: ['One Size'],
    outOfStockSizes: [],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=750&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=750&fit=crop',
    ],
    badges: ['Sale', 'New Arrival'],
    inStock: true,
    tags: ['sofa', 'sectional', 'l-shaped', 'mid-century', 'living room', 'furniture', 'home'],
  },
];

/** Suggested/fallback products shown on "not found" state */
export const SUGGESTED_PRODUCTS = PRODUCTS.slice(0, 4);

/**
 * Return a product by UPC or ID.
 * UPC match takes priority when both overlap.
 */
export function findProduct(query) {
  if (!query) return null;
  const normalized = query.trim();
  // UPC priority
  const byUpc = PRODUCTS.find((p) => p.upc === normalized);
  if (byUpc) return byUpc;
  // Product ID (case-insensitive)
  const byId = PRODUCTS.find(
    (p) => p.id.toLowerCase() === normalized.toLowerCase()
  );
  return byId || null;
}

/**
 * Full-text search across name, brand, tags, and category.
 */
export function searchProducts(query) {
  if (!query || query.trim().length < 2) return [];
  const lower = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower)) ||
      p.department.toLowerCase().includes(lower)
  );
}
