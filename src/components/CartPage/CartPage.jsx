import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './CartPage.css';

export default function CartPage({
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onToggleWishlist,
  wishlistIds = [],
}) {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('RASHAT10');
  const [discountPercent, setDiscountPercent] = useState(0); // Can be updated if coupon applied
  const [productToRemove, setProductToRemove] = useState(null);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 199 || subtotal === 0 ? 0 : 25;
  const discount = subtotal * (discountPercent / 100);
  const total = subtotal - discount + shipping;

  // Free shipping progress calculation (target 199 or 150 as in screen: "باقي 150 ريال للحصول على الشحن المجاني")
  // Let's use 199 since it's the website policy from announcement bar "شحن مجاني للطلبات فوق 199 ريال"
  const freeShippingThreshold = 199;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'RASHAT10') {
      setDiscountPercent(10); // 10% discount
      alert('تم تطبيق الكوبون بنجاح! خصم 10%');
    } else {
      alert('كوبون غير صالح');
    }
  };

  return (
    <div className="cart-page-wrapper" dir="rtl">
      {/* Top Header & Breadcrumb */}
      <div className="cap-top-bar">
        <div className="cap-container">
          <div className="cap-breadcrumb">
            <span className="cap-bc-link" onClick={() => navigate('/')}>الرئيسية</span>
            <span className="cap-bc-sep">/</span>
            <span className="cap-bc-current">السلة</span>
          </div>
          <h1 className="cap-page-title">سلة التسوق</h1>
          <p className="cap-cart-count-desc">لديك {cartItems.length} منتجات في السلة</p>
        </div>
      </div>

      <div className="cap-container cap-main-content">
        {cartItems.length === 0 ? (
          <div className="cap-empty-cart">
            <div className="cap-empty-icon">🛒</div>
            <h2>سلة التسوق فارغة</h2>
            <p>ابدأ بإضافة بعض العطور الرائعة إلى سلتك الآن!</p>
            <button className="cap-shop-btn" onClick={() => navigate('/perfumes')}>
              تصفح العطور
            </button>
          </div>
        ) : (
          <div className="cap-grid">
            {/* Right Column: Cart items and Coupon */}
            <div className="cap-right-col">
              
              {/* Shipping Progress Bar Banner */}
              <div className="cap-shipping-banner">
                {remainingForFreeShipping > 0 ? (
                  <p className="cap-shipping-text">
                    باقي <span>{remainingForFreeShipping} ريال</span> للحصول على الشحن المجاني
                  </p>
                ) : (
                  <p className="cap-shipping-text cap-free-success">
                    تهانينا! لقد حصلت على <span>شحن مجاني</span> لطلبك! 🎉
                  </p>
                )}
                <div className="cap-progress-bar-bg">
                  <div 
                    className="cap-progress-bar-fill" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="cap-delivery-icon">
                  <img src="../../public/icons/shipping-truck-02.svg" alt="Apple Pay" />

                </div>
              </div>

              {/* Items List */}
              <div className="cap-items-list">
                {cartItems.map((item) => {
                  const isWishlisted = wishlistIds.includes(item.id);
                  const originalPrice = item.originalPrice || Math.round(item.price * 1.3); // Dummy original price if none exists

                  return (
                    <div className="cap-item-card" key={`${item.id}-${item.selectedSize}`}>
                      <div className="cap-item-image-wrap">
                        <img src={item.image} alt={item.name} />
                      </div>
                      
                      <div className="cap-item-details">
                        <div className="cap-item-header">
                          <h3 className="cap-item-name">{item.name}</h3>
                          <span className="cap-item-category">
                            {item.category === 'men' ? 'عطور رجالية' : item.category === 'women' ? 'عطور نسائية' : 'عطور للجنسين'} - {item.selectedSize}
                          </span>
                        </div>

                        {/* Quantity Controls (under name) */}
                        <div className="cap-qty-section">
                          <div className="cap-qty-selector">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Left Block: Price and Actions */}
                      <div className="cap-item-left-block">
                        {/* Price display */}
                        <div className="cap-price-section">
                          <span className="cap-item-price">
                            {item.price * item.quantity}
                            <img src="../../public/icons/saudi-riyal.svg" alt="ر.س" className="cap-riyal-icon" />
                          </span>
                          {originalPrice && (
                            <span className="cap-item-original-price">
                              {originalPrice * item.quantity}
                              <img src="../../public/icons/saudi-riyal-2.svg" alt="ر.س" className="cap-riyal-icon cap-riyal-icon-old" />
                            </span>
                          )}
                        </div>

                        <div className="cap-item-actions">
                          {/* Remove button */}
                          <button 
                            className="cap-action-btn cap-delete-btn"
                            onClick={() => setProductToRemove(item)}
                            title="حذف"
                          >
                            <img src="../../public/icons/delete-03.svg" alt="حذف" width="18" height="18" />
                          </button>
                          
                          {/* Wishlist toggle */}
                          <button 
                            className={`cap-action-btn cap-wish-btn ${isWishlisted ? 'liked' : ''}`}
                            onClick={() => onToggleWishlist && onToggleWishlist(item.id)}
                            title="إضافة للمفضلة"
                          >
                            <svg 
                              width="18" 
                              height="18" 
                              viewBox="0 0 24 24" 
                              fill={isWishlisted ? '#905b30' : 'none'} 
                              stroke={isWishlisted ? '#905b30' : 'currentColor'} 
                              strokeWidth="2"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Box */}
              <div className="cap-coupon-card">
                <h3>لديك كوبون خصم؟</h3>
                <form className="cap-coupon-form" onSubmit={handleApplyCoupon}>
                  <input
                    type="text"
                    placeholder="أدخل رمز الكوبون..."
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <button type="submit">تطبيق</button>
                </form>
              </div>

            </div>

            {/* Left Column: Order Summary */}
            <div className="cap-left-col">
              <div className="cap-summary-card">
                <h2>ملخص الطلب</h2>
                
                <div className="cap-summary-row">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ر.س</span>
                </div>

                <div className="cap-summary-row">
                  <span>الخصم</span>
                  <span className={discount > 0 ? 'cap-discount-active' : ''}>
                    {discount > 0 ? `-${discount} ر.س` : '0 ر.س'}
                  </span>
                </div>

                <div className="cap-summary-row">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? 'مجاني' : `${shipping} ر.س`}</span>
                </div>

                <div className="cap-summary-total-divider"></div>

                <div className="cap-summary-row cap-summary-total">
                  <span>الإجمالي</span>
                  <span>{total} ر.س</span>
                </div>

                <button 
                  className="cap-checkout-btn"
                  onClick={() => alert('جاري الانتقال لإتمام الطلب والدفع...')}
                >
                  إتمام الطلب
                </button>

                <div className="cap-secure-badge">
                  <span>تسوق آمن ومضمون 100%</span>
                  <div className="cap-payment-icons">
                    <img src="../../public/icons/image 62.svg" alt="Mada" />
                    <img src="../../public/icons/image 10.svg" alt="Visa" />
                    <img src="../../public/icons/image 60.svg" alt="Apple Pay" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {productToRemove && (
        <div className="cap-modal-overlay">
          <div className="cap-modal-card">
            <button className="cap-modal-close-btn" onClick={() => setProductToRemove(null)}>
              ✕
            </button>
            <div className="cap-modal-icon-wrap">
              <div className="cap-modal-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
            </div>
            <h2 className="cap-modal-title">إزالة المنتج؟</h2>
            <p className="cap-modal-desc">
              هل أنت متأكد من رغبتك في حذف {productToRemove.name} من سلة التسوق؟
            </p>
            <div className="cap-modal-buttons">
              <button 
                className="cap-modal-btn cap-modal-remove-btn"
                onClick={() => {
                  onRemoveItem(productToRemove.id, productToRemove.selectedSize);
                  setProductToRemove(null);
                }}
              >
                إزالة المنتج
              </button>
              <button 
                className="cap-modal-btn cap-modal-cancel-btn"
                onClick={() => setProductToRemove(null)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
