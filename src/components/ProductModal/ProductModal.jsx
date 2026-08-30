import React, { useState } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? '100 مل');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedSize,
    }, quantity);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="إغلاق">
          ✕
        </button>

        <div className="modal-grid">
          {/* Product Image */}
          <div className="modal-img-wrap">
            <img src={product.image} alt={product.name} className="modal-img" />
            {product.tag && <span className="modal-tag">{product.tag}</span>}
          </div>

          {/* Product Details */}
          <div className="modal-content">
            <div className="modal-brand">{product.brand}</div>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating-row">
              <span className="modal-stars">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="modal-rating-val">{product.rating}</span>
              <span className="modal-reviews">({product.reviewsCount} تقييم حقيقي)</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-current-price">{product.price} ر.س</span>
              {product.originalPrice && (
                <span className="modal-old-price">{product.originalPrice} ر.س</span>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            {/* Olfactory Notes Breakdown */}
            <div className="modal-notes-section">
              <h4 className="modal-section-title">الهرم العطري والمكونات:</h4>
              <div className="modal-notes-grid">
                {product.topNotes && (
                  <div className="modal-note-box">
                    <span className="note-type">🌿 النوتات العليا</span>
                    <span className="note-items">{product.topNotes.join('، ')}</span>
                  </div>
                )}
                {product.middleNotes && (
                  <div className="modal-note-box">
                    <span className="note-type">🪵 النوتات الوسطى</span>
                    <span className="note-items">{product.middleNotes.join('، ')}</span>
                  </div>
                )}
                {product.baseNotes && (
                  <div className="modal-note-box">
                    <span className="note-type">✨ النوتات الأساسية</span>
                    <span className="note-items">{product.baseNotes.join('، ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="modal-size-section">
                <span className="size-label">اختر الحجم:</span>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="modal-action-row">
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className="modal-add-cart-btn" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>إضافة إلى السلة ({product.price * quantity} ر.س)</span>
              </button>

              <button
                className={`modal-fav-btn ${isWishlisted ? 'favorited' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                title="المفضلة"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={isWishlisted ? '#c5a880' : 'none'} stroke={isWishlisted ? '#c5a880' : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
