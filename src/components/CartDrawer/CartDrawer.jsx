import React from 'react';
import './CartDrawer.css';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-title-wrap">
            <h3 className="cart-title">سلة المشتريات</h3>
            <span className="cart-count-pill">{cartItems.reduce((a, b) => a + b.quantity, 0)} منتج</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="إغلاق">
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="shipping-progress-box">
          {subtotal >= 300 ? (
            <div className="shipping-congrats">
              <span>🎉 مبروك! حصلت على شحن مجاني</span>
            </div>
          ) : (
            <div className="shipping-remaining">
              <span>أضف <strong>{300 - subtotal} ر.س</strong> للحصول على الشحن المجاني!</span>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${Math.min(100, (subtotal / 300) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-icon">🛍️</span>
              <h4>سلتك فارغة حالياً</h4>
              <p>استكشف تشكيلتنا الفاخرة واختر عطرك المفضل</p>
              <button className="browse-perfumes-btn" onClick={onClose}>
                تصفح العطور الآن
              </button>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.id}-${item.selectedSize || index}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      title="حذف من السلة"
                    >
                      ✕
                    </button>
                  </div>

                  <span className="cart-item-size">{item.selectedSize || '100 مل'}</span>

                  <div className="cart-item-bottom">
                    <div className="cart-item-qty">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-price">{item.price * item.quantity} ر.س</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-row">
              <span>المجموع الفرعي:</span>
              <span>{subtotal} ر.س</span>
            </div>
            <div className="cart-summary-row">
              <span>الشحن والتوصيل:</span>
              <span>{shipping === 0 ? 'مجاناً ✨' : `${shipping} ر.س`}</span>
            </div>
            <div className="cart-summary-row total">
              <span>الإجمالي النهائي:</span>
              <span className="final-price">{total} ر.س</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => alert(`شكراً لتسوقك من رشة عطر! الإجمالي: ${total} ر.س`)}
            >
              <span>إتمام الطلب والدفع الآمن</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
