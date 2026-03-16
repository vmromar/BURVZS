import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter skew-x-[-10deg] mb-8"
          >
            COLLECTION
          </motion.h1>
          
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PRODUCTS..."
              className="w-full bg-transparent border-b border-white/30 text-white py-3 px-2 focus:outline-none focus:border-white transition-colors uppercase tracking-widest text-sm font-mono"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500 font-mono tracking-widest uppercase">No products found matching "{searchQuery}"</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
