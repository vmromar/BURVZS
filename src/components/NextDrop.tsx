import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const NextDrop = () => {
  // Set next drop to 7 days from now
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 75);
    targetDate.setHours(20, 0, 0, 0); // 8 PM

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold tracking-[0.5em] uppercase text-gray-400 mb-8"
        >
          Next Drop
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tighter skew-x-[-10deg] mb-16"
        >
          COLLECTION 001
        </motion.h3>

        <div className="flex gap-4 md:gap-8 font-mono">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <span className="text-4xl md:text-6xl font-light text-gray-600">:</span>
          <TimeUnit value={timeLeft.hours} label="HRS" />
          <span className="text-4xl md:text-6xl font-light text-gray-600">:</span>
          <TimeUnit value={timeLeft.minutes} label="MIN" />
          <span className="text-4xl md:text-6xl font-light text-gray-600">:</span>
          <TimeUnit value={timeLeft.seconds} label="SEC" />
        </div>
      </motion.div>
    </section>
  );
};

const TimeUnit = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center">
    <motion.span 
      key={value}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-4xl md:text-6xl font-bold"
    >
      {String(value).padStart(2, '0')}
    </motion.span>
    <span className="text-xs md:text-sm text-gray-500 tracking-widest uppercase mt-2">{label}</span>
  </div>
);
