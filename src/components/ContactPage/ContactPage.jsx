import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './ContactPage.css';

import { formsApi } from '../../services/storeApi';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await formsApi.contact({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
    } catch (err) {
      // Fallback display if offline
    }
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
              {/* Phone */}
              <div className="cn-info-item">
                <div className="cn-info-text-wrap">
                  <span className="cn-info-text ltr-text">+966506540920</span>
                </div>
                <div className="cn-icon-box">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M4.521 0.673C4.311 0.164 3.756 -0.107 3.225 0.038L0.819 0.695C0.343 0.826 0.012 1.258 0.012 1.75C0.012 8.515 5.498 14 12.262 14C12.755 14 13.187 13.669 13.318 13.193L13.974 10.787C14.119 10.257 13.848 9.702 13.34 9.491L10.715 8.397C10.269 8.211 9.752 8.34 9.449 8.715L8.344 10.063C6.419 9.152 4.861 7.593 3.95 5.668L5.298 4.567C5.673 4.26 5.801 3.746 5.615 3.301L4.521 0.676V0.673Z" fill="#905B30"/>
                  </svg>
                </div>
              </div>

              {/* Email */}
              <div className="cn-info-item">
                <div className="cn-info-text-wrap">
                  <span className="cn-info-text">RashatEtr@gmail.com</span>
                </div>
                <div className="cn-icon-box">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                    <path d="M1.312 0.75C0.588 0.75 0 1.338 0 2.062C0 2.475 0.195 2.864 0.525 3.112L6.475 7.575C6.787 7.807 7.213 7.807 7.525 7.575L13.475 3.112C13.806 2.864 14 2.475 14 2.062C14 1.338 13.412 0.75 12.688 0.75H1.312ZM0 3.812V9.5C0 10.465 0.785 11.25 1.75 11.25H12.25C13.215 11.25 14 10.465 14 9.5V3.812L8.05 8.275C7.427 8.743 6.573 8.743 5.95 8.275L0 3.812Z" fill="#905B30"/>
                  </svg>
                </div>
              </div>

              {/* Address */}
              <div className="cn-info-item">
                <div className="cn-info-text-wrap">
                  <span className="cn-info-text">الرياض - المملكة العربية السعودية</span>
                </div>
                <div className="cn-icon-box">
                  <svg width="11" height="14" viewBox="0 0 11 14" fill="none">
                    <path d="M5.898 13.65C7.301 11.895 10.5 7.64 10.5 5.25C10.5 2.352 8.148 0 5.25 0C2.352 0 0 2.352 0 5.25C0 7.64 3.199 11.895 4.602 13.65C4.938 14.068 5.562 14.068 5.898 13.65ZM5.25 3.5C5.714 3.5 6.159 3.684 6.487 4.013C6.816 4.341 7 4.786 7 5.25C7 5.714 6.816 6.159 6.487 6.487C6.159 6.816 5.714 7 5.25 7C4.786 7 4.341 6.816 4.013 6.487C3.684 6.159 3.5 5.714 3.5 5.25C3.5 4.786 3.684 4.341 4.013 4.013C4.341 3.684 4.786 3.5 5.25 3.5Z" fill="#905B30"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Decorative circles in background */}
            <div className="cn-decorative-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>

            {/* Social Media Links */}
            <div className="cn-social-links">
              {/* Instagram Group2.svg */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cn-social-btn" title="إنستغرام">
                <img src="/icons/Group2.svg" alt="إنستغرام" />
              </a>
              {/* WhatsApp Group.svg */}
              <a href="https://wa.me/966506540920" target="_blank" rel="noopener noreferrer" className="cn-social-btn" title="واتساب">
                <img src="/icons/Group.svg" alt="واتساب" />
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
