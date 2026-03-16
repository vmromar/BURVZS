import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X } from 'lucide-react';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { config } from '../config';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({ name: '', email: '' });
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const isSoldOut = product.badge === 'SOLD OUT';

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isSoldOut) {
      e.preventDefault();
      setShowWaitlist(true);
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (waitlistForm.name && waitlistForm.email) {
      const waitlist = JSON.parse(localStorage.getItem('burvzs_waitlist') || '[]');
      waitlist.push({ productId: product.id, ...waitlistForm, date: new Date().toISOString() });
      localStorage.setItem('burvzs_waitlist', JSON.stringify(waitlist));
      setWaitlistSuccess(true);
      setTimeout(() => {
        setShowWaitlist(false);
        setWaitlistSuccess(false);
        setWaitlistForm({ name: '', email: '' });
      }, 3000);
    }
  };

  return (
    <>
      <Link 
        to={`/product/${product.id}`} 
        onClick={handleCardClick}
        className="group relative block transition-all duration-500 hover:-translate-y-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] p-3 shadow-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-black/20">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle Gradient Highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badges */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase z-10 shadow-sm">
              {product.badge}
            </div>
          )}
          
          {/* Wishlist Button */}
          <button 
            onClick={toggleWishlist}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/10"
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "transparent"} />
          </button>

          {/* Hover Glow & Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <span 
              className="text-white font-mono text-sm tracking-widest uppercase font-bold text-center px-4 drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
            >
              {isSoldOut ? 'NOTIFY ME' : 'Nothing Stops Us'}
            </span>
          </div>
        </div>

        <div className="mt-4 px-2 pb-2">
          <h3 className="text-white text-sm font-medium tracking-widest uppercase group-hover:text-gray-300 transition-colors">{product.name}</h3>
          <p className="text-gray-400 text-sm mt-1 font-mono">{product.price} {config.currency}</p>
        </div>
      </Link>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showWaitlist && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowWaitlist(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-[24px] p-8 max-w-md w-full relative shadow-2xl shadow-black"
            >
              <button 
                onClick={() => setShowWaitlist(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {waitlistSuccess ? (
                <div className="text-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    ✓
                  </motion.div>
                  <h3 className="text-2xl font-bold tracking-widest uppercase mb-2 text-white">You're on the list</h3>
                  <p className="text-gray-400 font-mono text-sm">We'll notify you when {product.name} restocks.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold tracking-widest uppercase mb-2 text-white">Join Waitlist</h3>
                  <p className="text-gray-400 font-mono text-sm mb-6 uppercase">Get notified when {product.name} is back in stock.</p>
                  
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="YOUR NAME"
                        value={waitlistForm.name}
                        onChange={e => setWaitlistForm({...waitlistForm, name: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <input 
                        type="email" 
                        required
                        placeholder="YOUR EMAIL"
                        value={waitlistForm.email}
                        onChange={e => setWaitlistForm({...waitlistForm, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-white text-black rounded-full h-12 font-bold tracking-widest uppercase hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 mt-4"
                    >
                      Notify Me
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
