import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { config } from '../config';
import { Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    city: '',
    address: '',
    promoCode: ''
  });

  const isPromoValid = form.promoCode.trim().toUpperCase() === 'NSU';
  const discountAmount = isPromoValid ? cartTotal * 0.02 : 0;
  const finalTotal = cartTotal - discountAmount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    let orderDetails = `*NEW ORDER - ${config.storeName}*\n`;
    orderDetails += `------------------------\n`;
    orderDetails += `*Customer Details*\n`;
    orderDetails += `Name: ${form.fullName}\n`;
    orderDetails += `Email: ${form.email}\n`;
    orderDetails += `City: ${form.city}\n`;
    orderDetails += `Address: ${form.address}\n`;
    orderDetails += `------------------------\n`;
    
    items.forEach((item, index) => {
      orderDetails += `${index + 1}. *${item.product.name}*\n`;
      orderDetails += `   Size: ${item.size} | Color: ${item.color}\n`;
      orderDetails += `   Qty: ${item.quantity} x ${item.product.price} ${config.currency}\n`;
      orderDetails += `   Subtotal: ${item.product.price * item.quantity} ${config.currency}\n\n`;
    });

    orderDetails += `------------------------\n`;
    orderDetails += `Subtotal: ${cartTotal} ${config.currency}\n`;
    if (isPromoValid) {
      orderDetails += `Promo (NSU - 2%): -${discountAmount.toFixed(2)} ${config.currency}\n`;
    }
    orderDetails += `*TOTAL: ${finalTotal.toFixed(2)} ${config.currency}*`;

    const encodedMessage = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`, '_blank');
    clearCart();
  };

  return (
    <div className="bg-black min-h-screen text-white pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tighter skew-x-[-10deg] mb-16 uppercase"
        >
          CART
        </motion.h1>

        {items.length === 0 ? (
          <div className="py-24 text-center border-y border-white/10">
            <p className="text-gray-500 font-mono tracking-widest uppercase mb-8">Your cart is empty</p>
            <Link to="/shop" className="inline-block bg-white text-black px-8 py-4 font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {items.map((item, idx) => (
                <motion.div 
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 border-b border-white/10 pb-8"
                >
                  <div className="w-24 h-32 bg-zinc-900 flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold tracking-widest uppercase mb-1">{item.product.name}</h3>
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">Size: {item.size}</p>
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">Color: {item.color}</p>
                      </div>
                      <p className="font-mono text-sm">{item.product.price} {config.currency}</p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-white/30 w-24 h-8">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="flex-1 h-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >-</button>
                        <span className="flex-1 text-center font-mono text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="flex-1 h-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        >+</button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                        className="text-gray-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <form onSubmit={handleCheckout} className="bg-zinc-950 p-8 border border-white/10 sticky top-24 rounded-[24px]">
                <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-white/10 pb-4">Checkout Details</h2>
                
                <div className="space-y-4 mb-8">
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={e => setForm({...form, fullName: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <input 
                    type="text" 
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={e => setForm({...form, city: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <input 
                    type="text" 
                    required
                    placeholder="Delivery Address"
                    value={form.address}
                    onChange={e => setForm({...form, address: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <div>
                    <input 
                      type="text" 
                      placeholder="Promo Code"
                      value={form.promoCode}
                      onChange={e => setForm({...form, promoCode: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-white/50 transition-colors uppercase"
                    />
                    {isPromoValid && (
                      <p className="text-green-500 text-xs font-mono uppercase tracking-widest mt-2">
                        Promo code NSU applied (-2%)
                      </p>
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-bold tracking-widest uppercase mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-8 font-mono text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{cartTotal} {config.currency}</span>
                  </div>
                  {isPromoValid && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount (2%)</span>
                      <span>-{discountAmount.toFixed(2)} {config.currency}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-4 border-t border-white/10 text-lg">
                    <span>Total</span>
                    <span>{finalTotal.toFixed(2)} {config.currency}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black h-14 font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 rounded-xl"
                >
                  Place Order via WhatsApp
                </button>
                <p className="text-center text-gray-500 text-xs mt-4 font-mono uppercase tracking-widest">
                  Secure checkout via WhatsApp
                </p>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
