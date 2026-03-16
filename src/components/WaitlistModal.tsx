import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await fetch("https://formsubmit.co/ajax/burvland@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            whatsapp: phone,
            _subject: "New Waitlist Request for BURVZS"
        })
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Fallback to success state anyway for UX, or handle error
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-2xl z-[101] shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {!isSubmitted ? (
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 text-white italic">
                  Join the Waitlist
                </h2>
                <p className="text-gray-400 text-sm mb-6 font-mono uppercase tracking-widest">
                  Request a code for the next drop.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      placeholder="ENTER YOUR NAME"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      placeholder="ENTER YOUR EMAIL"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-black font-bold tracking-widest uppercase py-4 rounded-xl hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Requesting..." : "Request Code"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
                >
                  <CheckCircle size={32} />
                </motion.div>
                <h2 className="text-2xl font-black tracking-tighter uppercase mb-4 text-white italic">
                  You're on the list
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Thanks for requesting access, {name}. Keep an eye on your WhatsApp. We will send your exclusive drop code there soon.
                </p>
                <div className="flex items-center justify-center gap-2 text-green-500 font-bold tracking-widest uppercase text-sm bg-green-500/10 py-3 px-4 rounded-xl">
                  <MessageCircle size={18} />
                  <span>WhatsApp Code Pending</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
