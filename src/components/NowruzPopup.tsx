'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toPersianDigits } from '@/utils/date';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98'];

const createParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    speedX: (Math.random() - 0.5) * 2,
    speedY: Math.random() * 3 + 1,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
  }));

interface NowruzPopupProps {
  isVisible: boolean;
  onClose: () => void;
  persianYear: number;
}

export const NowruzPopup = ({ isVisible, onClose, persianYear }: NowruzPopupProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setParticles(createParticles(60));
    const interval = setInterval(() => setTick((t) => t + 1), 50);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          {/* Confetti Particles */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {particles.map((p) => {
              const yPos = ((p.y + tick * p.speedY) % 120) - 10;
              const xPos = p.x + Math.sin(tick * 0.05 + p.id) * p.speedX;
              return (
                <div
                  key={p.id}
                  style={{
                    position: 'absolute',
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                    borderRadius: p.id % 3 === 0 ? '50%' : '2px',
                    transform: `rotate(${p.rotation + tick * p.rotationSpeed}deg)`,
                    opacity: 0.85,
                  }}
                />
              );
            })}
          </div>

          {/* Firework rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 2], opacity: [1, 1, 0] }}
              transition={{ delay: i * 0.3, duration: 1, ease: 'easeOut', repeat: Infinity, repeatDelay: 2 }}
              style={{
                position: 'fixed',
                width: 120 + i * 60,
                height: 120 + i * 60,
                borderRadius: '50%',
                border: `3px solid ${COLORS[i * 2]}`,
                top: `${20 + i * 10}%`,
                left: `${10 + i * 30}%`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 60 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '2rem',
              padding: '3rem 2.5rem',
              maxWidth: '480px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 30px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Inner glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* X Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="بستن"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2.2rem',
                height: '2.2rem',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              ✕
            </motion.button>

            {/* Emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '1.2rem' }}
            >
              🌱
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              dir="rtl"
              style={{
                fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                fontWeight: 900,
                color: '#FFD700',
                marginBottom: '0.6rem',
                textShadow: '0 0 30px rgba(255,215,0,0.5)',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
              }}
            >
              سال {toPersianDigits(persianYear)} مبارک باد! 🎉
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              dir="rtl"
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.15rem)',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.8,
                marginBottom: '0.5rem',
              }}
            >
              نوروز {toPersianDigits(persianYear)} فرا رسید!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              dir="rtl"
              style={{
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}
            >
              بهار نو، شادی نو، آغازی دوباره 🌸
              <br />
              سالی پر از سلامت، شادکامی و موفقیت آرزومندیم.
            </motion.p>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,215,0,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                border: 'none',
                borderRadius: '999px',
                padding: '0.85rem 2.5rem',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1a1a1a',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              ✨ عید شما مبارک
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
