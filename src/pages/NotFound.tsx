import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export default function NotFound() {
  useEffect(() => {
    document.title = `404 — ${siteConfig.name}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="text-[#cede2c] text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-4 select-none">
          404
        </p>
        <h1 className="text-black text-2xl md:text-4xl font-bold tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-black/40 text-sm mb-10 max-w-sm">
          The track you're looking for doesn't exist. Let's get you back to the main stage.
        </p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-[#cede2c] text-black font-semibold text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-[#d9e830] transition-colors duration-200"
        >
          Back to Home
        </motion.a>
      </motion.div>

      <a
        href="/"
        className="absolute top-6 left-6 text-black font-bold text-base tracking-widest uppercase hover:text-[#cede2c] transition-colors duration-200"
      >
        {siteConfig.name}
      </a>
    </div>
  );
}
