import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/images/1 1.svg';

export default function Footer() {
  return (
    <footer className="site-footer" id="contact" dir="rtl">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-column footer-brand">
          <div className="footer-logo">
            <img src={logo} alt="رشة عطر" />
          </div>
          <p className="footer-brand-text">
            في رشة عطر، نقدم تجربة عطرية تجمع بين الفخامة والأناقة، لتجد العطر الذي يعبر عن شخصيتك.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h3 className="footer-title">روابط سريعة</h3>
          <ul className="footer-links">
            <li><Link to="/">الرئيسية</Link></li>
            <li><Link to="/#articles">أحدث المقالات</Link></li>
            <li><Link to="/collections">المجموعات</Link></li>
            <li><Link to="/#featured">الأكثر مبيعاً</Link></li>
            <li><Link to="/about">عن رشة عطر</Link></li>
            <li><Link to="/contact">تواصل معنا</Link></li>
          </ul>
        </div>

        {/* IMPORTANT LINKS */}
        <div className="footer-column">
          <h3 className="footer-title">روابط تهمك</h3>
          <ul className="footer-links">
            <li><Link to="/returns-policy">سياسة الاستبدال والاسترجاع</Link></li>
            <li><Link to="/privacy-policy">سياسة الخصوصية</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">
          <h3 className="footer-title">تواصل معنا</h3>
          <div className="contact-row">
            <span className="contact-icon">
              <img src="/icons/Vector.svg" alt="Location" />
            </span>
            <span>الرياض - المملكة العربية السعودية</span>
          </div>
          <div className="contact-row">
            <span className="contact-icon">
              <img src="/icons/svg.svg" alt="Phone" />
            </span>
            <span dir="ltr">+966506540920</span>
          </div>
          <div className="contact-row">
            <span className="contact-icon">
              <img src="/icons/email.svg" alt="Email" />
            </span>
            <span>RashatEtr@gmail.com</span>
          </div>

          {/* PAYMENT METHODS */}
          <div className="payment-box">
            <span className="payment-title">نحن نقبل</span>
            <div className="payment-methods">
              <span className="payment-item"><img src="/icons/image 62.svg" alt="" /></span>
              <span className="payment-item apple-pay"><img src="/icons/image 10.svg" alt="" /></span>
              <span className="payment-item mastercard"><img src="/icons/image 59.svg" alt="" /></span>
              <span className="payment-item visa"><img src="/icons/image 60.svg" alt="" /></span>
              <span className="payment-item"><img src="/icons/image 61.svg" alt="" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>
          صنع بإتقان على يد <a href="#">Growfet</a> | 2026
        </p>
      </div>
    </footer>
  );
}
