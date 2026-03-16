import React from 'react';
import { motion } from 'motion/react';

export const Terms = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tighter skew-x-[-10deg] mb-16 uppercase"
        >
          TERMS & CONDITIONS
        </motion.h1>

        <div className="space-y-12 font-mono text-sm tracking-wide leading-relaxed text-gray-400">
          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">1. Introduction</h2>
            <p>Welcome to BURVZS. By accessing our website and purchasing our products, you agree to be bound by these Terms and Conditions.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">2. Orders & Payments</h2>
            <p>All orders are processed via WhatsApp. Payment terms and methods will be discussed and confirmed during the ordering process. We reserve the right to refuse any order.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">3. Shipping & Delivery</h2>
            <p>Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs clearance processes.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">4. Returns & Exchanges</h2>
            <p>Due to the limited nature of our drops, all sales are final. Exchanges are only permitted for defective items within 7 days of receipt.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">5. Intellectual Property</h2>
            <p>All content on this website, including designs, logos, and images, is the exclusive property of BURVZS and protected by copyright laws.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
