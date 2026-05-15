import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} id="about" className="section" style={{ borderTop: '1px solid var(--border)', overflow: 'hidden', position: 'relative' }}>
      <div className="container">
        <div className="grid-cols-12" style={{ alignItems: 'start' }}>
          <motion.div style={{ opacity, gridColumn: 'span 7' }}>
            <div className="mono" style={{ color: 'var(--accent)', marginBottom: '2rem' }}>01 / THE STORY</div>
            <h2 className="oversized-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)', marginBottom: '4rem' }}>
              Turning complex <br />
              logic into <span className="pill">seamless</span> <br />
              human experiences.
            </h2>
            <p style={{ fontSize: '1.4rem', color: 'var(--muted)', lineHeight: '1.6', maxWidth: '80%' }}>
              I am an AI & Data Science engineer focused on bridging the gap between theoretical computation and practical application. 
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div className="bento-card">
              <h3 className="mono" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>THE VISION</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.8 }}>
                Engineering systems that don't just process data, but provide meaningful insights and intuitive interactions.
              </p>
            </div>
            
            <div className="glass-panel" style={{ padding: '3rem' }}>
              <h3 className="mono" style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>CURRENT FOCUS</h3>
              <p style={{ fontSize: '1.1rem', fontWeight: 500, opacity: 0.8 }}>
                Vice President of AI & DS at Ramco Institute, architecting student development frameworks and technical initiatives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

