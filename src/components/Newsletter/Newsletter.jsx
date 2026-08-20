import React, { useState } from 'react';
import './Newsletter.css';

import image1 from '../../assets/images/image 63.svg';
import image2 from '../../assets/images/jay-huang-TUUY5yORBc0-unsplash 1.svg';
import image3 from '../../assets/images/dartistana_create_a_professional_product_shoot_of_3_perfume_bot_3e6bf181-e7e3-410a-96fa-977eb5e88c24 1.svg';

const articles = [
  {
    image: image1,
    title: 'كيف تختار عطرًا يكون هدية مثالية؟',
    text: 'تعرف على أهم النصائح لاختيار العطر كهدية حتى تتناسب مع شخصية من تهديه، وتمنحه تجربة عطرية راقية تترك انطباعًا لا يُنسى في كل مناسبة.',
  },
  {
    image: image2,
    title: 'عطرًا ما هو فني، وكيف تختار منتجك الخاص',
    text: 'الصناعة لا تتطلب بشكل موجود، ويمكن لنظام EDT المصمم بشكل دقيق، نجد نوعًا مناسبًا من العطر حسب طبيعة الاستخدام والمناسبة.',
  },
  {
    image: image3,
    title: 'دليل اختيار العطر المثالي: كيف تجد عطرك المميز؟',
    text: 'إيجاد عطر مثالي يتجاوز الأمر رائحة طيبة. بل يتعلق باختيار رائحة تناسب شخصيتك ونمط حياتك وكيفية جسدك.',
  },
];

export default function Newsletter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  /*
    لأننا نريد عرض كارتين في نفس الوقت،
    نستخدم ترتيب دائري للكروت.
  */
  const visibleArticles = [
    articles[currentIndex % articles.length],
    articles[(currentIndex + 1) % articles.length],
  ];

  return (
    <section className="newsletter-section" dir="rtl">
      <div className="newsletter-container">

        {/* Header */}
        <div className="newsletter-header">

          <div className="newsletter-heading">
            <h2>أحدث المقالات</h2>
            <span></span>
          </div>

          <button
            type="button"
            className="newsletter-view-all"
            aria-label="عرض الكل"
          >
            <span>‹</span>
            عرض الكل
          </button>

        </div>

        {/* Carousel */}
        <div className="newsletter-carousel">

          {/* Arrow */}
          <button
            type="button"
            className="carousel-arrow"
            onClick={nextSlide}
            aria-label="المقال التالي"
          >
            <span>‹</span>
          </button>

          {/* Cards */}
          <div className="newsletter-cards">

            {visibleArticles.map((article, index) => (
              <article
                className="article-card"
                key={`${article.image}-${index}`}
              >

                <div className="article-image">
                  <img
                    src={article.image}
                    alt={article.title}
                  />
                </div>

                <div className="article-content">

                  <h3>{article.title}</h3>

                  <p>{article.text}</p>

                  <button
                    type="button"
                    className="article-more"
                  >
                    <span>اقرأ المزيد</span>
                    <span className="article-arrow">←</span>
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}