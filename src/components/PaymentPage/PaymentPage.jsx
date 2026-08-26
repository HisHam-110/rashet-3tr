import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './PaymentPage.css';

export default function PaymentPage({ cartItems = [] }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const shipping = subtotal > 199 ? 0 : 25;
  const total = subtotal + shipping;
  if (!cartItems.length) return <main className="payment-empty" dir="rtl"><h1>لا توجد منتجات لإتمام الطلب</h1><button onClick={() => navigate('/cart')}>العودة إلى السلة</button></main>;
  return <div className="payment-page" dir="rtl"><main className="payment-container">
    <div className="payment-breadcrumb"><button onClick={() => navigate('/')}>الرئيسية</button><span>/</span><button onClick={() => navigate('/cart')}>السلة</button><span>/</span><strong>الدفع</strong></div>
    <ol className="payment-steps"><li className="done"><i>1</i><span>البيانات</span></li><li className="done"><i>2</i><span>الشحن</span></li><li className="active"><i>3</i><span>الدفع</span></li><li><i>4</i><span>المراجعة</span></li></ol>
    <div className="payment-layout"><section className="payment-content"><h1>طريقة الدفع</h1><p>اختر طريقة الدفع المناسبة لديك لإتمام الطلب بأمان</p>
      <label className={`payment-option ${method === 'apple' ? 'selected' : ''}`}><input type="radio" name="payment" checked={method === 'apple'} onChange={() => setMethod('apple')} /><span className="apple-logo"> Pay</span><b>Apple Pay</b></label>
      <label className={`payment-option ${method === 'mada' ? 'selected' : ''}`}><input type="radio" name="payment" checked={method === 'mada'} onChange={() => setMethod('mada')} /><span className="mada-logo">مدى</span><b>مدى</b></label>
      <div className={`card-payment ${method === 'card' ? 'selected' : ''}`}><label className="card-heading"><input type="radio" name="payment" checked={method === 'card'} onChange={() => setMethod('card')} /><span className="visa-logo">VISA</span><b>البطاقة البنكية</b></label>{method === 'card' && <div className="card-fields"><label>رقم البطاقة<input inputMode="numeric" placeholder="1234 5678 9012 3456" /></label><div><label>تاريخ الانتهاء<input placeholder="MM/YY" /></label><label>رمز التحقق (CVV)<input placeholder="•••" /></label></div><label className="save-card"><input type="checkbox" /> حفظ بيانات البطاقة لعمليات الدفع المستقبلية</label></div>}</div>
      <label className={`payment-option cash ${method === 'cash' ? 'selected' : ''}`}><input type="radio" name="payment" checked={method === 'cash'} onChange={() => setMethod('cash')} /><span>🛵</span><b>الدفع عند الاستلام</b></label>
      <button className="review-button" onClick={() => navigate('/checkout/review')}>متابعة المراجعة <span>←</span></button><small className="secure-text">🔒 دفع آمن ومشفّر 100%</small>
    </section><aside className="payment-summary"><h2>ملخص الطلب</h2>{cartItems.map((item) => <div className="checkout-payment-item" key={`${item.id}-${item.selectedSize}`}><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><small>{item.selectedSize} × {item.quantity}</small></div><b>{item.price * item.quantity} ر.س</b></div>)}<div className="payment-row"><span>المجموع الفرعي</span><b>{subtotal} ر.س</b></div><div className="payment-row"><span>الشحن</span><b>{shipping ? `${shipping} ر.س` : 'مجاني'}</b></div><div className="payment-total"><span>الإجمالي</span><b>{total} ر.س</b></div><div className="payment-coupon"><input placeholder="أدخل رمز الكوبون"/><button>تطبيق</button></div></aside></div>
  </main><Footer /></div>;
}
