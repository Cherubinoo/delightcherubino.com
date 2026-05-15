import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import axios from 'axios';

// Components
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import PersonalProjects from './components/PersonalProjects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import BackgroundEffect from './components/BackgroundEffect';
import CustomCursor from './components/CustomCursor';
import AdminDashboard from './pages/AdminDashboard';

const MainPortfolio = ({ activeSection, setActiveSection, theme, toggleTheme }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/profile/')
      .then(res => {
        if (res.data.length > 0) setProfile(res.data[0]);
      })
      .catch(err => console.error("Error fetching profile", err));
  }, []);

  const navItems = [
    { id: 'home', label: 'Nexus' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Experience' },
    { id: 'personal-projects', label: 'Projects' },
    { id: 'skills', label: 'Stack' }
  ];

  return (
    <>
      <div className="mobile-nav-container" style={{ 
        position: 'fixed', 
        top: '2rem', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <nav className="mobile-nav-pill" style={{ 
          background: 'var(--glass)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '100px',
          padding: '0.4rem',
          display: 'flex',
          gap: '0.1rem'
        }}>
          {navItems.map((item) => (
            <motion.a 
              key={item.id}
              href={`#${item.id}`} 
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ 
                fontSize: '0.7rem', 
                fontWeight: 800, 
                padding: '0.8rem 1.4rem',
                borderRadius: '100px',
                background: activeSection === item.id ? 'var(--accent)' : 'transparent',
                color: activeSection === item.id ? '#000' : 'var(--fg)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              {item.label}
            </motion.a>
          ))}
          
          <motion.a 
            href={profile?.resume || "#"}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              padding: '0.8rem 1.4rem',
              borderRadius: '100px',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              border: '1px solid var(--accent)',
              marginLeft: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            Resume
          </motion.a>
        </nav>


        <button 
          onClick={toggleTheme}
          style={{
            background: 'var(--glass)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--fg)',
            transition: 'all 0.3s ease'
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <main>
        <Hero />
        <About />
        <Projects />
        <PersonalProjects />
        <Experience />
        <Skills />
      </main>

      <footer className="section footer-container" style={{ borderTop: '1px solid var(--border)', paddingTop: '6rem' }}>
        <style>{`
          .footer-container {
            text-align: left;
          }
          .footer-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
          @media (max-width: 768px) {
            .footer-container {
              text-align: center;
            }
            .footer-content {
              align-items: center;
            }
            .footer-container h2 {
              text-align: center !important;
            }
          }
        `}</style>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 0 0' }} className="footer-wrapper">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="oversized-text" 
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', marginBottom: '3rem' }}
            >
              Let's <span style={{ color: 'var(--accent)' }}>Collaborate.</span>
            </motion.h2>
            
            <div className="footer-content">
              <a 
                href={`mailto:${profile?.email || 'delightcherubino@gmail.com'}?subject=Project Inquiry&body=Hi Delight,%0D%0A%0D%0AI came across your cinematic portfolio and was really impressed. I'd love to connect.%0D%0A%0D%0ABest regards,`} 
                className="btn"
                style={{ fontSize: '1.1rem', padding: '1.2rem 3rem' }}
              >
                {profile?.email || 'delightcherubino@gmail.com'}
              </a>
              <div className="mono" style={{ fontSize: '1.2rem', letterSpacing: '0.1em', opacity: 0.6 }}>
                {profile?.phone || '+91 8220789878'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '6rem', opacity: 0.2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }} className="mono">
            <span style={{ fontSize: '0.7rem' }}>© 2026 DELIGHT CHERUBINO</span>
            <span style={{ fontSize: '0.7rem' }}>BUILT WITH PRECISION & PASSION</span>
          </div>
        </div>
      </footer>
    </>
  );
};



function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'personal-projects', 'experience', 'skills'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <BackgroundEffect />
        
        <Routes>
          <Route path="/" element={
            <MainPortfolio 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



