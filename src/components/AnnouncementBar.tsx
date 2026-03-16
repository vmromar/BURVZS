import React from 'react';
import { motion } from 'motion/react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-white text-black py-2 overflow-hidden whitespace-nowrap border-b border-black flex">
      <motion.div
        className="flex font-mono text-xs tracking-widest uppercase font-bold"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <span key={i} className="mx-4 whitespace-nowrap">
            NOTHING STOPS US EVER — BURVZS — 
          </span>
        ))}
      </motion.div>
    </div>
  );
};
