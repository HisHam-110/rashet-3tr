import React, { useState, useEffect } from 'react';
import { authApi } from '../../services/storeApi';
import { session } from '../../services/apiClient';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, showToast, onLoginSuccess, currentUser, onLogout }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phone || currentUser.phone_number || '');
    }
  }, [currentUser]);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setGoogleLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = ({ mode }) => {
    const errs = {};
    const emailTrim = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!emailTrim) {
      errs.email = 'يرجى إدخال البريد الإلكتروني';
    } else if (!emailRegex.test(emailTrim)) {
      errs.email = 'يرجى إدخال بريد إلكتروني صحيح (مثل: example@email.com)';
    }

    // Password validation (for login & sign up)
    if (mode !== 'profile') {
      if (!password) {
        errs.password = 'يرجى إدخال كلمة المرور';
      } else if (password.length < 6) {
        errs.password = 'كلمة المرور يجب أن لا تقل عن 6 خانات';
      }
    }

    // Name validation (for sign up & profile)
    if (mode === 'signup' || mode === 'profile') {
      const nameTrim = name.trim();
      if (!nameTrim) {
        errs.name = 'يرجى إدخال الاسم الكامل';
      } else if (nameTrim.length < 3) {
        errs.name = 'الاسم يجب أن يتكون من 3 أحرف على الأقل';
      }
    }

    // Phone validation (for sign up & optional profile)
    if (mode === 'signup' || (mode === 'profile' && phone.trim())) {
      const cleanPhone = phone.trim().replace(/[\s-]/g, '');
      const phoneRegex = /^(?:05|\+?9665|9665|009665)[0-9]{8}$|^(?:\+?\d{8,15})$/;
      if (mode === 'signup' && !cleanPhone) {
        errs.phone = 'يرجى إدخال رقم الهاتف';
      } else if (cleanPhone && !phoneRegex.test(cleanPhone)) {
        errs.phone = 'يرجى إدخال رقم هاتف صحيح (مثل: 0551234567)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toggleAuthMode = (signUpMode) => {
    setIsSignUp(signUpMode);
    setErrors({});
  };

  const handleSubmitAuth = async (e) => {
    e.preventDefault();
    const mode = isSignUp ? 'signup' : 'login';
    if (!validate({ mode })) {
      if (showToast) showToast('يرجى تصحيح البيانات في النموذج', 'error');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await authApi.register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password });
        if (showToast) showToast('تم إنشاء الحساب بنجاح!');
      } else {
        await authApi.loginCustomer({ email: email.trim(), password });
        if (showToast) showToast('تم تسجيل الدخول بنجاح!');
      }
      if (onLoginSuccess) await onLoginSuccess();
      onClose();
    } catch (err) {
      const serverFieldErrors = {};
      const rawDetails = err.details || (typeof err.errors === 'object' ? err.errors : {});

      const isTaken = (val) => {
        if (!val) return false;
        const s = String(Array.isArray(val) ? val[0] : val).toLowerCase();
        return s.includes('taken') || s.includes('already') || s.includes('exists') || s.includes('unique') || s.includes('مسجل') || s.includes('موجود');
      };

      const getMsg = (val, fallback) => {
        if (!val) return null;
        const s = Array.isArray(val) ? val[0] : String(val);
        if (isTaken(s)) return fallback;
        return s;
      };

      // Check email
      if (rawDetails.email) {
        serverFieldErrors.email = getMsg(rawDetails.email, 'البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول أو استخدام بريد آخر');
      }

      // Check phone / mobile / phone_number
      const rawPhone = rawDetails.phone || rawDetails.phone_number || rawDetails.mobile;
      if (rawPhone) {
        serverFieldErrors.phone = getMsg(rawPhone, 'رقم الهاتف مسجل مسبقاً، يرجى استخدام رقم هاتف آخر');
      }

      // Check password & name
      if (rawDetails.password) {
        serverFieldErrors.password = Array.isArray(rawDetails.password) ? rawDetails.password[0] : String(rawDetails.password);
      }
      if (rawDetails.name) {
        serverFieldErrors.name = Array.isArray(rawDetails.name) ? rawDetails.name[0] : String(rawDetails.name);
      }

      // Message fallback inspection
      const rawMsg = (err.message || '').toLowerCase();
      if (!serverFieldErrors.email && (rawMsg.includes('email') || rawMsg.includes('البريد'))) {
        serverFieldErrors.email = isTaken(rawMsg) ? 'البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول أو استخدام بريد آخر' : err.message;
      }
      if (!serverFieldErrors.phone && (rawMsg.includes('phone') || rawMsg.includes('mobile') || rawMsg.includes('الهاتف') || rawMsg.includes('الجوال'))) {
        serverFieldErrors.phone = isTaken(rawMsg) ? 'رقم الهاتف مسجل مسبقاً، يرجى استخدام رقم هاتف آخر' : err.message;
      }

      // Determine general banner text
      let generalMsg = err.message || 'حدث خطأ أثناء العملية';
      if (serverFieldErrors.email && serverFieldErrors.phone) {
        generalMsg = 'البريد الإلكتروني ورقم الهاتف مسجلان مسبقاً في النظام';
      } else if (serverFieldErrors.email) {
        generalMsg = 'البريد الإلكتروني مسجل مسبقاً، يرجى تسجيل الدخول أو استخدام بريد آخر';
      } else if (serverFieldErrors.phone) {
        generalMsg = 'رقم الهاتف مسجل مسبقاً، يرجى استخدام رقم هاتف آخر';
      }

      serverFieldErrors.general = generalMsg;
      setErrors((prev) => ({ ...prev, ...serverFieldErrors }));

      if (showToast) showToast(generalMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!validate({ mode: 'profile' })) {
      if (showToast) showToast('يرجى تصحيح البيانات في النموذج', 'error');
      return;
    }

    setLoading(true);
    try {
      await authApi.updateProfile({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      if (showToast) showToast('تم تحديث بيانات الملف الشخصي بنجاح!');
      if (onLoginSuccess) await onLoginSuccess();
      onClose();
    } catch (err) {
      if (showToast) showToast(err.message || 'حدث خطأ أثناء تحديث البيانات', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = async () => {
    if (onLogout) {
      await onLogout();
    }
    onClose();
  };

  /**
   * Real Standard Google OAuth 2.0 Handler
   * Securely triggers Google Identity Services without handling/storing passwords
   */
  const handleGoogleSignIn = async () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      if (showToast) {
        showToast('يرجى إضافة VITE_GOOGLE_CLIENT_ID في ملف .env لتفعيل تسجيل الدخول الرسمي عبر Google OAuth', 'error');
      }
      return;
    }

    if (!window.google?.accounts?.oauth2) {
      if (showToast) {
        showToast('جاري تحميل مكتبة Google OAuth، يرجى المحاولة بعد لحظات...', 'error');
      }
      return;
    }

    setGoogleLoading(true);

    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'email profile openid',
        prompt: 'select_account',
        callback: async (tokenResponse) => {
          if (tokenResponse.error) {
            setGoogleLoading(false);
            if (tokenResponse.error !== 'popup_closed_by_user') {
              if (showToast) showToast('حدث خطأ أثناء الاتصال بخدمة Google OAuth', 'error');
            }
            return;
          }

          if (tokenResponse.access_token) {
            try {
              // 1. Fetch verified user profile from Google OAuth2 API
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              });

              if (!res.ok) {
                throw new Error('تعذر استرداد بيانات الحساب من Google');
              }

              const data = await res.json();
              const verifiedUser = {
                token: tokenResponse.access_token,
                email: data.email,
                name: data.name || data.given_name || 'مستخدم Google',
                avatar: data.picture,
                picture: data.picture,
                google_id: data.sub
              };

              // 2. Send verified Google credentials to backend authentication API
              await authApi.loginWithGoogle(verifiedUser);

              if (onLoginSuccess) await onLoginSuccess();
              if (showToast) showToast(`مرحباً ${verifiedUser.name}، تم تسجيل الدخول بنجاح!`);
              onClose();
            } catch (e) {
              console.error('Google Auth Error:', e);
              if (showToast) showToast(e.message || 'تعذر إتمام تسجيل الدخول باستخدام حساب Google', 'error');
            } finally {
              setGoogleLoading(false);
            }
          }
        },
      });

      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } catch (err) {
      setGoogleLoading(false);
      console.error('Google OAuth Initialization Error:', err);
      if (showToast) showToast('حدث خطأ أثناء فتح نافذة تسجيل الدخول عبر Google', 'error');
    }
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="auth-modal-close" onClick={onClose} aria-label="إغلاق">
          ✕
        </button>

        {currentUser ? (
          /* Profile Mode */
          <>
            <div className="auth-header">
              <h2 className="auth-title">الملف الشخصي</h2>
              <p className="auth-subtitle">عرض وتحديث البيانات الخاصة بحسابك</p>
            </div>

            <form onSubmit={handleUpdateProfile} className="auth-form" noValidate>
              <div className="auth-field">
                <label htmlFor="profile-name">الاسم الكامل</label>
                <input
                  id="profile-name"
                  type="text"
                  placeholder="الاسم الكامل"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                  }}
                  className={errors.name ? 'input-has-error' : ''}
                />
                {errors.name && <span className="auth-field-error">{errors.name}</span>}
              </div>

              <div className="auth-field">
                <label htmlFor="profile-email">البريد الإلكتروني</label>
                <input
                  id="profile-email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  className={errors.email ? 'input-has-error' : ''}
                />
                {errors.email && <span className="auth-field-error">{errors.email}</span>}
              </div>

              <div className="auth-field">
                <label htmlFor="profile-phone">رقم الهاتف</label>
                <input
                  id="profile-phone"
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                  }}
                  className={errors.phone ? 'input-has-error' : ''}
                />
                {errors.phone && <span className="auth-field-error">{errors.phone}</span>}
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>

              <button
                type="button"
                className="auth-logout-btn"
                onClick={handleLogoutClick}
              >
                تسجيل الخروج
              </button>
            </form>
          </>
        ) : (
          /* Login / Register Mode */
          <>
            {/* Header */}
            <div className="auth-header">
              <h2 className="auth-title">
                {isSignUp ? 'إنشاء حساب جديد !' : 'أهلا بعودتك !'}
              </h2>
              <p className="auth-subtitle">
                {isSignUp
                  ? 'أنشئ حسابك للاستمتاع بتجربة تسوق فريدة'
                  : 'سجّل الدخول إلى حسابك للمتابعة'}
              </p>
            </div>

            {/* Google OAuth Login Button */}
            <button
              className="google-auth-btn"
              onClick={handleGoogleSignIn}
              type="button"
              disabled={googleLoading}
            >
              {googleLoading ? (
                <div className="google-auth-spinner" />
              ) : (
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
              )}
              <span>
                {googleLoading
                  ? 'جاري الاتصال بـ Google...'
                  : isSignUp
                  ? 'التسجيل باستخدام Google'
                  : 'تسجيل الدخول باستخدام Google'}
              </span>
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span className="divider-line"></span>
              <span className="divider-text">أو</span>
              <span className="divider-line"></span>
            </div>

            {/* Auth Form */}
            <form onSubmit={handleSubmitAuth} className="auth-form" noValidate>
              {errors.general && (
                <div className="auth-alert-error">
                  <span>⚠️</span>
                  <span>{errors.general}</span>
                </div>
              )}

              {isSignUp && (
                <>
                  <div className="auth-field">
                    <label htmlFor="auth-name">الاسم الكامل</label>
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name || errors.general) setErrors((prev) => ({ ...prev, name: null, general: null }));
                      }}
                      className={errors.name ? 'input-has-error' : ''}
                    />
                    {errors.name && <span className="auth-field-error">{errors.name}</span>}
                  </div>
                  <div className="auth-field">
                    <label htmlFor="auth-phone">رقم الهاتف</label>
                    <input
                      id="auth-phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone || errors.general) setErrors((prev) => ({ ...prev, phone: null, general: null }));
                      }}
                      className={errors.phone ? 'input-has-error' : ''}
                    />
                    {errors.phone && <span className="auth-field-error">{errors.phone}</span>}
                  </div>
                </>
              )}

              <div className="auth-field">
                <label htmlFor="auth-email">بريد إلكتروني</label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email || errors.general) setErrors((prev) => ({ ...prev, email: null, general: null }));
                  }}
                  className={errors.email ? 'input-has-error' : ''}
                />
                {errors.email && <span className="auth-field-error">{errors.email}</span>}
              </div>

              <div className="auth-field">
                <label htmlFor="auth-password">كلمة المرور</label>
                <div className="password-input-wrapper">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password || errors.general) setErrors((prev) => ({ ...prev, password: null, general: null }));
                    }}
                    className={errors.password ? 'input-has-error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className="auth-field-error">{errors.password}</span>}
              </div>

              {!isSignUp && (
                <div className="auth-options-row">
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
                  <label className="remember-me-label">
                    <span>تذكرنى ؟</span>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </label>
                </div>
              )}

              <button type="submit" className="auth-submit-btn" disabled={loading || googleLoading}>
                {loading ? 'جاري التحميل...' : isSignUp ? 'إنشاء الحساب' : 'تسجيل الدخول'}
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
                    onClick={() => toggleAuthMode(false)}
                  >
                    تسجيل الدخول
                  </button>
                </p>
              ) : (
                <p>
                  ليس لديك حساب؟{' '}
                  <button
                    type="button"
                    className="toggle-auth-mode-btn"
                    onClick={() => toggleAuthMode(true)}
                  >
                    سجل الآن
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
