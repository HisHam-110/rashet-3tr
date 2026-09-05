import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CollectionsSection.css';

import { categoriesApi } from '../../services/storeApi';

// Real local assets as backup
import img69 from '../../assets/images/image 69.svg';
import img68 from '../../assets/images/image 68.svg';
import img72 from '../../assets/images/image 72.svg';
import img73 from '../../assets/images/image 73 (1).svg';
import imgAbout from '../../assets/images/About.svg';
import imgHero from '../../assets/images/Hero Section (1).svg';

const FALLBACK_CARDS = [
  {
    id: 1,
    name_ar: 'عطور النيش الحصرية',
    name_en: "Men's",
    slug: 'mens',
    title: 'عطور النيش الحصرية',
    description: 'مجموعة حصرية نادرة',
    description_ar: 'مجموعة حصرية نادرة',
    image: 'https://rashet-etr.growfet.com/api/img/category/image-72-dnmglmz8.png',
    fallback: img72,
    alt: 'عطور النيش الحصرية',
  },
  {
    id: 2,
    name_ar: 'نسائية',
    name_en: "Women's",
    slug: 'womens',
    title: 'نسائية',
    description: 'تزيدك انوثة وسحراً بلمسات عطرية لا تُنسى.',
    description_ar: 'تزيدك انوثة وسحراً بلمسات عطرية لا تُنسى.',
    image: 'https://rashet-etr.growfet.com/api/img/category/image-68-0y3rxqpx.png',
    fallback: img68,
    alt: 'نسائية',
  },
  {
    id: 11,
    name_ar: 'لك ولها',
    name_en: 'For You and Her',
    slug: 'for-you-and-her',
    title: 'لك ولها',
    description: 'نفحة رجولة ورشة انوثة في تناغم مثالي',
    description_ar: 'نفحة رجولة ورشة انوثة في تناغم مثالي',
    image: 'https://rashet-etr.growfet.com/api/img/category/image-73-ah7iwvoh.png',
    fallback: img73,
    alt: 'لك ولها',
  },
  {
    id: 12,
    name_ar: 'المجموعة الكاملة',
    name_en: 'The complete collection',
    slug: 'the-complete-collection',
    title: 'المجموعة الكاملة',
    description: 'عطورك المفضلة في مكان واحد بتصاميم راقية',
    description_ar: 'عطورك المفضلة في مكان واحد بتصاميم راقية',
    image: 'https://rashet-etr.growfet.com/api/img/category/image-69-zpc374za.png',
    fallback: img69,
    alt: 'المجموعة الكاملة',
  },
  {
    id: 13,
    name_ar: 'عطور النيش الفاخرة',
    name_en: 'Luxury Niche Perfumes',
    slug: 'luxury-niche-perfumes',
    title: 'عطور النيش الفاخرة',
    description: 'مجموعة نادرة ومميزة من أرقى دور العطور العالمية',
    description_ar: 'مجموعة نادرة ومميزة من أرقى دور العطور العالمية',
    image: imgHero,
    fallback: imgHero,
    alt: 'عطور النيش الفاخرة',
  },
  {
    id: 14,
    name_ar: 'عطور نيش',
    name_en: 'Niche Perfumes',
    slug: 'niche-perfumes',
    title: 'عطور نيش',
    description: 'تشكيلة حصرية من العطور النادرة',
    description_ar: 'تشكيلة حصرية من العطور النادرة',
    image: imgAbout,
    fallback: imgAbout,
    alt: 'عطور نيش',
  },
];

export default function CollectionsSection() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(FALLBACK_CARDS);
  const [index, setIndex] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const trackRef = useRef(null);
  const count = cards.length;
  const openCollection = (item) => {
    const slug = (item.slug || '').toLowerCase();
    const title = (item.title || item.name_ar || '').toLowerCase();
    const id = item.id;
    if (slug === 'womens' || slug === 'women' || title.includes('نسائية') || title.includes('نساء') || id === 2) {
      navigate('/perfumes?category=women');
    } else if (slug === 'for-you-and-her' || slug === 'unisex' || title.includes('لك ولها') || id === 11) {
      navigate('/perfumes?category=unisex');
    } else if (slug === 'mens' || slug === 'men' || title.includes('النيش الحصرية') || title.includes('رجال') || id === 1) {
      navigate('/perfumes?category=men');
    } else if (slug === 'the-complete-collection' || title.includes('المجموعة الكاملة') || id === 12) {
      navigate('/perfumes?category=all');
    } else if (slug === 'luxury-niche-perfumes' || title.includes('النيش الفاخرة') || id === 13) {
      navigate('/perfumes?category=luxury');
    } else if (slug === 'niche-perfumes' || title.includes('عطور نيش') || id === 14) {
      navigate('/perfumes?category=niche');
    } else if (id) {
      navigate(`/perfumes?categoryId=${id}`);
    } else {
      navigate('/perfumes');
    }
  };
  const tripleCards = [
    ...cards.map((card, i) => ({ ...card, uid: `set1-${i}` })),
    ...cards.map((card, i) => ({ ...card, uid: `set2-${i}` })),
    ...cards.map((card, i) => ({ ...card, uid: `set3-${i}` })),
  ];

  useEffect(() => {
    const controller = new AbortController();
    categoriesApi.list(controller.signal)
      .then((apiCats) => {
        if (Array.isArray(apiCats) && apiCats.length > 0) {
          const mapped = apiCats.map((cat, i) => {
            const fb = FALLBACK_CARDS.find(f => f.id === cat.id || f.slug === cat.slug) || FALLBACK_CARDS[i % FALLBACK_CARDS.length];
            return {
              id: cat.id,
              name_ar: cat.name_ar || cat.name || fb.name_ar,
              title: cat.name_ar || cat.name || fb.title,
              description: cat.description_ar || cat.description || fb.description,
              image: cat.image || fb.image || fb.fallback,
              fallback: fb.fallback,
              alt: cat.name_ar || fb.alt,
              slug: cat.slug || fb.slug,
            };
          });
          setCards(mapped);
        }
      })
      .catch(() => {
        setCards(FALLBACK_CARDS);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (count) setIndex(count);
  }, [count]);
  // Measure the exact step width (card width + gap) and update state
  const measureStep = () => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector('.csc-card');
    if (!card) return;
    const cardW = card.offsetWidth;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 28;
    if (cardW > 0) {
      setStepWidth(cardW + gap);
    }
  };

  useEffect(() => {
    measureStep();
    const t1 = setTimeout(measureStep, 100);
    const t2 = setTimeout(measureStep, 400);
    window.addEventListener('resize', measureStep);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measureStep);
    };
  }, []);

  // Step movement every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Seamless snap on transition end
  const handleTransitionEnd = () => {
    if (count && index >= 2 * count) {
      setNoTransition(true);
      setIndex((i) => i - count);
    } else if (count && index < count) {
      setNoTransition(true);
      setIndex((i) => i + count);
    }
  };

  useEffect(() => {
    if (!noTransition) return;
    const raf = requestAnimationFrame(() => setNoTransition(false));
    return () => cancelAnimationFrame(raf);
  }, [noTransition]);

  // Calculate track translation in pixels
  const translateX = stepWidth > 0 ? -index * stepWidth : 0;

  return (
    <section className="collections-section" id="collections" dir="rtl">
      <div className="container">
        {/* Header */}
        <div className="collections-header">
          <div className="csc-header-right">
            <h2 className="collections-title">تسوق حسب المجموعة</h2>
            <p className="collections-subtitle">وفر أكثر مع مجموعات تناسب جميع الأذواق</p>
          </div>
          <a href="#all-products" className="view-all-link" aria-label="عرض كل المجموعات">
            <span>عرض الكل</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="arrow-icon"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Carousel Track Viewport */}
      <div
        className="csc-outer"
        role="region"
        aria-label="مجموعات العطور - تتحرك تلقائياً"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="csc-track"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: noTransition
              ? 'none'
              : 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {tripleCards.map((item) => (
            <article
              key={item.uid}
              className="csc-card"
              onClick={() => openCollection(item)}
              style={{ cursor: 'pointer' }}
            >
              {/* Background Image & Overlay */}
              <div className="csc-card-bg">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="csc-card-img"
                  draggable="false"
                />
                <div className="csc-overlay" />
              </div>

              {/* Text & Button */}
              <div className="csc-card-content">
                <div className="csc-card-text">
                  <h3 className="csc-card-title">{item.title}</h3>
                  <p className="csc-card-desc">{item.description}</p>
                </div>
                <button
                  type="button"
                  className="csc-card-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCollection(item);
                  }}
                  aria-label={`تسوق الآن من ${item.title}`}
                >
                  <span>تسوق الآن</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="btn-arrow"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
