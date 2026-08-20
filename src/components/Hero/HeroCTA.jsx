import React from 'react';

export default function HeroCTA({ onClick, href = '#categories' }) {
  return (
    <a href={href} className="hero-cta-btn" onClick={onClick}>
      <span>اكتشف المجموعات</span>
    </a>
  );
}
