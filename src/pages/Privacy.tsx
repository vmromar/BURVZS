import React from 'react';
import { motion } from 'motion/react';

export const Privacy = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tighter skew-x-[-10deg] mb-16 uppercase"
        >
          PRIVACY POLICY
        </motion.h1>

        <div className="space-y-12 font-mono text-sm tracking-wide leading-relaxed text-gray-400">
          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">1. Data Collection</h2>
            <p>We collect personal information necessary to process your orders, including your name, shipping address, and contact details. We do not store payment information on our servers.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">2. Use of Information</h2>
            <p>Your information is used solely for order fulfillment, customer service, and, with your consent, sending promotional materials regarding upcoming drops.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">3. Data Sharing</h2>
            <p>We do not sell or rent your personal information to third parties. We only share data with trusted partners (e.g., shipping carriers) necessary to fulfill your order.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">4. Cookies & Tracking</h2>
            <p>Our website uses local storage to maintain your cart and wishlist. We may use analytics tools to understand user behavior and improve our services.</p>
          </section>

          <section>
            <h2 className="text-white text-xl font-bold uppercase mb-4">5. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Please contact us via WhatsApp or email to exercise these rights.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
