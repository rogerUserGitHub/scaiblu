import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-10"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-center">
        <a href="/" aria-label={`${siteConfig.name} — home`}>
          {/* Placeholder logo — replace src with real asset */}
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" />
              <path d="M6 10 L10 6 L14 10 L10 14 Z" fill="white" />
            </svg>
          </div>
        </a>
      </div>
    </motion.nav>
  );
}
