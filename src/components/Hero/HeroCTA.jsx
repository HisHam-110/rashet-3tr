import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroCTA({ onClick, href = '/collections' }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      e.preventDefault();
      navigate('/collections');
    }
  };

  return (
    <button
      type="button"
      className="hero-cta-btn"
      onClick={handleClick}
      dir="rtl"
    >
      <span>اكتشف المجموعات</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hero-cta-arrow"
      >
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

