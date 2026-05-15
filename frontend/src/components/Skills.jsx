import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/skills/')
      .then(res => setSkills(res.data))
      .catch(err => console.error("Error fetching skills", err));
  }, []);

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg)', padding: '10rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '10rem' }}
        >
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Technical Arsenal</div>
          <h2 className="oversized-text">Stack <span style={{ color: 'var(--muted)' }}>&</span> Tools.</h2>
        </motion.div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '3.5rem' 
        }}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="bento-card"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ 
                position: 'absolute', top: '-1rem', right: '-1rem', 
                fontSize: '8rem', fontWeight: 900, opacity: 0.03, pointerEvents: 'none',
                color: 'var(--accent)'
              }}>
                {index + 1}
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="mono" style={{ color: 'var(--accent)', display: 'block', marginBottom: '1rem', fontSize: '0.7rem' }}>
                  {skill.category}
                </span>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{skill.name}</h3>
                <div style={{ 
                  marginTop: '2rem', 
                  width: '40px', 
                  height: '2px', 
                  background: 'var(--accent)', 
                  opacity: 0.3,
                  transition: 'width 0.4s ease'
                }} className="skill-line" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

