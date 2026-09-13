import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Top-Left Flower Cluster SVG (Burgundy / Deep Red Roses, Carnations & Lilies)
export const FlowerClusterTL: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-16 h-16 drop-shadow-lg ${className}`}
  >
    <defs>
      {/* Gradients for Petals */}
      <radialGradient id="roseGrad1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C2415C" />
        <stop offset="50%" stopColor="#8C2D40" />
        <stop offset="100%" stopColor="#4A121A" />
      </radialGradient>

      <radialGradient id="roseGrad2" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#E06D85" />
        <stop offset="60%" stopColor="#9E2A2B" />
        <stop offset="100%" stopColor="#3B0E17" />
      </radialGradient>

      <radialGradient id="lilyGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D9534F" />
        <stop offset="70%" stopColor="#8C2D40" />
        <stop offset="100%" stopColor="#2D0B12" />
      </radialGradient>

      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A2E35" />
        <stop offset="50%" stopColor="#2A3D2E" />
        <stop offset="100%" stopColor="#152418" />
      </linearGradient>

      <filter id="flowerGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3B0E17" floodOpacity="0.4" />
      </filter>
    </defs>

    <g filter="url(#flowerGlow)">
      {/* Background Leaves & Sprigs */}
      <path d="M40 90 C 20 110, 10 70, 30 50 C 45 65, 45 80, 40 90 Z" fill="url(#leafGrad)" />
      <path d="M90 35 C 110 15, 70 10, 50 30 C 65 45, 80 45, 90 35 Z" fill="url(#leafGrad)" />
      <path d="M15 45 C -5 30, 10 10, 30 20 C 25 35, 20 40, 15 45 Z" fill="#2A3D2E" />

      {/* Flower 1: Top-Left Hibiscus / Lily (Secondary Flower) */}
      <g transform="translate(35, 35)">
        {/* 6 Petals */}
        <path d="M0 0 C -25 -20, -30 -5, -15 15 C 0 5, 0 -5, 0 0 Z" fill="url(#lilyGrad)" />
        <path d="M0 0 C -5 -30, 15 -30, 15 -10 C 5 0, -5 0, 0 0 Z" fill="url(#lilyGrad)" />
        <path d="M0 0 C 20 -20, 30 -5, 15 15 C 5 5, -5 0, 0 0 Z" fill="url(#lilyGrad)" />
        <path d="M0 0 C 25 15, 15 30, -5 20 C -5 5, 0 -5, 0 0 Z" fill="url(#lilyGrad)" />
        <path d="M0 0 C -15 25, -30 10, -20 -10 C -5 -5, 0 0, 0 0 Z" fill="url(#lilyGrad)" />
        {/* Golden Stamen Center */}
        <circle cx="0" cy="0" r="4" fill="#F4A261" />
        <circle cx="-2" cy="-3" r="1.5" fill="#FFE3A8" />
        <circle cx="3" cy="-2" r="1.5" fill="#FFE3A8" />
        <circle cx="2" cy="3" r="1.5" fill="#FFE3A8" />
        <circle cx="-3" cy="2" r="1.5" fill="#FFE3A8" />
      </g>

      {/* Flower 2: Main Large Rose (Bottom-Right of TL Cluster) */}
      <g transform="translate(85, 85)">
        {/* Outer Petals Layer */}
        <path d="M -35 -10 C -45 -35, -10 -50, 10 -40 C 35 -45, 50 -20, 40 10 C 45 35, 20 50, -10 45 C -35 45, -50 20, -35 -10 Z" fill="#3B0E17" />
        <path d="M -30 -15 C -38 -32, -8 -42, 8 -32 C 28 -38, 42 -15, 32 8 C 38 28, 15 40, -8 36 C -28 36, -40 15, -30 -15 Z" fill="url(#roseGrad1)" />

        {/* Mid Petals Layer */}
        <path d="M-22 -8 C -28 -22, -5 -30, 6 -22 C 20 -26, 30 -10, 22 6 C 26 20, 10 28, -5 25 C -20 25, -28 10, -22 -8 Z" fill="url(#roseGrad2)" />
        
        {/* Inner Curved Rose Petals */}
        <path d="M -12 -12 C 0 -22, 18 -10, 12 5 C 15 15, -5 20, -15 8 Z" fill="#C2415C" />
        <path d="M -8 -8 C -2 -15, 12 -8, 8 2 C 10 10, -2 12, -10 4 Z" fill="#E06D85" />
        <path d="M -4 -4 C 0 -8, 6 -4, 4 1 C 5 5, -1 6, -5 2 Z" fill="#FFA6B9" />
        <circle cx="0" cy="0" r="3" fill="#FFE3A8" />
      </g>

      {/* Flower 3: Small Carnation / Rose Bud (Top Right) */}
      <g transform="translate(115, 35)">
        <path d="M-12 0 C -20 -15, 0 -20, 12 -10 C 20 0, 10 15, -5 12 Z" fill="url(#roseGrad1)" />
        <path d="M-8 -2 C -12 -10, 0 -12, 8 -5 C 12 0, 5 10, -3 8 Z" fill="#E06D85" />
        <circle cx="0" cy="0" r="2.5" fill="#F4A261" />
      </g>

      {/* Little Accent Petals */}
      <circle cx="30" cy="115" r="5" fill="#C2415C" opacity="0.8" />
      <circle cx="125" cy="110" r="4" fill="#E06D85" opacity="0.8" />
    </g>
  </svg>
);

// Bottom-Right Flower Cluster SVG (Burgundy / Deep Red Roses, Carnations & Lilies)
export const FlowerClusterBR: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-16 h-16 drop-shadow-lg ${className}`}
  >
    <defs>
      <radialGradient id="brRose1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E06D85" />
        <stop offset="50%" stopColor="#9E2A2B" />
        <stop offset="100%" stopColor="#3B0E17" />
      </radialGradient>

      <radialGradient id="brRose2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#C2415C" />
        <stop offset="60%" stopColor="#8C2D40" />
        <stop offset="100%" stopColor="#2D0B12" />
      </radialGradient>

      <linearGradient id="brLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B2027" />
        <stop offset="100%" stopColor="#1C2E20" />
      </linearGradient>

      <filter id="brGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3B0E17" floodOpacity="0.4" />
      </filter>
    </defs>

    <g filter="url(#brGlow)">
      {/* Background Leaf Sprigs */}
      <path d="M120 70 C 140 50, 150 90, 130 110 C 115 95, 115 80, 120 70 Z" fill="url(#brLeaf)" />
      <path d="M70 125 C 50 145, 90 150, 110 130 C 95 115, 80 115, 70 125 Z" fill="url(#brLeaf)" />
      <path d="M145 115 C 165 130, 150 150, 130 140 C 135 125, 140 120, 145 115 Z" fill="#1C2E20" />

      {/* Main Large Blooming Flower (Top-Left of BR Cluster) */}
      <g transform="translate(70, 70)">
        {/* Outer petals */}
        <path d="M -35 -10 C -45 -35, -10 -50, 10 -40 C 35 -45, 50 -20, 40 10 C 45 35, 20 50, -10 45 C -35 45, -50 20, -35 -10 Z" fill="#2D0B12" />
        <path d="M -30 -15 C -38 -32, -8 -42, 8 -32 C 28 -38, 42 -15, 32 8 C 38 28, 15 40, -8 36 C -28 36, -40 15, -30 -15 Z" fill="url(#brRose1)" />

        {/* Inner petals */}
        <path d="M-22 -8 C -28 -22, -5 -30, 6 -22 C 20 -26, 30 -10, 22 6 C 26 20, 10 28, -5 25 C -20 25, -28 10, -22 -8 Z" fill="url(#brRose2)" />
        <path d="M -12 -12 C 0 -22, 18 -10, 12 5 C 15 15, -5 20, -15 8 Z" fill="#E06D85" />
        <path d="M -6 -6 C 0 -12, 10 -6, 6 2 C 8 8, -2 10, -8 3 Z" fill="#FFA6B9" />
        <circle cx="0" cy="0" r="3" fill="#FFE3A8" />
      </g>

      {/* Flower 2: Bottom-Right Amaryllis / Lily */}
      <g transform="translate(120, 120)">
        <path d="M0 0 C 25 20, 30 5, 15 -15 C 0 -5, 0 5, 0 0 Z" fill="url(#brRose2)" />
        <path d="M0 0 C 5 30, -15 30, -15 10 C -5 0, 5 0, 0 0 Z" fill="url(#brRose2)" />
        <path d="M0 0 C -20 20, -30 5, -15 -15 C -5 -5, 5 0, 0 0 Z" fill="url(#brRose2)" />
        <path d="M0 0 C -25 -15, -15 -30, 5 -20 C 5 -5, 0 5, 0 0 Z" fill="url(#brRose2)" />
        <path d="M0 0 C 15 -25, 30 -10, 20 10 C 5 5, 0 0, 0 0 Z" fill="url(#brRose2)" />
        <circle cx="0" cy="0" r="3.5" fill="#F4A261" />
        <circle cx="-2" cy="-2" r="1.2" fill="#FFE3A8" />
        <circle cx="2" cy="2" r="1.2" fill="#FFE3A8" />
      </g>

      {/* Flower 3: Carnation Blossom (Top Right) */}
      <g transform="translate(125, 45)">
        <path d="M-10 0 C -18 -12, 0 -18, 10 -8 C 18 0, 8 14, -4 10 Z" fill="url(#brRose1)" />
        <path d="M-6 -2 C -10 -8, 0 -10, 6 -4 C 10 0, 4 8, -2 6 Z" fill="#FFA6B9" />
        <circle cx="0" cy="0" r="2" fill="#FFE3A8" />
      </g>
    </g>
  </svg>
);

interface FlowerBurstProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface BurstInstance {
  id: number;
}

export const FlowerCTAWrapper: React.FC<FlowerBurstProps> = ({ children, className = "", onClick }) => {
  const [bursts, setBursts] = useState<BurstInstance[]>([]);
  const isExecutingRef = useRef(false);

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isExecutingRef.current) {
      return;
    }

    // Intercept click to allow flower pop-up animation to play first for 1 second
    e.preventDefault();
    e.stopPropagation();

    // Trigger flower pop-up animation instantly
    const newId = Date.now();
    setBursts((prev) => [...prev, { id: newId }]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newId));
    }, 2200);

    const originalTarget = e.target as HTMLElement;

    // Delay the actual action / popup modal by 1 second (1000ms)
    setTimeout(() => {
      isExecutingRef.current = true;

      if (onClick) {
        onClick(e);
      } else if (originalTarget) {
        const clickable = originalTarget.closest('a, button') as HTMLElement | null;
        if (clickable) {
          clickable.click();
        } else {
          originalTarget.click();
        }
      }

      setTimeout(() => {
        isExecutingRef.current = false;
      }, 100);
    }, 1000);
  };

  return (
    <div className={`relative inline-block ${className}`} onClickCapture={handleClickCapture}>
      {children}

      <AnimatePresence>
        {bursts.map((burst) => (
          <React.Fragment key={burst.id}>
            {/* Top-Left Cluster Popup Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: 5, y: 5, rotate: -25 }}
              animate={{
                scale: [0, 1.05, 0.9, 0.9, 0.7],
                opacity: [0, 1, 1, 0.9, 0],
                x: [5, -16, -12, -12, -18],
                y: [5, -16, -12, -12, -18],
                rotate: [-25, 5, 0, 0, -12]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-5 -left-5 pointer-events-none z-50 origin-bottom-right"
            >
              <FlowerClusterTL />
            </motion.div>

            {/* Bottom-Right Cluster Popup Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0, x: -5, y: -5, rotate: 25 }}
              animate={{
                scale: [0, 1.05, 0.9, 0.9, 0.7],
                opacity: [0, 1, 1, 0.9, 0],
                x: [-5, 16, 12, 12, 18],
                y: [-5, 16, 12, 12, 18],
                rotate: [25, -5, 0, 0, 12]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 -right-5 pointer-events-none z-50 origin-top-left"
            >
              <FlowerClusterBR />
            </motion.div>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FlowerCTAWrapper;
