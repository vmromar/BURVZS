import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { config } from '../config';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { DEFAULT_VAULT_PRODUCTS } from '../config/vaultConfig';
import { WaitlistModal } from '../components/WaitlistModal';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    // Check normal products
    let found = products.find(p => p.id === id);
    
    if (!found) {
      // Check vault products
      const savedProducts = localStorage.getItem('vault_products');
      const vaultProducts = savedProducts ? JSON.parse(savedProducts) : DEFAULT_VAULT_PRODUCTS;
      found = vaultProducts.find((p: any) => p.id === id);
      
      // Ensure gallery exists for vault products
      if (found && !found.gallery) {
        found.gallery = [found.image];
      }
    }
    
    setProduct(found);
  }, [id]);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  // Waitlist State
  const [showWaitlist, setShowWaitlist] = useState(false);

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
              {product.gallery.map((img: string, idx: number) => (
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
                  {product.sizes.map((size: string) => (
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
                  {product.colors.map((color: string) => (
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

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </div>
  );
};
