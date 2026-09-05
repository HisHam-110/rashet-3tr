import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Newsletter from '../Newsletter/Newsletter';
import './ProductDetailPage.css';

// Import images for notes & about banner
import noteImg1 from '../../assets/images/image 16.svg';
import noteImg2 from '../../assets/images/image 20.svg';
import noteImg3 from '../../assets/images/image 21.svg';
import aboutShadowBg from '../../assets/images/about-shadow-bg.jpg';
import aboutOudPhoto from '../../assets/images/image 64.svg';


const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: 'سعد السبيعي',
    badge: 'مشتري موثق',
    rating: 5,
    title: 'تجربة ممتازة',
    comment: 'العطر عالي الجودة والثبات والفوحان عالي على الملابس، التغليف ممتاز والتوصيل سريع جداً.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 2,
    name: 'نورة العتيبي',
    badge: 'مشتري موثق',
    rating: 5,
    title: 'ثابت وسريع الفوحان',
    comment: 'العطر رائع جداً وثابت على الملابس، رائحة الفانيليا والعود متناسقة بشكل فخم ومميز.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 3,
    name: 'عبد الله الشمري',
    badge: 'مشتري موثق',
    rating: 5,
    title: 'ثبات وثبات وثبات رائع',
    comment: 'عطر مميز وثابت وجودته عالية وسأكرر الشراء بالتأكيد في قادم الأيام.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
];

import { productsApi } from '../../services/storeApi';

export default function ProductDetailPage({ onAddToCart, onToggleWishlist, wishlistIds = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id, 10) || 101;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const isWishlisted = wishlistIds.includes(productId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const controller = new AbortController();
    productsApi.get(productId, controller.signal)
      .then((data) => {
        if (data) setProduct(data);
      })
      .catch(() => {});

    productsApi.list({}, controller.signal)
      .then((products) => setRelatedProducts(products.filter((item) => item.id !== productId).slice(0, 4)))
      .catch(() => setRelatedProducts([]));

    return () => controller.abort();
  }, [id, productId]);

  useEffect(() => {
    if (product) {
      const sizes = product.sizes || ['50 مل', '100 مل', '150 مل', '200 مل'];
      setSelectedSize(sizes[1] || sizes[0]);
    }
  }, [product]);

  if (!product) return null;

  const sizes = product.sizes || ['50 مل', '100 مل', '150 مل', '200 مل'];

  // Main gallery thumbs from API images array
  const thumbs = (product.images && product.images.length > 0)
    ? product.images
    : (product.image ? [product.image] : []);


  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart({ ...product, selectedSize, quantity }, quantity);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pdp-page" dir="rtl">
      {/* ===== BREADCRUMB & HEADER TITLE ===== */}
      <div className="pdp-top-header pdp-full-width">
        <div className="pdp-container">
          <div className="pdp-breadcrumb">
            <span className="pdp-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="pdp-bc-sep">/</span>
            <span className="pdp-bc-link" onClick={() => navigate('/perfumes')}>العطور الفاخرة</span>
          </div>
          <h1 className="pdp-page-title">العطور</h1>
        </div>
      </div>

      {/* ===== 1. MAIN PRODUCT SECTION ===== */}
      <section className="pdp-main-section pdp-full-width">
        <div className="pdp-container">
          <div className="pdp-main-grid">

            {/* RIGHT SIDE: GALLERY (RTL First in DOM) */}
            <div className="pdp-gallery-col">
              <div className="pdp-main-img-card">
                <button
                  className={`pdp-fav-badge ${isWishlisted ? 'liked' : ''}`}
                  onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                  aria-label="إضافة للمفضلة"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill={isWishlisted ? '#905b30' : 'none'} stroke={isWishlisted ? '#905b30' : '#80634e'} strokeWidth="1.8">
                    <path d="M20.84 4.61C19.84 3.61 18.49 3.05 17.09 3.05C15.69 3.05 14.34 3.61 13.34 4.61L12 5.95L10.66 4.61C8.58 2.53 5.21 2.53 3.13 4.61C1.05 6.69 1.05 10.06 3.13 12.14L12 21L20.87 12.14C22.95 10.06 22.95 6.69 20.84 4.61Z" />
                  </svg>
                </button>
                <img src={thumbs[activeThumb]} alt={product.name} className="pdp-main-img" />
              </div>
              <div className="pdp-thumbs-grid">
                {thumbs.map((img, i) => (
                  <button
                    key={i}
                    className={`pdp-thumb-card ${activeThumb === i ? 'active' : ''}`}
                    onClick={() => setActiveThumb(i)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* LEFT SIDE: PRODUCT DETAILS BOX */}
            <div className="pdp-details-col">
              <span className="pdp-brand-name">{product.brand || 'توم فورد'}</span>
              <h2 className="pdp-product-title">{product.name}</h2>

              {/* Rating */}
              <div className="pdp-rating-row">
                <div className="pdp-stars-wrap">
                  {'★★★★★'.split('').map((star, idx) => (
                    <span key={idx} className="pdp-star-gold">★</span>
                  ))}
                </div>
                <span className="pdp-rating-text">{product.rating || 4.9}</span>
                <span className="pdp-reviews-count">({product.reviews || 142}) تقييم</span>
              </div>

              {/* Price */}
              <div className="pdp-price-wrap">
                <span className="pdp-price-main">
                  <span className="pdp-price-val">{product.price}</span>
                  <img src="/icons/saudi-riyal.svg" alt="ر.س" className="pdp-riyal-icon-symbol" />
                </span>
                {(product.oldPrice || product.originalPrice) && (
                  <span className="pdp-price-old">
                    <span className="pdp-price-val">{product.oldPrice || product.originalPrice}</span>
                    <img src="/icons/saudi-riyal-2.svg" alt="ر.س" className="pdp-riyal-icon-symbol pdp-riyal-icon-symbol-old" />
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="pdp-short-desc">
                {product.description || 'عطر فريد يعكس روح الأصالة والأناقة لمزيج غني من العود وخشب الصندل والتوابل الشرقية الفاخرة.'}
              </p>

              {/* Size Selector */}
              <div className="pdp-size-section">
                <span className="pdp-label-title">الحجم</span>
                <div className="pdp-sizes-list">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`pdp-size-btn ${selectedSize === sz ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pdp-buy-row">
                <div className="pdp-qty-counter">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                  type="button"
                  className={`pdp-top-fixed-cart-btn ${addedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  <span className="pdp-top-cart-text">
                    {addedToCart ? 'تمت الإضافة ✓' : 'أضف إلى السلة'}
                  </span>
                  <span className="pdp-top-cart-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4H5L7.4 15.2C7.63 16.28 8.59 17 9.69 17H17.5C18.53 17 19.44 16.35 19.75 15.37L21 11H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                      <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Trust Features Dashed Box */}
              <div className="pdp-trust-box">
                <div className="pdp-trust-item">
                  <img src="/icons/truck-delivery.svg" alt="" className="pdp-trust-icon" />
                  <div className="pdp-trust-info">
                    <strong>ضمان سريع</strong>
                    <span>توصيل خلال 2 - 4 أيام عمل لجميع المناطق</span>
                  </div>
                </div>

                <div className="pdp-trust-item">
                  <img src="/icons/shipping-truck-02.svg" alt="" className="pdp-trust-icon" />
                  <div className="pdp-trust-info">
                    <strong>استرجاع وسهل</strong>
                    <span>إرجاع مجاني خلال 7 أيام من استلام المنتج</span>
                  </div>
                </div>

                <div className="pdp-trust-item">
                  <img src="/icons/security-check.svg" alt="" className="pdp-trust-icon" />
                  <div className="pdp-trust-info">
                    <strong>دفع آمن</strong>
                    <span>دفع تشفير آمن ومعتمد 100%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ===== 2. QUICK NAV TABS BAR ===== */}
      <nav className="pdp-tabs-bar pdp-full-width">
        <div className="pdp-container">
          <div className="pdp-tabs-row">
            <button className="pdp-tab-item active" onClick={() => scrollToSection('section-notes')}>النوتات العطرية</button>
            <button className="pdp-tab-item" onClick={() => scrollToSection('section-about')}>الوصف</button>
            <button className="pdp-tab-item" onClick={() => scrollToSection('section-reviews')}>تقييمات العملاء</button>
            <button className="pdp-tab-item" onClick={() => scrollToSection('section-related')}>قد يعجبك أيضاً</button>
          </div>
        </div>
      </nav>

      {/* ===== 3. OLFACTORY NOTES CARDS ===== */}
      <section className="pdp-notes-section pdp-full-width" id="section-notes">
        <div className="pdp-container">
          <div className="pdp-notes-cards-grid">
            <div className="pdp-note-card">
              <div className="pdp-note-card-img-wrap">
                <img src={noteImg1} alt="النوتات العليا" />
              </div>
              <h3 className="pdp-note-card-title">النوتات العليا</h3>
              <p className="pdp-note-card-desc">
                {product.topNotes ? product.topNotes.join(' ، ') : 'الهيل ، الفلفل الوردي ، خشب الورد'}
              </p>
            </div>

            <div className="pdp-note-card">
              <div className="pdp-note-card-img-wrap">
                <img src={noteImg2} alt="النوتات الوسطى" />
              </div>
              <h3 className="pdp-note-card-title">النوتات الوسطى</h3>
              <p className="pdp-note-card-desc">
                {product.middleNotes ? product.middleNotes.join(' ، ') : 'العود النادر ، خشب الصندل ، نجيل الهند'}
              </p>
            </div>

            <div className="pdp-note-card">
              <div className="pdp-note-card-img-wrap">
                <img src={noteImg3} alt="النوتات الأساسية" />
              </div>
              <h3 className="pdp-note-card-title">النوتات الأساسية</h3>
              <p className="pdp-note-card-desc">
                {product.baseNotes ? product.baseNotes.join(' ، ') : 'العنبر ، حبوب التونكا ، الفانيليا'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. ABOUT PERFUME BANNER SECTION (100% FULL WIDTH EDGE-TO-EDGE) ===== */}
      <section
        className="pdp-about-banner-section pdp-full-width"
        id="section-about"
        style={{ backgroundImage: `url(${aboutShadowBg})` }}
      >
        <div className="pdp-about-fullwidth-wrap">
          <div className="pdp-about-banner-text">
            <h2 className="pdp-about-banner-title">عن العطر</h2>
            <p className="pdp-about-banner-p">
              يُعد عطر عود وود من توم فورد أحد أكثر العطور تميزاً في مجموعة Private Blend. يأسرك هذا العطر بمزيجه الدخاني الغامض من العود النادر، يُضفي خشب الورد الفاخر والهيل لمسة من التوابل الدخانية التي تمهد الطريق لمزيج غني من خشب الصندل ونجيل الهند.
            </p>
            <p className="pdp-about-banner-p">
              تكتمل هذه التحفة العطرية بلمسات دافئة من حبوب التونكا والعنبر، مما يمنحه ثباتاً استثنائياً وجاذبية لا تُقاوم. صُمم هذا العطر خصيصاً للباحثين عن التفرد والأناقة الكلاسيكية بلمسة عصرية جريئة.
            </p>
          </div>
          <div className="pdp-about-banner-img-wrap">
            <img src={aboutOudPhoto} alt="عن العطر" />
          </div>
        </div>
      </section>

      {/* ===== 5. RELATED PRODUCTS SECTION (FULL WIDTH) ===== */}
      <section className="pdp-related-section pdp-full-width" id="section-related">
        <div className="pdp-container">
          <div className="pdp-section-header">
            <button className="pdp-show-all-btn" onClick={() => navigate('/perfumes')}>
              <span>عرض الكل</span>
              <span className="pdp-arrow">‹</span>
            </button>
            <h2 className="pdp-section-h2">قد يعجبك أيضاً</h2>
          </div>

          <div className="pdp-products-grid">
            {relatedProducts.map((rel) => (
              <div key={rel.id} className="pdp-product-card" onClick={() => navigate(`/product/${rel.id}`)}>
                <div className="pdp-product-img-wrap">
                  <button
                    className={`pdp-card-fav-btn ${wishlistIds.includes(rel.id) ? 'liked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist && onToggleWishlist(rel.id);
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlistIds.includes(rel.id) ? '#905b30' : 'none'} stroke={wishlistIds.includes(rel.id) ? '#905b30' : '#80634e'} strokeWidth="1.8">
                      <path d="M20.84 4.61C19.84 3.61 18.49 3.05 17.09 3.05C15.69 3.05 14.34 3.61 13.34 4.61L12 5.95L10.66 4.61C8.58 2.53 5.21 2.53 3.13 4.61C1.05 6.69 1.05 10.06 3.13 12.14L12 21L20.87 12.14C22.95 10.06 22.95 6.69 20.84 4.61Z" />
                    </svg>
                  </button>
                  <img src={rel.image} alt={rel.name} />
                </div>

                <div className="pdp-product-card-body">
                  <h3 className="pdp-card-title">{rel.name}</h3>
                  <div className="pdp-card-stars">{'★'.repeat(Math.round(rel.rating || 5))}</div>
                  <p className="pdp-card-type">{rel.brand || 'عطور فاخرة'}</p>
                  <div className="pdp-card-price-row">
                    <span className="pdp-card-price-val">{rel.price}</span>
                    <img src="/icons/Group 34319.svg" alt="ريال" className="pdp-riyal-icon" />
                  </div>
                  <button
                    type="button"
                    className="add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAddToCart) onAddToCart(rel);
                      else navigate(`/product/${rel.id}`);
                    }}
                  >
                    <span className="add-to-cart-text">
                      أضف إلى السلة
                    </span>
                    <span className="cart-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4H5L7.4 15.2C7.63 16.28 8.59 17 9.69 17H17.5C18.53 17 19.44 16.35 19.75 15.37L21 11H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                        <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. CUSTOMER REVIEWS SECTION (RATINGS NEXT TO REVIEWS & FULL WIDTH) ===== */}
      <section className="pdp-reviews-section pdp-full-width" id="section-reviews">
        <div className="pdp-container">
          <h2 className="pdp-reviews-heading">تقييمات العملاء</h2>

          <div className="pdp-reviews-side-by-side-row">
            {/* OVERALL RATING SCORE CARD (RIGHT SIDE IN RTL) */}
            <div className="pdp-reviews-overview-box">
              <div className="pdp-overall-score">
                <span className="pdp-score-num">4.8</span>
                <span className="pdp-score-max">من 5</span>
                <div className="pdp-score-stars">★★★★★</div>
                <span className="pdp-score-total">142 تقييم</span>
              </div>

              <div className="pdp-bars-col">
                {[
                  { stars: 5, pct: 85 },
                  { stars: 4, pct: 10 },
                  { stars: 3, pct: 3 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 },
                ].map((row) => (
                  <div key={row.stars} className="pdp-bar-item">
                    <span className="pdp-bar-star-label">{row.stars} نجوم</span>
                    <div className="pdp-bar-bg">
                      <div className="pdp-bar-fill" style={{ width: `${row.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CUSTOMER REVIEWS CARDS (LEFT SIDE IN RTL) */}
            <div className="pdp-reviews-cards-grid">
              {CUSTOMER_REVIEWS.map((rev) => (
                <div key={rev.id} className="pdp-rev-card">
                  <div className="pdp-rev-header">
                    <img src={rev.avatar} alt={rev.name} className="pdp-rev-avatar" />
                    <div className="pdp-rev-user-info">
                      <h4 className="pdp-rev-name">{rev.name}</h4>
                      <span className="pdp-rev-badge">✓ {rev.badge}</span>
                    </div>
                  </div>

                  <div className="pdp-rev-stars">
                    {Array.from({ length: rev.rating }, (_, i) => (
                      <span key={i} className="pdp-rev-star-gold">★</span>
                    ))}
                  </div>

                  <h5 className="pdp-rev-title">{rev.title}</h5>
                  <p className="pdp-rev-comment">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. NEWSLETTER FORM SECTION ===== */}
      <Newsletter />

      {/* ===== 8. FOOTER ===== */}
      <Footer />
    </div>
  );
}
