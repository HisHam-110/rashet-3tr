import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './PrivacyPolicyPage.css';

import shadowBg from '../../assets/images/about-shadow-bg.jpg';
import perfumeSmokeBg from '../../assets/images/dartistana_create_a_professional_product_shoot_of_3_perfume_bot_3e6bf181-e7e3-410a-96fa-977eb5e88c24 1.svg';

// Icons from public/icons
const iconSecurity = '/icons/Icon.svg';
const iconUse1 = '/icons/Icon (1).svg';
const iconUse2 = '/icons/Icon-1.svg';
const iconUse3 = '/icons/Icon-2.svg';

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('01');

  return (
    <div className="privacy-page" dir="rtl">
      {/* Top Header & Breadcrumb */}
      <div className="prp-top-bar">
        <div className="prp-container">
          <div className="prp-breadcrumb">
            <span className="prp-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="prp-bc-sep">/</span>
            <span className="prp-bc-current">سياسة الخصوصية</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section (MATCHING USER SCREENSHOT) */}
      <section className="prp-hero-section">
        <div className="prp-container">
          <div className="prp-hero-card" style={{ backgroundImage: `url(${shadowBg})` }} >
            <div className="prp-hero-text">
              <div className="prp-title-row">
                <h1 className="prp-hero-title">سياسة الخصوصية</h1>
                <span className="prp-lock-badge">🔒</span>
              </div>
              <p className="prp-hero-subtitle">
                نحن في رشة عطر نلتزم بخصوصيتك. توضح هذه السياسة كيف نجمع بياناتك ونستخدمها ونحميها بأعلى معايير الأمان المتبعة في المملكة العربية السعودية.
              </p>
            </div>
            <div className="prp-hero-graphic">
              <div className="prp-blue-shield-circle">
                <svg width="42" height="50" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L2 5V12C2 18.5 6.3 24.5 12 27C17.7 24.5 22 18.5 22 12V5L12 1Z" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: مقدمة (MATCHING USER SCREENSHOT) */}
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
          <div className="prp-accordion-row">
            <div
              className={`prp-acc-btn ${activeTab === '01' ? 'active' : ''}`}
              onClick={() => setActiveTab('01')}
            >
              <span>01</span>
              <span className="prp-chevron">{activeTab === '01' ? '▲' : '▼'}</span>
            </div>
            <div
              className={`prp-acc-btn ${activeTab === '02' ? 'active' : ''}`}
              onClick={() => setActiveTab('02')}
            >
              <span>02</span>
              <span className="prp-chevron">{activeTab === '02' ? '▲' : '▼'}</span>
            </div>
          </div>
          {activeTab === '01' && (
            <div className="prp-tab-content">
              <p>نجمع البيانات الأساسية مثل الاسم، رقم الهاتف، عنوان التوصيل، والبريد الإلكتروني لإتمام الطلبات بفاعلية.</p>
            </div>
          )}
          {activeTab === '02' && (
            <div className="prp-tab-content">
              <p>بيانات التصفح وملفات الكوكيز وتفضيلات العطور لتحسين تجربة التصفح وتقديم اقتراحات مخصصة لاهتماماتك.</p>
            </div>
          )}
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
