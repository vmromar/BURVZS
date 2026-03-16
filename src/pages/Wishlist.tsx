import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';

export const Wishlist = () => {
  const { items } = useWishlist();

  return (
    <div className="bg-black min-h-screen text-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tighter skew-x-[-10deg] mb-16 uppercase"
        >
          WISHLIST
        </motion.h1>

        {items.length === 0 ? (
          <div className="py-24 text-center border-y border-white/10">
            <p className="text-gray-500 font-mono tracking-widest uppercase mb-8">Your wishlist is empty</p>
            <Link to="/shop" className="inline-block bg-white text-black px-8 py-4 font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
              Discover Collection
            </Link>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
