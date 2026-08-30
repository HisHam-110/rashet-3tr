import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/1 1.svg';
import './Navbar.css';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenUser,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'الرئيسية', href: '/' },
    { id: 'collections', label: 'المجموعة', href: '/collections' },
    { id: 'about', label: 'عن رشة عطر', href: '/#about-brand' },
    { id: 'bestsellers', label: 'الأكثر مبيعاً', href: '/#featured' },
    { id: 'perfumes', label: 'العطور', href: '/perfumes' },
    { id: 'articles', label: 'المقالات', href: '/#articles' },
    { id: 'contact', label: 'تواصل معنا', href: '/contact' },
  ];

  const currentPath = location.pathname;
  const currentHash = location.hash;

  useEffect(() => {
    if (currentPath !== '/') {
      setActiveSection('');
      return undefined;
    }

    const updateActiveSection = () => {
      const marker = 135;
      const sections = navItems
        .filter((item) => item.href.startsWith('/#'))
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.href.slice(2)),
        }))
        .filter((section) => section.element);

      const visibleSection = sections.find(({ element }) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      setActiveSection(visibleSection?.id || (window.scrollY < 80 ? 'home' : ''));
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [currentPath]);

  return (
    <nav className="site-navbar" role="navigation" aria-label="شريط التنقل الرئيسي">
      <div className="navbar-container">
        {/* Right Side (RTL): Brand Logo */}
        <div className="navbar-logo-wrap">
          <Link to="/" className="navbar-logo-link" title="رشة واحدة | عالم العطور الفاخرة">
            <img
              src={logoImg}
              alt="رشة واحدة - عالم العطور الفاخرة"
              className="navbar-brand-img"
            />
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <ul className={`navbar-nav-links ${isMobileOpen ? 'mobile-active' : ''}`}>
          {navItems.map((item) => {
            let isActive = false;
            if (currentPath === '/') {
              isActive = activeSection === item.id;
            } else if (item.id === 'perfumes') {
              isActive = currentPath === '/perfumes';
            } else if (item.href === '/collections') {
              isActive = currentPath === '/collections';
            } else if (item.href === '/contact') {
              isActive = currentPath === '/contact';
            } else if (item.href === '/') {
              isActive = currentPath === '/' && !currentHash;
            } else {
              isActive = currentPath === '/' && currentHash === item.href.substring(1);
            }

            return (
              <li key={item.id} className="nav-item">
                <Link
                  to={item.href}
                  className={`nav-anchor ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Left Side (RTL): Action Icons */}
        <div className="navbar-actions">
          {/* Search Action */}
          <div className="nav-search-container">
            <button
              className="nav-action-icon-btn"
              onClick={() => setIsSearchActive(!isSearchActive)}
              aria-label="البحث في الموقع"
              title="بحث"
            >
              <img
                src="/icons/search-01.svg"
                alt="بحث"
                className="nav-svg-icon"
              />
            </button>

            {isSearchActive && (
              <div className="nav-search-dropdown">
                <input
                  type="text"
                  placeholder="ابحث عن عطرك المفضل..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* User / Profile Action */}
          <button
            className="nav-action-icon-btn"
            onClick={onOpenUser}
            aria-label="حساب المستخدم"
            title="حسابي"
          >
            <img
              src="/icons/user.svg"
              alt="حسابي"
              className="nav-svg-icon"
            />
          </button>

          {/* Shopping Cart Action */}
          <button
            className="nav-action-icon-btn custom-navbar-cart-btn"
            onClick={onOpenCart}
            aria-label="سلة المشتريات"
            title="سلة المشتريات"
          >
            <img
              src="/icons/shopping-cart-02.svg"
              alt="سلة المشتريات"
              className="navbar-cart-icon-img"
            />
            <span className="navbar-cart-badge">{cartCount}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="تبديل القائمة"
          >
            <span className="toggle-line" />
            <span className="toggle-line" />
            <span className="toggle-line" />
          </button>
        </div>
      </div>
    </nav>
  );
}
