import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './ReturnsPolicyPage.css';

import shadowBg from '../../assets/images/about-shadow-bg.jpg';
import perfumeSmokeBg from '../../assets/images/dartistana_create_a_professional_product_shoot_of_3_perfume_bot_3e6bf181-e7e3-410a-96fa-977eb5e88c24 1.svg';

import { pagesApi } from '../../services/storeApi';

export default function ReturnsPolicyPage() {
  const navigate = useNavigate();
  const [pageData, setPageData] = React.useState(null);

  React.useEffect(() => {
    pagesApi.getReturnPolicy()
      .then((res) => { if (res) setPageData(res); })
      .catch(() => {});
  }, []);

  return (
    <div className="returns-page" dir="rtl">
      {/* Top Header & Breadcrumb */}
      <div className="rep-top-bar">
        <div className="rep-container">
          <div className="rep-breadcrumb">
            <span className="rep-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="rep-bc-sep">/</span>
            <span className="rep-bc-current">سياسة الاسترجاع والاستبدال</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="rep-hero-section">
        <div className="rep-container">
          <div className="rep-hero-card" style={{ backgroundImage: `url(${shadowBg})` }}>
            <div className="rep-hero-content">
              {/* Decorative hexagon/geometric outline */}
              <div className="rep-deco-shape"></div>
              
              <h1 className="rep-hero-title">سياسة الاسترجاع والاستبدال</h1>
              <p className="rep-hero-subtitle">نحرص في رشة عطر على أن تكون تجربتك معنا واضحة ومريحة، نلتزم بتقديم أفضل خدمة لعملائنا الكرام.</p>

              {/* Overview Cards */}
              <div className="rep-overview-cards">
                <div className="rep-overview-card">
                  <div className="rep-card-icon">
                    {/* Calendar Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="18" height="18" rx="2" stroke="#905b30" strokeWidth="2"/>
                      <path d="M16 2V6" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 2V6" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 10H21" stroke="#905b30" strokeWidth="2"/>
                      <path d="M8 14H12" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 18H16" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="rep-card-title">مدة الاسترجاع</h3>
                  <p className="rep-card-desc">خلال 3 أيام من تاريخ الاستلام</p>
                </div>

                <div className="rep-overview-card">
                  <div className="rep-card-icon">
                    {/* Exchange / Swap Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 4L21 8M21 8L17 12M21 8H3" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 20L3 16M3 16L7 12M3 16H21" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="rep-card-title">مدة الاستبدال</h3>
                  <p className="rep-card-desc">خلال 7 أيام من تاريخ الاستلام</p>
                </div>

                <div className="rep-overview-card">
                  <div className="rep-card-icon">
                    {/* Refund / Card Icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="5" width="20" height="14" rx="2" stroke="#905b30" strokeWidth="2"/>
                      <path d="M2 10H22" stroke="#905b30" strokeWidth="2"/>
                      <circle cx="6" cy="15" r="1.5" fill="#905b30"/>
                      <circle cx="10" cy="15" r="1.5" fill="#905b30"/>
                    </svg>
                  </div>
                  <h3 className="rep-card-title">طريقة الاسترداد</h3>
                  <p className="rep-card-desc">بنفس وسيلة الدفع الأصلية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "قبل طلب الاسترجاع" Section */}
      <section className="rep-steps-section">
        <div className="rep-container">
          <h2 className="rep-section-title text-center">قبل طلب الاسترجاع</h2>
          
          <div className="rep-steps-flow">
            <div className="rep-step-item">
              <div className="rep-step-number">01</div>
              <h3 className="rep-step-title">تأكد من حالة المنتج</h3>
              <p className="rep-step-desc">تأكد من أن المنتج مطابق لشروط الاسترجاع المذكورة أدناه.</p>
            </div>
            
            <div className="rep-step-connector"></div>

            <div className="rep-step-item">
              <div className="rep-step-number">02</div>
              <h3 className="rep-step-title">احتفظ ببيانات طلبك</h3>
              <p className="rep-step-desc">ستحتاج إلى رقم الطلب والبريد الإلكتروني لإتمام الطلب.</p>
            </div>

            <div className="rep-step-connector"></div>

            <div className="rep-step-item">
              <div className="rep-step-number">03</div>
              <h3 className="rep-step-title">تواصل مع خدمة العملاء</h3>
              <p className="rep-step-desc">ابدأ طلب الاسترجاع عبر قنوات التواصل المعتمدة.</p>
            </div>

            <div className="rep-step-connector"></div>

            <div className="rep-step-item">
              <div className="rep-step-number">04</div>
              <h3 className="rep-step-title">انتظر تأكيد الطلب</h3>
              <p className="rep-step-desc">سيتم مراجعة الطلب وإفادتك بالخطوات التالية فوراً</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions & Checklist Section */}
      <section className="rep-conditions-section">
        <div className="rep-container">
          <div className="rep-conditions-grid">
            {/* Checklist Column (Left) */}
            <div className="rep-checklist-column">
              <div className="rep-checklist-card">
                <div className="rep-checklist-header">
                  <span className="rep-checklist-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11L12 14L22 4" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <h3>قائمة التحقق قبل الإرجاع</h3>
                </div>
                <ul className="rep-checklist-list">
                  <li>
                    <span className="rep-check-mark">✓</span>
                    <span>الغلاف البلاستيكي سليم</span>
                  </li>
                  <li>
                    <span className="rep-check-mark">✓</span>
                    <span>فاتورة الشراء متوفرة</span>
                  </li>
                  <li>
                    <span className="rep-check-mark">✓</span>
                    <span>جميع الملحقات مرفقة</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Conditions Column (Right) */}
            <div className="rep-rules-column">
              <h2 className="rep-conditions-title">شروط الاسترجاع</h2>
              <div className="rep-rules-list">
                <div className="rep-rule-item">
                  <div className="rep-rule-badge">1</div>
                  <p>أن يكون المنتج بحالته الأصلية ولم يتم فتحه أو استخدامه.</p>
                </div>
                <div className="rep-rule-item">
                  <div className="rep-rule-badge">2</div>
                  <p>يجب إرجاع كافة الملحقات، والعينات المجانية التي تم استلامها مع الطلب.</p>
                </div>
                <div className="rep-rule-item">
                  <div className="rep-rule-badge">3</div>
                  <p>يتحمل العميل تكاليف الشحن للإرجاع إلا في حالة استلام منتج تالف أو خاطئ.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Damaged or Not Matching Section */}
      <section className="rep-damaged-section">
        <div className="rep-container">
          <div className="rep-damaged-box">
            <h2 className="rep-damaged-title">استلمت منتجًا تالفًا أو غير مطابق؟</h2>
            <p className="rep-damaged-desc">
              إذا وصلتك الشحنة بحالة غير سليمة أو كان المنتج مختلفًا عن طلبك، تواصل مع خدمة العملاء في أسرع وقت مع رقم الطلب والتفاصيل المطلوبة.
            </p>
            
            <div className="rep-damaged-flow">
              <div className="rep-damaged-step">
                <div className="rep-damaged-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>استلام الطلب</span>
              </div>

              <div className="rep-damaged-arrow">←</div>

              <div className="rep-damaged-step">
                <div className="rep-damaged-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>التواصل معنا</span>
              </div>

              <div className="rep-damaged-arrow">←</div>

              <div className="rep-damaged-step">
                <div className="rep-damaged-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="#905b30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 17H8" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 9H8" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span>إرسال البيانات</span>
              </div>

              <div className="rep-damaged-arrow">←</div>

              <div className="rep-damaged-step">
                <div className="rep-damaged-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="#905b30" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="#905b30" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span>مراجعة الحالة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Banner Section */}
      <section className="rep-cta-banner" style={{ backgroundImage: `url(${perfumeSmokeBg})` }}>
        <div className="rep-cta-overlay"></div>
        <div className="rep-container rep-cta-content">
          <h2>هل تحتاج إلى مساعدة إضافية؟</h2>
          <p>فريق خدمة عملاء رشة عطر جاهز لمساعدتك في أي استفسار يخص طلبك أو سياسات المتجر.</p>
          <button className="rep-cta-btn" onClick={() => navigate('/#contact')}>
            تواصل معنا
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
