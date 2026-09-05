import React, { useState } from 'react';
import '../Testimonials/Testimonials.css';

import { formsApi } from '../../services/storeApi';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await formsApi.subscribeNewsletter(email);
      } catch (err) {
        // Fallback display if offline
      }
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section" dir="rtl">
      <div className="container">
        <div className="newsletter-card">

          <div className="newsletter-content">
            <h2 className="newsletter-title">
              كن أول من يعرف
            </h2>

            <p className="newsletter-desc">
              اشترك في نشرتنا البريدية للحصول على عروض حصرية واكتشاف أحدث إضافاتنا من العطور الفاخرة.
            </p>

            {isSubscribed ? (
              <div className="subscribed-success">
                شكراً لانضمامك! تم الاشتراك بنجاح.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="newsletter-input-wrap">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="البريد الإلكتروني"
                    required
                  />
                  <img
                    src="/icons/Icon (2).svg"
                    alt="البريد الإلكتروني"
                    className="newsletter-input-icon"
                  />
                </div>
                <button type="submit" className="newsletter-btn">
                  اشترك الآن
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}