import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onSearch,
  activeCategory,
  onSelectCategory,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <span>✨ شحن مجاني للطلبات فوق 199 ريال | هدايا وعينات فاخرة مع كل طلب ✨</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="container nav-container">
          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="القائمة الرئيسية"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* Brand Logo */}
          <div className="brand-logo-wrap">
            <a href="#" className="brand-logo">
              <span className="logo-icon">⚜️</span>
              <div className="logo-text">
                <span className="logo-title">رشة عطر</span>
                <span className="logo-sub">RASHET ETER</span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a
              href="#hero"
              className="nav-link active"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              الرئيسية
            </a>
            <a
              href="#categories"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              المجموعات
            </a>
            <a
              href="#featured"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              الأكثر مبيعاً
            </a>
            <a
              href="#perfume-story"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              عن العطر
            </a>
            <a
              href="#testimonials"
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تقييمات العملاء
            </a>
          </nav>

          {/* Header Action Icons */}
          <div className="header-actions">
            {/* Search Icon & Dropdown */}
            <div className="search-wrapper">
              <button
                className="action-btn"
                title="البحث"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              {isSearchOpen && (
                <form className="search-form-popup" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    placeholder="ابحث عن اسم العطر، الماركة..."
                    value={searchVal}
                    onChange={(e) => {
                      setSearchVal(e.target.value);
                      if (onSearch) onSearch(e.target.value);
                    }}
                    autoFocus
                  />
                  <button type="submit">بحث</button>
                </form>
              )}
            </div>

            {/* Wishlist Icon */}
            <a href="#featured" className="action-btn wishlist-btn" title="المفضلة">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </a>

            {/* Cart Icon */}
            <button className="action-btn cart-btn" title="سلة المشتريات" onClick={onOpenCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
