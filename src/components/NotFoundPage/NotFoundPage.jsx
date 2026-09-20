import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../SEO/SEOHead';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="nf-wrapper" dir="rtl">
      <SEOHead
        title="الصفحة غير موجودة (404) | متجر رشة عطر"
        description="عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
        robots="noindex, follow"
      />
      <main className="nf-main">
        {/* Ambient Glows */}
        <div className="nf-glow nf-glow-1" aria-hidden="true" />
        <div className="nf-glow nf-glow-2" aria-hidden="true" />

        <div className="nf-container nf-centered-card">
          {/* Visual Illustration Area */}
          <div className="nf-visual-area">
            <div className="nf-badge">
              <span className="nf-badge-dot" />
              <span>خطأ 404 - الصفحة غير متوفرة</span>
            </div>

            <div className="nf-art">
              <div className="nf-404-text">404</div>

              {/* Luxury Perfume Bottle Illustration */}
              <div className="nf-bottle" aria-hidden="true">
                <div className="nf-mist-particle p1" />
                <div className="nf-mist-particle p2" />
                <div className="nf-mist-particle p3" />
                <div className="nf-mist-particle p4" />

                <div className="nf-bottle-cap" />
                <div className="nf-bottle-atomizer" />
                <div className="nf-bottle-neck" />
                <div className="nf-bottle-body">
                  <div className="nf-bottle-inner-liquid" />
                  <div className="nf-bottle-label">
                    <span className="nf-bottle-brand">رشة عطر</span>
                    <span className="nf-bottle-sub">PARFUM</span>
                  </div>
                  <div className="nf-bottle-shine" />
                </div>
                <div className="nf-bottle-base-shadow" />
              </div>
            </div>
          </div>

          {/* Clean Content Area with only the Main Home Button */}
          <div className="nf-content nf-centered-content">
            <h1 className="nf-title">
              يبدو أن هذا العطر <span className="nf-highlight">قد تبخر!</span>
            </h1>

            <p className="nf-desc">
              الصفحة التي تحاول الوصول إليها غير موجودة أو تم نقلها.
            </p>

            {/* ONLY Home Page Button */}
            <div className="nf-actions">
              <button
                type="button"
                className="nf-btn-primary nf-home-btn-main"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate('/');
                }}
                title="الانتقال إلى الصفحة الرئيسية"
              >
                <svg
                  className="btn-home-icon"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9.5L12 2.5l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>الصفحة الرئيسية</span>
                <span className="btn-shine-effect" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
