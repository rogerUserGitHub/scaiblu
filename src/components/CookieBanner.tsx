import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'scaiblu_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Small delay before showing
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
    // Analytics initialization would go here
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50 bg-white rounded-2xl shadow-xl border border-black/8 p-5"
        >
          <p className="text-xs text-black/60 leading-relaxed mb-4">
            We use cookies to enhance your experience. No personal data is stored without your
            consent.
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 bg-[#cede2c] text-black text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-[#d9e830] transition-colors duration-200"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="flex-1 bg-black/5 text-black/60 text-xs font-semibold tracking-wider uppercase py-2.5 rounded-full hover:bg-black/10 transition-colors duration-200"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
