import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Newsletter from '../Newsletter/Newsletter';
import './AboutPage.css';

import heroBg from '../../assets/images/Frame 1984077808.svg';
import rect88 from '../../assets/images/Rectangle 88.svg';
import subtractImg from '../../assets/images/Subtract.svg';
import rect90 from '../../assets/images/Rectangle 90.svg';
import bottleImg from '../../assets/images/image 65.png';
const womenIcon = '/icons/user-02.svg';
const menIcon = '/icons/user-circle-02.svg';
const luxuryIcon = '/icons/crown-03.svg';
const summerIcon = '/icons/sun-03.svg';
const awardIcon = '/icons/award-04.svg';
const layersIcon = '/icons/layers-01.svg';
const shippingIcon = '/icons/shipping-truck-02.svg';
const supportIcon = '/icons/customer-support.svg';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page" dir="rtl">
      {/* 1. TOP HERO BANNER */}
      <section className="ab-hero-section" onClick={() => navigate('/perfumes')}>
        <img
          src={heroBg}
          alt="رشة عطر... تفاصيل صغيرة تصنع حضوراً لا يُنسى"
          className="ab-hero-full-img"
        />
      </section>

      {/* 2. OUR STORY SECTION */}
      <section className="ab-story-section">
        <div className="ab-container">
          <div className="ab-story-grid">
            {/* Right side in RTL: Story Content */}
            <div className="ab-story-content">
              <div className="ab-story-badge">
                <span className="ab-badge-line"></span>
                <span>قصتنا</span>
                <span className="ab-badge-line"></span>
              </div>

              <h2 className="ab-story-title">
                رحلة شغف بدأت<br />
                من حب العطور
              </h2>

              <p className="ab-story-paragraph">
                بدأت رشة عطر من شغفنا الحقيقي بعالم العطور، ومن رغبتنا في تقديم تجربة مختلفة تجمع بين الجودة والأصالة، والاختيار الواسع الذي يلبي جميع الأذواق، نختار كل عطر بعناية لنقدم لك ما يستحق أن يكون جزءاً من ذاكرتك اليومية.
              </p>
            </div>

            {/* Left side in RTL: Images Collage (separate images) */}
            <div className="ab-story-images">
              <div className="ab-story-collage-wrap">
                <img src={rect88} alt="رشة عطر" className="ab-img-rect88" />
                <div className="ab-collage-bottom">
                  <img src={subtractImg} alt="تشكيلة رشة عطر" className="ab-img-subtract" />
                  <img src={rect90} alt="عطور رشة عطر" className="ab-img-rect90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY / CTA BANNER */}
      <section className="ab-bottom-banner-section">
        <div className="ab-container">
          <div className="ab-personal-scent-banner">
            <div className="ab-personal-scent-copy">
              <h2>لكل شخص عطر يشبهه.</h2>
              <p>اكتشف المجموعة التي تناسبك</p>

              <div className="ab-personal-scent-categories">
                <button type="button" onClick={() => navigate('/perfumes?cat=women')}>
                  <span><img src={womenIcon} alt="" /></span>
                  النسائية
                </button>
                <button type="button" onClick={() => navigate('/perfumes?cat=men')}>
                  <span><img src={menIcon} alt="" /></span>
                  الرجالية
                </button>
                <button type="button" onClick={() => navigate('/collections')}>
                  <span><img src={luxuryIcon} alt="" /></span>
                  الفاخرة
                </button>
                <button type="button" onClick={() => navigate('/perfumes?cat=summer')}>
                  <span><img src={summerIcon} alt="" /></span>
                  الصيفية
                </button>
              </div>

              <button type="button" className="ab-personal-scent-cta" onClick={() => navigate('/collections')} dir="rtl">
                <span>تسوق الآن</span>
                <span className="ab-cta-arrow">←</span>
              </button>
            </div>
            <div className="ab-personal-scent-bottle">
              <img src={bottleImg} alt="عطر رشة عطر" />
            </div>
          </div>
        </div>
      </section>

      <section className="ab-why-section" aria-labelledby="why-rashet-title">
        <div className="ab-why-container">
          <div className="ab-why-heading">
            <span></span>
            <h2 id="why-rashet-title">لماذا رشة عطر</h2>
            <span></span>
          </div>
          <div className="ab-why-grid">
            <article className="ab-why-card">
              <div className="ab-why-icon"><img src={awardIcon} alt="" /></div>
              <h3>جودة نثق بها</h3>
              <p>منتجات أصلية 100%<br />مختارة بعناية.</p>
            </article>
            <article className="ab-why-card">
              <div className="ab-why-icon"><img src={layersIcon} alt="" /></div>
              <h3>اختيارات متنوعة</h3>
              <p>مئات العطور العالمية<br />تحت سقف واحد.</p>
            </article>
            <article className="ab-why-card">
              <div className="ab-why-icon ab-why-icon--reverse"><img src={shippingIcon} alt="" /></div>
              <h3>شحن موثوق</h3>
              <p>توصيل سريع وآمن<br />إلى جميع مناطق المملكة.</p>
            </article>
            <article className="ab-why-card">
              <div className="ab-why-icon"><img src={supportIcon} alt="" /></div>
              <h3>خدمة تهتم بتجربتك</h3>
              <p>فريق دعم دائم للإجابة<br />ومساعدتك دائمًا.</p>
            </article>
          </div>
        </div>
      </section>

      <Newsletter />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
