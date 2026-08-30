import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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

        {/* Cart Items List */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <span className="empty-icon">🛍️</span>
              <h4>سلتك فارغة حالياً</h4>
              <p>استكشف تشكيلتنا الفاخرة واختر عطرك المفضل</p>
              <button
                className="browse-perfumes-btn"
                onClick={() => {
                  onClose();
                  navigate('/perfumes');
                }}
              >
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
                    <button className="cart-item-remove" onClick={() => onRemoveItem(item.id, item.selectedSize)} title="حذف من السلة">✕</button>
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
              <span>الإجمالي:</span>
              <span>{subtotal} ر.س</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
            >
              <span>إتمام الطلب</span>
            </button>
            <button
              className="view-cart-btn"
              onClick={() => {
                onClose();
                navigate('/cart');
              }}
            >
              عرض السلة
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
