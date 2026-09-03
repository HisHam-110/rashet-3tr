import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WishlistPage.css';

export default function WishlistPage({ products = [], wishlistIds = [], onToggleWishlist, onAddToCart }) {
  const navigate = useNavigate();
  const favorites = products.filter((product) => wishlistIds.includes(product.id));

  return (
    <main className="wishlist-page" dir="rtl">
      <div className="wishlist-container">
        <div className="wishlist-heading">
          <p>الرئيسية / المفضلة</p>
          <h1>المفضلة</h1>
        </div>
        {favorites.length ? (
          <div className="wishlist-grid">
            {favorites.map((product) => (
              <article className="wishlist-card" key={product.id}>
                <button className="wishlist-remove" onClick={() => onToggleWishlist(product.id)} aria-label={`إزالة ${product.name} من المفضلة`}>×</button>
                <button className="wishlist-image" onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.name} />
                </button>
                <h2>{product.name}</h2>
                <p>{product.brand}</p>
                <strong>{product.price} ر.س</strong>
                <button className="wishlist-cart" onClick={() => onAddToCart(product)}>أضف إلى السلة</button>
              </article>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <span>♡</span>
            <h2>المفضلة فارغة</h2>
            <p>أضف العطور التي تحبها لتجدها هنا بسهولة.</p>
            <Link to="/perfumes">تصفح العطور</Link>
          </div>
        )}
      </div>
    </main>
  );
}
