import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import axios from 'axios';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/experience/')
      .then(res => setExperiences(res.data))
      .catch(err => console.error("Error fetching experience", err));
  }, []);

  return (
    <section id="experience" className="section" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '8rem' }}
        >
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>The Journey</div>
          <h2 className="oversized-text">History <span style={{ color: 'var(--muted)' }}>&</span> Milestone.</h2>
        </motion.div>
        
        <div style={{ maxWidth: '1200px' }}>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="experience-item"
              style={{ 
                padding: '4rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <style>{`
                .experience-item {
                  display: grid;
                  grid-template-columns: repeat(12, 1fr);
                  gap: 4rem;
                }
                @media (max-width: 768px) {
                  .experience-item {
                    grid-template-columns: 1fr;
                    gap: 2rem;
                    padding: 3rem 0;
                  }
                }
              `}</style>
              <div style={{ gridColumn: 'span 4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>
                  <Terminal size={18} />
                  <span className="mono" style={{ fontSize: '1rem', fontWeight: 700 }}>{exp.duration}</span>
                </div>
                <h3 className="mono" style={{ fontSize: '1.2rem', fontWeight: 600, opacity: 0.6 }}>{exp.company}</h3>
              </div>
              <div style={{ gridColumn: 'span 8' }}>
                <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '2rem', lineHeight: '1', letterSpacing: '-0.04em', color: 'var(--fg)' }}>
                  {exp.title}
                </h3>
                <div style={{ color: 'var(--fg)', opacity: 0.8, lineHeight: '1.7', fontSize: '1.1rem' }}>
                  {exp.description.split('\n').map((line, i) => (
                    <p key={i} style={{ marginBottom: '1rem' }}>{line}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
