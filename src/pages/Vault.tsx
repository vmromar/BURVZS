import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock, ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { DEFAULT_VAULT_CODES, DEFAULT_VAULT_PRODUCTS } from '../config/vaultConfig';

export const Vault = () => {
  const [code, setCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  
  const [validCodes, setValidCodes] = useState<string[]>([]);
  const [vaultProducts, setVaultProducts] = useState<any[]>([]);

  useEffect(() => {
    const savedCodes = localStorage.getItem('vault_codes');
    const savedProducts = localStorage.getItem('vault_products');

    if (savedCodes) {
      setValidCodes(JSON.parse(savedCodes));
    } else {
      setValidCodes(DEFAULT_VAULT_CODES);
    }

    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      // Ensure gallery exists for older saved products
      const productsWithGallery = parsedProducts.map((p: any) => ({
        ...p,
        gallery: p.gallery || [p.image]
      }));
      setVaultProducts(productsWithGallery);
    } else {
      setVaultProducts(DEFAULT_VAULT_PRODUCTS);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept a specific code or a fallback demo code
    if (validCodes.includes(code) || code.toUpperCase() === 'BURVZS-VIP' || code === '1234') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {!isUnlocked ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center mt-20"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-4 italic">The Vault</h1>
            <p className="text-gray-400 font-mono text-sm mb-8 uppercase tracking-widest">
              Enter your WhatsApp drop code to access exclusive items.
            </p>
            
            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  placeholder="ENTER CODE"
                  className={`w-full bg-transparent border ${error ? 'border-red-500' : 'border-white/20'} rounded-xl px-6 py-4 text-center text-xl tracking-[0.5em] uppercase focus:outline-none focus:border-white transition-colors`}
                />
                {error && <p className="text-red-500 text-xs mt-2 uppercase tracking-widest">Invalid Code</p>}
              </div>
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                Unlock <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center mb-12 mt-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <Unlock size={24} className="text-green-500" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-4 italic text-white">Unlocked</h1>
              <p className="text-green-500 font-mono text-sm uppercase tracking-widest">
                Exclusive Drop Access Granted
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {vaultProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
