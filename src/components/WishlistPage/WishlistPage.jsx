import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WishlistPage.css';
import { productsData } from '../../data/perfumesData';
import { productsApi } from '../../services/storeApi';

import img16 from '../../assets/images/image 16.svg';
import img18 from '../../assets/images/image 18.svg';
import img20 from '../../assets/images/image 20.svg';
import img21 from '../../assets/images/image 21.svg';
import img68 from '../../assets/images/image 68.svg';
import img69 from '../../assets/images/image 69.svg';
import img72 from '../../assets/images/image 72.svg';

const LOCAL_FALLBACKS = [
  { id: 1, name: 'عطر عود | Oud Attar', brand: 'رشة عطر', price: 450, image: img69 },
  { id: 2, name: 'عطر لوريس | Loris', brand: 'لوريس بارفيوم', price: 450, image: img21 },
  { id: 3, name: 'عطر ليبر | Libre', brand: 'إيف سان لوران', price: 480, image: img20 },
  { id: 4, name: 'عطر بكارات روج | Baccarat', brand: 'ميسون فرانسيس', price: 550, image: img18 },
  { id: 5, name: 'عطر مونت | Mount', brand: 'مونت بارفيوم', price: 420, image: img16 },
  { id: 6, name: 'مجموعة الصيف', brand: 'رشة عطر', price: 490, image: img68 },
  { id: 7, name: 'المجموعة الكاملة', brand: 'رشة عطر الملكية', price: 890, image: img72 },
  ...productsData,
];

export default function WishlistPage({ products: propProducts = [], wishlistIds = [], onToggleWishlist, onAddToCart }) {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState(propProducts && propProducts.length > 0 ? propProducts : []);

  useEffect(() => {
    if (propProducts && propProducts.length > 0) {
      setAllProducts(propProducts);
    } else {
      productsApi.list()
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setAllProducts(data);
          }
        })
        .catch(() => {});
    }
  }, [propProducts]);

  // Merge loaded products with local fallbacks to ensure every wishlisted ID resolves to a product card
  const catalogue = [...allProducts, ...LOCAL_FALLBACKS];

  const favorites = wishlistIds
    .map((wishId) => catalogue.find((p) => String(p.id) === String(wishId)))
    .filter(Boolean)
    // deduplicate by id
    .filter((prod, index, self) => index === self.findIndex((t) => String(t.id) === String(prod.id)));

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
