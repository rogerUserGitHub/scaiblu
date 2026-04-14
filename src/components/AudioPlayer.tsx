import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { motion, AnimatePresence } from 'framer-motion';
import bgWebm from '../assets/turntable.webm';
import logoImg from '../assets/logo.png';
import { trackEvent } from '../analytics';

const TRACKS = [
  { title: 'Mix 001', artist: 'Scaiblu', src: '/audio/mix001.mp3' },
];

const canSkip = TRACKS.length > 1;

function SkipBackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="19 20 9 12 19 4 19 20" />
      <line x1="5" y1="19" x2="5" y2="5" />
    </svg>
  );
}

function SkipForwardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}

function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function LoadingBars() {
  return (
    <div className="flex gap-[3px] items-end h-14">
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-white/20 rounded-full"
          animate={{ height: ['6px', `${10 + Math.sin(i) * 14}px`, '6px'] }}
          transition={{ duration: 0.9 + (i % 5) * 0.12, repeat: Infinity, ease: 'easeInOut', delay: i * 0.035 }}
        />
      ))}
    </div>
  );
}

export default function AudioPlayer() {
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const milestones = useRef(new Set<number>());

  const track = TRACKS[trackIndex];

  useEffect(() => {
    if (!waveContainerRef.current) return;

    setReady(false);
    setCurrentTime(0);
    setDuration(0);
    milestones.current = new Set();

    const ws = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: 'rgba(255,255,255,0.2)',
      progressColor: '#cede2c',
      cursorColor: '#cede2c',
      cursorWidth: 2,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 56,
      normalize: true,
      url: track.src,
    });

    ws.on('ready', (dur) => { setDuration(dur); setReady(true); ws.setVolume(volume); });
    ws.on('timeupdate', (t) => {
      setCurrentTime(t);
      // Track 25 / 50 / 75 / 100% milestones
      if (ws.getDuration() > 0) {
        const pct = Math.floor((t / ws.getDuration()) * 100);
        for (const m of [25, 50, 75, 100]) {
          if (pct >= m && !milestones.current.has(m)) {
            milestones.current.add(m);
            trackEvent('audio_progress', { track: track.title, percent: m });
          }
        }
      }
    });
    ws.on('play', () => { setPlaying(true); trackEvent('audio_play', { track: track.title }); });
    ws.on('pause', () => { setPlaying(false); trackEvent('audio_pause', { track: track.title }); });
    ws.on('finish', () => setPlaying(false));

    wsRef.current = ws;
    return () => ws.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const togglePlay = () => wsRef.current?.playPause();
  const skipBack = () => setTrackIndex(i => (i - 1 + TRACKS.length) % TRACKS.length);
  const skipForward = () => setTrackIndex(i => (i + 1) % TRACKS.length);
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    wsRef.current?.setVolume(v);
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <section id="player" className="relative w-full h-[50vh] overflow-hidden" aria-label="Audio player">

      {/* ── Backgrounds ── */}
      <div className="md:hidden absolute inset-0 bg-[#0a0a0a]" />
      <video
        src={bgWebm} aria-hidden="true" autoPlay muted loop playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(100%) brightness(0.45)' }}
      />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div
        className="hidden md:block absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 4px)' }}
      />

      {/* ── Waveform — always in DOM, positioned for each breakpoint ──
           Mobile: sits in the upper portion of the section
           Desktop: vertically centered between label and controls       */}
      <div className="
        absolute z-10 left-5 right-5
        top-8
        md:left-12 md:right-12 md:top-1/2 md:-translate-y-1/2
      ">
        {!ready && <LoadingBars />}
        <div ref={waveContainerRef} className={ready ? 'block w-full' : 'hidden'} />
      </div>

      {/* ══════════════════════════════════════
          DESKTOP layout (md and up)
      ══════════════════════════════════════ */}
      <div className="hidden md:flex absolute inset-0 z-20 flex-col justify-between px-12 py-8 pointer-events-none">
        {/* Top label */}
        <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-white/40">Now Playing</span>

        {/* Bottom controls */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Skip back */}
          <button
            onClick={skipBack}
            disabled={!canSkip}
            aria-label="Previous track"
            className="text-white/50 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <SkipBackIcon />
          </button>

          {/* Play/Pause */}
          <motion.button
            onClick={togglePlay}
            disabled={!ready}
            aria-label={playing ? 'Pause' : 'Play'}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="flex-shrink-0 w-12 h-12 rounded-full border border-[#cede2c] text-[#cede2c] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#cede2c]/10 transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={playing ? 'pause' : 'play'}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.15 }}
              >
                {playing ? <PauseIcon /> : <PlayIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Skip forward */}
          <button
            onClick={skipForward}
            disabled={!canSkip}
            aria-label="Next track"
            className="text-white/50 hover:text-white transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <SkipForwardIcon />
          </button>

          <div className="flex flex-col gap-0.5">
            <span className="text-white font-bold text-base leading-tight tracking-tight">{track.title}</span>
            <span className="text-white/50 text-xs tracking-widest uppercase">{track.artist}</span>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs tabular-nums text-white/40">{formatTime(currentTime)}</span>
            <span className="text-white/20">/</span>
            <span className="text-xs tabular-nums text-white/40">{formatTime(duration)}</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-white/40" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <input
              type="range" min={0} max={1} step={0.01} value={volume}
              onChange={handleVolume} aria-label="Volume"
              className="w-24 accent-[#cede2c] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MOBILE layout — Spotify-style card
      ══════════════════════════════════════ */}
      <div className="flex md:hidden absolute inset-0 z-20 flex-col justify-end px-5 pb-8">
        <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-5 flex flex-col gap-4">

          {/* Track row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-black/40 flex items-center justify-center">
              <img src={logoImg} alt="" aria-hidden="true" className="w-8 h-auto opacity-80" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-snug tracking-tight truncate">{track.title}</p>
              <p className="text-white/50 text-xs tracking-widest uppercase truncate">{track.artist}</p>
            </div>
            {/* Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={skipBack}
                disabled={!canSkip}
                aria-label="Previous track"
                className="text-white/50 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <SkipBackIcon size={15} />
              </button>
              <button
                onClick={togglePlay}
                disabled={!ready}
                aria-label={playing ? 'Pause' : 'Play'}
                className="w-10 h-10 rounded-full bg-[#cede2c] text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
              >
                {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
              </button>
              <button
                onClick={skipForward}
                disabled={!canSkip}
                aria-label="Next track"
                className="text-white/50 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                <SkipForwardIcon size={15} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex flex-col gap-1.5">
            <div className="w-full h-1 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full bg-[#cede2c] rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] tabular-nums text-white/35">{formatTime(currentTime)}</span>
              <span className="text-[10px] tabular-nums text-white/35">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/35 flex-shrink-0" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            </svg>
            <input
              type="range" min={0} max={1} step={0.01} value={volume}
              onChange={handleVolume} aria-label="Volume"
              className="flex-1 accent-[#cede2c] cursor-pointer"
            />
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/35 flex-shrink-0" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
}
