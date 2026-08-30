import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './ShippingPage.css';

const VALID_COUPONS = ['RASHAT10', 'RASHET10', 'RASHAT15', 'RASHET15', 'RASHAT20', 'RASHET20', 'OFF10', 'SAVE10', 'PROMO10'];

export default function ShippingPage({ cartItems = [] }) {
  const navigate = useNavigate();
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const isFreeAvailable = subtotal >= 1000;
  const [method, setMethod] = useState(subtotal >= 1000 ? 'free' : 'standard');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [discount, setDiscount] = useState(0);

  const shipping = method === 'free' && isFreeAvailable ? 0 : 25;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean || !VALID_COUPONS.includes(clean)) {
      setDiscount(0);
      setCouponError('كود الخصم غير صالح، يرجى التحقق منه');
      return;
    }
    setDiscount(Math.round(subtotal * 0.1));
    setCouponError('');
  };

  if (!cartItems.length) return <main className="shipping-empty" dir="rtl"><h1>لا توجد منتجات لإتمام الطلب</h1><button onClick={() => navigate('/cart')}>العودة إلى السلة</button></main>;

  return <div className="shipping-page" dir="rtl">
    <main className="shipping-container">
      <div className="shipping-breadcrumb"><button onClick={() => navigate('/')}>الرئيسية</button><span>/</span><button onClick={() => navigate('/cart')}>السلة</button><span>/</span><strong>الشحن</strong></div>
      <ol className="shipping-steps"><li className="done"><i>1</i><span>البيانات</span></li><li className="active"><i>2</i><span>الشحن</span></li><li><i>3</i><span>الدفع</span></li><li><i>4</i><span>المراجعة</span></li></ol>
      <div className="shipping-layout">
        <section className="shipping-content">
          <h1>طريقة التوصيل</h1>
          <label className={`delivery-option ${method === 'standard' ? 'selected' : ''}`}>
            <input type="radio" name="delivery" checked={method === 'standard'} onChange={() => setMethod('standard')} />
            <span><b>توصيل قياسي</b><small>يصل خلال 2-5 أيام عمل</small></span>
            <strong>25 ر.س</strong>
          </label>
          <label className={`delivery-option ${!isFreeAvailable ? 'disabled' : ''} ${method === 'free' ? 'selected' : ''}`}>
            <input type="radio" name="delivery" checked={method === 'free'} disabled={!isFreeAvailable} onChange={() => isFreeAvailable && setMethod('free')} />
            <span><b>توصيل مجاني</b><small>{isFreeAvailable ? 'متاح لطلبك (أكثر من 1000 ر.س)' : 'متوفر للطلبات التي تزيد عن 1000 ر.س'}</small></span>
            <strong>مجاني</strong>
          </label>
          <div className="shipping-address">
            <h2>معلومات التوصيل</h2>
            <div><span>رقم الجوال</span><b>+966 50 123 4567</b><button type="button" onClick={() => navigate('/checkout')}>تعديل</button></div>
            <div><span>العنوان</span><b>الرياض - حي العليا، شارع الملك فهد، 45</b><button type="button" onClick={() => navigate('/checkout')}>تعديل</button></div>
          </div>
          <button className="payment-button" onClick={() => navigate('/checkout/payment')}>متابعة الدفع <span>←</span></button>
        </section>
        <aside className="shipping-summary">
          <h2>ملخص الطلب</h2>
          {cartItems.map((item) => <div className="shipping-item" key={`${item.id}-${item.selectedSize}`}><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><small>{item.selectedSize} × {item.quantity}</small></div><b>{item.price * item.quantity} ر.س</b></div>)}
          <div className="shipping-row"><span>المجموع الفرعي</span><b>{subtotal} ر.س</b></div>
          {discount > 0 && <div className="shipping-row"><span>الخصم</span><b style={{ color: '#27ae60' }}>-{discount} ر.س</b></div>}
          <div className="shipping-row"><span>الشحن</span><b>{shipping ? `${shipping} ر.س` : 'مجاني'}</b></div>
          <div className="shipping-total"><span>الإجمالي</span><b>{total} ر.س</b></div>
          <form onSubmit={handleApplyCoupon} style={{ marginTop: '12px' }}>
            <div className="shipping-coupon">
              <input
                placeholder="أدخل رمز الكوبون"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  if (couponError) setCouponError('');
                }}
              />
              <button type="submit">تطبيق</button>
            </div>
            {couponError && <div style={{ color: '#dc2626', fontSize: '0.8rem', marginTop: '6px', fontWeight: '700', textAlign: 'center' }}>{couponError}</div>}
          </form>
        </aside>
      </div>
    </main><Footer />
  </div>;
}
