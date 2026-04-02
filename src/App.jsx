import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppContext';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { CartDrawer } from './components/organisms/CartDrawer';
import { ToastContainer } from './components/organisms/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-macys-red focus:text-white focus:px-4 focus:py-2 focus:rounded font-semibold"
      >
        Skip to main content
      </a>

      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AppProvider>
  );
}
