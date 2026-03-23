import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import GradientText from './GradientText';
import hero1 from '../assets/hero1.png';

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <img
        src={hero1}
        alt="scaiblu hero background"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      {/* Bottom-left content */}
      <div className="absolute bottom-10 left-6 md:left-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <GradientText
            colors={['#cede2c', '#ddc4ee', '#f9d4e0', '#cede2c']}
            animationSpeed={45}
            showBorder={false}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-3"
          >
            {hero.title}
          </GradientText>
          <p className="text-white/80 text-base md:text-lg font-light tracking-widest uppercase">
            {hero.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
