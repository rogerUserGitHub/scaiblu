import { useId, type ElementType, type ReactNode } from 'react';

interface VideoTextProps {
  src: string;
  children: ReactNode;
  as?: ElementType;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: 'start' | 'middle' | 'end' | 'inherit';
  dominantBaseline?: 'auto' | 'middle' | 'central' | 'hanging' | 'mathematical' | 'alphabetic' | 'ideographic' | 'text-before-edge' | 'text-after-edge' | 'inherit';
  fontFamily?: string;
  /** Stack letters vertically, filling the full height */
  vertical?: boolean;
  /** Top and bottom padding as % of viewBox height (default 8) */
  verticalPadding?: number;
  /** textLength for each letter in vertical mode, controls width (default 76) */
  letterWidth?: number;
  /** Scale factor for the background image/gif (default 1, <1 zooms out) */
  imageScale?: number;
  /** x position of text in non-vertical mode (default "50%") */
  textX?: string | number;
  /** y position of text in non-vertical mode (default "50%") */
  textY?: string | number;
}

function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
}

export function VideoText({
  src,
  children,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  preload = 'auto',
  fontSize = 120,
  fontWeight = 'bold',
  textAnchor = 'middle',
  dominantBaseline = 'middle',
  fontFamily = 'Poppins, sans-serif',
  vertical = false,
  verticalPadding = 8,
  letterWidth = 76,
  imageScale = 1,
  textX = '50%',
  textY = '50%',
}: VideoTextProps) {
  const rawId = useId();
  const maskId = `vt-mask-${rawId.replace(/:/g, '')}`;
  const isVideo = isVideoSrc(src);

  // Split into letters for vertical mode
  const letters = vertical ? String(children).split('') : null;
  const padTop = verticalPadding;
  const padBot = verticalPadding;
  const availH = 100 - padTop - padBot;
  const sectionH = letters ? availH / letters.length : 0;
  // Font size fills ~85% of each letter's section (in viewBox units 0-100)
  const letterFontSize = sectionH * 0.85;

  const maskContent = vertical && letters ? (
    letters.map((letter, i) => (
      <text
        key={i}
        x="50"
        y={padTop + sectionH * i + sectionH / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={letterFontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        textLength={letterWidth}
        lengthAdjust="spacingAndGlyphs"
        fill="white"
      >
        {letter}
      </text>
    ))
  ) : (
    <text
      x={textX}
      y={textY}
      textAnchor={textAnchor}
      dominantBaseline={dominantBaseline}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontFamily={fontFamily}
      fill="white"
    >
      {children}
    </text>
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox={vertical ? '0 0 100 100' : undefined}
        preserveAspectRatio={vertical ? 'none' : undefined}
        xmlns="http://www.w3.org/2000/svg"
        aria-label={typeof children === 'string' ? children : undefined}
      >
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="black" />
            {maskContent}
          </mask>
        </defs>

        {isVideo ? (
          <foreignObject width="100%" height="100%" mask={`url(#${maskId})`}>
            <video
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              playsInline
              preload={preload}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src={src} />
            </video>
          </foreignObject>
        ) : (
          <image
            href={src}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask={`url(#${maskId})`}
            style={imageScale !== 1 ? { transform: `scale(${imageScale})`, transformOrigin: 'center', transformBox: 'fill-box' } : undefined}
          />
        )}
      </svg>
    </div>
  );
}
