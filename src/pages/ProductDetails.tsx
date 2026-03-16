import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { config } from '../config';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  // Waitlist State
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistForm, setWaitlistForm] = useState({ name: '', email: '' });
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono uppercase tracking-widest">Product Not Found</div>;
  }

  const isWishlisted = isInWishlist(product.id);
  const isSoldOut = product.badge === 'SOLD OUT';

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/cart');
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
    <div className="bg-black min-h-screen text-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden rounded-[24px] shadow-2xl shadow-white/5">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={product.gallery[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-black text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase shadow-lg">
                  {product.badge}
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 border-2 transition-all duration-300 ${activeImage === idx ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter skew-x-[-10deg] mb-4 uppercase">{product.name}</h1>
              <p className="text-2xl font-mono text-gray-300">{product.price} {config.currency}</p>
            </div>

            <p className="text-gray-400 font-mono text-sm tracking-wide leading-relaxed mb-12 uppercase">
              {product.description}
            </p>

            {/* Attributes */}
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-500">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 font-mono text-sm ${
                        selectedSize === size 
                          ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                          : 'bg-white/5 text-white border-white/10 hover:border-white/50 hover:bg-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-500">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-8 h-14 rounded-full flex items-center justify-center border transition-all duration-300 font-mono text-sm uppercase ${
                        selectedColor === color 
                          ? 'bg-white text-black border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                          : 'bg-white/5 text-white border-white/10 hover:border-white/50 hover:bg-white/10'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {!isSoldOut && (
                <div>
                  <h3 className="text-xs font-bold tracking-widest uppercase mb-4 text-gray-500">Quantity</h3>
                  <div className="flex items-center border border-white/20 rounded-full w-36 h-14 bg-white/5 backdrop-blur-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 h-full flex items-center justify-center text-white hover:bg-white/10 rounded-l-full transition-colors"
                    >-</button>
                    <span className="flex-1 text-center font-mono text-sm">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 h-full flex items-center justify-center text-white hover:bg-white/10 rounded-r-full transition-colors"
                    >+</button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isSoldOut ? (
                <button 
                  onClick={() => setShowWaitlist(true)}
                  className="flex-1 bg-white text-black rounded-full h-14 font-bold tracking-widest uppercase hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  Notify Me
                </button>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full h-14 font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  Add to Cart
                </button>
              )}
              <button 
                onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className="w-14 h-14 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                <Heart size={24} fill={isWishlisted ? "white" : "transparent"} />
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showWaitlist && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
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
                  <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">You're on the list</h3>
                  <p className="text-gray-400 font-mono text-sm">We'll notify you when {product.name} restocks.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold tracking-widest uppercase mb-2">Join Waitlist</h3>
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
    </div>
  );
};
