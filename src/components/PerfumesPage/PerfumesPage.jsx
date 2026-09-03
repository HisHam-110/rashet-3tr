import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './PerfumesPage.css';

import { productsApi } from '../../services/storeApi';

const CATEGORY_LABELS = {
  men:    { label: 'رجالي',   color: '#3b6ea5' },
  women:  { label: 'نسائي',   color: '#a5527a' },
  unisex: { label: 'يونيسكس', color: '#6b7c5c' },
  luxury: { label: 'فاخر',    color: '#8b6914' },
  niche:  { label: 'نيش',     color: '#5a4a6b' },
};

const PRODUCTS_PER_PAGE = 8;

export default function PerfumesPage({
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  cartCount = 0,
  onOpenCart,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search') || '';

  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');

  useEffect(() => {
    const controller = new AbortController();
    let retryTimer;
    setIsLoading(true);

    const loadProducts = () => {
      productsApi.list({}, controller.signal)
        .then((data) => {
          if (!Array.isArray(data)) return;

          // Keep all API products, displaying products with images first.
          const sortedAll = [...data].sort((a, b) => {
            const aHasImg = a.image && typeof a.image === 'string' && a.image.length > 0;
            const bHasImg = b.image && typeof b.image === 'string' && b.image.length > 0;
            if (aHasImg && !bHasImg) return -1;
            if (!aHasImg && bHasImg) return 1;
            return 0;
          });
          setProductsList(sortedAll);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            retryTimer = window.setTimeout(loadProducts, 2000);
          }
        });
    };

    loadProducts();
    return () => {
      controller.abort();
      window.clearTimeout(retryTimer);
    };
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(searchParam);
    setCurrentPage(1);
  }, [searchParam]);

  const [productRatings, setProductRatings] = useState({});
  const [imgLoaded, setImgLoaded] = useState({});

  // Filter Drawer active states — include ALL possible category values
  const ALL_CATS = ['men', 'women', 'unisex', 'luxury', 'niche', 'oriental', 'summer', 'night'];
  const [activeCategories, setActiveCategories] = useState(ALL_CATS);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [activeRatings, setActiveRatings] = useState([5, 4, 3, 2, 1]);

  // Drawer open / temp states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempCategories, setTempCategories] = useState(ALL_CATS);
  const [tempMinPrice, setTempMinPrice] = useState(0);
  const [tempMaxPrice, setTempMaxPrice] = useState(9999);
  const [tempRatings, setTempRatings] = useState([5, 4, 3, 2, 1]);

  // Drawer Section Expansion states
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isSizesExpanded, setIsSizesExpanded] = useState(false);
  const [isRatingsExpanded, setIsRatingsExpanded] = useState(true);

  const handleRating = (productId, rating) => {
    setProductRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  // Filter by search, category drawer, price and ratings
  const filtered = useMemo(() => {
    let result = [...productsList];

    // 1. Pill Category Filter
    if (selectedCategory !== 'all' && selectedCategory !== 'full') {
      result = result.filter((p) => {
        if (selectedCategory === 'men') {
          return p.category === 'men';          // رجالي بس
        }
        if (selectedCategory === 'women') {
          return p.category === 'women';        // نسائي بس
        }
        if (selectedCategory === 'unisex') {
          return p.category === 'unisex';       // مشترك بس
        }
        if (selectedCategory === 'luxury') {
          return p.category === 'luxury' || p.price >= 500;
        }
        return p.category === selectedCategory;
      });
    }

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          String(p.name || '').toLowerCase().includes(q) ||
          String(p.brand || '').toLowerCase().includes(q)
      );
    }

    // 4. Price Range
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // 5. Star Ratings
    result = result.filter((p) => {
      const rawRating = productRatings[p.id] || p.rating || 5;
      const currentRating = Math.max(1, Math.min(5, Math.floor(rawRating)));
      return activeRatings.includes(currentRating);
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case 'newest':
      default:
        // Products WITH images first, then isNew, then id ascending
        result.sort((a, b) => {
          const aHasImg = Boolean(a.image && typeof a.image === 'string' && a.image.trim().length > 0);
          const bHasImg = Boolean(b.image && typeof b.image === 'string' && b.image.trim().length > 0);
          if (aHasImg && !bHasImg) return -1;
          if (!aHasImg && bHasImg) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return a.id - b.id;
        });
        break;
    }

    return result;
  }, [productsList, searchQuery, sortBy, selectedCategory, activeCategories, minPrice, maxPrice, activeRatings, productRatings]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset page when search/sort changes
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    if (val === 'all') {
      setActiveCategories(ALL_CATS);
      setTempCategories(ALL_CATS);
    } else {
      setActiveCategories([val]);
      setTempCategories([val]);
    }
    setCurrentPage(1);
  };

  // Star rating renderer
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating - full >= 0.3;
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <svg key={i} className="star-icon filled" viewBox="0 0 24 24" width="14" height="14">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />
          </svg>
        );
      } else if (i === full && hasHalf) {
        stars.push(
          <svg key={i} className="star-icon half" viewBox="0 0 24 24" width="14" height="14">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#ddd" />
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={`url(#half-${i})`} />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="star-icon empty" viewBox="0 0 24 24" width="14" height="14">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#ddd" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="perfumes-page" dir="rtl">

      {/* ========= BREADCRUMB ========= */}
      <div className="pp-breadcrumb-bar">
        <div className="pp-container">
          <div className="pp-breadcrumb">
            <Link to="/">الرئيسية</Link>
            <span className="pp-breadcrumb-sep">/</span>
            <span className="pp-breadcrumb-current">العطور</span>
          </div>
        </div>
      </div>

      {/* ========= SEARCH & SORT BAR ========= */}
      <div className="pp-filters-section">
        <div className="pp-container">
          <div className="pp-filters-row">
            {/* Right side: Search Input + Filter button */}
            <div className="pp-filters-right-group">
              {/* Filter Button */}
              <button
                className="pp-filters-settings-btn"
                title="تصفية"
                onClick={() => {
                  setTempCategories([...activeCategories]);
                  setTempMinPrice(minPrice);
                  setTempMaxPrice(maxPrice);
                  setTempRatings([...activeRatings]);
                  setIsFilterOpen(true);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
              </button>

              <div className="pp-search-wrap">
                <input
                  type="text"
                  className="pp-search-input"
                  placeholder="ابحث في العطور..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <span className="pp-search-icon-wrap">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                {searchQuery && (
                  <button className="pp-search-clear" onClick={() => handleSearchChange('')}>✕</button>
                )}
              </div>
            </div>

            {/* Left side: Sort Dropdown */}
            <div className="pp-sort-wrap">
              <span className="pp-sort-label">ترتيب حسب:</span>
              <div className="pp-sort-select-container">
                <select
                  id="pp-sort"
                  className="pp-sort-select"
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="rating">الأعلى تقييماً</option>
                </select>
                <span className="pp-sort-chevron">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* Sub Row: Category Pills */}
          <div className="pp-category-pills-row">
            <button
              className={`pp-category-pill ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              الكل ({productsList.length})
            </button>
            <button
              className={`pp-category-pill ${selectedCategory === 'men' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('men')}
            >
              رجالي ({productsList.filter(p => p.category === 'men').length})
            </button>
            <button
              className={`pp-category-pill ${selectedCategory === 'women' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('women')}
            >
              نسائية ({productsList.filter(p => p.category === 'women').length})
            </button>
            <button
              className={`pp-category-pill ${selectedCategory === 'unisex' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('unisex')}
            >
              يونيسكس ({productsList.filter(p => p.category === 'unisex').length})
            </button>
          </div>
        </div>
      </div>

      {/* ========= PRODUCTS GRID ========= */}
      <section className="pp-products-section">
        <div className="pp-container">
          {isLoading ? (
            <div className="pp-loading-container" role="status" aria-live="polite">
              <div className="pp-perfume-loader" aria-hidden="true">
                <span className="pp-loader-mist pp-loader-mist-one" />
                <span className="pp-loader-mist pp-loader-mist-two" />
                <span className="pp-loader-mist pp-loader-mist-three" />
                <div className="pp-loader-bottle">
                  <span className="pp-loader-cap" />
                  <span className="pp-loader-neck" />
                  <span className="pp-loader-glass">
                    <span className="pp-loader-liquid" />
                    <span className="pp-loader-label">R</span>
                  </span>
                </div>
              </div>
              <span className="pp-loading-text">جاري تحميل العطور...</span>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="pp-empty-state">
              <span className="pp-empty-icon">🔍</span>
              <h3>لم نجد نتائج</h3>
              <p>جرب البحث بكلمة مختلفة أو تصفح جميع العطور</p>
              <button className="pp-reset-btn" onClick={() => handleSearchChange('')}>
                عرض جميع العطور
              </button>
            </div>
          ) : (
            <div className="pp-products-grid">
              {paginatedProducts.map((product) => {
                const isWishlisted = wishlistIds.includes(product.id);
                return (
                  <article
                    key={product.id}
                    className="pp-product-card"
                    onClick={(e) => {
                      if (e.target.closest('button')) return;
                      navigate(`/product/${product.id}`);
                    }}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        navigate(`/product/${product.id}`);
                      }
                    }}
                  >
                    {/* Image Container */}
                    <div className="pp-card-image-wrap">
                      {/* Keep the card data visible while its image is still downloading. */}
                      {!imgLoaded[product.id] && (
                        <div className="pp-img-skeleton" />
                      )}
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={`pp-card-image ${imgLoaded[product.id] ? 'pp-img-visible' : 'pp-img-hidden'}`}
                          onLoad={() => setImgLoaded(prev => ({ ...prev, [product.id]: true }))}
                          onError={() => setImgLoaded(prev => ({ ...prev, [product.id]: true }))}
                        />
                      )}

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        className={`favorite-btn ${isWishlisted ? 'liked' : ''}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          onToggleWishlist?.(product.id);
                        }}
                        title={isWishlisted ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill={isWishlisted ? "currentColor" : "none"}
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M20.84 4.61C19.84 3.61 18.49 3.05 17.09 3.05C15.69 3.05 14.34 3.61 13.34 4.61L12 5.95L10.66 4.61C8.58 2.53 5.21 2.53 3.13 4.61C1.05 6.69 1.05 10.06 3.13 12.14L12 21L20.87 12.14C22.95 10.06 22.95 6.69 20.84 4.61Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {/* New Badge */}
                      {product.isNew && (
                        <span className="pp-new-badge">جديد</span>
                      )}
                    </div>

                    {/* Card Info */}
                    <div className="pp-card-info">
                      <div className="pp-card-top-row">
                        <span className="pp-card-brand">{product.brand}</span>
                        {CATEGORY_LABELS[product.category] && (
                          <span
                            className="pp-card-category-badge"
                            style={{ '--cat-color': CATEGORY_LABELS[product.category].color }}
                          >
                            {CATEGORY_LABELS[product.category].label}
                          </span>
                        )}
                      </div>
                      <h3 className="pp-card-name">{product.name}</h3>

                      {/* Rating */}
                      <div className="pp-card-rating">
                        <div className="product-rating" aria-label={`تقييم ${productRatings[product.id] || product.rating} من 5`}>
                          {Array.from({ length: 5 }, (_, index) => {
                            const starNumber = index + 1;
                            const currentRating = productRatings[product.id] || product.rating;
                            return (
                              <button
                                key={starNumber}
                                type="button"
                                className={`rating-star ${
                                  starNumber <= currentRating ? "active" : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRating(product.id, starNumber);
                                }}
                                aria-label={`تقييم ${starNumber} نجوم`}
                              >
                                ★
                              </button>
                            );
                          })}
                        </div>
                        <span className="pp-rating-count">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="pp-card-price-row">
                        <span className="pp-current-price">{product.price} ر.س</span>
                        {product.oldPrice && (
                          <span className="pp-old-price">{product.oldPrice} ر.س</span>
                        )}
                      </div>

                      {/* Add to Cart */}
                      <button
                        type="button"
                        className="add-to-cart"
                        onClick={(event) => {
                          event.stopPropagation();
                          event.preventDefault();
                          onAddToCart?.(product);
                        }}
                      >
                        <span className="add-to-cart-text">
                          أضف إلى السلة
                        </span>
                        <span className="cart-icon">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 4H5L7.4 15.2C7.63 16.28 8.59 17 9.69 17H17.5C18.53 17 19.44 16.35 19.75 15.37L21 11H6"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="10" cy="20" r="1.3" fill="currentColor" />
                            <circle cx="18" cy="20" r="1.3" fill="currentColor" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* ========= PAGINATION ========= */}
          {totalPages > 1 && (
            <div className="pp-pagination">
              <button
                className="pp-page-btn pp-prev-btn"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage <= 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span>السابق</span>
              </button>

              <div className="pp-page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pp-page-num ${page === safePage ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pp-page-btn pp-next-btn"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage >= totalPages}
              >
                <span>التالي</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========= FILTER DRAWER (SIDEBAR) ========= */}
      {isFilterOpen && (
        <div className="pp-filter-backdrop" onClick={() => setIsFilterOpen(false)}>
          <div className="pp-filter-drawer" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="pp-filter-header">
              <div className="pp-filter-title-wrap">
                <h3 className="pp-filter-title">فلترة المنتجات</h3>
                <span className="pp-filter-count-badge">
                  { (tempCategories.length !== 3 ? 1 : 0) + (tempMinPrice !== 200 || tempMaxPrice !== 2500 ? 1 : 0) + (tempRatings.length !== 5 ? 1 : 0) } محددة
                </span>
              </div>
              <button className="pp-filter-close-btn" onClick={() => setIsFilterOpen(false)} aria-label="إغلاق">
                ✕
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div className="pp-filter-content">
              {/* Category Checkboxes */}
              <div className="pp-filter-group">
                <button
                  className="pp-filter-group-title"
                  onClick={() => setIsCategoriesExpanded(v => !v)}
                >
                  <span>التصنيفات</span>
                  <span className={`pp-filter-group-chevron ${isCategoriesExpanded ? 'expanded' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {isCategoriesExpanded && (
                  <div className="pp-checkbox-list">
                    <label className="pp-checkbox-item">
                      <span className="pp-checkbox-count">({productsList.filter(p => p.category === 'men' || p.category === 'unisex').length})</span>
                      <span className="pp-checkbox-label">رجالي</span>
                      <input
                        type="checkbox"
                        checked={tempCategories.includes('men')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempCategories([...tempCategories, 'men']);
                          } else {
                            setTempCategories(tempCategories.filter(c => c !== 'men'));
                          }
                        }}
                      />
                    </label>
                    <label className="pp-checkbox-item">
                      <span className="pp-checkbox-count">({productsList.filter(p => p.category === 'women' || p.category === 'unisex').length})</span>
                      <span className="pp-checkbox-label">نسائي</span>
                      <input
                        type="checkbox"
                        checked={tempCategories.includes('women')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempCategories([...tempCategories, 'women']);
                          } else {
                            setTempCategories(tempCategories.filter(c => c !== 'women'));
                          }
                        }}
                      />
                    </label>
                    <label className="pp-checkbox-item">
                      <span className="pp-checkbox-count">({productsList.filter(p => p.category === 'unisex').length})</span>
                      <span className="pp-checkbox-label">يونيسكس</span>
                      <input
                        type="checkbox"
                        checked={tempCategories.includes('unisex')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempCategories([...tempCategories, 'unisex']);
                          } else {
                            setTempCategories(tempCategories.filter(c => c !== 'unisex'));
                          }
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="pp-filter-group">
                <button
                  className="pp-filter-group-title"
                  onClick={() => setIsPriceExpanded(v => !v)}
                >
                  <span>نطاق السعر</span>
                  <span className={`pp-filter-group-chevron ${isPriceExpanded ? 'expanded' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {isPriceExpanded && (
                  <div className="pp-price-slider-container">
                    <input
                      type="range"
                      min="200"
                      max="2500"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                      className="pp-price-range-slider"
                    />
                    <div className="pp-price-display-row">
                      <div className="pp-price-block">
                        <span className="pp-price-label-text">من</span>
                        <span className="pp-price-val-text">{tempMinPrice} ر.س</span>
                      </div>
                      <div className="pp-price-block">
                        <span className="pp-price-label-text">إلى</span>
                        <span className="pp-price-val-text">{tempMaxPrice} ر.س</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Header (collapsible placeholder) */}
              <div className="pp-filter-group">
                <button
                  className="pp-filter-group-title"
                  onClick={() => setIsSizesExpanded(v => !v)}
                >
                  <span>الحجم</span>
                  <span className={`pp-filter-group-chevron ${isSizesExpanded ? 'expanded' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {isSizesExpanded && (
                  <div className="pp-checkbox-list">
                    <label className="pp-checkbox-item">
                      <span className="pp-checkbox-label">50 مل</span>
                      <input type="checkbox" readOnly />
                    </label>
                    <label className="pp-checkbox-item">
                      <span className="pp-checkbox-label">100 مل</span>
                      <input type="checkbox" readOnly />
                    </label>
                    <label className="pp-checkbox-item">
                      <span className="pp-checkbox-label">200 مل</span>
                      <input type="checkbox" readOnly />
                    </label>
                  </div>
                )}
              </div>

              {/* Rating Checkboxes */}
              <div className="pp-filter-group">
                <button
                  className="pp-filter-group-title"
                  onClick={() => setIsRatingsExpanded(v => !v)}
                >
                  <span>التقييم</span>
                  <span className={`pp-filter-group-chevron ${isRatingsExpanded ? 'expanded' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {isRatingsExpanded && (
                  <div className="pp-checkbox-list">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <label key={stars} className="pp-checkbox-item">
                        <span className="pp-checkbox-count">
                          ({productsList.filter(p => Math.floor(productRatings[p.id] || p.rating) === stars).length})
                        </span>
                        <span className="pp-checkbox-label">{stars} نجوم</span>
                        <input
                          type="checkbox"
                          checked={tempRatings.includes(stars)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTempRatings([...tempRatings, stars]);
                            } else {
                              setTempRatings(tempRatings.filter(r => r !== stars));
                            }
                          }}
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Actions Footer */}
            <div className="pp-filter-footer">
              <button
                className="pp-apply-filter-btn"
                onClick={() => {
                  setActiveCategories([...tempCategories]);
                  setMinPrice(tempMinPrice);
                  setMaxPrice(tempMaxPrice);
                  setActiveRatings([...tempRatings]);
                  setIsFilterOpen(false);
                }}
              >
                تطبيق الفلتر
              </button>
              <button
                className="pp-clear-filter-btn"
                onClick={() => {
                  setTempCategories(['men', 'women', 'unisex']);
                  setTempMinPrice(200);
                  setTempMaxPrice(2500);
                  setTempRatings([5, 4, 3, 2, 1]);
                  setActiveCategories(['men', 'women', 'unisex']);
                  setMinPrice(200);
                  setMaxPrice(2500);
                  setActiveRatings([5, 4, 3, 2, 1]);
                  setIsFilterOpen(false);
                }}
              >
                تصفية
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========= FOOTER ========= */}
      <Footer />
    </div>
  );
}
