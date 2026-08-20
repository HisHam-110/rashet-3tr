import React from 'react';
import './CollectionsSection.css';

// ── All 5 real assets ────────────────────────────────────────────
import img69   from '../../assets/images/image 69.svg';     // A – full collection
import img68   from '../../assets/images/image 68.svg';     // B – women
import img72   from '../../assets/images/image 72.svg';     // C – men
import imgAbout from '../../assets/images/About.svg';       // D – bottles composition
import imgHero  from '../../assets/images/Hero Section (1).svg'; // E – hero scene

// ── Card data (5 items, one per image) ──────────────────────────
const CARDS = [
  {
    id: 'A',
    title: 'المجموعة الكاملة',
    description: 'عطورك المفضلة في مكان واحد',
    image: img69,
    alt: 'المجموعة الكاملة من عطور رشة عطر',
  },
  {
    id: 'B',
    title: 'عطور نسائية',
    description: 'تزيدك أناقة',
    image: img68,
    alt: 'عطور نسائية راقية',
  },
  {
    id: 'C',
    title: 'عطور رجالية',
    description: 'تترك فيك أثر',
    image: img72,
    alt: 'عطور رجالية فاخرة',
  },
  {
    id: 'D',
    title: 'مجموعة الصيف',
    description: 'تجدّد إحساسك بالانتعاش',
    image: imgAbout,
    alt: 'مجموعة الصيف – تشكيلة زجاجات عطور',
  },
  {
    id: 'E',
    title: 'مجموعة الليل',
    description: 'رائحة تسبقك وتبقى',
    image: imgHero,
    alt: 'مجموعة الليل الفاخرة',
  },
];

// Double the array → A B C D E A B C D E
// When the track shifts -50%, the second set aligns perfectly = seamless loop
const DOUBLED = [
  ...CARDS.map((c) => ({ ...c, uid: `1-${c.id}` })),
  ...CARDS.map((c) => ({ ...c, uid: `2-${c.id}` })),
];

// ── Component (zero JS animation logic – pure CSS) ───────────────
export default function CollectionsSection() {
  return (
    <section className="collections-section" id="collections">

      {/* Static header — stays inside the container */}
      <div className="container">
        <div className="collections-header">
          <div className="csc-header-right">
            <h2 className="collections-title">تسوق حسب المجموعة</h2>
            <p className="collections-subtitle">وفرنا لك مجموعات تناسب جميع الأذواق</p>
          </div>
          <a href="#all-products" className="view-all-link" aria-label="عرض كل المجموعات">
            <span>عرض الكل</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="arrow-icon"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Full-width overflow:hidden viewport */}
      <div
        className="csc-outer"
        role="region"
        aria-label="مجموعات العطور – تتحرك تلقائياً"
      >
        {/*
          Track direction is LTR so translateX(-50%) reliably scrolls left.
          Card *content* remains RTL via text-align and direction overrides inside cards.
          We render DOUBLED (10 cards). CSS animates translateX(0) → translateX(-50%).
          At -50% the second half of the track is identical to the start → seamless jump.
        */}
        <div className="csc-track">
          {DOUBLED.map((item) => (
            <article key={item.uid} className="csc-card">

              {/* Background image + dark gradient overlay */}
              <div className="csc-card-bg">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="csc-card-img"
                  draggable="false"
                />
                <div className="csc-overlay" />
              </div>

              {/* Text & button — RTL inside the card */}
              <div className="csc-card-content">
                <div className="csc-card-text">
                  <h3 className="csc-card-title">{item.title}</h3>
                  <p className="csc-card-desc">{item.description}</p>
                </div>
                <button
                  className="csc-card-btn"
                  aria-label={`تسوق الآن من ${item.title}`}
                >
                  <span>تسوق الآن</span>
                  <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
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
