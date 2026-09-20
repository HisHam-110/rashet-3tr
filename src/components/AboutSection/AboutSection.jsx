import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutSection.css';
import aboutImg from '../../assets/images/About.svg';

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <section className="about-section" id="about-brand">
      <div className="about-container">
        {/* Since the page is RTL, the first element (right side) is the Content,
            and the second element (left side) is the Image. */}
        <div className="about-content">
          <h2 className="about-title">عن رشة عطر.</h2>
          <div className="about-title-line"></div>
          
          <p className="about-paragraph">
            في رشة عطر، نؤمن أن العطر ليس مجرد رائحة، بل هو هوية وحضور يسبقك ويحكي عن شخصيتك. كمتجر رائد للعطور الفاخرة والأصلية في السعودية ومصر، ننتقي أرقى تركيبات العود والنيش والعطور الرجالية والنسائية بعناية فائقة، لنضمن لك ثباتاً وفوحاناً استثنائياً يمنحك تجربة عطرية راقية تترك أثراً يدوم في كل مناسبة.
          </p>

          <button 
            type="button" 
            className="about-btn" 
            onClick={() => navigate('/perfumes')} 
            aria-label="تسوق الآن"
            dir="rtl"
          >
            <span>تسوق الآن</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="about-btn-arrow"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        </div>

        <div className="about-image-wrapper">
          <img 
            src={aboutImg} 
            alt="تشكيلة زجاجات عطور فاخرة من رشة عطر" 
            className="about-img" 
          />
        </div>
      </div>
    </section>
  );
}
