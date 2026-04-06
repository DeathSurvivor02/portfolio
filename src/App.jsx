import React from 'react';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import { FaHeart } from 'react-icons/fa';

function App() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--surface-border)',
        marginTop: '4rem',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        <div className="container">
          <p>
            Designed & Built with <FaHeart style={{ color: '#ff0f7b', margin: '0 5px' }} /> by Ean Bynoe
          </p>
          <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
            Software Engineering Technology Student • Centennial College
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
