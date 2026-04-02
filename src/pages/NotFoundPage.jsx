import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="max-w-screen-xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center min-h-[60vh]"
    >
      <p className="text-8xl font-black text-macys-red opacity-20 leading-none select-none" aria-hidden>
        404
      </p>
      <h1 className="text-3xl font-bold text-macys-gray mt-2 mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-macys-gray-mid max-w-md mb-8">
        The page you&apos;re looking for may have been moved, deleted, or never existed.
        Let&apos;s get you back on track.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 bg-macys-red text-white font-semibold px-6 py-3 rounded hover:bg-macys-red-dark transition-colors"
        >
          <Home size={18} />
          Back to Home
        </Link>
        <Link
          to="/search"
          className="flex items-center gap-2 border-2 border-macys-gray text-macys-gray font-semibold px-6 py-3 rounded hover:bg-macys-gray hover:text-white transition-colors"
        >
          <Search size={18} />
          Search Products
        </Link>
      </div>
    </main>
  );
}
