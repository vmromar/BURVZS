import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

interface FlashDealsProps {
  products: Product[];
}

export const FlashDeals: React.FC<FlashDealsProps> = ({ products }) => {
  const flashProducts = products.filter(p => p.isFlashDeal).slice(0, 3);
  
  const globalEndTime = flashProducts.length > 0 
    ? Math.min(...flashProducts.map(p => new Date(p.flashDealEndsAt || 0).getTime()))
    : 0;

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!globalEndTime) return;

    const totalDuration = 24 * 60 * 60 * 1000; 

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = globalEndTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsEnded(true);
        setProgress(0);
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        setProgress(Math.max(0, (distance / totalDuration) * 100));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [globalEndTime]);

  if (flashProducts.length === 0) return null;

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Horizontal Deal Panel */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white flex items-center gap-4 uppercase skew-x-[-5deg]">
                Flash Deals 
                <motion.span 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                >
                  🔥
                </motion.span>
              </h2>
              <p className="text-gray-400 font-mono tracking-widest uppercase mt-2 text-sm">
                Limited time offers. Don't sleep.
              </p>
            </div>

            {/* Global Timer */}
            <div className="relative bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[250px] overflow-hidden">
              {/* Animated Fire Effect around timer */}
              <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen">
                <motion.div 
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                  className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/60 via-red-900/30 to-transparent"
                />
              </div>
              
              <div className="relative z-10">
                {isEnded ? (
                  <div className="text-center text-red-500 font-bold tracking-widest uppercase text-xl py-2">
                    DEAL ENDED
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center gap-6 text-white font-mono text-2xl font-bold mb-3">
                    <div className="flex flex-col items-center">
                      <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">HRS</span>
                    </div>
                    <span className="text-gray-600">:</span>
                    <div className="flex flex-col items-center">
                      <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">MIN</span>
                    </div>
                    <span className="text-gray-600">:</span>
                    <div className="flex flex-col items-center">
                      <motion.span
                        key={timeLeft.seconds}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </motion.span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">SEC</span>
                    </div>
                  </div>
                  
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-orange-600 to-red-500"
                        initial={{ width: '100%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid inside Panel */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 relative z-10">
            {flashProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
