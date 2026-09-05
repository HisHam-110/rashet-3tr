import React from 'react';

export default function HeroCTA({ onClick, href = '#featured' }) {
  return (
    <a href={href} className="hero-cta-btn" onClick={onClick} dir="rtl">
      <span>اكتشف المجموعات</span>
      <span className="hero-cta-arrow">←</span>
    </a>
  );
}

