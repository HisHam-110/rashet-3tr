import React, { useState } from 'react';
import './LatestArticles.css';

import article1Img from '../../assets/images/image 73 (1).svg';
import article2Img from '../../assets/images/image 69.svg';
import article3Img from '../../assets/images/image 72.svg';
import article4Img from '../../assets/images/image 68.svg';

const ARTICLES = [
  {
    id: 1,
    title: 'كيف تختار عطرًا ليكون هدية مثالية؟',
    excerpt:
      'تعرف على أهم النصائح لاختيار العطر كهدية يحتاج إلى عناية واهتمام بالتفاصيل. تعرف على أفضل النصائح لاختيار عطر يناسب شخصية من تهديه، ويمنحه تجربة عطرية راقية تترك انطباعًا لا يُنسى في كل مناسبة.',
    image: article2Img,
  },
  {
    id: 2,
    title: 'كيفية اختيار العطر المثالي: دليل كامل',
    excerpt:
      'إيجاد عطر مثالي يتجاوز الأمر رائحة طيبة، بل يتعلق باختيار رائحة تتناسب مع شخصيتك ونمط حياتك وكيمياء جسدك. هذا الدليل المدعوم من الخبراء يشرح أنواع العطور، ونغمات الروائح، والنصائح لتحديد عطرك المميز، سواء للاستخدام اليومي أو للمناسبات الخاصة.',
    image: article1Img,
  },
  {
    id: 3,
    title: 'أفضل عطور الخريف لعام 2024',
    excerpt:
      'مع بداية موسم الخريف تتغير تفضيلاتنا العطرية لتميل نحو الروائح الدافئة والخشبية. اكتشف أبرز العطور التي تلائم أجواء الخريف وتمنحك إحساساً بالدفء والرقي طوال اليوم.',
    image: article3Img,
  },
  {
    id: 4,
    title: 'أسرار العطور الشرقية وسحر العود',
    excerpt:
      'العطور الشرقية لها مكانة خاصة في عالم العطارة العربية، إذ تجمع بين عمق العود الفاخر ودفء الأنبر وحلاوة المسك. تعرف على أسرار هذه العطور وكيف تختار المناسب منها.',
    image: article4Img,
  },
];

const VISIBLE = 2; // how many cards visible at once

export default function LatestArticles() {
  const [startIndex, setStartIndex] = useState(0);

  const canGoNext = startIndex + VISIBLE < ARTICLES.length;
  const canGoPrev = startIndex > 0;

  const goNext = () => {
    if (canGoNext) setStartIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (canGoPrev) setStartIndex((prev) => prev - 1);
  };

  const visibleArticles = ARTICLES.slice(startIndex, startIndex + VISIBLE);

  return (
    <section className="la-section" dir="rtl">
      <div className="la-container">
        {/* Section Header */}
        <div className="la-header">
          <div className="la-title-wrap">
            <h2 className="la-title">أحدث المقالات</h2>
            <div className="la-title-underline"></div>
          </div>
          <button className="la-view-all-btn">
            <span className="la-chevron">‹</span>
            عرض الكل
          </button>
        </div>

        {/* Slider Wrapper */}
        <div className="la-slider-wrapper">
          {/* Left Arrow (prev) */}
          <button
            className={`la-arrow la-arrow-left ${!canGoNext ? 'la-arrow-disabled' : ''}`}
            onClick={goNext}
            aria-label="السابق"
          >
            ›
          </button>

          {/* Cards */}
          <div className="la-cards-grid">
            {visibleArticles.map((article) => (
              <div key={article.id} className="la-card">
                <div className="la-card-img-wrap">
                  <img src={article.image} alt={article.title} className="la-card-img" />
                </div>
                <div className="la-card-body">
                  <h3 className="la-card-title">{article.title}</h3>
                  <p className="la-card-excerpt">{article.excerpt}</p>
                  <button className="la-read-more-btn">اقرأ المزيد «</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow (next) */}
          <button
            className={`la-arrow la-arrow-right ${!canGoPrev ? 'la-arrow-disabled' : ''}`}
            onClick={goPrev}
            aria-label="التالي"
          >
            ‹
          </button>
        </div>
      </div>
    </section>
  );
}
