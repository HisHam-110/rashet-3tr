import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './ReviewPage.css';

export default function ReviewPage({ cartItems = [] }) {
  const navigate = useNavigate();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const discount = Math.round(subtotal * 0.1);
  const shipping = subtotal >= 1000 ? 0 : 25;
  const total = subtotal - discount + shipping;
  if (!cartItems.length) return <main className="review-empty" dir="rtl"><h1>لا توجد منتجات لمراجعتها</h1><button onClick={() => navigate('/cart')}>العودة إلى السلة</button></main>;
  return <div className="review-page" dir="rtl"><main className="review-container">
    <div className="review-breadcrumb"><button onClick={() => navigate('/')}>الرئيسية</button><span>/</span><button onClick={() => navigate('/cart')}>السلة</button><span>/</span><strong>المراجعة</strong></div>
    <ol className="review-steps"><li className="done"><i>1</i><span>البيانات</span></li><li className="done"><i>2</i><span>الشحن</span></li><li className="done"><i>3</i><span>الدفع</span></li><li className="active"><i>4</i><span>المراجعة</span></li></ol>
    <header className="review-heading"><h1>مراجعة الطلب</h1><p>تأكد من تفاصيل طلبك قبل التأكيد</p></header>
    <div className="review-layout"><section className="review-details"><div className="review-products"><h2><span className="review-cart-icon"><img src="/icons/shopping-cart-02.svg" alt="" /></span>السلة ({cartItems.length})</h2>{cartItems.map((item) => <div className="review-product" key={`${item.id}-${item.selectedSize}`}><img src={item.image} alt={item.name}/><div><strong>{item.name}</strong><small>{item.selectedSize} × {item.quantity}</small></div><b>{item.price * item.quantity} ر.س</b></div>)}</div><div className="review-info"><div><span className="info-icon"><img src="/icons/Vector.svg" alt="" /></span><section><h2>عنوان التوصيل</h2><p>الرياض، المملكة العربية السعودية</p></section><button onClick={() => navigate('/checkout')}>تعديل</button></div><div><span className="info-icon"><img src="/icons/Container.svg" alt="" /></span><section><h2>طريقة الدفع</h2><p>Visa •••• 3456</p></section><button onClick={() => navigate('/checkout/payment')}>تعديل</button></div><div><span className="info-icon"><img src="/icons/shipping-truck-02.svg" alt="" /></span><section><h2>طريقة الشحن</h2><p>الشحن السريع (2 - 3 عمل)</p></section><button onClick={() => navigate('/checkout/shipping')}>تعديل</button></div></div></section><aside className="review-summary"><h2>ملخص الطلب</h2><div><span>المجموع الفرعي</span><b>{subtotal} ر.س</b></div><div><span>الخصم (RASHAT10)</span><b className="discount">-{discount} ر.س</b></div><div><span>الشحن</span><b>{shipping} ر.س</b></div><hr/><div className="review-total"><span>الإجمالي</span><b>{total} ر.س</b></div><button onClick={() => setIsConfirmationOpen(true)}>تأكيد الطلب <img src="/icons/Container shopiing.svg" alt="" /></button></aside></div>
  </main><Footer />{isConfirmationOpen && <div className="order-success-overlay" role="dialog" aria-modal="true" aria-labelledby="order-success-title"><div className="order-success-modal"><button className="order-success-close" onClick={() => setIsConfirmationOpen(false)} aria-label="إغلاق">×</button><div className="order-success-icon"><img src="/icons/security-check.svg" alt="" /></div><h2 id="order-success-title">تم تأكيد طلبك بنجاح</h2><p>شكراً لتسوقك من رشة عطر</p><button className="order-success-home" onClick={() => navigate('/')}>العودة للرئيسية</button></div></div>}</div>;
}
