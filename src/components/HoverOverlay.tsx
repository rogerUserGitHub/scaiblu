import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HoverOverlayProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  label: string;
  overlayColor?: string;
}

export default function HoverOverlay({
  href,
  icon,
  children,
  label,
  overlayColor = 'bg-black/30',
}: HoverOverlayProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative block w-full h-full overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Scale wrapper */}
      <motion.div
        className="w-full h-full"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* Hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 ${overlayColor} flex items-center justify-center`}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
            >
              {icon}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}
