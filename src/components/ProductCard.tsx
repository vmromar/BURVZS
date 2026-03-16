import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { config } from '../config';
import { WaitlistModal } from './WaitlistModal';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  
  const [showWaitlist, setShowWaitlist] = useState(false);

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

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </>
  );
};
