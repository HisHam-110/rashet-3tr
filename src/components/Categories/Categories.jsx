import React from 'react';
import { categoriesData } from '../../data/perfumesData';
import './Categories.css';

export default function Categories({ activeCategory, onSelectCategory }) {
  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">المجموعات المختارة</span>
          <h2 className="section-title">استكشف عالم رشة عطر</h2>
          <p className="section-subtitle">
            تصنيفات مختارة بعناية لتناسب مختلف الأذواق والمناسبات
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="categories-grid">
          {categoriesData.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`category-card ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                {cat.image ? (
                  <div className="category-img-wrap">
                    <img src={cat.image} alt={cat.name} className="category-bg-img" />
                    <div className="category-overlay"></div>
                  </div>
                ) : (
                  <div className="category-placeholder-bg"></div>
                )}

                <div className="category-content">
                  <span className="category-icon">{cat.icon}</span>
                  <h3 className="category-name">{cat.name}</h3>
                  <span className="category-count">{cat.count} منتج</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
