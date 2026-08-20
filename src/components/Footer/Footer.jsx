import React from 'react';
import './Footer.css';
import logo from '../../assets/images/1 1.svg';
export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">

      <div className="footer-container">

        {/* =========================
            BRAND
        ========================== */}
        <div className="footer-column footer-brand">

          <div className="footer-logo">
            <img
              src={logo}
              alt="رشة عطر"
            />
          </div>

          <p className="footer-brand-text">
            في رشة عطر، نقدم تجربة عطرية
            تجمع بين الفخامة والأناقة، لتجد
            العطر الذي يعبر عن شخصيتك.
          </p>

        </div>


        {/* =========================
            QUICK LINKS
        ========================== */}
        <div className="footer-column">

          <h3 className="footer-title">
            روابط سريعة
          </h3>

          <ul className="footer-links">

            <li>
              <a href="#hero">
                الرئيسية
              </a>
            </li>

            <li>
              <a href="#featured">
                أحدث المقالات
              </a>
            </li>

            <li>
              <a href="#categories">
                المجموعات
              </a>
            </li>

            <li>
              <a href="#featured">
                الأكثر مبيعاً
              </a>
            </li>

            <li>
              <a href="#about">
                عن رشة عطر
              </a>
            </li>

            <li>
              <a href="#contact">
                تواصل معنا
              </a>
            </li>

          </ul>

        </div>


        {/* =========================
            IMPORTANT LINKS
        ========================== */}
        <div className="footer-column">

          <h3 className="footer-title">
            روابط تهمك
          </h3>

          <ul className="footer-links">

            <li>
              <a href="#faq">
                الأسئلة الشائعة
              </a>
            </li>

            <li>
              <a href="#returns">
                سياسة الاستبدال والاسترجاع
              </a>
            </li>

            <li>
              <a href="#privacy">
                سياسة الخصوصية
              </a>
            </li>

          </ul>

        </div>


        {/* =========================
            CONTACT
        ========================== */}
        <div className="footer-column footer-contact">

          <h3 className="footer-title">
            تواصل معنا
          </h3>

          <div className="contact-row">

            <span className="contact-icon">
              📍
            </span>

            <span>
              الرياض - المملكة العربية السعودية
            </span>

          </div>


          <div className="contact-row">

            <span className="contact-icon">
              📞
            </span>

            <span dir="ltr">
              +966506540920
            </span>

          </div>


          <div className="contact-row">

            <span className="contact-icon">
              ✉
            </span>

            <span>
              RasHatEtr@gmail.com
            </span>

          </div>


          {/* =========================
              PAYMENT METHODS
          ========================== */}
          <div className="payment-box">

            <span className="payment-title">
              نحن نقبل
            </span>

            <div className="payment-methods">

              <span className="payment-item">
                مدى
              </span>

              <span className="payment-item apple-pay">
                Pay
              </span>

              <span className="payment-item mastercard">
                Mastercard
              </span>

              <span className="payment-item visa">
                VISA
              </span>

              <span className="payment-item">
                mada
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================== */}

      <div className="footer-bottom">

        <p>
          صنع بإتقان على يد{' '}
          <a href="#">
            Growfet
          </a>{' '}
          | 2026
        </p>

      </div>

    </footer>
  );
}