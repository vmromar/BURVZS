import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Manifesto } from './components/Manifesto';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
            <LoadingScreen />
            <AnnouncementBar />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/manifesto" element={<Manifesto />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

