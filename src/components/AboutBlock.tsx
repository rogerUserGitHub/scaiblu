import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import aboutImg from '../assets/about.webp';

const ABOUT_PARAGRAPHS = [
  "Hola, me llamo Scaiblu. I escaped my creator's daydreams during a mild mid‑life crisis and decided to DJ about it. My name is a faded echo of hers, filtered through years of expatriation and an identity that's proudly from everywhere and nowhere.",
  "I'm a priestess from another dimension, here to summon connection through bass, sweat, and questionable dance moves. The dancefloor is my ritual space: all are welcome, joy is mandatory, and having fun is a form of resistance. Because if we're going to keep up the good fight, we might as well do it together, dancing.",
  "Currently based in Geneva, Switzerland — but willing and able to go to la luna if it's time for fiesta.",
];

interface AboutBlockProps {
  standalone?: boolean;
}

export default function AboutBlock({ standalone = false }: AboutBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const content = (
    <div id="about" className="relative w-full h-screen md:h-full overflow-hidden">
      {/* Section title */}
      <div className="absolute top-8 left-6 md:left-8 z-20">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mix-blend-difference">
          About
        </span>
      </div>

      {/* Background GIF */}
      <img
        src={aboutImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Text content */}
      <div
        ref={ref}
        className="relative z-10 flex flex-col justify-center h-full px-8 md:px-10 py-20"
      >
        {ABOUT_PARAGRAPHS.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`text-white leading-relaxed ${i < ABOUT_PARAGRAPHS.length - 1 ? 'mb-5' : ''} ${i === 2 ? 'text-sm text-white/70 italic' : 'text-sm md:text-[0.9rem]'}`}
          >
            {para}
          </motion.p>
        ))}
      </div>
    </div>
  );

  if (standalone) {
    return (
      <main>
        <SectionWrapper id="about-section" label="About section">
          {content}
        </SectionWrapper>
      </main>
    );
  }

  return (
    <SectionWrapper id="about-section" label="About section" className="h-full">
      {content}
    </SectionWrapper>
  );
}
