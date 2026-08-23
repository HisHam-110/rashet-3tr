import React, { useState, useEffect, useRef } from 'react';
import './CollectionsSection.css';

// Real local assets
import img69 from '../../assets/images/image 69.svg';
import img68 from '../../assets/images/image 68.svg';
import img72 from '../../assets/images/image 72.svg';
import imgAbout from '../../assets/images/About.svg';
import imgHero from '../../assets/images/Hero Section (1).svg';

const CARDS = [
  {
    id: '1',
    title: 'لك ولها',
    description: 'عطور تناسب كل الأوقات والمناسبات',
    image: imgAbout,
    alt: 'مجموعة لك ولها',
  },
  {
    id: '2',
    title: 'مجموعة الضيافة',
    description: 'تروي حكاية فخامتك وأصالتك',
    image: img72,
    alt: 'مجموعة الضيافة الفاخرة',
  },
  {
    id: '3',
    title: 'مجموعة الصيف',
    description: 'تجدّد إحساسك بالانتعاش والحيوية',
    image: img68,
    alt: 'مجموعة الصيف المنعشة',
  },
  {
    id: '4',
    title: 'المجموعة الكاملة',
    description: 'عطورك المفضلة في مكان واحد',
    image: img69,
    alt: 'المجموعة الكاملة من العطور',
  },
  {
    id: '5',
    title: 'مجموعة الليل',
    description: 'رائحة ساحرة تسبقك وتبقى',
    image: imgHero,
    alt: 'مجموعة الليل الفاخرة',
  },
];

const N = CARDS.length;

// Triple the cards array for seamless infinite step scrolling
const TRIPLE_CARDS = [
  ...CARDS.map((c, i) => ({ ...c, uid: `set1-${i}` })),
  ...CARDS.map((c, i) => ({ ...c, uid: `set2-${i}` })),
  ...CARDS.map((c, i) => ({ ...c, uid: `set3-${i}` })),
];

const START_INDEX = N; // Start at the second set

export default function CollectionsSection() {
  const [index, setIndex] = useState(START_INDEX);
  const [stepWidth, setStepWidth] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);

  // Measure the exact step width (card width + gap) and update state
  const measureStep = () => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.csc-card');
    if (!card) return;
    const cardW = card.offsetWidth;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 28;
    if (cardW > 0) {
      setStepWidth(cardW + gap);
    }
  };

  useEffect(() => {
    measureStep();
    const t1 = setTimeout(measureStep, 100);
    const t2 = setTimeout(measureStep, 400);
    window.addEventListener('resize', measureStep);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measureStep);
    };
  }, []);

  // Step movement every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Seamless snap on transition end
  const handleTransitionEnd = () => {
    if (index >= 2 * N) {
      setNoTransition(true);
      setIndex((i) => i - N);
    } else if (index < N) {
      setNoTransition(true);
      setIndex((i) => i + N);
    }
  };

  useEffect(() => {
    if (!noTransition) return;
    const raf = requestAnimationFrame(() => setNoTransition(false));
    return () => cancelAnimationFrame(raf);
  }, [noTransition]);

  // Calculate track translation in pixels
  const translateX = stepWidth > 0 ? -index * stepWidth : 0;

  return (
    <section className="collections-section" id="collections" dir="rtl">
      <div className="container">
        {/* Header */}
        <div className="collections-header">
          <div className="csc-header-right">
            <h2 className="collections-title">تسوق حسب المجموعة</h2>
            <p className="collections-subtitle">وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
          </div>
          <a href="#all-products" className="view-all-link" aria-label="عرض كل المجموعات">
            <span>عرض الكل</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="arrow-icon"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Carousel Track Viewport */}
      <div
        className="csc-outer"
        role="region"
        aria-label="مجموعات العطور - تتحرك تلقائياً"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="csc-track"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: noTransition
              ? 'none'
              : 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {TRIPLE_CARDS.map((item) => (
            <article key={item.uid} className="csc-card">
              {/* Background Image & Overlay */}
              <div className="csc-card-bg">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="csc-card-img"
                  draggable="false"
                />
                <div className="csc-overlay" />
              </div>

              {/* Text & Button */}
              <div className="csc-card-content">
                <div className="csc-card-text">
                  <h3 className="csc-card-title">{item.title}</h3>
                  <p className="csc-card-desc">{item.description}</p>
                </div>
                <button
                  type="button"
                  className="csc-card-btn"
                  aria-label={`تسوق الآن من ${item.title}`}
                >
                  <span>تسوق الآن</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="btn-arrow"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
