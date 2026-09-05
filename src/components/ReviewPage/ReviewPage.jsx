import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './ReviewPage.css';

import { checkoutApi } from '../../services/storeApi';

export default function ReviewPage({ cartItems = [] }) {
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Read persisted user inputs from previous steps
  const formData = useMemo(() => {
    try {
      const saved = sessionStorage.getItem('rashet_checkout_form');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }, []);

  const paymentMethod = useMemo(() => {
    try {
      return sessionStorage.getItem('rashet_payment_method') || 'card';
    } catch {
      return 'card';
    }
  }, []);

  const cardDetails = useMemo(() => {
    try {
      const saved = sessionStorage.getItem('rashet_card_details');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }, []);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const isFreeAvailable = subtotal >= 1000;

  const shippingMethod = useMemo(() => {
    try {
      const saved = sessionStorage.getItem('rashet_shipping_method');
      if (saved) return saved;
    } catch {}
    return isFreeAvailable ? 'free' : 'standard';
  }, [isFreeAvailable]);

  const discount = 95;
  const shipping = shippingMethod === 'free' && isFreeAvailable ? 0 : 25;
  const total = Math.max(0, subtotal - discount + shipping);

  // Formatted display strings
  const formattedAddress = useMemo(() => {
    const parts = [];
    if (formData.region) parts.push(formData.region);
    if (formData.city) parts.push(`حي ${formData.city}`);
    if (formData.address) parts.push(formData.address);
    const mainAddress = parts.join('، ');

    if (mainAddress) {
      const extra = [];
      if (formData.name) extra.push(formData.name);
      if (formData.phone) extra.push(`+966 ${formData.phone}`);
      const extraStr = extra.length ? ` (${extra.join(' - ')})` : '';
      return `${mainAddress}${extraStr}`;
    }
    return 'الرياض، المملكة العربية السعودية';
  }, [formData]);

  const formattedPayment = useMemo(() => {
    if (paymentMethod === 'apple') return 'Apple Pay';
    if (paymentMethod === 'mada') return 'مدى (Mada)';
    if (paymentMethod === 'cash') return 'الدفع عند الاستلام (Cash on Delivery)';
    if (paymentMethod === 'card') {
      const num = cardDetails.cardNumber ? cardDetails.cardNumber.replace(/\s+/g, '') : '';
      const last4 = num.length >= 4 ? num.slice(-4) : '3456';
      return `البطاقة البنكية (Visa •••• ${last4})`;
    }
    return 'البطاقة البنكية (Visa •••• 3456)';
  }, [paymentMethod, cardDetails]);

  const formattedShipping = useMemo(() => {
    if (shippingMethod === 'free' && isFreeAvailable) {
      return 'توصيل مجاني (مجاناً - أكثر من 1000 ر.س)';
    }
    return 'توصيل قياسي (2 - 5 أيام عمل)';
  }, [shippingMethod, isFreeAvailable]);

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const payload = {
        customer_name: formData.name || 'عميل رشة عطر',
        customer_email: formData.email || '',
        customer_phone: formData.phone || '',
        shipping_city: formData.region || formData.city || 'الرياض',
        shipping_district: formData.city || '',
        shipping_street: formData.address || '',
        shipping_notes: formData.notes || '',
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        items: cartItems.map((item) => ({
          product_id: item.id,
          size: item.selectedSize || '100ml',
          quantity: item.quantity,
        })),
      };
      const res = await checkoutApi.confirmOrder(payload);
      const orderNum = res?.order_number || res?.data?.order_number || res?.order_id || res?.data?.order_id;
      if (orderNum) setConfirmedOrderNumber(String(orderNum));
    } catch (err) {
      // Proceed gracefully with confirmation modal
    } finally {
      setLoading(false);
      setIsConfirmationOpen(true);
    }
  };

  if (!cartItems.length) {
    return (
      <main className="review-empty" dir="rtl">
        <h1>لا توجد منتجات لمراجعتها</h1>
        <button onClick={() => navigate('/cart')}>العودة إلى السلة</button>
      </main>
    );
  }

  return (
    <div className="review-page" dir="rtl">
      <main className="review-container">
        <div className="review-breadcrumb">
          <button onClick={() => navigate('/')}>الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('/cart')}>السلة</button>
          <span>/</span>
          <strong>المراجعة</strong>
        </div>

        <ol className="review-steps">
          <li className="done" onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
            <i>1</i>
            <span>البيانات</span>
          </li>
          <li className="done" onClick={() => navigate('/checkout/payment')} style={{ cursor: 'pointer' }}>
            <i>2</i>
            <span>الدفع</span>
          </li>
          <li className="active" onClick={() => navigate('/checkout/review')} style={{ cursor: 'pointer' }}>
            <i>3</i>
            <span>المراجعة</span>
          </li>
        </ol>

        <header className="review-heading">
          <h1>مراجعة الطلب</h1>
          <p>تأكد من تفاصيل طلبك قبل التأكيد</p>
        </header>

        <div className="review-layout">
          <section className="review-details">
            <div className="review-products">
              <h2>
                <span className="review-cart-icon"><img src="/icons/shopping-cart-02.svg" alt="" /></span>
                السلة ({cartItems.length})
              </h2>
              {cartItems.map((item) => (
                <div className="review-product" key={`${item.id}-${item.selectedSize}`}>
                  <img src={item.image} alt={item.name}/>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.selectedSize} × {item.quantity}</small>
                  </div>
                  <b>{item.price * item.quantity} ر.س</b>
                </div>
              ))}
            </div>

            <div className="review-info">
              {/* Delivery Address */}
              <div>
                <span className="info-icon"><img src="/icons/Vector.svg" alt="" /></span>
                <section>
                  <h2>عنوان التوصيل</h2>
                  <p>{formattedAddress}</p>
                </section>
                <button type="button" onClick={() => navigate('/checkout')}>تعديل</button>
              </div>

              {/* Payment Method */}
              <div>
                <span className="info-icon"><img src="/icons/Container.svg" alt="" /></span>
                <section>
                  <h2>طريقة الدفع</h2>
                  <p>{formattedPayment}</p>
                </section>
                <button type="button" onClick={() => navigate('/checkout/payment')}>تعديل</button>
              </div>

              {/* Delivery Method */}
              <div>
                <span className="info-icon"><img src="/icons/shipping-truck-02.svg" alt="" /></span>
                <section>
                  <h2>طريقة التوصيل</h2>
                  <p>{formattedShipping}</p>
                </section>
                <button type="button" onClick={() => navigate('/checkout')}>تعديل</button>
              </div>
            </div>
          </section>

          <aside className="review-summary">
            <h2>ملخص الطلب</h2>
            <div>
              <span>المجموع الفرعي</span>
              <b>{subtotal} ر.س</b>
            </div>
            <div>
              <span>الخصم (RASHAT10)</span>
              <b className="discount">-{discount} ر.س</b>
            </div>
            <div>
              <span>الشحن</span>
              <b>{shipping ? `${shipping} ر.س` : 'مجاني'}</b>
            </div>
            <hr/>
            <div className="review-total">
              <span>الإجمالي</span>
              <b>{total} ر.س</b>
            </div>
            <button type="button" onClick={handleConfirmOrder} disabled={loading}>
              {loading ? 'جاري التأكيد...' : 'تأكيد الطلب'}
              <img src="/icons/Container shopiing.svg" alt="" />
            </button>
          </aside>
        </div>
      </main>

      <Footer />

      {isConfirmationOpen && (
        <div className="order-success-overlay" role="dialog" aria-modal="true" aria-labelledby="order-success-title">
          <div className="order-success-modal">
            <button className="order-success-close" onClick={() => setIsConfirmationOpen(false)} aria-label="إغلاق">×</button>
            <div className="order-success-icon"><img src="/icons/security-check.svg" alt="" /></div>
            <h2 id="order-success-title">تم تأكيد طلبك بنجاح</h2>
            {confirmedOrderNumber && (
              <p style={{ fontWeight: '800', color: '#905b30', marginTop: '4px' }}>
                رقم الطلب: {confirmedOrderNumber}
              </p>
            )}
            <p>شكراً لتسوقك من رشة عطر</p>
            <button className="order-success-home" onClick={() => navigate('/')}>العودة للرئيسية</button>
          </div>
        </div>
      )}
    </div>
  );
}

