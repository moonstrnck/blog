'use client';

import { useEffect, useRef, useState, useMemo, useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  gap?: number;
  isHovered?: boolean;
}

export const AnimatedUnderlineText = ({
  children,
  className,
  color = 'var(--point-color)',
  gap = 3,
  isHovered = false,
}: Props) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const controls = useAnimation();
  const [width, setWidth] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const strokeWidth = useMemo(() => 3 + Math.random() * 2, []);
  const path = useMemo(() => generateWavyPath(width), [width]);

  useLayoutEffect(() => {
    setWidth(textRef.current?.offsetWidth ?? 0);
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    setPathLength(length);
    controls.start({ strokeDashoffset: isHovered ? 0 : length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered]);

  return (
    <div ref={wrapperRef} className={`relative inline-block w-fit overflow-visible ${className}`}>
      <span ref={textRef} className="relative z-10">
        {children}
      </span>

      {width > 0 && (
        <motion.svg
          className="pointer-events-none absolute bottom-[-6px] z-0 h-[12px]"
          width={width}
          height={12}
          viewBox={`-${gap} 0 ${width + gap * 2} 12`}
          preserveAspectRatio="none"
        >
          <motion.path
            ref={pathRef}
            d={path}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength}
            strokeOpacity={isHovered ? 1 : 0}
            animate={controls}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </motion.svg>
      )}
    </div>
  );
};

const generateWavyPath = (width: number): string => {
  const segmentWidth = 10;
  const amplitude = 4;

  const segments = Math.floor(width / segmentWidth);
  const yBase = 6;

  let d = `M0,${yBase}`;

  for (let i = 0; i < segments; i++) {
    const isUp = i % 2 === 0;
    const cx = (i + 0.5) * segmentWidth;
    const cy = isUp ? yBase - amplitude : yBase + amplitude;
    const x = (i + 1) * segmentWidth;
    d += ` Q${cx},${cy} ${x},${yBase}`;
  }

  return d;
};
