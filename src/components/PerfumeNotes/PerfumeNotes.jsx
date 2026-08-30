import React, { useEffect, useState } from "react";
import "./PerfumeNotes.css";

export default function ProductShowcase({ products = [], onOpenProductDetails }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = products.length ? products : [];

  useEffect(() => {
    if (items.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const getItem = (offset) => {
    const index =
      (activeIndex + offset + items.length) % items.length;

    return items[index];
  };

  return (
    <section className="showcase-section">
      <div className="showcase-container">

        <div className="showcase-top-line"></div>

        <div className="showcase-slider">

          {/* الصورة اليسار */}
          <div
            className="showcase-card showcase-left"
            onClick={() => onOpenProductDetails?.(getItem(-1))}
            role="link"
            tabIndex={0}
          >
            <img
              src={getItem(-1)?.image}
              alt={getItem(-1)?.name || ""}
            />

            <div className="showcase-overlay"></div>

            <div className="showcase-content">
              <h3>
                {getItem(-1)?.name || "استمتع بالعطور الفاخرة"}
              </h3>

              <p>
                {getItem(-1)?.type || "Oud Attar | عطر عود"}
              </p>

              <span>
                {getItem(-1)?.price || "450"} ر.س
              </span>
            </div>
          </div>


          {/* الصورة الأساسية في المنتصف */}
          <div
            className="showcase-card showcase-center"
            onClick={() => onOpenProductDetails?.(getItem(0))}
            role="link"
            tabIndex={0}
          >
            <img
              src={getItem(0)?.image}
              alt={getItem(0)?.name || ""}
            />

            <div className="showcase-overlay"></div>

            <div className="showcase-content">
              <h3>
                {getItem(0)?.name || "استمتع بالعطور الفاخرة"}
              </h3>

              <p>
                {getItem(0)?.type || "Oud Attar | عطر عود"}
              </p>

              <span>
                {getItem(0)?.price || "450"} ر.س
              </span>

              <button
                className="showcase-cart"
                onClick={(event) => {
                  event.stopPropagation();
                  onOpenProductDetails?.(getItem(0));
                }}
              >
                أضف إلى السلة
              </button>
            </div>
          </div>


          {/* الصورة اليمين */}
          <div
            className="showcase-card showcase-right"
            onClick={() => onOpenProductDetails?.(getItem(1))}
            role="link"
            tabIndex={0}
          >
            <img
              src={getItem(1)?.image}
              alt={getItem(1)?.name || ""}
            />

            <div className="showcase-overlay"></div>

            <div className="showcase-content">
              <h3>
                {getItem(1)?.name || "استمتع بالعطور الفاخرة"}
              </h3>

              <p>
                {getItem(1)?.type || "Oud Attar | عطر عود"}
              </p>

              <span>
                {getItem(1)?.price || "450"} ر.س
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
