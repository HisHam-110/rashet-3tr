import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'العطور الأكثر طلباً', path: '/perfumes' },
    { label: 'المجموعات الفاخرة', path: '/collections' },
    { label: 'عطور نسائية', path: '/perfumes?category=women' },
    { label: 'عطور رجالية', path: '/perfumes?category=men' },
    { label: 'عن رشة عطر', path: '/about' },
    { label: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <div className="nf-wrapper" dir="rtl">
      <main className="nf-main">
        {/* Ambient Glows */}
        <div className="nf-glow nf-glow-1" aria-hidden="true" />
        <div className="nf-glow nf-glow-2" aria-hidden="true" />

        <div className="nf-container">
          {/* Visual Illustration */}
          <div className="nf-visual-area">
            <div className="nf-badge">
              <span className="nf-badge-dot"></span>
              <span>خطأ 404 - الصفحة غير موجودة</span>
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

          {/* Text & Content */}
          <div className="nf-content">
            <h1 className="nf-title">
              يبدو أن هذا العطر <span className="nf-highlight">قد تبخر!</span>
            </h1>

            <p className="nf-desc">
              عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله. لا تقلق، يمكنك دائماً استكشاف تشكيلاتنا العطرية الفاخرة والاستمتاع بتجربة تسوق استثنائية.
            </p>

            {/* Action Buttons */}
            <div className="nf-actions">
              <button
                type="button"
                className="nf-btn-primary"
                onClick={() => navigate('/')}
                dir="rtl"
              >
                <span>العودة للرئيسية</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="btn-arrow"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>

              <button
                type="button"
                className="nf-btn-secondary"
                onClick={() => navigate('/perfumes')}
              >
                <span>تصفح كل العطور</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {/* Quick Links Suggestions */}
            <div className="nf-quick-section">
              <span className="nf-quick-title">أو توجه مباشرة إلى:</span>
              <div className="nf-quick-chips">
                {quickLinks.map((link, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="nf-chip"
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
