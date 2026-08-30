import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './ContactPage.css';

export default function ContactPage({ showToast }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    subject: 'general', // 'general' | 'returns' | 'privacy'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (showToast) {
      showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    }
  };

  return (
    <div className="contact-page-wrapper" dir="rtl">
      {/* Top Header & Breadcrumb */}
      <div className="cn-top-bar">
        <div className="cn-container">
          <div className="cn-breadcrumb">
            <span className="cn-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="cn-bc-sep">/</span>
            <span className="cn-bc-current">تواصل معنا</span>
          </div>
        </div>
      </div>

      {/* Hero Title Section */}
      <div className="cn-hero-section">
        <h1 className="cn-page-title">تواصل معنا !</h1>
        <p className="cn-page-subtitle">
          هل لديك أي أسئلة أو ملاحظات؟ ما عليك سوى مراسلتنا!
        </p>
      </div>

      {/* Main Contact Box */}
      <div className="cn-container cn-main-content">
        <div className="cn-card-box">

          {/* Right Column: Contact Info Card (Dark Brown) */}
          <div className="cn-info-side">
            <div className="cn-info-header">
              <h2 className="cn-info-title">معلومات الاتصال</h2>
              <p className="cn-info-subtitle">قل شيئاً لبدء محادثة مباشرة!</p>
            </div>

            <div className="cn-info-list">
              <div className="cn-info-item">
                <div className="cn-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="cn-info-text ltr-text">+966506540920</span>
              </div>

              <div className="cn-info-item">
                <div className="cn-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span className="cn-info-text">RashatEtr@gmail.com</span>
              </div>

              <div className="cn-info-item">
                <div className="cn-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="cn-info-text">الرياض - المملكة العربية السعودية</span>
              </div>
            </div>

            {/* Decorative circles in background */}
            <div className="cn-decorative-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>

            {/* Social Media Links */}
            <div className="cn-social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cn-social-btn" title="إنستغرام">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://wa.me/966506540920" target="_blank" rel="noopener noreferrer" className="cn-social-btn" title="واتساب">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Left Column: Form Section */}
          <div className="cn-form-side">
            {submitted ? (
              <div className="cn-success-box">
                <div className="cn-success-icon">✓</div>
                <h3>شكراً لتواصلك معنا!</h3>
                <p>تم استلام رسالتك بنجاح وسيقوم فريقنا بالرد عليك في أقرب وقت.</p>
                <button
                  type="button"
                  className="cn-reset-form-btn"
                  onClick={() => setSubmitted(false)}
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cn-form">
                
                {/* Row 1: Email & Phone (Email Right, Phone Left in RTL) */}
                <div className="cn-form-row">
                  <div className="cn-field">
                    <label htmlFor="cn-email">البريد الإلكتروني</label>
                    <div className="cn-input-with-icon">
                      <input
                        id="cn-email"
                        name="email"
                        type="email"
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <svg className="cn-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                  </div>

                  <div className="cn-field">
                    <label htmlFor="cn-phone">رقم الجوال</label>
                    <div className="cn-phone-input-group">
                      <span className="cn-country-code">+966</span>
                      <input
                        id="cn-phone"
                        name="phone"
                        type="tel"
                        placeholder="5X XXX XXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: First Name & Last Name (First Name Right, Last Name Left in RTL) */}
                <div className="cn-form-row">
                  <div className="cn-field">
                    <label htmlFor="cn-firstName">الاسم الأول</label>
                    <input
                      id="cn-firstName"
                      name="firstName"
                      type="text"
                      placeholder="الاسم الكامل"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="cn-field">
                    <label htmlFor="cn-lastName">اسم العائلة</label>
                    <input
                      id="cn-lastName"
                      name="lastName"
                      type="text"
                      placeholder=""
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Row 3: Message Textarea */}
                <div className="cn-field cn-full-width">
                  <label htmlFor="cn-message">رسالة</label>
                  <textarea
                    id="cn-message"
                    name="message"
                    rows="4"
                    placeholder="اكتب رسالتك..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* Row 4: Subject Checkbox Selection */}
                <div className="cn-subject-section">
                  <label className="cn-subject-main-label">اختر الموضوع؟</label>
                  <div className="cn-subject-options-row">
                    <label className="cn-radio-label">
                      <input
                        type="radio"
                        name="subject"
                        value="general"
                        checked={formData.subject === 'general'}
                        onChange={handleChange}
                      />
                      <span>استفسار عام</span>
                    </label>

                    <label className="cn-radio-label">
                      <input
                        type="radio"
                        name="subject"
                        value="returns"
                        checked={formData.subject === 'returns'}
                        onChange={handleChange}
                      />
                      <span>استفسار حول الاستبدال والاسترجاع</span>
                    </label>

                    <label className="cn-radio-label">
                      <input
                        type="radio"
                        name="subject"
                        value="privacy"
                        checked={formData.subject === 'privacy'}
                        onChange={handleChange}
                      />
                      <span>استفسار حول الخصوصية</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="cn-submit-wrap">
                  <button type="submit" className="cn-submit-btn">
                    إرسال رسالة
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
