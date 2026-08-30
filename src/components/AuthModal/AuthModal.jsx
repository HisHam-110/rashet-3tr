import React, { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, showToast }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showToast) {
      showToast(isSignUp ? 'تم إنشاء الحساب بنجاح!' : 'تم تسجيل الدخول بنجاح!');
    }
    onClose();
  };

  const handleGoogleSignIn = () => {
    if (showToast) {
      showToast('جاري تسجيل الدخول بواسطة جوجل...');
    }
    setTimeout(() => {
      if (showToast) showToast('تم تسجيل الدخول بواسطة جوجل بنجاح!');
      onClose();
    }, 1000);
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="auth-modal-close" onClick={onClose} aria-label="إغلاق">
          ✕
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <h2 className="auth-title">
            {isSignUp ? 'إنشاء حساب جديد !' : 'أهلاً بعودتك !'}
          </h2>
          <p className="auth-subtitle">
            {isSignUp
              ? 'أنشئ حسابك للاستمتاع بتجربة تسوق فريدة'
              : 'سجِّل الدخول إلى حسابك للمتابعة'}
          </p>
        </div>

        {/* Google Login Button */}
        <button className="google-auth-btn" onClick={handleGoogleSignIn} type="button">
          <svg className="google-icon" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>تسجيل الدخول باستخدام جوجل</span>
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span className="divider-line"></span>
          <span className="divider-text">أو</span>
          <span className="divider-line"></span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="auth-field">
              <label htmlFor="auth-name">الاسم الكامل</label>
              <input
                id="auth-name"
                type="text"
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">بريد إلكتروني</label>
            <input
              id="auth-email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">كلمة المرور</label>
            <div className="password-input-wrapper">
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="auth-options-row">
              <label className="remember-me-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>تذكرنى ؟</span>
              </label>
              <a
                href="#forgot-password"
                className="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (showToast) showToast('رابط إعادة تعيين كلمة المرور سيُرسل لبريدك الإلكتروني');
                }}
              >
                نسيت كلمة المرور
              </a>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'إنشاء الحساب' : 'تسجيل الدخول'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="auth-footer-toggle">
          {isSignUp ? (
            <p>
              لديك حساب بالفعل؟{' '}
              <button
                type="button"
                className="toggle-auth-mode-btn"
                onClick={() => setIsSignUp(false)}
              >
                سجِّل الدخول
              </button>
            </p>
          ) : (
            <p>
              ليس لديك حساب؟{' '}
              <button
                type="button"
                className="toggle-auth-mode-btn"
                onClick={() => setIsSignUp(true)}
              >
                سجل الآن
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
