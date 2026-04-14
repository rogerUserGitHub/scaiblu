import { useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import SectionWrapper from './SectionWrapper';
import HoverOverlay from './HoverOverlay';
import cloudsGif from '../assets/clouds6.gif';

// SoundCloud icon
function SoundCloudIcon() {
  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="48"
        viewBox="0 0 64 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 20.5c0 2.5 1.9 4.5 4.3 4.5H52c2.9 0 5.3-2.3 5.3-5.3 0-2.6-1.9-4.8-4.3-5.2-.1-5.5-4.4-9.9-9.8-9.9-2.1 0-4.1.7-5.7 1.8C36.6 3.1 33 .5 28.7.5c-5.7 0-10.5 4.3-11.1 9.8-.4-.1-.9-.1-1.3-.1-4.5 0-8.1 3.5-8.1 7.8 0 .8.1 1.6.4 2.3A4.5 4.5 0 0 0 4.3 20c-.1.2-.1.3 0 .5z" />
      </svg>
      <span className="text-sm font-semibold tracking-widest uppercase">Listen on SoundCloud</span>
    </div>
  );
}

interface MusicBlockProps {
  standalone?: boolean;
}

export default function MusicBlock({ standalone = false }: MusicBlockProps) {
  const { music } = siteConfig;
  const hiddenImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  const captureFirstFrame = () => {
    const img = hiddenImgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
  };

  const content = (
    <div
      id="music"
      className="relative w-full h-screen md:h-full bg-[#cede2c]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Section title */}
      <div className="absolute top-8 left-6 md:left-8 z-20">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
          {music.title}
        </span>
      </div>

      {/* Hidden img — loads once to capture first frame into canvas */}
      <img
        ref={hiddenImgRef}
        src={cloudsGif}
        alt=""
        aria-hidden="true"
        onLoad={captureFirstFrame}
        className="absolute w-0 h-0 invisible pointer-events-none"
      />
      {/* Canvas shows first frame when not hovered */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: hovered ? 'none' : 'block' }}
      />
      {/* GIF mounts fresh on hover — always plays from frame 1 */}
      {hovered && (
        <img
          src={cloudsGif}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* SoundCloud hover overlay on top */}
      <div className="absolute inset-0 z-10">
        <HoverOverlay
          href={siteConfig.links.soundcloud}
          icon={<SoundCloudIcon />}
          label="Listen to scaiblu on SoundCloud"
          overlayColor="bg-black/20"
        >
          <div className="w-full h-full" />
        </HoverOverlay>
      </div>
    </div>
  );

  if (standalone) {
    return (
      <main>
        <SectionWrapper id="music-section" label="Music collection section">
          {content}
        </SectionWrapper>
      </main>
    );
  }

  return (
    <SectionWrapper id="music-section" label="Music collection section" className="h-full">
      {content}
    </SectionWrapper>
  );
}
