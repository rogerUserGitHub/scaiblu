import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import SectionWrapper from './SectionWrapper';
import crateImg from '../assets/casette.png';
import turntableWebm from '../assets/stereo.webm';

function ContactIcon() {
  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      <span className="text-sm font-semibold tracking-widest uppercase">Get in touch</span>
    </div>
  );
}

interface ContactBlockProps {
  standalone?: boolean;
}

export default function ContactBlock({ standalone = false }: ContactBlockProps) {
  const { contact } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: '-10% 0px' });

  const slideTransition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const content = (
    <div id="contact" className="relative w-full h-screen md:h-full overflow-hidden">
      {/* Section title */}
      <div className="absolute top-8 left-6 md:left-8 z-30">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mix-blend-difference">
          {contact.title}
        </span>
      </div>

      {/* Panel 1 — background image (slides out to the right on open) */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ x: isOpen ? '100%' : '0%' }}
        transition={slideTransition}
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <img
          src={crateImg}
          alt={contact.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          role="button"
          tabIndex={0}
          aria-label="Open contact form"
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="contact-icon"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center bg-black/30"
              >
                <ContactIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Panel 2 — contact form (slides in from the left on open) */}
      <motion.div
        ref={formRef}
        className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-10 overflow-hidden"
        animate={{ x: isOpen ? '0%' : '-100%' }}
        transition={slideTransition}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        {/* GIF background */}
        <video
          src={turntableWebm}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay to keep form readable */}
        <div className="absolute inset-0 bg-[#f7ca53]/70" />

        {/* Close button */}
        <button
          onClick={() => { setIsOpen(false); setSent(false); }}
          className="absolute top-6 right-6 z-30 p-2 text-black/40 hover:text-black transition-colors duration-200"
          aria-label="Close contact form"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="text-3xl font-bold text-black tracking-tight mb-2">Sent!</p>
              <p className="text-sm text-black/50">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-col gap-4 w-full"
              noValidate
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-black/40 mb-1">
                Get in touch
              </p>
              <h2 className="text-2xl font-bold text-black tracking-tight leading-snug mb-2">
                Let's make something great.
              </h2>

              <input
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 outline-none focus:border-black/30 transition-colors duration-200"
              />

              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 outline-none focus:border-black/30 transition-colors duration-200"
              />

              <textarea
                placeholder="Message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/30 outline-none focus:border-black/30 transition-colors duration-200 resize-none"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#cede2c] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-full hover:bg-[#d9e830] transition-colors duration-200"
              >
                Send
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  if (standalone) {
    return (
      <main>
        <SectionWrapper id="contact-section" label="Contact section">
          {content}
        </SectionWrapper>
      </main>
    );
  }

  return (
    <SectionWrapper id="contact-section" label="Contact section" className="h-full">
      {content}
    </SectionWrapper>
  );
}
