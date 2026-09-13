import React, { useState } from 'react';
import HeroContent from './HeroContent';
import BenefitsBar from './BenefitsBar';

import './Hero.css';

const HERO_VIDEOS = [
  '/videos/atelier.mp4',
  '/videos/boutique.mp4',
  '/videos/harvest.mp4',
  '/videos/finale.mp4'
];

export default function Hero({ onExploreClick }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % HERO_VIDEOS.length);
  };

  return (
    <div className="hero-wrapper" id="hero">
      {/* 1. Main Hero Banner Section with Video Background */}
      <section className="hero-banner-section">
        
        {/* Background Video Layer (Auto-plays seamlessly) */}
        <div className="hero-video-wrapper">
          <video
            key={HERO_VIDEOS[currentVideoIndex]}
            className="hero-video-element loaded"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
          >
            <source src={HERO_VIDEOS[currentVideoIndex]} type="video/mp4" />
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

      {/* 2. Floating Features / Benefits Bar overlapping the bottom edge of the video */}
      <BenefitsBar />
    </div>
  );
}

