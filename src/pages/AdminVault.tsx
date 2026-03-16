import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';
import { DEFAULT_VAULT_CODES, DEFAULT_VAULT_PRODUCTS } from '../config/vaultConfig';

export const AdminVault = () => {
  const [codes, setCodes] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load from local storage or use defaults
    const savedCodes = localStorage.getItem('vault_codes');
    const savedProducts = localStorage.getItem('vault_products');

    if (savedCodes) {
      setCodes(JSON.parse(savedCodes));
    } else {
      setCodes(DEFAULT_VAULT_CODES);
    }

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(DEFAULT_VAULT_PRODUCTS);
    }
  }, []);

  const handleProductChange = (index: number, field: string, value: string | number | boolean) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    
    // Sync gallery with image
    if (field === 'image') {
      newProducts[index].gallery = [value as string];
    }
    
    setProducts(newProducts);
    setIsSaved(false);
  };

  const handleArrayChange = (index: number, field: string, value: string) => {
    const newProducts = [...products];
    // Convert comma separated string to array
    newProducts[index] = { ...newProducts[index], [field]: value.split(',').map(s => s.trim()).filter(Boolean) };
    setProducts(newProducts);
    setIsSaved(false);
  };

  const handleCodesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCodes = e.target.value.split('\n').map(c => c.trim()).filter(Boolean);
    setCodes(newCodes);
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('vault_codes', JSON.stringify(codes));
    localStorage.setItem('vault_products', JSON.stringify(products));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset to default codes and products?")) {
      setCodes(DEFAULT_VAULT_CODES);
      setProducts(DEFAULT_VAULT_PRODUCTS);
      localStorage.removeItem('vault_codes');
      localStorage.removeItem('vault_products');
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Vault Admin Panel</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm font-bold tracking-widest uppercase transition-colors"
            >
              Reset Defaults
            </button>
            <button 
              onClick={handleSave}
              className="bg-white text-black px-6 py-3 rounded-xl font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>

        {isSaved && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 border border-green-500/50 text-green-500 px-4 py-3 rounded-xl mb-8 flex items-center gap-2 font-mono text-sm uppercase tracking-widest"
          >
            <CheckCircle size={18} />
            Changes saved successfully!
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Codes */}
          <div className="lg:col-span-1 bg-zinc-900 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
              Access Codes ({codes.length})
            </h2>
            <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-4">
              Enter one code per line. These codes unlock the vault.
            </p>
            <textarea
              value={codes.join('\n')}
              onChange={handleCodesChange}
              className="w-full h-[600px] bg-black border border-white/10 rounded-xl p-4 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>

          {/* Right Column: Products */}
          <div className="lg:col-span-2 space-y-8">
            {products.map((product, index) => (
              <div key={product.id} className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-white/10 pb-4">
                  Vault Product {index + 1}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Title</label>
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Price ($)</label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Category</label>
                      <input
                        type="text"
                        value={product.category}
                        onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Image URL</label>
                      <input
                        type="text"
                        value={product.image}
                        onChange={(e) => handleProductChange(index, 'image', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Description</label>
                      <textarea
                        value={product.description || ''}
                        onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                        className="w-full h-32 bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Colors (Comma separated)</label>
                      <input
                        type="text"
                        value={product.colors?.join(', ') || ''}
                        onChange={(e) => handleArrayChange(index, 'colors', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                        placeholder="e.g. BLACK, WHITE, RED"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Sizes (Comma separated)</label>
                      <input
                        type="text"
                        value={product.sizes?.join(', ') || ''}
                        onChange={(e) => handleArrayChange(index, 'sizes', e.target.value)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                        placeholder="e.g. S, M, L, XL"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
