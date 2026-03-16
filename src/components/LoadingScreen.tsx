import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
        >
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5rOAnSDURI3M3ZwarCjxcauX-osXv7CQ7XsCpumAtM07GK6jOBy8nbvAqh9rMXybe6aKavDu5zb37nzYrvEhF3dDtjiiURnHUxv3x7MPMTAvmib3xyGbSb9VbHoCYmwX4y1wkVvjuBmKmD-PbO1sshIrZQc4DQGa4al4A7PaRxyDuQ9uGzjNKDbV_vzP-/s736/2025_12_28_19_45_49_IMG_7053.PNG"
            alt="BURVZS logo"
            className="h-5 md:h-12 object-contain mb-8"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = "https://placehold.co/400x120/000000/ffffff?text=BURVZS&font=montserrat";
            }}
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-mono text-sm tracking-[0.3em] uppercase text-gray-400"
          >
            Nothing Stops Us. Ever
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
