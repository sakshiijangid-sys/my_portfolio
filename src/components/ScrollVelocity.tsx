import { useRef, useLayoutEffect, useState, useEffect, ReactNode, RefObject, CSSProperties, PointerEvent } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import './ScrollVelocity.css';

function useElementWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

interface VelocityTextProps {
  key?: string | number;
  children: ReactNode;
  baseVelocity?: number;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
  draggable?: boolean;
}

function VelocityText({
  children,
  baseVelocity = -50,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
  draggable = true
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  const isDraggingRef = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const lastPointerXRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const deltaX = e.deltaX;
      const deltaY = e.deltaY;

      let delta = 0;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        delta = deltaX;
      } else if (e.shiftKey) {
        delta = deltaY;
      } else if (Math.abs(deltaY) > 0) {
        delta = deltaY * 0.5;
      }

      if (delta !== 0) {
        baseX.set(baseX.get() - delta * 0.8);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [baseX]);

  function wrap(min: number, max: number, v: number) {
    const range = max - min;
    if (range === 0) return 0;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  useAnimationFrame((_, delta) => {
    if (isDraggingRef.current) return;

    let moveBy = -Math.abs(baseVelocity) * (delta / 1000);

    const vFactor = velocityFactor.get();
    if (vFactor !== 0) {
      moveBy += moveBy * Math.abs(vFactor);
    }

    baseX.set(baseX.get() + moveBy);
  });

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    isDraggingRef.current = true;
    setIsDraggingState(true);
    lastPointerXRef.current = e.clientX;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    baseX.set(baseX.get() + deltaX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingState(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null}>
        {children}&nbsp;
      </span>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${parallaxClassName} select-none ${draggable ? (isDraggingState ? 'cursor-grabbing' : 'cursor-grab') : ''}`}
      style={{ touchAction: 'pan-y', ...parallaxStyle }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {spans}
      </motion.div>
    </div>
  );
}

export interface ScrollVelocityProps {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  texts?: ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
  draggable?: boolean;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 40,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
  draggable = true
}: ScrollVelocityProps) => {
  return (
    <section className="w-full overflow-hidden">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={-Math.abs(velocity)}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          draggable={draggable}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
