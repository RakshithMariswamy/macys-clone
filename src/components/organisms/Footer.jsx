import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { BRAND } from '../../constants';

const FOOTER_LINKS = [
  {
    heading: 'Customer Service',
    links: [
      { label: 'Contact Us', href: '/' },
      { label: 'Order Status', href: '/' },
      { label: 'Returns & Exchanges', href: '/' },
      { label: 'Shipping & Delivery', href: '/' },
      { label: 'Size Charts', href: '/' },
      { label: 'Price Match Policy', href: '/' },
    ],
  },
  {
    heading: 'About Macy\'s',
    links: [
      { label: 'About Us', href: '/' },
      { label: 'Careers', href: '/' },
      { label: 'Investor Relations', href: '/' },
      { label: 'Press Room', href: '/' },
      { label: 'Accessibility', href: '/' },
    ],
  },
  {
    heading: 'Programs & Perks',
    links: [
      { label: 'Star Rewards', href: '/' },
      { label: "Macy's Credit Card", href: '/' },
      { label: 'Gift Cards', href: '/' },
      { label: 'Wedding Registry', href: '/' },
      { label: 'Gift Registry', href: '/' },
    ],
  },
];

const SOCIAL = [
  { icon: <Instagram size={20} />, label: 'Instagram', href: '/' },
  { icon: <Twitter size={20} />, label: 'Twitter', href: '/' },
  { icon: <Facebook size={20} />, label: 'Facebook', href: '/' },
  { icon: <Youtube size={20} />, label: 'YouTube', href: '/' },
];

export function Footer() {
  return (
    <footer className="bg-black text-white mt-16">
      {/* Newsletter */}
      <div className="bg-black border-b border-white/10 py-8 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Get 20% off your next order</h3>
            <p className="text-sm text-gray-400">Join our mailing list for exclusive offers and style inspiration.</p>
          </div>
          <form
            className="flex w-full sm:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className="flex-1 sm:w-64 px-4 py-2 rounded text-macys-gray text-sm focus:outline-none focus:ring-2 focus:ring-macys-red"
            />
            <button
              type="submit"
              className="bg-macys-red text-white px-5 py-2 rounded text-sm font-semibold hover:bg-macys-red-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main links */}
      <div className="max-w-screen-xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {FOOTER_LINKS.map((col) => (
          <div key={col.heading}>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              {col.heading}
            </h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* App & Social */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
            Follow Us
          </h4>
          <div className="flex gap-3 flex-wrap">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <p className="text-xs text-gray-400">Download the app</p>
            <div className="flex gap-2 flex-wrap">
              <Link to="/" className="bg-white/10 text-xs px-3 py-1.5 rounded text-gray-300 hover:bg-white/20 transition-colors">
                App Store
              </Link>
              <Link to="/" className="bg-white/10 text-xs px-3 py-1.5 rounded text-gray-300 hover:bg-white/20 transition-colors">
                Google Play
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.NAME}, Inc. All rights reserved.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link to="/" className="hover:text-gray-300 transition-colors">Do Not Sell My Info</Link>
            <Link to="/" className="hover:text-gray-300 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
