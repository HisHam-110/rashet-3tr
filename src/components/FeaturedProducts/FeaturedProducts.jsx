import React, { useEffect, useState } from "react";
import { signaturePerfumeStory } from "../../data/perfumesData";
import "./FeaturedProducts.css";

export default function PerfumeNotes({
  onAddToCart,
  onOpenProductDetails,
}) {
  const story = signaturePerfumeStory;

  const notes = story?.notesPyramid || [];

  const [activeIndex, setActiveIndex] = useState(0);

  /* =========================================
     AUTO SLIDE
  ========================================= */

  useEffect(() => {
    if (notes.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % notes.length;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [notes.length]);


  /* =========================================
     GET ITEM
  ========================================= */

  const getItem = (offset) => {
    if (!notes.length) return null;

    const index =
      (activeIndex + offset + notes.length) % notes.length;

    return notes[index];
  };


  const previousItem = getItem(-1);
  const currentItem = getItem(0);
  const nextItem = getItem(1);


  if (!notes.length) {
    return null;
  }


  /* =========================================
     MANUAL NAVIGATION
  ========================================= */

  const goNext = () => {
    setActiveIndex((current) => {
      return (current + 1) % notes.length;
    });
  };

  const goPrevious = () => {
    setActiveIndex((current) => {
      return (
        (current - 1 + notes.length) %
        notes.length
      );
    });
  };


  return (
    <section
      className="perfume-story-section"
      id="perfume-story"
    >

      {/* =========================================
          HEADER
      ========================================= */}

      <div className="perfume-story-header">

        <span className="perfume-story-tag">
          الهرم العطري والأصالة
        </span>

        <h2 className="perfume-story-title">
          عن العطر | أسرار التكوين
        </h2>

        <p className="perfume-story-subtitle">
          رحلة حسية ساحرة عبر طبقات النوتات العطرية الثلاث
        </p>

        <div className="perfume-story-line"></div>

      </div>


      {/* =========================================
          WHITE CAROUSEL BOX
      ========================================= */}

      <div className="perfume-carousel-box">

        {/* =========================================
            CAROUSEL
        ========================================= */}

        <div className="perfume-carousel">

          {/* =========================================
              PREVIOUS IMAGE
          ========================================= */}

          <div
            className="perfume-slide perfume-slide-left"
            onClick={goPrevious}
          >

            <img
              src={previousItem.image}
              alt={previousItem.level || ""}
              className="perfume-slide-image"
            />

            <div className="perfume-slide-overlay"></div>

            <div className="perfume-slide-info">

              <span className="perfume-slide-level">
                {previousItem.level}
              </span>

              <p>
                {previousItem.desc}
              </p>

            </div>

          </div>


          {/* =========================================
              CURRENT / CENTER IMAGE
          ========================================= */}

          <div
            className="perfume-slide perfume-slide-center"
          >

            <img
              src={currentItem.image}
              alt={currentItem.level || ""}
              className="perfume-slide-image"
            />

            <div className="perfume-slide-overlay"></div>

            <div className="perfume-slide-info">

              <span className="perfume-slide-level">
                {currentItem.level}
              </span>

              <p>
                {currentItem.desc}
              </p>

              {currentItem.ingredients &&
                currentItem.ingredients.length > 0 && (
                  <div className="perfume-ingredients">

                    {currentItem.ingredients
                      .slice(0, 3)
                      .map((ingredient, index) => (
                        <span
                          key={index}
                          className="perfume-ingredient"
                        >
                          {ingredient}
                        </span>
                      ))}

                  </div>
                )}

            </div>

          </div>


          {/* =========================================
              NEXT IMAGE
          ========================================= */}

          <div
            className="perfume-slide perfume-slide-right"
            onClick={goNext}
          >

            <img
              src={nextItem.image}
              alt={nextItem.level || ""}
              className="perfume-slide-image"
            />

            <div className="perfume-slide-overlay"></div>

            <div className="perfume-slide-info">

              <span className="perfume-slide-level">
                {nextItem.level}
              </span>

              <p>
                {nextItem.desc}
              </p>

            </div>

          </div>


          {/* =========================================
              ARROWS
          ========================================= */}

          <button
            type="button"
            className="perfume-carousel-arrow perfume-arrow-right"
            onClick={goPrevious}
            aria-label="الصورة السابقة"
          >
            ‹
          </button>

          <button
            type="button"
            className="perfume-carousel-arrow perfume-arrow-left"
            onClick={goNext}
            aria-label="الصورة التالية"
          >
            ›
          </button>

        </div>


        {/* =========================================
            DOTS
        ========================================= */}

        <div className="perfume-carousel-dots">

          {notes.map((note, index) => (
            <button
              key={index}
              type="button"
              className={`perfume-dot ${
                activeIndex === index
                  ? "active"
                  : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`الصورة ${index + 1}`}
            />
          ))}

        </div>


        {/* =========================================
            BOTTOM STORY
        ========================================= */}

        <div className="perfume-story-bottom">

          <div className="perfume-story-bottom-content">

            <span className="perfume-brand">
              {story.brand}
            </span>

            <h3>
              {story.name}
            </h3>

            <p>
              {story.quote}
            </p>

          </div>


          <button
            type="button"
            className="perfume-story-button"
            onClick={() => {
              if (onOpenProductDetails) {
                onOpenProductDetails(story);
              }
            }}
          >
            استكشف العطر

            <span>
              ←
            </span>

          </button>

        </div>

      </div>

    </section>
  );
}