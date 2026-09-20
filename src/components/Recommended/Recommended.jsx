import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommended.css";

import img16 from "../../assets/images/image 16.svg";
import img18 from "../../assets/images/image 18.svg";
import img20 from "../../assets/images/image 20.svg";
import img21 from "../../assets/images/image 21.svg";

export default function Products({
  products: suppliedProducts = [],
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) {
  const navigate = useNavigate();
  const fallbackProducts = [
    {
      id: 1,
      name: "عطر لوريس | Loris",
      type: "عطور رجالية، نسائية",
      price: "450",
      originalPrice: "580",
      oldPrice: "580",
      rating: 5,
      image: img21,
    },
    {
      id: 2,
      name: "عطر ليبر | Libre",
      type: "عطور رجالية، نسائية",
      price: "480",
      originalPrice: "620",
      oldPrice: "620",
      rating: 5,
      image: img20,
    },
    {
      id: 3,
      name: "عطر بكارات روج | Baccarat",
      type: "عطور نسائية",
      price: "550",
      originalPrice: "700",
      oldPrice: "700",
      rating: 5,
      image: img18,
    },
    {
      id: 4,
      name: "عطر مونت | Mount",
      type: "عطور رجالية",
      price: "420",
      originalPrice: "550",
      oldPrice: "550",
      rating: 5,
      image: img16,
    },
  ];

  const rawProducts = suppliedProducts && suppliedProducts.length > 0 ? suppliedProducts : fallbackProducts;
  const products = rawProducts.map((p) => ({
    ...p,
    oldPrice: p.oldPrice || p.originalPrice || (p.price ? Math.round(Number(p.price) * 1.25) : 580),
  }));

  /* =========================
     Ratings
  ========================= */

  const [ratings, setRatings] = useState(
    Object.fromEntries(
      products.map((product) => [
        product.id,
        product.rating,
      ])
    )
  );

  /* =========================
     Favorites
  ========================= */

  const [favorites, setFavorites] = useState(
    Object.fromEntries(
      products.map((product) => [
        product.id,
        false,
      ])
    )
  );

  /* =========================
     Change Rating
  ========================= */

  const handleRating = (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));
  };

  /* =========================
     Toggle Favorite
  ========================= */

  const handleFavorite = (productId) => {
    if (onToggleWishlist) {
      onToggleWishlist(productId);
      return;
    }
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <section
      className="products-section"
      id="products"
      dir="rtl"
    >
      <div className="products-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="products-header">

          {/* العنوان (يمين) */}
          <div className="products-title-wrapper">
            <h2 className="products-title">
              العطور
            </h2>
            <span className="products-title-line"></span>
          </div>

          {/* عرض الكل (شمال) */}
          <button
            type="button"
            className="show-all"
            onClick={(e) => {
              e.preventDefault();
              navigate('/collections');
            }}
          >
            <span>عرض الكل</span>
            <span className="show-all-arrow">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                <path d="M11.8799 26.5599L20.5732 17.8666C21.5999 16.8399 21.5999 15.1599 20.5732 14.1333L11.8799 5.43994" stroke="currentColor" strokeWidth="2.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>

        </div>


        {/* =================================
            PRODUCTS GRID
        ================================= */}

        <div className="products-grid">

          {products.slice(0, 4).map((product) => (

            (() => {
              const isWishlisted = onToggleWishlist
                ? wishlistIds.includes(product.id)
                : favorites[product.id];

              return (

            <article
              className="product-card"
              key={product.id}
              onClick={(event) => {
                if (event.target.closest('button')) return;
                navigate(`/product/${product.id}`);
              }}
              role="link"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(`/product/${product.id}`);
                }
              }}
            >

              {/* =================================
                  IMAGE
              ================================= */}

              <div className="product-image-wrapper">
                {/* Soft Discount Badge on Top Corner */}
                {(() => {
                  const oldP = Number(product.oldPrice || product.originalPrice || Math.round(Number(product.price || 0) * 1.25));
                  const currP = Number(product.price || 0);
                  const discount = (oldP && currP && oldP > currP) ? Math.round(((oldP - currP) / oldP) * 100) : 20;
                  return (
                    <span className="card-top-discount-badge">خصم {discount}%</span>
                  );
                })()}

                {/* =========================
                    FAVORITE
                ========================= */}

                <button
                  type="button"
                  className={`favorite-btn ${
                    isWishlisted
                      ? "liked"
                      : ""
                  }`}
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    handleFavorite(product.id);
                  }}
                  aria-label={
                    isWishlisted
                      ? "إزالة من المفضلة"
                      : "إضافة إلى المفضلة"
                  }
                >

                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill={
                      isWishlisted
                        ? "currentColor"
                        : "none"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >

                    <path
                      d="M20.84 4.61C19.84 3.61 18.49 3.05 17.09 3.05C15.69 3.05 14.34 3.61 13.34 4.61L12 5.95L10.66 4.61C8.58 2.53 5.21 2.53 3.13 4.61C1.05 6.69 1.05 10.06 3.13 12.14L12 21L20.87 12.14C22.95 10.06 22.95 6.69 20.84 4.61Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                  </svg>

                </button>


                {/* =========================
                    PRODUCT IMAGE
                ========================= */}

                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="product-image"
                  />
                )}

              </div>


              {/* =================================
                  CONTENT
              ================================= */}

              <div className="product-content">

                {/* =========================
                    PRODUCT NAME & RATING
                ========================= */}

                <div className="product-name-row">
                  <h3 className="product-name" title={product.name}>
                    {product.name}
                  </h3>
                  <div className="product-rating-badge" aria-label={`تقييم ${(Number(product.rating) || 4.8).toFixed(1)} من 5`}>
                    <span className="rating-val-text">({(Number(product.rating) || 4.8).toFixed(1)})</span>
                    <span className="rating-star-single">★</span>
                  </div>
                </div>


                {/* =========================
                    TYPE
                ========================= */}

                <p className="product-type">
                  {product.type || (product.category === 'women' ? 'عطور نسائية' : product.category === 'men' ? 'عطور رجالية' : 'عطور رجالية، نسائية')}
                </p>


                {/* =================================
                    PRICE
                ================================= */}

                <div className="product-price-row">
                  <div className="product-current-price">
                    <span className="price-value">
                      {product.price}
                    </span>
                    <img
                      src="/icons/saudi-riyal.svg"
                      alt="ر.س"
                      className="riyal-icon"
                    />
                  </div>

                  {(product.oldPrice || product.originalPrice) && (
                    <div className="product-old-price">
                      <span className="old-price-value">
                        {product.oldPrice || product.originalPrice}
                      </span>
                      <img
                        src="/icons/saudi-riyal-2.svg"
                        alt="ر.س"
                        className="old-riyal-icon"
                      />
                    </div>
                  )}
                </div>


                {/* =================================
                    ADD TO CART
                ================================= */}

<button
  type="button"
  className="add-to-cart"
  onClick={(event) => {
    event.stopPropagation();
    onAddToCart?.(product);
  }}
>
  <span className="add-to-cart-text">
    أضف إلى السلة
  </span>

  <span className="cart-icon">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 4H5L7.4 15.2C7.63 16.28 8.59 17 9.69 17H17.5C18.53 17 19.44 16.35 19.75 15.37L21 11H6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="10"
        cy="20"
        r="1.3"
        fill="currentColor"
      />

      <circle
        cx="18"
        cy="20"
        r="1.3"
        fill="currentColor"
      />
    </svg>
  </span>
</button>
              </div>

            </article>

              );
            })()

          ))}

        </div>

      </div>
    </section>
  );
}
