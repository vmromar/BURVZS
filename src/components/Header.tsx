import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';
import { WaitlistModal } from './WaitlistModal';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50' : 'bg-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 md:gap-4">
            
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white hover:text-gray-300 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5rOAnSDURI3M3ZwarCjxcauX-osXv7CQ7XsCpumAtM07GK6jOBy8nbvAqh9rMXybe6aKavDu5zb37nzYrvEhF3dDtjiiURnHUxv3x7MPMTAvmib3xyGbSb9VbHoCYmwX4y1wkVvjuBmKmD-PbO1sshIrZQc4DQGa4al4A7PaRxyDuQ9uGzjNKDbV_vzP-/s736/2025_12_28_19_45_49_IMG_7053.PNG" 
                  alt="BURVZS logo" 
                  className="h-3 md:h-5 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x60/000000/ffffff?text=BURVZS&font=montserrat";
                  }}
                />
              </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="flex flex-1 max-w-md mx-2 md:mx-4">
              <form onSubmit={handleSearch} className="w-full relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH..."
                  className="w-full bg-white/5 border border-white/10 rounded-full text-white text-xs md:text-sm py-2 px-3 md:px-4 pl-8 md:pl-10 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 uppercase tracking-widest"
                />
                <Search size={14} className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" />
              </form>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
              
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="hidden md:block text-xs font-bold tracking-widest uppercase text-white hover:text-gray-300 transition-colors"
              >
                Waitlist
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="text-white hover:text-gray-300 transition-colors relative group">
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="text-white hover:text-gray-300 transition-colors relative group">
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu & Search */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4">
                <div className="space-y-1 flex flex-col">
                  <Link to="/" className="text-white block px-3 py-4 text-base font-medium tracking-widest uppercase border-b border-white/10 hover:bg-white/5 rounded-xl transition-colors">Home</Link>
                  <Link to="/shop" className="text-white block px-3 py-4 text-base font-medium tracking-widest uppercase border-b border-white/10 hover:bg-white/5 rounded-xl transition-colors">Shop</Link>
                  <Link to="/manifesto" className="text-white block px-3 py-4 text-base font-medium tracking-widest uppercase border-b border-white/10 hover:bg-white/5 rounded-xl transition-colors">Manifesto</Link>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsWaitlistOpen(true);
                    }}
                    className="text-left text-white block px-3 py-4 text-base font-medium tracking-widest uppercase hover:bg-white/5 rounded-xl transition-colors"
                  >
                    Waitlist
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />
    </>
  );
};
