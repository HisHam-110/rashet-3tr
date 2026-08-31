import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './CheckoutPage.css';

import { checkoutApi } from '../../services/storeApi';

const regions = ['الرياض', 'مكة المكرمة', 'المدينة المنورة', 'المنطقة الشرقية', 'القصيم'];

export default function CheckoutPage({ cartItems = [] }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', phone: '', name: '', region: '', city: '', address: '', notes: '', save: false });
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const shipping = subtotal >= 1000 ? 0 : 25;
  const total = subtotal + shipping;

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!cartItems.length) return navigate('/cart');
    try {
      await checkoutApi.saveShippingAddress({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        shipping_city: form.city || form.region,
        shipping_street: form.address,
        shipping_notes: form.notes,
      });
    } catch (err) {
      // Proceed gracefully
    }
    navigate('/checkout/shipping');
  };

  if (!cartItems.length) {
    return <main className="checkout-empty" dir="rtl"><h1>لا توجد منتجات لإتمام الطلب</h1><button onClick={() => navigate('/cart')}>العودة إلى السلة</button></main>;
  }

  return (
    <div className="checkout-page" dir="rtl">
      <main className="checkout-container">
        <div className="checkout-breadcrumb"><button onClick={() => navigate('/')}>الرئيسية</button><span>/</span><button onClick={() => navigate('/cart')}>السلة</button><span>/</span><strong>إتمام الطلب</strong></div>
        <ol className="checkout-steps" aria-label="خطوات إتمام الطلب">
          <li className="is-active"><i>1</i><span>الشحن</span></li><li><i>2</i><span>الدفع</span></li><li><i>3</i><span>التأكيد</span></li><li><i>4</i><span>المراجعة</span></li>
        </ol>
        <div className="checkout-grid">
          <section className="checkout-form-card">
            <h1>معلومات الاتصال</h1>
            <form onSubmit={submit}>
              <label>البريد الإلكتروني<input name="email" type="email" value={form.email} onChange={update} placeholder="example@domain.com" required /></label>
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
              <label className="check-label"><input name="save" type="checkbox" checked={form.save} onChange={update} /> أرسل لي العروض الحصرية والأخبار</label>
              <h2>عنوان الشحن</h2>
              <label>الاسم الكامل<input name="name" value={form.name} onChange={update} placeholder="الاسم الكامل" required /></label>
              <label>المنطقة<select name="region" value={form.region} onChange={update} required><option value="">اختر المنطقة</option>{regions.map((region) => <option key={region}>{region}</option>)}</select></label>
              <label>الحي<input name="city" value={form.city} onChange={update} placeholder="اسم الحي" required /></label>
              <label>العنوان بالتفصيل<input name="address" value={form.address} onChange={update} placeholder="اسم الشارع ورقم الشقة" required /></label>
              <label>ملاحظات التوصيل (اختياري)<textarea name="notes" value={form.notes} onChange={update} placeholder="أي ملاحظات خاصة بالتوصيل..." rows="3" /></label>
              <div className="checkout-actions"><button type="button" className="back" onClick={() => navigate('/cart')}>العودة للسلة</button><button type="submit" className="continue">متابعة للدفع</button></div>
            </form>
          </section>
          <aside className="checkout-summary"><h2>ملخص الطلب</h2>{cartItems.map((item) => <div className="checkout-item" key={`${item.id}-${item.selectedSize}`}><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><small>{item.selectedSize} × {item.quantity}</small></div><b>{item.price * item.quantity} ر.س</b></div>)}<div className="summary-line"><span>المجموع الفرعي</span><b>{subtotal} ر.س</b></div><div className="summary-line"><span>الشحن</span><b>{shipping ? `${shipping} ر.س` : 'مجاني'}</b></div><div className="summary-total"><span>الإجمالي</span><b>{total} ر.س</b></div></aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
