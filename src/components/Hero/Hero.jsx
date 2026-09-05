import React, { useState, useRef, useEffect } from 'react';
import HeroContent from './HeroContent';
import BenefitsBar from './BenefitsBar';
import heroBg from '../../assets/images/Hero Section (1).svg';
import './Hero.css';

const VIDEO_SCENES = [
  { id: 'finale', label: 'العطر الفاخر', src: '/videos/finale.mp4' },
  { id: 'harvest', label: 'الزهور والمكونات', src: '/videos/harvest.mp4' },
  { id: 'boutique', label: 'المعرض العطري', src: '/videos/boutique.mp4' },
  { id: 'atelier', label: 'المعمل الحرفي', src: '/videos/atelier.mp4' },
];

export default function Hero({ onExploreClick }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const activeVideo = VIDEO_SCENES[currentScene];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentScene]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="hero-wrapper" id="hero">
      {/* 1. Main Hero Banner Section with Video Background */}
      <section className="hero-banner-section">
        
        {/* Background Video Layer */}
        <div className="hero-video-wrapper">
          <video
            ref={videoRef}
            key={activeVideo.src}
            className={`hero-video-element ${isVideoLoaded ? 'loaded' : ''}`}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={heroBg}
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={activeVideo.src} type="video/mp4" />
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

        {/* Video Controls & Scene Switcher Bar */}
        <div className="hero-video-controls" dir="rtl">
          <div className="hero-controls-group">
            <button
              type="button"
              className="hero-control-btn"
              onClick={togglePlay}
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو'}
              aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو'}
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="hero-control-btn"
              onClick={toggleMute}
              title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
              aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            >
              {isMuted ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>

          <div className="hero-scene-pills">
            {VIDEO_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                className={`hero-scene-pill ${currentScene === idx ? 'active' : ''}`}
                onClick={() => setCurrentScene(idx)}
              >
                {scene.label}
              </button>
            ))}
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

