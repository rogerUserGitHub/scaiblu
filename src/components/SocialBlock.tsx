import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import SectionWrapper from './SectionWrapper';
import polaroidImg from '../assets/polaroid.webp';
import { trackEvent } from '../analytics';

function InstagramIcon() {

  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="text-xs font-semibold tracking-widest uppercase">Instagram</span>
    </div>
  );
}


interface SocialBlockProps {
  standalone?: boolean;
}

export default function SocialBlock({ standalone = false }: SocialBlockProps) {
  const { social } = siteConfig;
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      id="social"
      className="relative w-full h-screen md:h-full bg-[#ddc4ee]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Section title */}
      <div className="absolute top-8 left-6 md:left-8 z-20">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-black/40">
          {social.title}
        </span>
      </div>

      {/* Background image */}
      <motion.img
        src={polaroidImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Mobile: icons always visible */}
      <div className="md:hidden absolute inset-0 z-10 bg-[#ddc4ee]/50 flex items-center justify-center gap-12">
        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit scaiblu on Instagram"
          onClick={() => trackEvent('social_click', { platform: 'instagram' })}
        >
          <InstagramIcon />
        </a>
      </div>

      {/* Desktop: hover overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex absolute inset-0 z-10 bg-[#ddc4ee]/60 items-center justify-center gap-12"
          >
            <motion.a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit scaiblu on Instagram"
              onClick={() => trackEvent('social_click', { platform: 'instagram' })}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
              className="hover:scale-110 transition-transform duration-200"
            >
              <InstagramIcon />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (standalone) {
    return (
      <main>
        <SectionWrapper id="social-section" label="Social media section">
          {content}
        </SectionWrapper>
      </main>
    );
  }

  return (
    <SectionWrapper id="social-section" label="Social media section" className="h-full">
      {content}
    </SectionWrapper>
  );
}
