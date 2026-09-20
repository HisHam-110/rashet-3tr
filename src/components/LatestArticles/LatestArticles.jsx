import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LatestArticles.css';

import article1Img from '../../assets/images/image 73 (1).svg';
import article2Img from '../../assets/images/image 69.svg';
import article3Img from '../../assets/images/image 72.svg';
import article4Img from '../../assets/images/image 68.svg';

import { articlesApi } from '../../services/storeApi';

const ARTICLES = [
  {
    id: 1,
    title: 'الفرق بين Eau de Parfum و Eau de Toilette: دليلك لفهم ثبات وتركيز العطور',
    excerpt:
      'تعرف على الفروق الجوهرية بين تركيزات العطور (EDP مقابل EDT)، وكم يدوم ثبات كل نوع، وكيف تختار التركيز الأنسب ليومك وعملك ومناسباتك الخاصة في السعودية ومصر.',
    image: article2Img,
    categoryName: 'عطور النيش والتركيزات الفاخرة',
    categoryLink: '/perfumes?category=luxury',
    fullSections: [
      {
        h3: 'ما هو سر اختلاف تركيزات العطور؟',
        p: 'يتحدد نوع العطر وثباته بنسبة الزيوت العطرية النقية (Fragrance Essence) المذابة في الكحول والماء. كلما زادت نسبة الزيت العطري، زادت كثافة الرائحة واستمرارية فوحانها لساعات أطول على البشرة والملابس.',
      },
      {
        h3: 'ماء العطر (Eau de Parfum - EDP):',
        p: 'يحتوي على تركيز زيوت يتراوح بين 15% إلى 20%. يتميز بثبات ممتاز يدوم من 8 إلى 12 ساعة، وفوحان غني وعميق. يُعد الخيار المثالي للسهرات، والعمل، والأجواء المعتدلة والباردة، وهو التركيز الأكثر طلباً في متجر رشة عطر.',
      },
      {
        h3: 'ماء التواليت (Eau de Toilette - EDT):',
        p: 'يحتوي على تركيز زيوت بين 5% إلى 15%. يتميز بطابع منعش وخفيف يدوم من 4 إلى 6 ساعات، مما يجعله مثالياً لأوقات الصباح، النادي الرياضي، وأيام الصيف الحارة.',
      },
      {
        h3: 'نصيحة خبراء رشة عطر:',
        p: 'إذا كنت تبحث عن الحضور الطاغي والثبات طوال اليوم في المناسبات الكبرى، فاختر عطور الـ EDP والنيش المركزة. ولتجديد الانتعاش الصباحي، يمكنك الاعتماد على التوليفات الأخف.',
      },
    ],
  },
  {
    id: 2,
    title: 'كيفية اختيار العطر المثالي لشخصيتك وكيمياء جسدك: دليل شامل',
    excerpt:
      'إيجاد عطرك المميز يتجاوز مجرد الرائحة الطيبة؛ بل يرتبط بتناغم النوتات مع كيمياء بشرتك ونمط حياتك. هذا الدليل يشرح الهرم العطري وكيف تختار العطر المناسب بدقة.',
    image: article1Img,
    categoryName: 'عطور الجنسين (لك ولها)',
    categoryLink: '/perfumes?category=unisex',
    fullSections: [
      {
        h3: 'فهم الهرم العطري (Olfactory Pyramid):',
        p: 'يتكون العطر المتكامل من ثلاث طبقات: النوتات العليا (أول ما تشمه وتتبخر خلال 15 دقيقة)، نوتات القلب (جوهر العطر وتظهر بعد 20 دقيقة)، وقاعدة العطر (العود، العنبر، والمسك التي تستقر على البشرة وتدوم لساعات طوال).',
      },
      {
        h3: 'عامل كيمياء البشرة ونوعها:',
        p: 'البشرة الدهنية تحتفظ بجزيئات العطر لفترة أطول بفضل الزيوت الطبيعية، بينما تحتاج البشرة الجافة إلى ترطيب مسبق بكريم غير معطر لتثبيت الرائحة وزيادة فوحانها.',
      },
      {
        h3: 'تحديد البصمة العطرية المناسبة:',
        p: 'إذا كنت تفضل الطابع الحيوي والهادئ، اختر العطور الزهرية والحمضية. أما إذا كنت تبحث عن الهيبة والأناقة الرسمية، فالعطور الخشبية والشرقية هي رفيقك الأمثل.',
      },
    ],
  },
  {
    id: 3,
    title: 'أسرار العطور الشرقية وسحر العود والمسك الملكي',
    excerpt:
      'تحتل العطور الشرقية مكانة استثنائية في الوجدان العربي. اكتشف تاريخ العود المعتق، دهن العود، والمسك، وكيف تترك انطباعاً ملوكياً يدوم طويلاً.',
    image: article3Img,
    categoryName: 'عطور العود والنيش',
    categoryLink: '/product/1',
    fullSections: [
      {
        h3: 'أصالة العود في التراث العطري:',
        p: 'يُستخلص العود من خشب شجر العود المعتق والنادر، ويتميز بعبق دخاني دافئ يرمز للكرم والضيافة العربية. في رشة عطر، نمزج العود النادر مع خشب الصندل والتوابل لابتكار توليفات شرقية عصرية تأسر الحواس.',
      },
      {
        h3: 'سحر المسك والعنبر:',
        p: 'يعمل المسك والعنبر كعناصر تثبيت طبيعية رائعة تمنح العطر عمقاً ونقاءً استثنائياً، حيث تتفاعل بحرارة الجسد لتبث دفئاً وجاذبية ساحرة لا تُنسى.',
      },
    ],
  },
  {
    id: 4,
    title: 'أفضل العطور للصيف والشتاء: كيف تختار العطر المناسب لكل موسم؟',
    excerpt:
      'مع تغير فصول العام تتغير سرعة تطاير جزيئات العطر وتفاعلها مع الحرارة. تعرف على كيفية اختيار العطور المنعشة للصيف والعطور الدافئة للشتاء للحصول على أفضل ثبات.',
    image: article4Img,
    categoryName: 'تشكيلة العطور الرجالية والنسائية',
    categoryLink: '/perfumes',
    fullSections: [
      {
        h3: 'عطور الصيف: الانتعاش والخفة:',
        p: 'تسرع حرارة الصيف من تبخر العطر؛ لذا يُفضل الاعتماد على النغمات البحرية، الحمضيات (كالليمون والبرغموت)، والزهور البيضاء التي تبث انتعاشاً دون أن تكون خانقة.',
      },
      {
        h3: 'عطور الشتاء: الدفء والعمق:',
        p: 'في الأجواء الباردة تتباطأ حركة الجزيئات؛ لذلك تحتاج إلى عطور ثقيلة وغنية بنوتات الفانيليا، التبغ، الجلود، والعود التي تحتفظ بثباتها وفوحانها الدافئ وسط برودة الجو.',
      },
    ],
  },
];

const VISIBLE = 2; // how many cards visible at once

export default function LatestArticles() {
  const [articlesList, setArticlesList] = useState(ARTICLES);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);

  React.useEffect(() => {
    articlesApi.getLatest(4)
      .then((data) => {
        if (data && data.length) {
          setArticlesList(data.map((item, idx) => {
            const fallback = ARTICLES[idx % ARTICLES.length];
            return {
              id: item.id || idx + 1,
              title: item.title || item.title_ar || fallback.title,
              excerpt: item.excerpt || item.excerpt_ar || item.content || fallback.excerpt,
              image: item.image || item.cover || fallback.image,
              categoryName: item.categoryName || fallback.categoryName,
              categoryLink: item.categoryLink || fallback.categoryLink,
              fullSections: item.fullSections || fallback.fullSections,
            };
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Keyboard escape handler for modal
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
      }
    };
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  const canGoNext = startIndex + VISIBLE < articlesList.length;
  const canGoPrev = startIndex > 0;

  const goNext = () => {
    if (canGoNext) setStartIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (canGoPrev) setStartIndex((prev) => prev - 1);
  };

  const visibleArticles = articlesList.slice(startIndex, startIndex + VISIBLE);

  return (
    <section className="la-section" id="articles" dir="rtl">
      <div className="la-container">
        {/* Section Header */}
        <div className="la-header">
          <div className="la-title-wrap">
            <h2 className="la-title">أحدث المقالات</h2>
            <div className="la-title-underline"></div>
          </div>
          <button
            className="la-view-all-btn"
            onClick={() => {
              const el = document.getElementById('articles');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            type="button"
          >
            <span>عرض الكل</span>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
              <path d="M11.8799 26.5599L20.5732 17.8666C21.5999 16.8399 21.5999 15.1599 20.5732 14.1333L11.8799 5.43994" stroke="currentColor" strokeWidth="2.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
            <svg className="la-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="la-cards-grid">
            {visibleArticles.map((article) => (
              <div key={article.id} className="la-card">
                <div className="la-card-img-wrap">
                  <img src={article.image} alt={article.title} className="la-card-img" loading="lazy" />
                </div>
                <div className="la-card-body">
                  <h3 className="la-card-title">{article.title}</h3>
                  <p className="la-card-excerpt">{article.excerpt}</p>
                  <button
                    className="la-read-more-btn"
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <span>اقرأ المزيد</span>
                    <img src="/icons/arrow-right-02.svg" alt="اقرأ المزيد" width="16" height="16" className="la-btn-arrow-icon" />
                  </button>
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
            <svg className="la-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="la-modal-backdrop"
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="la-modal-heading"
        >
          <div className="la-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="la-modal-close-btn"
              onClick={() => setSelectedArticle(null)}
              aria-label="إغلاق المقال"
              type="button"
            >
              ✕
            </button>

            <div className="la-modal-header">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="la-modal-banner"
              />
              <div className="la-modal-header-meta">
                <span className="la-modal-tag">دليل رشة عطر</span>
                <h2 id="la-modal-heading" className="la-modal-title">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="la-modal-content">
              <p className="la-modal-intro">{selectedArticle.excerpt}</p>

              {selectedArticle.fullSections && selectedArticle.fullSections.map((sec, sIdx) => (
                <div key={sIdx} className="la-modal-section">
                  <h3 className="la-modal-subheading">{sec.h3}</h3>
                  <p className="la-modal-para">{sec.p}</p>
                </div>
              ))}

              {selectedArticle.categoryLink && (
                <div className="la-modal-internal-link-card">
                  <div className="la-modal-link-info">
                    <span className="la-modal-link-label">منتجات وتصنيفات مرتبطة بهذا الدليل:</span>
                    <strong>{selectedArticle.categoryName}</strong>
                  </div>
                  <Link
                    to={selectedArticle.categoryLink}
                    className="la-modal-link-cta"
                    onClick={() => setSelectedArticle(null)}
                  >
                    تصفح التشكيلة الآن
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
