import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, X, FolderCode, ArrowUpRight } from 'lucide-react';
import axios from 'axios';

const ProjectCard = ({ project, index, setSelectedProject }) => {
  return (
    <motion.div
      layoutId={`personal-${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ cursor: 'pointer' }}
      onClick={() => setSelectedProject(project)}
      className="bento-card"
    >
      <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ 
          width: '100%', 
          aspectRatio: '16/10', 
          borderRadius: '1rem', 
          background: 'rgba(255,255,255,0.02)',
          marginBottom: '2rem',
          overflow: 'hidden',
          border: '1px solid var(--glass-border)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}>
            <div className="glass-panel" style={{ padding: '0.6rem', borderRadius: '50%', color: 'var(--accent)' }}>
              <ArrowUpRight size={18} />
            </div>
          </div>
          {project.image ? (
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, rgba(255,255,255,0.02), transparent)' }}>
               <FolderCode size={48} style={{ opacity: 0.1 }} />
            </div>
          )}
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent)', marginBottom: '1rem' }}>
            <FolderCode size={14} />
            <span className="mono" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>{project.company || "PERSONAL PROJECT"}</span>
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.02em' }}>{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const PersonalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects/')
      .then(res => {
        setProjects(res.data.filter(p => p.category === 'personal'));
      })
      .catch(err => console.error("Error fetching projects", err));
  }, []);

  return (
    <section id="personal-projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '8rem' }}
        >
          <div className="mono" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Venture & Experiment</div>
          <h2 className="oversized-text">Digital <span style={{ color: 'var(--muted)' }}>Crafts.</span></h2>
        </motion.div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', 
          gap: '2.5rem'
        }}>
          {projects.map((project, idx) => (
            <ProjectCard 
              key={project.id || idx} 
              project={project} 
              index={idx}
              setSelectedProject={setSelectedProject} 
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
              background: 'rgba(10, 10, 11, 0.98)', backdropFilter: 'blur(30px)',
              zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(1rem, 5vw, 4rem)'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`personal-${selectedProject.id}`}
              className="glass-panel"
              style={{ 
                maxWidth: '1200px', width: '100%', 
                padding: 'clamp(2rem, 8vw, 6rem)', position: 'relative',
                maxHeight: '90vh', overflowY: 'auto',
                boxShadow: '0 50px 150px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{ 
                  position: 'absolute', top: '2rem', right: '2rem', 
                  background: 'rgba(255,255,255,0.05)', border: 'none', 
                  cursor: 'pointer', borderRadius: '50%', padding: '1rem', 
                  color: 'var(--fg)', zIndex: 10
                }}
              >
                <X size={24} />
              </button>

              <div className="modal-grid">
                <style>{`
                  .modal-grid {
                    display: grid;
                    grid-template-columns: 1.3fr 0.7fr;
                    gap: 6rem;
                  }
                  @media (max-width: 1000px) {
                    .modal-grid {
                      grid-template-columns: 1fr;
                      gap: 4rem;
                    }
                  }
                `}</style>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent)', marginBottom: '2.5rem' }}>
                    <FolderCode size={20} />
                    <span className="mono" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>{selectedProject.company || "PERSONAL VENTURE"}</span>
                  </div>
                  <h2 className="oversized-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', margin: '1rem 0', lineHeight: '0.9' }}>{selectedProject.title}</h2>
                  
                  <p style={{ fontSize: '1.25rem', color: 'var(--muted)', lineHeight: '1.8', margin: '4rem 0' }}>
                    {selectedProject.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                    <a href={selectedProject.github_link || "#"} className="btn">Source Code <Code size={20} /></a>
                    <a href={selectedProject.live_link || "#"} className="btn" style={{ background: 'transparent', border: '1px solid var(--fg)', color: 'var(--fg)' }}>Live Demo <ExternalLink size={20} /></a>
                  </div>
                </div>
                
                <div className="modal-sidebar">
                  <style>{`
                    .modal-sidebar {
                      border-left: 1px solid var(--border);
                      padding-left: 4rem;
                    }
                    @media (max-width: 1000px) {
                      .modal-sidebar {
                        border-left: none;
                        border-top: 1px solid var(--border);
                        padding-left: 0;
                        padding-top: 4rem;
                      }
                    }
                  `}</style>
                  <div style={{ marginBottom: '4rem' }}>
                    <h4 className="mono" style={{ marginBottom: '2rem', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '0.2em' }}>TECH STACK</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                      {selectedProject.tech_stack?.map((tech, i) => (
                        <span key={i} className="pill" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--fg)', border: '1px solid var(--glass-border)', fontSize: '0.8rem' }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PersonalProjects;



