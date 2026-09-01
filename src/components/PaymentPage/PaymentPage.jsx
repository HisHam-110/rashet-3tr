import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './PaymentPage.css';

import { checkoutApi } from '../../services/storeApi';

export default function PaymentPage({ cartItems = [] }) {
  const navigate = useNavigate();

  // State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  // Calculations
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const isFreeAvailable = subtotal >= 1000;
  const [shippingMethod] = useState(subtotal >= 1000 ? 'free' : 'standard');
  const shipping = shippingMethod === 'free' && isFreeAvailable ? 0 : 25;
  const discount = 95; // Matching default/applied sample coupon or 0
  const total = Math.max(0, subtotal - discount + shipping);

  const [paymentError, setPaymentError] = useState('');

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
    if (paymentError) setPaymentError('');
  };

  const isPaymentValid = () => {
    if (paymentMethod === 'card') {
      return cardDetails.cardNumber.trim().length >= 12 && cardDetails.expiry.trim() && cardDetails.cvv.trim().length >= 3;
    }
    // Apple, mada, cash are valid by selecting
    return Boolean(paymentMethod);
  };

  const handleConfirmOrder = async () => {
    if (!isPaymentValid()) {
      setPaymentError(paymentMethod === 'card' ? 'يرجى إدخال بيانات البطاقة البنكية كاملة وصحيحة' : 'يرجى اختيار طريقة الدفع أولاً');
      return;
    }
    setPaymentError('');
    try {
      await checkoutApi.savePaymentMethod(paymentMethod);
    } catch (err) {
      // Proceed gracefully
    }
    navigate('/checkout/review');
  };

  const handleGoToReview = () => {
    if (!isPaymentValid()) {
      setPaymentError(paymentMethod === 'card' ? 'يرجى إدخال بيانات البطاقة البنكية كاملة قبل المتابعة للمراجعة' : 'يرجى اختيار طريقة الدفع أولاً');
      return;
    }
    setPaymentError('');
    navigate('/checkout/review');
  };

  const handleStepClick = (targetStep) => {
    if (targetStep === 'checkout') {
      navigate('/checkout');
      return;
    }
    if (targetStep === 'review') {
      if (!isPaymentValid()) {
        setPaymentError('يرجى تحديد وإكمال بيانات طريقة الدفع أولاً للمتابعة');
        return;
      }
      setPaymentError('');
      navigate('/checkout/review');
    }
  };

  if (!cartItems.length) {
    return (
      <main className="payment-empty" dir="rtl">
        <h1>لا توجد منتجات لإتمام الطلب</h1>
        <button onClick={() => navigate('/cart')}>العودة إلى السلة</button>
      </main>
    );
  }

  return (
    <div className="payment-page" dir="rtl">
      <main className="payment-container">

        {/* ── Breadcrumb ── */}
        <div className="payment-breadcrumb">
          <button onClick={() => navigate('/')}>الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('/cart')}>السلة</button>
          <span>/</span>
          <strong>الدفع</strong>
        </div>

        {/* ── Steps ── */}
        <ol className="payment-steps" aria-label="خطوات إتمام الطلب">
          <li className="is-done" onClick={() => handleStepClick('checkout')} style={{ cursor: 'pointer' }}>
            <i>1</i>
            <span>البيانات</span>
          </li>
          <li className="is-active" onClick={() => navigate('/checkout/payment')} style={{ cursor: 'pointer' }}>
            <i>2</i>
            <span>الدفع</span>
          </li>
          <li onClick={() => handleStepClick('review')} style={{ cursor: 'pointer' }}>
            <i>3</i>
            <span>المراجعة</span>
          </li>
        </ol>

        {/* Payment Error Alert Message */}
        {paymentError && (
          <div className="payment-validation-alert">
            <span>⚠️ {paymentError}</span>
            <button type="button" onClick={() => setPaymentError('')}>✕</button>
          </div>
        )}

        {/* ── Main Grid ── */}
        <div className="payment-grid">

          {/* ════════ RIGHT COLUMN — Payment Methods ════════ */}
          <section className="payment-methods-card">
            
            {/* 1. Apple Pay */}
            <label className={`pay-option ${paymentMethod === 'apple' ? 'selected' : ''}`}>
              <div className="pay-option-right">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'apple'}
                  onChange={() => setPaymentMethod('apple')}
                />
                <span className="pay-option-title">Apple Pay</span>
              </div>
              <div className="pay-option-brand">
                <img src="/icons/ApplePay.svg" alt="Apple Pay" className="pay-method-icon-img apple-icon" />
              </div>
            </label>

            {/* 2. Mada */}
            <label className={`pay-option ${paymentMethod === 'mada' ? 'selected' : ''}`}>
              <div className="pay-option-right">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'mada'}
                  onChange={() => setPaymentMethod('mada')}
                />
                <span className="pay-option-title">مدى</span>
              </div>
              <div className="pay-option-brand">
                <img src="/icons/image 62.svg" alt="مدى" className="pay-method-icon-img mada-icon" />
              </div>
            </label>

            {/* 3. Credit / Debit Card */}
            <div className={`pay-card-box ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <label className="pay-card-header" onClick={() => setPaymentMethod('card')}>
                <div className="pay-option-right">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span className="pay-option-title">البطاقة البنكية</span>
                </div>
                <div className="pay-option-brand">
                  <img src="/icons/Visa.svg" alt="Visa" className="pay-method-icon-img visa-icon" />
                </div>
              </label>

              {paymentMethod === 'card' && (
                <div className="card-input-details">
                  {/* Card Number */}
                  <label className="pay-field-label">
                    رقم البطاقة
                    <div className="card-input-wrap">
                      <input
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                      />
                      <span className="card-icon-end">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a89a90" strokeWidth="1.8">
                          <rect x="2" y="5" width="20" height="14" rx="3"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                      </span>
                    </div>
                  </label>

                  {/* Expiry & CVV */}
                  <div className="card-fields-row">
                    <label className="pay-field-label">
                      تاريخ الانتهاء
                      <input
                        name="expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                      />
                    </label>

                    <label className="pay-field-label">
                      رمز التحقق (CVV)
                      <input
                        name="cvv"
                        type="password"
                        placeholder="•••"
                        maxLength="4"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                      />
                    </label>
                  </div>

                  {/* Save Card Checkbox */}
                  <label className="save-card-label">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                    />
                    <span>حفظ بيانات البطاقة لعمليات الدفع المستقبلية</span>
                  </label>
                </div>
              )}
            </div>

            {/* 4. Cash on Delivery */}
            <label className={`pay-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
              <div className="pay-option-right">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <span className="pay-option-title">الدفع عند الاستلام</span>
              </div>
              <div className="pay-option-brand">
                <img src="/icons/shipping-truck-02.svg" alt="الدفع عند الاستلام" className="pay-method-icon-img truck-icon" />
              </div>
            </label>

            {/* Actions Buttons */}
            <div className="payment-actions">
              <button type="button" className="confirm-order-btn" onClick={handleConfirmOrder}>
                تأكيد الطلب <span>←</span>
              </button>

              <button type="button" className="review-order-btn" onClick={handleGoToReview}>
                متابعة المراجعة
              </button>

              <div className="secure-badge-footer">
                <span>🔒 دفع آمن ومشفر 100%</span>
              </div>
            </div>

          </section>

          {/* ════════ LEFT COLUMN — Shipping + Summary ════════ */}
          <div className="payment-left-col">

            {/* ── طريقة التوصيل ── */}
            <section className="payment-shipping-card">
              <h2>طريقة التوصيل</h2>

              <label className={`shipping-method-option ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === 'standard'}
                  readOnly
                />
                <span>
                  <b>توصيل قياسي</b>
                  <small>يصل خلال 2-5 أيام عمل.</small>
                </span>
                <strong>25 ر.س</strong>
              </label>

              <label className={`shipping-method-option ${!isFreeAvailable ? 'disabled' : ''} ${shippingMethod === 'free' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="shippingMethod"
                  checked={shippingMethod === 'free'}
                  disabled={!isFreeAvailable}
                  readOnly
                />
                <span>
                  <b>توصيل مجاني</b>
                  <small>متوفر للطلبات التي تزيد عن 1000 ر.س.</small>
                </span>
                <strong>مجاناً</strong>
              </label>
            </section>

            {/* ── ملخص الطلب ── */}
            <aside className="payment-summary-card">
              <div className="summary-top-head">
                <h2>ملخص الطلب</h2>
                <span className="summary-items-count">{cartItems.reduce((s, i) => s + i.quantity, 0)} محددة</span>
              </div>

              {/* Overlapping circular perfume images */}
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

              <div className="summary-calc-row">
                <span>المجموع الفرعي</span>
                <b>{subtotal} ر.س</b>
              </div>

              <div className="summary-calc-row discount-row">
                <span>كوبون الخصم</span>
                <b>-{discount} ر.س</b>
              </div>

              <div className="summary-calc-row">
                <span>الشحن</span>
                <b>{shipping ? `${shipping} ر.س` : 'مجاني'}</b>
              </div>

              <div className="summary-final-total">
                <span>الإجمالي</span>
                <b>{total} ر.س</b>
              </div>
            </aside>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
