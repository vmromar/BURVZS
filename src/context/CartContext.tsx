import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('burvzs_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('burvzs_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map(i => 
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, size, color, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size && i.color === color)));
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => 
      (i.product.id === productId && i.size === size && i.color === color) 
        ? { ...i, quantity } 
        : i
    ));
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
