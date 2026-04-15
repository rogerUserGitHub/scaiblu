import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section
      id="hero"
      className="relative w-full h-dvh overflow-hidden"
      aria-label="Hero section"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Under construction */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-xs font-semibold tracking-[0.35em] uppercase text-white/40">
            {hero.title}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#cede2c] leading-tight">
            Under Construction
          </h1>
          <p className="text-white/50 text-sm md:text-base tracking-widest uppercase font-light">
            Something good is coming
          </p>
        </motion.div>
      </div>
    </section>
  );
}
