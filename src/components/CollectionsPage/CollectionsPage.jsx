import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './CollectionsPage.css';

// Local high-res assets matching user screenshot
import womenImg from '../../assets/images/image 73 (1).svg';
import menImg from '../../assets/images/image 67.svg';
import unisexImg from '../../assets/images/About.svg';
import fullCollImg from '../../assets/images/image 69.svg';
import luxuryImg from '../../assets/images/image 72.svg';
import summerImg from '../../assets/images/image 68.svg';

const COLLECTIONS_LIST = [
  {
    id: 'women',
    title: 'عطور نسائية',
    subtitle: 'تزيدك انوثة',
    image: womenImg,
    fallback: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'men',
    title: 'عطور رجالية',
    subtitle: 'تليق بيك',
    image: menImg,
    fallback: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'unisex',
    title: 'لك و لها',
    subtitle: 'نفحة رجولة ورشة انوثة',
    image: unisexImg,
    fallback: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'full',
    title: 'المجموعة الكاملة',
    subtitle: 'عطورك المفضلة في مكان واحد',
    image: fullCollImg,
    fallback: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'luxury',
    title: 'مجموعة الفخامة',
    subtitle: 'تروي حكاية فخامتك',
    image: luxuryImg,
    fallback: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'summer',
    title: 'مجموعة الصيف',
    subtitle: 'تحسسك الانتعاش',
    image: summerImg,
    fallback: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function CollectionsPage() {
  const navigate = useNavigate();

  const handleCardClick = (catId) => {
    navigate(`/perfumes?category=${catId}`);
  };

  return (
    <div className="collections-page" dir="rtl">

      {/* Decorative Ellipses - positioned relative to page */}
      <div className="clp-ellipse clp-ellipse-1"></div>
      <div className="clp-ellipse clp-ellipse-2"></div>
      <div className="clp-ellipse clp-ellipse-3"></div>

      {/* Top Header & Breadcrumb */}
      <div className="clp-top-bar">
        <div className="clp-container">
          <div className="clp-breadcrumb">
            <span className="clp-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="clp-bc-sep">/</span>
            <span className="clp-bc-current">المجموعات</span>
          </div>
        </div>
      </div>

      {/* Page Title Hero Banner */}
      <div className="clp-hero-banner">
        <div className="clp-hero-bg-shape"></div>

        <div className="clp-hero-content">
          <h1 className="clp-page-title">المجموعات</h1>
          <p className="clp-page-subtitle">
            اكتشفي مجموعاتنا المختارة بعناية لتناسب ذوقك ومناسباتك المختلفة
          </p>
        </div>
      </div>

      {/* 6 Cards Grid Section */}
      <div className="clp-main-section">
        <div className="clp-container">
          <div className="clp-cards-grid">
            {COLLECTIONS_LIST.map((col) => (
              <div
                key={col.id}
                className="clp-card"
                onClick={() => handleCardClick(col.id)}
              >
                <img src={col.image || col.fallback} alt={col.title} className="clp-card-img" />
                <div className="clp-card-overlay"></div>
                <div className="clp-card-content">
                  <h3 className="clp-card-title">{col.title}</h3>
                  <p className="clp-card-subtitle">{col.subtitle}</p>
                  <button className="clp-card-btn" onClick={(e) => { e.stopPropagation(); handleCardClick(col.id); }}>
                    <span>تسوق الآن</span>
                    <span className="clp-arrow">←</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
