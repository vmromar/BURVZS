import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FlashDeals } from '../components/FlashDeals';
import { Manifesto } from '../components/Manifesto';
import { NextDrop } from '../components/NextDrop';

export const Home = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[135vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhwAE5GpEvjkiKI_NStV7Fd1_YGzoY5J4MpTOWGsZLDy6omSDqyJG67x7u4mpySyOG1P5TY0r2_2vxrsAFXVTtcSnCmKmHCiMLDO6lhejSrD5y0rEePGcQ8v8x8j5OfSf161SGMsf3v_nseiz-ItwwAyEwWX7NLgNWIGD6ynwnyj8oJD98Y1JuHQcjaUcxB/s1152/1773676253704648.jpeg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-80 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 w-full flex flex-col items-center">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-extrabold italic tracking-tighter uppercase text-7xl md:text-9xl mb-4 text-white skew-x-[-15deg]"
            style={{
              lineHeight: '1',
            }}
          >
            BURVZS
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-sm md:text-base font-mono tracking-[0.5em] uppercase text-gray-300 mb-12"
          >
            Nothing Stops Us
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Link 
              to="/shop" 
              className="inline-block bg-white text-black px-12 py-4 rounded-full font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors no-underline"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Logo Visual Section */}
      <div className="bg-black py-20 md:py-32 border-y border-white/10 relative flex justify-center items-center overflow-hidden">
        {/* Moving Background Text */}
        <div className="absolute inset-0 flex items-center opacity-10 pointer-events-none">
          <motion.div
            className="flex font-black text-7xl md:text-9xl tracking-tighter uppercase whitespace-nowrap text-white"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 15,
            }}
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8">
                NOTHING STOPS US <span className="text-gray-600">///</span> NSU <span className="text-gray-600">///</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating Small Logo */}
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 px-4 flex justify-center"
        >
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5rOAnSDURI3M3ZwarCjxcauX-osXv7CQ7XsCpumAtM07GK6jOBy8nbvAqh9rMXybe6aKavDu5zb37nzYrvEhF3dDtjiiURnHUxv3x7MPMTAvmib3xyGbSb9VbHoCYmwX4y1wkVvjuBmKmD-PbO1sshIrZQc4DQGa4al4A7PaRxyDuQ9uGzjNKDbV_vzP-/s736/2025_12_28_19_45_49_IMG_7053.PNG" 
            alt="Burvzs Logo Visual" 
            className="w-40 md:w-56 h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Flash Deals */}
      <FlashDeals products={products} />

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase">Latest Arrivals</h2>
          <Link to="/shop" className="text-sm font-mono tracking-widest uppercase text-gray-400 hover:text-white transition-colors border-b border-gray-400 hover:border-white pb-1">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Manifesto />
      <NextDrop />
    </div>
  );
};
