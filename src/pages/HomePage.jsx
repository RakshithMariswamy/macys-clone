import { HeroBanner } from '../components/organisms/HeroBanner';
import { CategoryCarousel } from '../components/organisms/CategoryCarousel';
import { FeaturedOffers } from '../components/organisms/FeaturedOffers';

// Promotional strip data
const PROMO_STRIPS = [
  { icon: '🚚', heading: 'Free Shipping', body: 'On orders over $25' },
  { icon: '↩️', heading: 'Free Returns', body: '365 days to return' },
  { icon: '⭐', heading: 'Star Rewards', body: 'Earn points on every purchase' },
  { icon: '📍', heading: '500+ Stores', body: 'Find a store near you' },
];

export function HomePage() {
  return (
    <main id="main-content">
      {/* Hero Carousel */}
      <HeroBanner />

      {/* Promo Strip */}
      <section
        className="border-b border-macys-gray-border bg-white"
        aria-label="Store benefits"
      >
        <div className="max-w-screen-xl mx-auto px-4 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROMO_STRIPS.map((p) => (
            <div key={p.heading} className="flex items-center gap-3">
              <span className="text-2xl flex-shrink-0" aria-hidden>{p.icon}</span>
              <div>
                <p className="text-sm font-semibold text-macys-gray">{p.heading}</p>
                <p className="text-xs text-macys-gray-mid">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Carousel */}
      <CategoryCarousel />

      {/* Featured Offers — Sale Items */}
      <FeaturedOffers
        title="Today's Best Deals"
        filter={(p) => p.price.sale != null}
        maxItems={8}
      />

      {/* Editorial Banner */}
      <section className="bg-macys-gray-bg py-10 px-4 my-4">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 max-w-lg">
            <p className="text-macys-red font-bold uppercase tracking-wider text-sm mb-2">
              Concierge Commerce
            </p>
            <h2 className="text-3xl font-bold text-macys-gray mb-4 leading-tight">
              Your Personal Stylist,<br />Available Now
            </h2>
            <p className="text-macys-gray-mid mb-6 leading-relaxed">
              Can&apos;t decide? Book a free video or in-store appointment with one of our
              expert stylists. Get personalized recommendations, sizing advice, and curated
              looks — all tailored just for you.
            </p>
            <a
              href="/search"
              className="inline-block bg-macys-red text-white font-semibold px-8 py-3 rounded hover:bg-macys-red-dark transition-colors"
            >
              Book an Appointment →
            </a>
          </div>
          <div className="flex-1 flex gap-4 flex-wrap justify-center">
            {['👗 Styling', '📐 Sizing & Fit', '🎁 Gift Ideas', '💍 Special Events'].map((tag) => (
              <div
                key={tag}
                className="bg-white border border-macys-gray-border rounded-full px-5 py-2 text-sm font-medium text-macys-gray shadow-card"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <FeaturedOffers
        title="New Arrivals"
        filter={(p) => p.badges?.includes('New Arrival')}
        maxItems={4}
      />

      {/* All Products */}
      <FeaturedOffers
        title="Shop All Departments"
        maxItems={8}
      />
    </main>
  );
}
