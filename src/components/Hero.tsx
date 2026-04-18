import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import GradientText from './GradientText';
import { VideoText } from './VideoText';
import heroBg from '../assets/hero4.png';
import turntableWebm from '../assets/turntable.webm';
import stereoWebm from '../assets/stereo.webm';
import cloudsWebm from '../assets/clouds.webm';
import clouds2Webm from '../assets/clouds2.webm';
import clouds3Webm from '../assets/clouds3.webm';
import clouds4Webm from '../assets/clouds4.webm';
import clouds5Webm from '../assets/clouds5.webm';

const GIFS = [turntableWebm, stereoWebm, cloudsWebm, clouds2Webm, clouds3Webm, clouds4Webm, clouds5Webm];

const TITLE_W = 720;
const TITLE_H = 170;
const FONT_SIZE = 180;

export default function Hero() {
  const { hero } = siteConfig;
  const [hoveredGif, setHoveredGif] = useState<string | null>(null);

  const handleMouseEnter = useCallback(() => {
    const random = GIFS[Math.floor(Math.random() * GIFS.length)];
    setHoveredGif(random);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredGif(null);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-dvh overflow-hidden"
      aria-label="Hero section"
    >
      <img
        src={heroBg}
        alt="scaiblu hero background"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[60%_center] md:object-[30%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      <div className="absolute bottom-10 left-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          {/* Mobile: GradientText */}
          <div className="md:hidden mb-3">
            <GradientText
              colors={['#cede2c', '#ddc4ee', '#f9d4e0', '#cede2c']}
              animationSpeed={45}
              showBorder={false}
              className="text-6xl font-bold tracking-tight leading-none"
            >
              {hero.title}
            </GradientText>
            <p className="text-white/80 text-base font-light tracking-widest uppercase mt-2">
              {hero.subtitle}
            </p>
          </div>

          {/* Desktop: hover to show random gif, otherwise solid green */}
          <div className="hidden md:block">
            <div
              style={{ width: TITLE_W, height: TITLE_H }}
              className="mb-0 cursor-default"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredGif ? (
                <VideoText
                  src={hoveredGif}
                  fontSize={FONT_SIZE}
                  fontWeight="bold"
                  fontFamily="Poppins, sans-serif"
                  textX="0"
                  textAnchor="start"
                >
                  {hero.title}
                </VideoText>
              ) : (
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="0"
                    y="50%"
                    textAnchor="start"
                    dominantBaseline="middle"
                    fontSize={FONT_SIZE}
                    fontWeight="bold"
                    fontFamily="Poppins, sans-serif"
                    fill="#cede2c"
                  >
                    {hero.title}
                  </text>
                </svg>
              )}
            </div>

            <p
              className="text-white/80 text-lg font-light tracking-widest uppercase"
              style={{ width: TITLE_W, paddingLeft: 4 }}
            >
              {hero.subtitle}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
