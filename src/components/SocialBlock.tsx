import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import SectionWrapper from './SectionWrapper';
import polaroidImg from '../assets/polaroid.png';
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

function YoutubeIcon() {
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
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
      <span className="text-xs font-semibold tracking-widest uppercase">YouTube</span>
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
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Hover overlay with two icon links */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 bg-[#ddc4ee]/60 flex items-center justify-center gap-12"
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
            <motion.a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit scaiblu on YouTube"
              onClick={() => trackEvent('social_click', { platform: 'youtube' })}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'backOut', delay: 0.05 }}
              className="hover:scale-110 transition-transform duration-200"
            >
              <YoutubeIcon />
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
