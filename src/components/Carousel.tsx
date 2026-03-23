import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselSlide {
  id: number;
  image: string;
  alt: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  interval?: number;
  className?: string;
}

export default function Carousel({ slides, interval = 4000, className = '' }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} aria-live="polite">
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={slides[current].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
