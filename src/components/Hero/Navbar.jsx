import React, { useState } from 'react';
import logoImg from '../../assets/images/1 1.svg';
import './Navbar.css';

export default function Navbar({
  activeNav = 'home',
  onSelectNav,
  onOpenSearch,
  onOpenUser,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const navItems = [
    { id: 'home', label: 'الرئيسية', href: '#hero' },
    { id: 'collections', label: 'المجموعة', href: '#categories' },
    { id: 'about', label: 'عن رشة عطر', href: '#perfume-story' },
    { id: 'bestsellers', label: 'الأكثر مبيعاً', href: '#featured' },
    { id: 'perfumes', label: 'العطور', href: '#featured' },
    { id: 'articles', label: 'المقالات', href: '#testimonials' },
    { id: 'contact', label: 'تواصل معنا', href: '#contact' },
  ];

  return (
    <nav className="site-navbar" role="navigation" aria-label="شريط التنقل الرئيسي">
      <div className="navbar-container">
        {/* Right Side (RTL): Brand Logo */}
        <div className="navbar-logo-wrap">
          <a href="#" className="navbar-logo-link" title="رشة واحدة | عالم العطور الفاخرة">
            <img
              src={logoImg}
              alt="رشة واحدة - عالم العطور الفاخرة"
              className="navbar-brand-img"
            />
          </a>
        </div>

        {/* Middle: Navigation Links */}
        <ul className={`navbar-nav-links ${isMobileOpen ? 'mobile-active' : ''}`}>
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <li key={item.id} className="nav-item">
                <a
                  href={item.href}
                  className={`nav-anchor ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (onSelectNav) onSelectNav(item.id);
                    setIsMobileOpen(false);
                  }}
                >
                  {item.label}
                </a>
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
