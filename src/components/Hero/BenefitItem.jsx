import React from 'react';

export default function BenefitItem({ icon, title, desc }) {
  return (
    <div className="benefit-item">
      <div className="benefit-icon-box">
        <img src={icon} alt={title} className="benefit-icon" />
      </div>
      <div className="benefit-text-wrap">
        <h4 className="benefit-title">{title}</h4>
        <p className="benefit-desc">{desc}</p>
      </div>
    </div>
  );
}
