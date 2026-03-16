import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5rOAnSDURI3M3ZwarCjxcauX-osXv7CQ7XsCpumAtM07GK6jOBy8nbvAqh9rMXybe6aKavDu5zb37nzYrvEhF3dDtjiiURnHUxv3x7MPMTAvmib3xyGbSb9VbHoCYmwX4y1wkVvjuBmKmD-PbO1sshIrZQc4DQGa4al4A7PaRxyDuQ9uGzjNKDbV_vzP-/s736/2025_12_28_19_45_49_IMG_7053.PNG" 
                alt="BURVZS logo" 
                className="h-3 md:h-7 object-contain mb-6"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/200x60/000000/ffffff?text=BURVZS&font=montserrat";
                }}
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-md uppercase tracking-widest leading-relaxed">
              NOTHING STOPS US. Premium streetwear designed for the future.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-gray-500">Shop</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-sm hover:text-gray-300 transition-colors uppercase tracking-widest">All Products</Link></li>
              <li><Link to="/manifesto" className="text-sm hover:text-gray-300 transition-colors uppercase tracking-widest">Manifesto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase mb-6 text-gray-500">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-sm hover:text-gray-300 transition-colors uppercase tracking-widest">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-gray-300 transition-colors uppercase tracking-widest">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} BURVZS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
