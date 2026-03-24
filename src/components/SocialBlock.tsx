import { siteConfig } from '../config/siteConfig';
import SectionWrapper from './SectionWrapper';
import HoverOverlay from './HoverOverlay';
import socialImg from '../assets/love-hands.png';

// Instagram icon
function InstagramIcon() {
  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
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
      <span className="text-sm font-semibold tracking-widest uppercase">Follow on Instagram</span>
    </div>
  );
}

interface SocialBlockProps {
  standalone?: boolean;
}

export default function SocialBlock({ standalone = false }: SocialBlockProps) {
  const { social } = siteConfig;

  const content = (
    <div id="social" className="relative w-full h-screen md:h-full">
      {/* Section title */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
          {social.title}
        </span>
      </div>

      <HoverOverlay
        href={siteConfig.links.instagram}
        icon={<InstagramIcon />}
        label="Visit scaiblu on Instagram"
        overlayColor="bg-black/40"
      >
        <img
          src={socialImg}
          alt="scaiblu social media"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </HoverOverlay>
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
