import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './PrivacyPolicyPage.css';

import perfumeSmokeBg from '../../assets/images/dartistana_create_a_professional_product_shoot_of_3_perfume_bot_3e6bf181-e7e3-410a-96fa-977eb5e88c24 1.svg';

// Icons from public/icons
const iconSecurity = '/icons/Icon.svg';
const iconUse1 = '/icons/Icon (1).svg';
const iconUse2 = '/icons/Icon-1.svg';
const iconUse3 = '/icons/Icon-2.svg';

import { pagesApi } from '../../services/storeApi';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [pageData, setPageData] = useState(null);

  React.useEffect(() => {
    pagesApi.getPrivacyPolicy()
      .then((res) => { if (res) setPageData(res); })
      .catch(() => {});
  }, []);

  return (
    <div className="privacy-page" dir="rtl">

      {/* Hero Banner Section (EXACT MATCH TO USER SCREENSHOT) */}
      <section className="prp-hero-section">
        <div className="prp-container">
          <div className="prp-hero-card">
            <div className="prp-hero-text">
              {/* Breadcrumb inside the card at top right */}
              <div className="prp-hero-breadcrumb">
                <span className="prp-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
                <span className="prp-bc-sep">/</span>
                <span className="prp-bc-current">سياسة الخصوصية</span>
              </div>

              {/* Title & Lock Icon */}
              <div className="prp-title-row">
                <h1 className="prp-hero-title">
                  <img src="/icons/Icon.svg" alt="" className="prp-lock-icon" aria-hidden="true" />
                  <span>سياسة الخصوصية</span>
                </h1>
              </div>

              {/* Subtitle / Paragraph */}
              <p className="prp-hero-subtitle">
                نحن في رشة عطر نقدر ثقتكم بنا. نوضح هذه السياسة كيف نجمع بياناتك ونستخدمها ونحميها بأعلى معايير الأمان المتبعة في المملكة العربية السعودية.
              </p>
            </div>

            {/* Left Icon: Container privacy.svg */}
            <div className="prp-hero-graphic">
              <img
                src="/icons/container privacy.svg"
                alt="سياسة الخصوصية"
                className="prp-privacy-icon-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: مقدمة */}
      <section className="prp-intro-section">
        <div className="prp-container">
          <div className="prp-sec-card">
            <h2 className="prp-intro-title">مقدمة</h2>
            <p className="prp-intro-p">
              تطبق هذه السياسة على جميع الخدمات التي يقدمها متجرنا الإلكتروني، وتوضح أنواع المعلومات التي نجمعها، وكيفية معالجتها، والتدابير التي نتخذها لضمان أمنها. أحدث تحديث: 24 أكتوبر 2024. تم إعداد هذه السياسة لتتوافق مع نظام حماية البيانات الشخصية في المملكة العربية السعودية. عند استخدامك للموقع وتطبيق "رشة عطر"، فإنك توافق على ممارسات جمع البيانات الموضحة هنا.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: ما البيانات التي نجمعها؟ */}
      <section className="prp-data-col-section">
        <div className="prp-container">
          <div className="prp-sec-header">
            <span className="prp-sec-icon">📝</span>
            <h2 className="prp-sec-title">ما البيانات التي نجمعها؟</h2>
          </div>
          <div className="prp-accordion-row" onMouseLeave={() => setActiveTab(null)}>
            <div className="prp-acc-item">
              <button
                type="button"
                className={`prp-acc-btn ${activeTab === '01' ? 'active' : ''}`}
                onMouseEnter={() => setActiveTab('01')}
                onFocus={() => setActiveTab('01')}
                onClick={() => setActiveTab(activeTab === '01' ? null : '01')}
                aria-expanded={activeTab === '01'}
              >
                <span>01</span>
                <span className="prp-chevron">⌄</span>
              </button>
              {activeTab === '01' && (
                <div className="prp-tab-content">
                  <span className="prp-tab-number">01</span>
                  <h3>بيانات تقدمها أنت <span className="prp-tab-icon">♙</span></h3>
                  <ul>
                    <li>الاسم ورقم الجوال والبريد الإلكتروني</li>
                    <li>عناوين التوصيل السابقة والحالية</li>
                    <li>سجل الطلبات والمفضلات</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="prp-acc-item">
              <button
                type="button"
                className={`prp-acc-btn ${activeTab === '02' ? 'active' : ''}`}
                onMouseEnter={() => setActiveTab('02')}
                onFocus={() => setActiveTab('02')}
                onClick={() => setActiveTab(activeTab === '02' ? null : '02')}
                aria-expanded={activeTab === '02'}
              >
                <span>02</span>
                <span className="prp-chevron">⌄</span>
              </button>
              {activeTab === '02' && (
                <div className="prp-tab-content prp-tab-content-alt">
                  <span className="prp-tab-number">02</span>
                  <h3>بيانات يتم جمعها تلقائياً <span className="prp-tab-icon">⌁</span></h3>
                  <ul>
                    <li>ملفات تعريف الارتباط</li>
                    <li>منصة التصفح والصفحات المزورة</li>
                    <li>بيانات الموقع (إذا سمحت بذلك)</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: كيف نستخدم بياناتك؟ */}
      <section className="prp-use-section">
        <div className="prp-container">
          <h2 className="prp-sec-title">كيف نستخدم بياناتك؟</h2>
          <div className="prp-use-card">
            <div className="prp-use-item">
              <div className="prp-use-icon-wrap">
                <img src={iconUse1} alt="معالجة وتوصيل الطلبات" />
              </div>
              <div className="prp-use-info">
                <h3>معالجة وتوصيل الطلبات</h3>
                <p>لضمان وصول عطورك المفضلة إلى عنوانك بدقة وفي الوقت المحدد.</p>
              </div>
            </div>
            <div className="prp-use-item">
              <div className="prp-use-icon-wrap">
                <img src={iconUse2} alt="تحسين خدمة العملاء" />
              </div>
              <div className="prp-use-info">
                <h3>تحسين خدمة العملاء</h3>
                <p>الرد السريع على استفساراتك وحل أي مشكلات قد تواجهك بفاعلية.</p>
              </div>
            </div>
            <div className="prp-use-item">
              <div className="prp-use-icon-wrap">
                <img src={iconUse3} alt="التسويق المخصص" />
              </div>
              <div className="prp-use-info">
                <h3>التسويق المخصص</h3>
                <p>إرسال العروض الحصرية والإصدارات الجديدة التي تناسب ذوقك ليمكنك الإبقاء على اطلاع.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: مشاركة البيانات */}
      <section className="prp-share-section">
        <div className="prp-container">
          <div className="prp-share-header">
            <h2 className="prp-share-title">مشاركة البيانات</h2>
            <p className="prp-share-sub">
              نحن لا نبيع بياناتك أبداً. نشارك الحد الأدنى المطلوب فقط مع شركائنا الموثوقين لتقديم الخدمة:
            </p>
          </div>
          <div className="prp-share-cards">
            <div className="prp-share-card">
              <div className="prp-share-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L3 7.5V16.5L12 21L21 16.5V7.5L12 3Z" stroke="#905b30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L21 7.5M12 12L3 7.5M12 12V21" stroke="#905b30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>شركات الشحن</h3>
              <p>مثل سمسا وأرامكس لتوصيل الطلبات.</p>
            </div>
            <div className="prp-share-card">
              <div className="prp-share-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="#905b30" strokeWidth="1.8"/>
                  <line x1="2" y1="10" x2="22" y2="10" stroke="#905b30" strokeWidth="1.8"/>
                </svg>
              </div>
              <h3>مزودو الدفع</h3>
              <p>بوابات الدفع الآمنة لمعالجة المعاملات.</p>
            </div>
            <div className="prp-share-card">
              <div className="prp-share-icon-wrap">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="#905b30" strokeWidth="1.8"/>
                  <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="#905b30" strokeWidth="1.8"/>
                  <circle cx="7" cy="7" r="1" fill="#905b30"/>
                  <circle cx="7" cy="17" r="1" fill="#905b30"/>
                </svg>
              </div>
              <h3>مزودو التقنية</h3>
              <p>خوادم الاستضافة وخدمات التحليل.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: الأمان وحقوقك */}
      <section className="prp-security-section">
        <div className="prp-container">
          <div className="prp-sec-header">
            <img src={iconSecurity} alt="الأمان" className="prp-sec-svg-icon" />
            <h2 className="prp-sec-title">الأمان وحقوقك</h2>
          </div>
          <p className="prp-sec-p">
            تخضع جميع بياناتك للتشفير عالي المستوى وتخزن في خوادم آمنة. بصفتك مستخدماً، يحق لك دائماً:
          </p>
          <div className="prp-rights-list">
            <div className="prp-right-item">
              <span className="prp-check-icon">✓</span>
              <span>الوصول إلى بياناتك الشخصية وتحديثها في أي وقت من خلال حسابك.</span>
            </div>
            <div className="prp-right-item">
              <span className="prp-check-icon">✓</span>
              <span>طلب حذف حسابك وكافة البيانات المرتبطة به.</span>
            </div>
            <div className="prp-right-item">
              <span className="prp-check-icon">✓</span>
              <span>إلغاء الاشتراك من النشرات البريدية والرسائل التسويقية.</span>
            </div>
            <div className="prp-right-item">
              <span className="prp-check-icon">✓</span>
              <span>الحصول على نسخة من بياناتك المحفوظة لدينا.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: هل لديك استفسار حول الخصوصية؟ Banner */}
      <section
        className="prp-cta-banner"
        style={{ backgroundImage: `url(${perfumeSmokeBg})` }}
      >
        <div className="prp-cta-overlay"></div>
        <div className="prp-container prp-cta-content">
          <h2>هل لديك استفسار حول الخصوصية؟</h2>
          <p>نحن هنا للإجابة على جميع تساؤلاتك المتعلقة بكيفية تعاملنا مع بياناتك.</p>
          <button className="prp-cta-btn" onClick={() => navigate('/#contact')}>
            تواصل معنا
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
