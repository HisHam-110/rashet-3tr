import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Hero/Navbar';
import Hero from './components/Hero/Hero';
import FeaturesBanner from './components/FeaturesBanner/FeaturesBanner';
import CollectionsSection from './components/CollectionsSection/CollectionsSection';
import AboutSection from './components/AboutSection/AboutSection';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import PerfumeNotes from './components/PerfumeNotes/PerfumeNotes';
import Recommended from './components/Recommended/Recommended';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import ProductModal from './components/ProductModal/ProductModal';
import CartDrawer from './components/CartDrawer/CartDrawer';
import PerfumesPage from './components/PerfumesPage/PerfumesPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import CollectionsPage from './components/CollectionsPage/CollectionsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage';
import ReturnsPolicyPage from './components/ReturnsPolicyPage/ReturnsPolicyPage';
import CartPage from './components/CartPage/CartPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import ShippingPage from './components/ShippingPage/ShippingPage';
import PaymentPage from './components/PaymentPage/PaymentPage';
import ReviewPage from './components/ReviewPage/ReviewPage';
import LatestArticles from './components/LatestArticles/LatestArticles';
import AuthModal from './components/AuthModal/AuthModal';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ContactPage from './components/ContactPage/ContactPage';

import { productsApi, cartApi, wishlistApi, authApi } from './services/storeApi';

function App() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const toastTimerRef = useRef(null);

  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  const showToast = (message, type = 'success', itemDetails = null) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type, itemDetails });
    toastTimerRef.current = setTimeout(() => setToast(null), 3800);
  };

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    const controller = new AbortController();
    productsApi.list({}, controller.signal)
      .then((apiProducts) => { if (Array.isArray(apiProducts)) setProducts(apiProducts); })
      .catch(() => {});

    cartApi.view()
      .then((res) => {
        if (res && res.items) {
          setCart(res.items.map((i) => ({
            id: i.product_id || i.id,
            name: i.name || i.product?.name || 'عطر فاخر',
            price: Number(i.price || i.product?.price || 0),
            image: i.image || i.product?.image || '',
            selectedSize: i.size || '100 مل',
            quantity: i.quantity || 1,
            cartItemId: i.id,
          })));
        }
      })
      .catch(() => {});

    wishlistApi.list()
      .then((items) => {
        if (Array.isArray(items)) {
          setWishlistIds(items.map((item) => item.product_id || item.id));
        }
      })
      .catch(() => {});

    authApi.getProfile()
      .then((user) => { if (user) setCurrentUser(user); })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const prevPathnameRef = useRef(pathname);
  const prevHashRef = useRef(hash);

  useEffect(() => {
    const isPathChanged = prevPathnameRef.current !== pathname;
    const isHashChanged = prevHashRef.current !== hash;

    if (isPathChanged || isHashChanged) {
      prevPathnameRef.current = pathname;
      prevHashRef.current = hash;

      if (hash) {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [hash, pathname]);

  // Filter products by category and search
  const filteredProducts = (products || []).filter((item) => {
    if (!item) return false;
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const nameStr = String(item.name || '').toLowerCase();
    const brandStr = String(item.brand || '').toLowerCase();
    const descStr = String(item.description || '').toLowerCase();
    const matchesSearch = !q || nameStr.includes(q) || brandStr.includes(q) || descStr.includes(q);
    return matchesCat && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (product, qty = 1) => {
    const addQuantity = typeof qty === 'number' ? qty : 1;
    const targetSize = product.selectedSize || (product.sizes ? product.sizes[0] : '100 مل');

    cartApi.add({
      product_id: product.id,
      size: targetSize,
      quantity: addQuantity,
    }).catch(() => {});

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === targetSize
      );
      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + addQuantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedSize: targetSize,
          quantity: addQuantity,
        },
      ];
    });

    showToast('تمت الإضافة بنجاح', 'success', {
      name: product.name,
      image: product.image,
      price: product.price,
      size: targetSize,
      quantity: addQuantity,
    });
  };

  const handleUpdateCartQuantity = (id, selectedSize, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id, selectedSize);
      return;
    }
    const targetItem = cart.find((item) => item.id === id && item.selectedSize === selectedSize);
    if (targetItem?.cartItemId) {
      cartApi.update(targetItem.cartItemId, newQty).catch(() => {});
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id, selectedSize) => {
    const removedItem = cart.find((item) => item.id === id && item.selectedSize === selectedSize);
    if (removedItem?.cartItemId) {
      cartApi.remove(removedItem.cartItemId).catch(() => {});
    }

    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    );

    if (removedItem) {
      showToast('تمت إزالة المنتج من السلة', 'remove', {
        name: removedItem.name,
        image: removedItem.image,
        price: removedItem.price,
        size: removedItem.selectedSize,
        quantity: removedItem.quantity,
      });
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      const isAlreadyWishlisted = prev.includes(productId);
      if (isAlreadyWishlisted) {
        wishlistApi.remove(productId).catch(() => {});
      } else {
        wishlistApi.add(productId).catch(() => {});
      }
      showToast(
        isAlreadyWishlisted ? 'تمت الإزالة من المفضلة' : 'تمت الإضافة إلى المفضلة',
        'favorite'
      );
      return isAlreadyWishlisted ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Products with valid images only (filter test/placeholder products from backend)
  const productsWithImages = products.filter((p) => p.image && typeof p.image === 'string' && p.image.length > 0);

  // Best sellers: all products with valid API images for full slider carousel
  const bestSellerProducts = productsWithImages.length > 0 ? productsWithImages : products;

  // Home page content (extracted from the original App return)
  const HomePage = () => (
    <>
      {/* 2. Hero Banner Section */}
      <Hero onExploreClick={() => setActiveCategory('all')} />

      {/* 3. Features Trust Banner */}
      <FeaturesBanner />

      {/* New Section 1: Collections Section */}
      <CollectionsSection />

      {/* New Section 2: About Perfume Section */}
      <AboutSection />

      {/* 5. Featured / Best Selling Products Grid */}
      <FeaturedProducts
        products={bestSellerProducts}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
        onOpenProductDetails={(prod) => navigate(`/product/${prod.id}`)}
        activeCategory={activeCategory}
        onSelectCategory={(catId) => setActiveCategory(catId)}
      />

      {/* 6. Signature Perfume Story & Olfactory Pyramid (Figma Note section) */}
      <PerfumeNotes
        onAddToCart={handleAddToCart}
        onOpenProductDetails={(prod) => navigate(`/product/${prod.id}`)}
      />

      {/* 7. Recommended Products / You May Also Like */}
      <Recommended
        products={productsWithImages}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
        onOpenProductDetails={(prod) => navigate(`/product/${prod.id}`)}
      />

      {/* 8. Newsletter Subscription Banner */}
      <Newsletter />

      {/* 9. Latest Articles Section */}
      <LatestArticles />

      {/* 10. Footer Section */}
      <Footer />
    </>
  );

  return (
    <div className="app-container">
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenUser={() => setIsAuthOpen(true)}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/contact" element={<ContactPage showToast={showToast} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveFromCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage cartItems={cart} />} />
        <Route path="/checkout/shipping" element={<ShippingPage cartItems={cart} />} />
        <Route path="/checkout/payment" element={<PaymentPage cartItems={cart} />} />
        <Route path="/checkout/review" element={<ReviewPage cartItems={cart} />} />
        <Route
          path="/perfumes"
          element={
            <PerfumesPage
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              cartCount={totalCartCount}
              onOpenCart={() => setIsCartOpen(true)}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />
          }
        />
      </Routes>

      {/* Interactive Cart Drawer (shared across all pages) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        showToast={showToast}
      />

      {toast && createPortal(
        <div className={`app-toast app-toast-${toast.type} ${toast.itemDetails ? 'app-toast-rich' : ''}`} role="status" aria-live="polite">
          {toast.itemDetails ? (
            <div className="app-toast-product-card">
              {toast.itemDetails.image && (
                <img
                  src={toast.itemDetails.image}
                  alt={toast.itemDetails.name}
                  className={`app-toast-product-img ${toast.type === 'remove' ? 'app-toast-img-removed' : ''}`}
                />
              )}
              <div className="app-toast-product-info">
                <div className="app-toast-status-header">
                  <span className={`app-toast-check-badge ${toast.type === 'remove' ? 'app-toast-remove-badge' : ''}`}>
                    {toast.type === 'remove' ? '✕' : '✓'}
                  </span>
                  <span className={`app-toast-status-title ${toast.type === 'remove' ? 'app-toast-status-remove' : ''}`}>
                    {toast.type === 'remove' ? 'تمت إزالة المنتج من السلة' : 'تمت الإضافة إلى السلة'}
                  </span>
                </div>
                <h4 className="app-toast-product-name">{toast.itemDetails.name}</h4>
                <div className="app-toast-meta-tags">
                  {toast.itemDetails.size && (
                    <span className="app-toast-tag">{toast.itemDetails.size}</span>
                  )}
                  {toast.itemDetails.quantity > 1 && (
                    <span className="app-toast-tag">الكمية: {toast.itemDetails.quantity}</span>
                  )}
                  {toast.itemDetails.price && (
                    <span className={`app-toast-price ${toast.type === 'remove' ? 'app-toast-price-removed' : ''}`}>
                      {toast.itemDetails.price} ر.س
                    </span>
                  )}
                </div>
              </div>
              <button
                className="app-toast-close-btn"
                onClick={() => setToast(null)}
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <span className="app-toast-icon">{toast.type === 'favorite' ? '♥' : '✓'}</span>
              <span>{toast.message}</span>
            </>
          )}
        </div>,
        document.body
      )}

      {/* Interactive Product Details & Notes Modal (shared) */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}
      {/* Floating WhatsApp Button */}
      <WhatsAppButton phoneNumber="966506540920" />
    </div>
  );
}

export default App;
