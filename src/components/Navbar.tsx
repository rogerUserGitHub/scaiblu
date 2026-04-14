import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import logoImg from '../assets/logo.png';
import { trackEvent } from '../analytics';

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SoundcloudIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M1.175 12.225c-.015.15 0 .3.06.43l1.08 3.79-1.08 3.73c-.06.13-.075.28-.06.42.03.27.24.48.51.51.27.03.52-.12.615-.37l1.23-4.29-1.23-4.35c-.09-.25-.345-.4-.615-.37-.27.03-.48.24-.51.51zM3.75 9.75c-.03.18 0 .36.09.51l1.44 5.19-1.44 5.13c-.09.15-.12.33-.09.51.06.33.36.57.69.54.33-.03.6-.27.63-.6l1.65-5.58-1.65-5.64c-.03-.33-.3-.57-.63-.6-.33-.03-.63.21-.69.54zM6.6 8.1c-.045.21 0 .42.12.6l1.71 6.24-1.71 6.18c-.12.18-.165.39-.12.6.09.39.465.645.855.555.39-.09.645-.465.555-.855l1.95-6.48-1.95-6.54c-.09-.39-.465-.645-.855-.555-.39.09-.645.465-.555.855zM9.75 7.2c-.06.24 0 .48.15.675l1.935 7.125-1.935 7.065c-.15.195-.21.435-.15.675.12.45.585.72 1.035.6.45-.12.72-.585.6-1.035L13.32 15 11.385 7.635c-.12-.45-.585-.72-1.035-.6-.45.12-.72.585-.6 1.035v.13zM23.85 11.985c-.03-2.37-1.95-4.275-4.32-4.275-.6 0-1.185.12-1.71.345C17.49 5.49 15.405 3.75 12.9 3.75c-.66 0-1.29.135-1.845.375-.21.09-.27.18-.27.285v14.43c0 .12.09.225.21.255h12.465c1.29 0 2.34-1.05 2.34-2.34 0-.975-.6-1.815-1.455-2.175.3-.525.495-1.125.495-1.77l.01-.825z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-2 md:px-10 bg-black/30 backdrop-blur-md border-b border-white/10"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between">
        {/* Spacer to balance social icons on the right */}
        <div className="flex-1" />

        {/* Logo — centered on desktop, left on mobile */}
        <a href="/" aria-label={`${siteConfig.name} — home`} className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <img
            src={logoImg}
            alt={siteConfig.name}
            className="h-10 w-auto"
          />
        </a>

        {/* Social links — right-aligned */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'navbar' })}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <InstagramIcon />
          </a>
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            onClick={() => trackEvent('social_click', { platform: 'youtube', location: 'navbar' })}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <YoutubeIcon />
          </a>
          <a
            href={siteConfig.links.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud"
            onClick={() => trackEvent('social_click', { platform: 'soundcloud', location: 'navbar' })}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <SoundcloudIcon />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
