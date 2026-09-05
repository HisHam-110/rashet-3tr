import React from 'react';
import HeroContent from './HeroContent';
import BenefitsBar from './BenefitsBar';
import heroBg from '../../assets/images/Hero Section (1).svg';
import './Hero.css';

export default function Hero({ onExploreClick }) {
  return (
    <div className="hero-wrapper" id="hero">
      {/* 1. Main Hero Banner Section with Video Background */}
      <section className="hero-banner-section">
        
        {/* Background Video Layer (Auto-plays seamlessly) */}
        <div className="hero-video-wrapper">
          <video
            className="hero-video-element loaded"
            autoPlay
            loop
            muted
            playsInline
            poster={heroBg}
          >
            <source src="/videos/finale.mp4" type="video/mp4" />
          </video>

          {/* Fallback & Luxury Overlays */}
          <div className="hero-video-overlay-gradient" />
          <div className="hero-video-radial-glow" />
          <div className="hero-ambient-particles" aria-hidden="true">
            <span className="particle p1" />
            <span className="particle p2" />
            <span className="particle p3" />
            <span className="particle p4" />
          </div>
        </div>

        {/* Foreground Content */}
        <div className="hero-container">
          <div className="hero-content-column">
            <HeroContent onCtaClick={onExploreClick} />
          </div>
        </div>
      </section>

      {/* 2. Floating Features / Benefits Bar */}
      <BenefitsBar />
    </div>
  );
}

