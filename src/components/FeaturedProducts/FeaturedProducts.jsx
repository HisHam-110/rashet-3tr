import React, { useState, useEffect } from 'react';
import './FeaturedProducts.css';

// Import actual local image assets
import img16 from '../../assets/images/image 16.svg';
import img18 from '../../assets/images/image 18.svg';
import img20 from '../../assets/images/image 20.svg';
import img21 from '../../assets/images/image 21.svg';
import img68 from '../../assets/images/image 68.svg';
import img69 from '../../assets/images/image 69.svg';
import img72 from '../../assets/images/image 72.svg';

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'عطر عود | Oud Attar',
    brand: 'رشة عطر | Rashet Eter',
    category: 'عطور رجالية، نسائية',
    price: '450',
    originalPrice: '600',
    rating: 5.0,
    tagline: 'استمتع بالعطور الفاخرة',
    image: img69,
  },
  {
    id: 2,
    name: 'عطر لوريس | Loris',
    brand: 'لوريس بارفيوم | Loris',
    category: 'عطور رجالية، نسائية',
    price: '450',
    originalPrice: '580',
    rating: 4.9,
    tagline: 'فخامة لا تُنسى',
    image: img21,
  },
  {
    id: 3,
    name: 'عطر ليبر | Libre',
    brand: 'إيف سان لوران | YSL',
    category: 'عطور نسائية فاخرة',
    price: '480',
    originalPrice: '620',
    rating: 5.0,
    tagline: 'أنثوي ساحر',
    image: img20,
  },
  {
    id: 4,
    name: 'عطر بكارات روج | Baccarat',
    brand: 'ميسون فرانسيس كيركديجان',
    category: 'عطور النيش الحصرية',
    price: '550',
    originalPrice: '700',
    rating: 5.0,
    tagline: 'توليفة شعرية نادرة',
    image: img18,
  },
  {
    id: 5,
    name: 'عطر مونت | Mount',
    brand: 'مونت بارفيوم | Mount',
    category: 'عطور رجالية راقية',
    price: '420',
    originalPrice: '550',
    rating: 4.8,
    tagline: 'عبير الانتعاش القوي',
    image: img16,
  },
  {
    id: 6,
    name: 'مجموعة الصيف | Summer Collection',
    brand: 'رشة عطر الخاصة',
    category: 'عطور الصيف المنعشة',
    price: '490',
    originalPrice: '650',
    rating: 4.9,
    tagline: 'تجدد إحساسك',
    image: img68,
  },
  {
    id: 7,
    name: 'المجموعة الكاملة | Royal Set',
    brand: 'رشة عطر الملكية',
    category: 'مجموعات فاخرة',
    price: '890',
    originalPrice: '1200',
    rating: 5.0,
    tagline: 'تروي حكاية فخامتك',
    image: img72,
  },
];

export default function FeaturedProducts({
  products = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  onOpenProductDetails,
}) {
  const displayProducts = products || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const total = displayProducts.length;

  // Continuous active autoplay loop (moves every 2.5 seconds endlessly)
  useEffect(() => {
    if (total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2500);

    return () => clearInterval(timer);
  }, [total, activeIndex]);

  // Relative circular distance calculation
  const getRelativeIndex = (index) => {
    let diff = index - activeIndex;
    while (diff < -Math.floor(total / 2)) diff += total;
    while (diff > Math.floor((total - 1) / 2)) diff -= total;
    return diff;
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="featured-carousel-section" id="featured" dir="rtl">
      <div className="featured-section-container">
        {/* Section Header */}
        <div className="featured-header-row">
          <div className="featured-header-arrows">
            <button 
              type="button" 
              className="featured-header-arrow arrow-prev" 
              onClick={handlePrev}
              aria-label="المنتج السابق"
            >
              ‹
            </button>
            <button 
              type="button" 
              className="featured-header-arrow arrow-next" 
              onClick={handleNext}
              aria-label="المنتج التالي"
            >
              ›
            </button>
          </div>
          <div className="featured-header-title-wrap">
            <h2 className="featured-title">الأكثر مبيعاً</h2>
            <div className="featured-title-underline"></div>
          </div>
        </div>

        {/* Viewport for Centered Carousel */}
        <div className="centered-carousel-viewport">
          {displayProducts.length === 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', width: '100%' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="pp-skeleton-card">
                  <div className="pp-skeleton-img" />
                  <div className="pp-skeleton-text-short" />
                  <div className="pp-skeleton-text" />
                  <div className="pp-skeleton-price" />
                </div>
              ))}
            </div>
          ) : (
            <div className="centered-carousel-track">
            {displayProducts.map((product, idx) => {
              const relIndex = getRelativeIndex(idx);
              const isActive = relIndex === 0;
              const isPrev = relIndex === -1; // Right side in RTL
              const isNext = relIndex === 1;  // Left side in RTL

              let positionClass = 'offscreen-hidden';
              if (isActive) positionClass = 'card-active';
              else if (isPrev) positionClass = 'card-prev';
              else if (isNext) positionClass = 'card-next';

              const cardImg = product.image;
              return (
                <article
                  key={product.id || idx}
                  className={`carousel-product-card ${positionClass}`}
                  onClick={(e) => {
                    if (e.target.closest('button')) return;
                    onOpenProductDetails?.(product);
                  }}
                  role="link"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onOpenProductDetails?.(product);
                    }
                  }}
                >
                  {/* Card Background Media & Overlay */}
                  <div className="card-media-wrap">
                    {cardImg && (
                      <img 
                        src={cardImg} 
                        alt={product.name} 
                        className="card-media-img"
                        draggable="false"
                      />
                    )}
                    <div className="card-media-overlay" />
                    
                  </div>

                  {/* Card Content at Bottom */}
                  <div className="card-bottom-info">
                    <span className="card-category-badge">
                      {product.category || product.brand || 'عطور رجالية، نسائية'}
                    </span>
                    <h3 className="card-product-name">{product.name}</h3>

                    {/* Price Row */}
                    <div className="card-pricing-row">
                      <div className="price-block">
                        <span className="current-price">
                          {product.price} <small>ر.س</small>
                        </span>
                        {(product.originalPrice || product.oldPrice) && (
                          <span className="old-price">
                            {product.originalPrice || product.oldPrice} ر.س
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add To Cart Pill Button */}
                    <button
                      type="button"
                      className="pill-add-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (onAddToCart) onAddToCart(product);
                      }}
                      aria-label={`أضف ${product.name} إلى السلة`}
                    >
                      <span className="cart-btn-text">أضف إلى السلة</span>
                      <span className="cart-btn-icon-circle">
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <circle cx="9" cy="21" r="1"/>
                          <circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          )}

          {/* Dots */}
          <div className="carousel-dots-wrapper">
            {displayProducts.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`المنتج ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
