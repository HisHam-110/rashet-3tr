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

      {/* Decorative Top-Right Animated Graphic */}
      <div className="clp-bg-graphic-top-right">
        <svg width="1050" height="541" viewBox="0 0 1050 541" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="clp-svg-layer clp-layer-1" opacity="0.0361096" d="M440.658 250.955C442.587 269.545 454.626 286.135 474.607 300.225C494.59 314.315 522.569 325.946 556.506 334.62C624.386 351.97 716.218 357.52 815.918 347.176C915.617 336.832 1004.35 312.548 1067.23 281.633C1098.66 266.176 1123.65 249.049 1140.32 231.156C1156.98 213.264 1165.36 194.556 1163.43 175.966C1161.5 157.376 1149.46 140.787 1129.48 126.697C1109.5 112.606 1081.52 100.976 1047.58 92.3012C979.703 74.9512 887.871 69.4019 788.171 79.7459C688.472 90.0899 599.735 114.373 536.863 145.289C505.429 160.746 480.434 177.873 463.77 195.766C447.106 213.658 438.729 232.365 440.658 250.955Z" fill="#925E34" stroke="#3A2413"/>
          <path className="clp-svg-layer clp-layer-2" opacity="0.0458287" d="M273.298 265.979C276.046 292.463 293.191 316.124 321.704 336.243C350.219 356.363 390.155 372.98 438.616 385.376C535.542 410.171 666.682 418.111 809.067 403.338C951.452 388.565 1078.17 353.873 1167.94 309.708C1212.82 287.626 1248.5 263.165 1272.27 237.62C1296.05 212.076 1307.97 185.399 1305.22 158.915C1302.48 132.431 1285.33 108.77 1256.82 88.6513C1228.3 68.5318 1188.37 51.9151 1139.91 39.5184C1042.98 14.7239 911.842 6.7838 769.457 21.5564C627.072 36.3291 500.355 71.0222 410.583 115.187C365.699 137.268 330.025 161.729 306.249 187.274C282.473 212.818 270.551 239.495 273.298 265.979Z" fill="#925E34" stroke="#3A2413"/>
          <path className="clp-svg-layer clp-layer-3" opacity="0.06" d="M26.4372 280.525C30.1765 316.566 53.5121 348.786 92.3728 376.201C131.235 403.617 185.674 426.266 251.75 443.165C383.907 476.965 562.725 487.788 756.887 467.644C951.048 447.499 1123.83 400.196 1246.24 339.986C1307.44 309.882 1356.07 276.539 1388.47 241.729C1420.88 206.92 1437.1 170.595 1433.36 134.555C1429.62 98.5142 1306.29 66.2935 1367.43 38.8785C1328.57 11.4627 1274.13 -11.1863 1208.05 -28.0854C1075.89 -61.8845 897.076 -72.7084 702.914 -52.5639C508.753 -32.4193 335.966 14.884 213.563 75.0942C152.363 105.198 103.733 138.541 71.3267 173.351C38.9219 208.16 22.698 244.485 26.4372 280.525Z" fill="#925E34" stroke="#3A2413"/>
        </svg>
      </div>

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
