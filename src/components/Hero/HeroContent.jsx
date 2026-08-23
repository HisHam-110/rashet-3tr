import React from 'react';
import HeroCTA from './HeroCTA';

export default function HeroContent({ onCtaClick }) {
  return (
    <div className="hero-content-inner">
      <h1 className="hero-heading">
        رشة واحدة...<br />
        تترك أثراً لا يُنسى
      </h1>

      <p className="hero-subtext">
        اكتشف عالمًا من العطور الفاخرة المصممة خصيصًا لك
      </p>

      <HeroCTA onClick={onCtaClick} />
    </div>
  );
}
