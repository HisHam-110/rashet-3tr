import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommended.css";

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
      rating: 5,
      image: "../../src/assets/images/image 21.svg",
    },
    {
      id: 2,
      name: "عطر ليبر | Libre",
      type: "عطور رجالية، نسائية",
      price: "450",
      rating: 5,
      image: "../../src/assets/images/image 20.svg",
    },
    {
      id: 3,
      name: "عطر بكارات روج | Baccarat",
      type: "عطور نسائية",
      price: "450",
      rating: 5,
      image: "../../src/assets/images/image 18.svg",
    },
    {
      id: 4,
      name: "عطر مونت | Mount",
      type: "عطور رجالية",
      price: "450",
      rating: 5,
      image: "../../src/assets/images/image 16.svg",
    },
  ];

  const products = suppliedProducts.length ? suppliedProducts.slice(0, 4) : fallbackProducts;

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

          {/* عرض الكل */}

          <button
            type="button"
            className="show-all"
            onClick={(e) => {
              e.preventDefault();
              navigate('/perfumes');
            }}
          >
            <span>عرض الكل</span>

            <span className="show-all-arrow">
              ‹
            </span>
          </button>

          {/* العنوان */}

          <div className="products-title-wrapper">

            <h2 className="products-title">
              العطور
            </h2>

            <span className="products-title-line"></span>

          </div>

        </div>


        {/* =================================
            PRODUCTS GRID
        ================================= */}

        <div className="products-grid">

          {products.map((product) => (

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
                    className="product-image"
                  />

                )}

              </div>


              {/* =================================
                  CONTENT
              ================================= */}

              <div className="product-content">

                {/* =========================
                    PRODUCT NAME
                ========================= */}

                <h3 className="product-name">
                  {product.name}
                </h3>


                {/* =========================
                    RATING
                ========================= */}

                <div
                  className="product-rating"
                  aria-label={`تقييم ${ratings[product.id]} من 5`}
                >

                  {Array.from(
                    { length: 5 },
                    (_, index) => {

                      const starNumber = index + 1;

                      return (

                        <button
                          key={starNumber}
                          type="button"
                          className={`rating-star ${
                            starNumber <=
                            ratings[product.id]
                              ? "active"
                              : ""
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRating(
                              product.id,
                              starNumber
                            );
                          }}
                          aria-label={`تقييم ${starNumber} نجوم`}
                        >

                          ★

                        </button>

                      );

                    }
                  )}

                </div>


                {/* =========================
                    TYPE
                ========================= */}

                <p className="product-type">
                  {product.type}
                </p>


                {/* =================================
                    PRICE
                ================================= */}

                <div className="product-price-row">

                  {/* السعر الجديد + أيقونة الريال */}

                  <div className="product-current-price">

                    <span className="price-value">
                      {product.price}
                    </span>

                    <img
                      src="/icons/Group 34319.svg"
                      alt="ريال سعودي"
                      className="riyal-icon"
                    />

                  </div>


                  {/* الأيقونة بدل السعر القديم */}

                  <img
                    src="/icons/saudi-riyal.svg"
                    alt=""
                    className="old-price-icon"
                    aria-hidden="true"
                  />

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
