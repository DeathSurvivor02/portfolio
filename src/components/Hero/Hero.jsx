import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid-container">
        
        <div className="hero-top-left">
          EST. 2024 &mdash; SOFTWARE ENGINEERING
        </div>
        
        <div className="hero-top-right">
          INDEX
        </div>

        <div className="hero-massive-left text-gradient">
          EAN
        </div>

        <div className="hero-center-content" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-portrait-caption" style={{ marginTop: 0 }}>
              TORONTO &mdash; SOFTWARE ENGINEER
            </div>
        </div>

        <div className="hero-massive-right text-gradient">
          BYNOE
        </div>

        <div className="hero-bottom-right">
          REACT &mdash; JAVA &mdash; SQL
        </div>

        <div className="hero-scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
