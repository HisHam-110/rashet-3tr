import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './CheckoutPage.css';

import { checkoutApi } from '../../services/storeApi';

const regions = ['الرياض', 'مكة المكرمة', 'المدينة المنورة', 'المنطقة الشرقية', 'القصيم'];

export default function CheckoutPage({ cartItems = [] }) {
  const navigate = useNavigate();

  /* ── Form State (Persisted in sessionStorage) ── */
  const [form, setForm] = useState(() => {
    try {
      const saved = sessionStorage.getItem('rashet_checkout_form');
      return saved ? JSON.parse(saved) : {
        name: '', phone: '', email: '',
        region: '', city: '', address: '', notes: '',
      };
    } catch {
      return {
        name: '', phone: '', email: '',
        region: '', city: '', address: '', notes: '',
      };
    }
  });

  /* ── Shipping Method ── */
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const isFreeAvailable = subtotal >= 1000;
  const [method, setMethod] = useState(() => {
    try {
      const savedMethod = sessionStorage.getItem('rashet_shipping_method');
      if (savedMethod) return savedMethod;
    } catch {}
    return subtotal >= 1000 ? 'free' : 'standard';
  });

  const discount = 95; // Default discount for presentation matching
  const shipping = method === 'free' && isFreeAvailable ? 0 : 25;
  const total = Math.max(0, subtotal - discount + shipping);

  const update = (event) => {
    const { name, value } = event.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      try {
        sessionStorage.setItem('rashet_checkout_form', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    try {
      sessionStorage.setItem('rashet_shipping_method', newMethod);
    } catch {}
  };

  const [validationError, setValidationError] = useState('');

  const isFormValid = () => {
    return form.name.trim() && form.phone.trim() && form.region.trim() && form.city.trim() && form.address.trim();
  };

  const handleStepClick = (targetStep) => {
    if (targetStep === 'payment' || targetStep === 'review') {
      if (!isFormValid()) {
        setValidationError('يرجى ملء جميع بيانات التوصيل المطلوبة أولاً للمتابعة');
        // Scroll to form if needed
        window.scrollTo({ top: 120, behavior: 'smooth' });
        return;
      }
      setValidationError('');
      if (targetStep === 'payment') navigate('/checkout/payment');
      if (targetStep === 'review') navigate('/checkout/review');
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (!cartItems.length) return navigate('/cart');
    if (!isFormValid()) {
      setValidationError('يرجى ملء جميع بيانات التوصيل المطلوبة أولاً');
      return;
    }
    setValidationError('');
    // Save address in background without blocking UI navigation
    checkoutApi.saveShippingAddress({
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_city: form.city || form.region,
      shipping_street: form.address,
      shipping_notes: form.notes,
    }).catch(() => {});
    navigate('/checkout/payment');
  };

  if (!cartItems.length) {
    return (
      <main className="checkout-empty" dir="rtl">
        <h1>لا توجد منتجات لإتمام الطلب</h1>
        <button onClick={() => navigate('/cart')}>العودة إلى السلة</button>
      </main>
    );
  }

  return (
    <div className="checkout-page" dir="rtl">
      <main className="checkout-container">

        {/* ── Breadcrumb ── */}
        <div className="checkout-breadcrumb">
          <button onClick={() => navigate('/')}>الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('/cart')}>السلة</button>
          <span>/</span>
          <strong>البيانات</strong>
        </div>

        {/* ── Steps ── */}
        <ol className="checkout-steps" aria-label="خطوات إتمام الطلب">
          <li className="is-active" onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
            <i>1</i>
            <span>البيانات</span>
          </li>
          <li onClick={() => handleStepClick('payment')} style={{ cursor: 'pointer' }}>
            <i>2</i>
            <span>الدفع</span>
          </li>
          <li onClick={() => handleStepClick('review')} style={{ cursor: 'pointer' }}>
            <i>3</i>
            <span>المراجعة</span>
          </li>
        </ol>

        {/* Validation Error Alert Message */}
        {validationError && (
          <div className="checkout-validation-alert">
            <span>⚠️ {validationError}</span>
            <button type="button" onClick={() => setValidationError('')}>✕</button>
          </div>
        )}

        {/* ── Main Grid ── */}
        <form className="checkout-grid" onSubmit={submit}>

          {/* ════════ RIGHT COLUMN — Form ════════ */}
          <section className="checkout-form-card">
            <h1>معلومات التوصيل</h1>

            {/* الاسم الكامل */}
            <label>
              الاسم الكامل
              <input
                name="name"
                value={form.name}
                onChange={update}
                placeholder="الاسم الكامل"
                required
              />
            </label>

            {/* رقم الجوال */}
            <label className="phone-label">
              رقم الجوال
              <div className="phone-input-group">
                <span className="country-code-badge">+966</span>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update}
                  placeholder="5X XXX XXXX"
                  required
                />
              </div>
            </label>

            {/* البريد الإلكتروني */}
            <label>
              البريد الإلكتروني
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                placeholder="example@domain.com"
              />
            </label>

            {/* المدينة + الحي */}
            <div className="checkout-row-2">
              <label>
                المدينة
                <select name="region" value={form.region} onChange={update} required>
                  <option value="">اختر المدينة</option>
                  {regions.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label>
                الحي
                <input
                  name="city"
                  value={form.city}
                  onChange={update}
                  placeholder="اسم الحي"
                  required
                />
              </label>
            </div>

            {/* العنوان بالتفصيل */}
            <label>
              العنوان بالتفصيل
              <input
                name="address"
                value={form.address}
                onChange={update}
                placeholder="اسم الشارع، رقم المبنى، رقم الشقة"
                required
              />
            </label>

            {/* ملاحظات التوصيل */}
            <label>
              ملاحظات التوصيل (اختياري)
              <textarea
                name="notes"
                value={form.notes}
                onChange={update}
                placeholder="أي تعليمات خاصة بمندوب التوصيل..."
                rows="3"
              />
            </label>

            {/* زر المتابعة */}
            <button type="submit" className="checkout-continue-btn">
              متابعة للشحن
              <span>←</span>
            </button>
          </section>

          {/* ════════ LEFT COLUMN — Shipping + Summary ════════ */}
          <div className="checkout-left-col">

            {/* ── طريقة التوصيل ── */}
            <section className="checkout-shipping-card">
              <h2>طريقة التوصيل</h2>

              <label className={`delivery-option ${method === 'standard' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={method === 'standard'}
                  onChange={() => handleMethodChange('standard')}
                />
                <span>
                  <b>توصيل قياسي</b>
                  <small>يصل خلال 2-5 أيام عمل.</small>
                </span>
                <strong>25 ر.س</strong>
              </label>

              <label className={`delivery-option ${!isFreeAvailable ? 'disabled' : ''} ${method === 'free' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={method === 'free'}
                  disabled={!isFreeAvailable}
                  onChange={() => isFreeAvailable && handleMethodChange('free')}
                />
                <span>
                  <b>توصيل مجاني</b>
                  <small>{isFreeAvailable ? 'متاح لطلبك' : 'متوفر للطلبات التي تزيد عن 1000 ر.س.'}</small>
                </span>
                <strong>مجاناً</strong>
              </label>
            </section>

            {/* ── ملخص الطلب ── */}
            <aside className="checkout-summary">
              <div className="summary-header">
                <h2>ملخص الطلب</h2>
                <span className="summary-count">{cartItems.reduce((s, i) => s + i.quantity, 0)} محددة</span>
              </div>

              {/* Overlapping circular product images with count badge */}
              <div className="summary-stacked-images">
                {cartItems.slice(0, 3).map((item, idx) => (
                  <div 
                    className="stacked-thumb" 
                    key={idx} 
                    style={{ zIndex: 4 - idx }}
                    title={`${item.name} (${item.quantity} قطع) - اضغط للذهاب للسلة`}
                    onClick={() => navigate('/cart')}
                  >
                    <img src={item.image} alt={item.name} />
                    <span className="thumb-qty-badge">+{item.quantity}</span>
                    <span className="thumb-hover-tooltip">{item.name} × {item.quantity}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <div 
                    className="stacked-thumb stacked-more-thumb" 
                    style={{ zIndex: 0 }} 
                    title={`+${cartItems.length - 3} منتجات إضافية - اضغط للذهاب للسلة`}
                    onClick={() => navigate('/cart')}
                  >
                    <span>+{cartItems.length - 3}</span>
                    <span className="thumb-hover-tooltip">عرض باقي المنتجات في السلة</span>
                  </div>
                )}
              </div>

              <div className="summary-line">
                <span>المجموع الفرعي</span>
                <b>{subtotal} ر.س</b>
              </div>

              <div className="summary-line discount-line">
                <span>كوبون الخصم</span>
                <b>-{discount} ر.س</b>
              </div>

              <div className="summary-line">
                <span>الشحن</span>
                <b>{shipping ? `${shipping} ر.س` : 'مجاني'}</b>
              </div>

              <div className="summary-total">
                <span>الإجمالي</span>
                <b>{total} ر.س</b>
              </div>
            </aside>
          </div>

        </form>
      </main>
      <Footer />
    </div>
  );
}
