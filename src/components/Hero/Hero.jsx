import React from 'react';
import HeroContent from './HeroContent';
import BenefitsBar from './BenefitsBar';
import heroBg from '../../assets/images/Hero Section (1).svg';
import './Hero.css';

export default function Hero({ onExploreClick }) {
  return (
    <div className="hero-wrapper" id="hero">
      {/* 2. Main Hero Banner Section */}
      <section
        className="hero-banner-section"
        style={{ backgroundImage: `url("${heroBg}")` }}
      >
        <div className="hero-container">
          {/* Right-aligned Hero Content (RTL) */}
          <div className="hero-content-column">
            <HeroContent onCtaClick={onExploreClick} />
          </div>
        </div>
      </section>

      {/* 3. Floating Features / Benefits Bar */}
      <BenefitsBar />
    </div>
  );
}
