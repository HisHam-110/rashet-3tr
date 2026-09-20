import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import SEOHead from '../SEO/SEOHead';
import { getBreadcrumbSchema } from '../../utils/seoConfig';
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
      <SEOHead
        title="سياسة الخصوصية وحماية البيانات | متجر رشة عطر"
        description="تعرف على سياسة الخصوصية وحماية البيانات في متجر رشة عطر. نلتزم بأعلى معايير الأمان والسرية لحماية خصوصية بيانات عملائنا."
        canonical="/privacy-policy"
        schema={getBreadcrumbSchema([
          { name: 'الرئيسية', url: '/' },
          { name: 'سياسة الخصوصية', url: '/privacy-policy' },
        ])}
      />

      {/* Hero Banner Section (EXACT MATCH TO USER SCREENSHOT) */}
      <section className="prp-hero-section">
        <div className="prp-container">
          <div className="prp-hero-card">
            <div className="prp-hero-text">
              {/* Breadcrumb inside the card at top right */}
              <nav className="prp-hero-breadcrumb" aria-label="مسار التنقل">
                <Link to="/" className="prp-bc-link">الرئيسية</Link>
                <span className="prp-bc-sep">/</span>
                <span className="prp-bc-current">سياسة الخصوصية</span>
              </nav>

              {/* Title */}
              <div className="prp-title-row">
                <h1 className="prp-hero-title">
                  <svg
                    width="28"
                    height="32"
                    viewBox="0 0 24 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="prp-lock-icon"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 31.5C2.175 31.5 1.46875 31.2062 0.88125 30.6187C0.29375 30.0312 0 29.325 0 28.5V13.5C0 12.675 0.29375 11.9688 0.88125 11.3813C1.46875 10.7938 2.175 10.5 3 10.5H4.5V7.5C4.5 5.425 5.23125 3.65625 6.69375 2.19375C8.15625 0.73125 9.925 0 12 0C14.075 0 15.8438 0.73125 17.3062 2.19375C18.7687 3.65625 19.5 5.425 19.5 7.5V10.5H21C21.825 10.5 22.5312 10.7938 23.1187 11.3813C23.7062 11.9688 24 12.675 24 13.5V28.5C24 29.325 23.7062 30.0312 23.1187 30.6187C22.5312 31.2062 21.825 31.5 21 31.5H3ZM12 24C12.825 24 13.5312 23.7062 14.1187 23.1187C14.7062 22.5312 15 21.825 15 21C15 20.175 14.7062 19.4688 14.1187 18.8813C13.5312 18.2938 12.825 18 12 18C11.175 18 10.4688 18.2938 9.88125 18.8813C9.29375 19.4688 9 20.175 9 21C9 21.825 9.29375 22.5312 9.88125 23.1187C10.4688 23.7062 11.175 24 12 24ZM7.5 10.5H16.5V7.5C16.5 6.25 16.0625 5.1875 15.1875 4.3125C14.3125 3.4375 13.25 3 12 3C10.75 3 9.6875 3.4375 8.8125 4.3125C7.9375 5.1875 7.5 6.25 7.5 7.5V10.5Z"
                      fill="#905B30"
                    />
                  </svg>
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
                src="/icons/Container privacy.svg"
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
                <img src="/icons/Icon dwon.svg" alt="" className="prp-chevron" aria-hidden="true" />
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
                <img src="/icons/Icon dwon.svg" alt="" className="prp-chevron" aria-hidden="true" />
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
