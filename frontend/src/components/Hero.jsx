import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      style={{ 
        minHeight: '100svh', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(10, 10, 11, 0.4), rgba(10, 10, 11, 0.4)), url('/images/1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: '40% center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div 
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 40%, transparent 60%, var(--bg) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />




      <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'flex-start' }}>
        <motion.div 
          style={{ opacity, maxWidth: '900px', textAlign: 'left' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            <span style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
            SOFTWARE ARCHITECT & ENGINEER
          </div>
          
          <h1 className="oversized-text" style={{ marginBottom: '4rem', textShadow: '0 10px 40px rgba(0,0,0,0.9)', color: '#fff', textAlign: 'left' }}>
            Building <br />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>digital</span> universes <br />
            with <span className="pill" style={{ background: 'var(--accent)', color: '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>precision.</span>
          </h1>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#personal-projects" className="btn">Explore Work</a>
            <a href="#about" style={{ textDecoration: 'none', color: 'var(--fg)', fontWeight: 700, fontSize: '0.9rem', borderBottom: '1px solid var(--fg)' }}>
              Discover Journey
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


export default Hero;

