import React from 'react';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <main className="not-found-page" dir="rtl">
      <div className="not-found-glow" />
      <section className="not-found-card">
        <div className="not-found-bottle" aria-hidden="true">
          <span className="not-found-cap" />
          <span className="not-found-neck" />
          <span className="not-found-glass">404</span>
        </div>
        <div className="not-found-copy">
          <p>رشة عطر</p>
          <h1>الصفحة غير موجودة</h1>
          <span className="not-found-line" />
          <p className="not-found-description">يبدو أن الرابط غير صحيح أو أن الصفحة التي تبحث عنها لم تعد متاحة.</p>
          <a href="/">العودة للرئيسية</a>
        </div>
      </section>
    </main>
  );
}
