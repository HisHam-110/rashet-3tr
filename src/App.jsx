import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Hero/Navbar';
import Hero from './components/Hero/Hero';
import FeaturesBanner from './components/FeaturesBanner/FeaturesBanner';
import CollectionsSection from './components/CollectionsSection/CollectionsSection';
import AboutSection from './components/AboutSection/AboutSection';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import PerfumeNotes from './components/PerfumeNotes/PerfumeNotes';
import Recommended from './components/Recommended/Recommended';
import Testimonials from './components/Testimonials/Testimonials';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import ProductModal from './components/ProductModal/ProductModal';
import CartDrawer from './components/CartDrawer/CartDrawer';
import PerfumesPage from './components/PerfumesPage/PerfumesPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import CollectionsPage from './components/CollectionsPage/CollectionsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage/PrivacyPolicyPage';
import LatestArticles from './components/LatestArticles/LatestArticles';

import { productsData } from './data/perfumesData';

function App() {
  const [products] = useState(productsData);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'توم فورد | Oud Wood',
      price: 950,
      image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      quantity: 1,
      selectedSize: '100 مل',
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState([1, 2]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  // Filter products by category and search
  const filteredProducts = products.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Cart operations
  const handleAddToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === (product.selectedSize || '100 مل')
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += qty;
        return newCart;
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedSize: product.selectedSize || (product.sizes ? product.sizes[0] : '100 مل'),
          quantity: qty,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id, selectedSize, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id, selectedSize);
      return;
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
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedSize === selectedSize))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
        onOpenProductDetails={(prod) => setSelectedProduct(prod)}
        activeCategory={activeCategory}
        onSelectCategory={(catId) => setActiveCategory(catId)}
      />

      {/* 6. Signature Perfume Story & Olfactory Pyramid (Figma Note section) */}
      <PerfumeNotes
        onAddToCart={handleAddToCart}
        onOpenProductDetails={(prod) => setSelectedProduct(prod)}
      />

      {/* 7. Recommended Products / You May Also Like */}
      <Recommended
        products={products}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
        onOpenProductDetails={(prod) => setSelectedProduct(prod)}
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
        onOpenUser={() => alert('حسابي قريباً')}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
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
    </div>
  );
}

export default App;
