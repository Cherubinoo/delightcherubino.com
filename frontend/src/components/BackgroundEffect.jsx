import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffect = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1, 
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {/* Cinematic Grain Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        zIndex: 10,
        pointerEvents: 'none',
        backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      }} />

      {/* Floating Auras */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '80vw',
          height: '80vw',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 60%)',
          filter: 'blur(120px)',
          opacity: 0.4
        }}
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -45, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-20%',
          width: '90vw',
          height: '90vw',
          background: 'radial-gradient(circle, var(--accent-alt) 0%, transparent 60%)',
          filter: 'blur(150px)',
          opacity: 0.3
        }}
      />

      {/* Moving Light Streaks */}
      <motion.div
        animate={{
          x: ['-100%', '100%'],
          opacity: [0, 0.1, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '30%',
          width: '200%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          transform: 'rotate(-25deg)',
        }}
      />

      {/* Subtle Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)',
        opacity: 0.1,
      }} />
    </div>
  );
};

export default BackgroundEffect;
