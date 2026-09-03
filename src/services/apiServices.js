import { api, session } from './apiClient.js';

const unwrapData = (res) => (res && typeof res === 'object' && 'data' in res ? res.data : res);
const unwrapList = (res) => {
  const data = unwrapData(res);
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') {
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.categories)) return data.categories;
    if (Array.isArray(data.articles)) return data.articles;
  }
  return [];
};

const formatImageUrl = (img) => {
  if (!img) return '';
  return typeof img === 'string' ? img : (img.url || img.path || img.image_url || img.full_url || '');
};

export const mapProduct = (item = {}) => {
  const catStr = String(item.category || '').toLowerCase();
  const catNames = (item.categories || []).map((c) => (c.name_ar || c.slug || c.name_en || '').toLowerCase()).join(' ');
  const nameStr = String(item.name_ar || item.name || '').toLowerCase();

  let category = 'unisex';
  if (nameStr.includes('لوريس') || nameStr.includes('لويس') || nameStr.includes('ليبرا') || (catStr.includes('رجال') && catStr.includes('نسائ'))) {
    category = 'unisex';
  } else if (catStr.includes('نسائ') || catNames.includes('نسائ') || nameStr.includes('اكلاير')) {
    category = 'women';
  } else if (catStr.includes('رجال') || catNames.includes('رجال') || nameStr.includes('شانيل') || nameStr.includes('سوفاج')) {
    category = 'men';
  }

  const rawImg = formatImageUrl(item.image) || formatImageUrl(item.main_image) || formatImageUrl(item.images?.[0]?.url || item.images?.[0]);
  const images = (item.images || item.gallery || [])
    .map((img) => formatImageUrl(typeof img === 'string' ? img : img.url || img.path || img.image_url))
    .filter(Boolean);

  return {
    ...item,
    id: item.id,
    name: item.name_ar || item.name || item.name_en || item.title || '',
    brand: item.brand?.name_ar || item.brand?.name || item.brand || item.brand_name || '',
    description: item.description_ar || item.description || item.description_en || '',
    price: Number(item.price || 0),
    originalPrice: item.original_price ? Number(item.original_price) : null,
    oldPrice: item.original_price ? Number(item.original_price) : null,
    rating: Number(item.rating || item.average_rating || 5),
    reviewsCount: Number(item.reviews_count || item.reviews?.length || 0),
    reviews: Number(item.reviews_count || item.reviews?.length || 0),
    image: rawImg,
    images: images.length ? images : (rawImg ? [rawImg] : []),
    sizes: item.sizes || ['50 مل', '100 مل'],
    category: category,
    isBestSeller: item.is_best_seller || item.isBestSeller || false,
    isFeatured: item.is_featured || item.isFeatured || false,
    isNew: item.is_new !== undefined ? item.is_new : false,
    category_id: item.category_id || item.categoryId || item.categories?.[0]?.id || null,
  };
};

// 1. AUTHENTICATION & PROFILE
export const authService = {
  async register(data) {
    const res = await api('/api/v1/auth/register', { method: 'POST', body: data });
    const token = res.token || res.data?.token;
    if (token) session.setToken(token);
    return res;
  },
  async login(data) {
    return this.loginCustomer(data);
  },
  async loginCustomer(data) {
    const res = await api('/api/v1/auth/login', { method: 'POST', body: data });
    const token = res.token || res.data?.token;
    if (token) session.setToken(token);
    return res;
  },
  async loginAdmin(data) {
    const res = await api('/api/v1/auth/login', { method: 'POST', body: data });
    const token = res.token || res.data?.token || res.admin_token;
    if (token) session.setAdminToken(token);
    return res;
  },
  profile() {
    return this.getProfile();
  },
  getProfile() {
    return api('/api/v1/user/profile');
  },
  updateProfile(data) {
    return api('/api/v1/user/profile', { method: 'PUT', body: data });
  },
  getUserOrders() {
    return api('/api/v1/user/orders');
  },
  async logout() {
    try {
      await api('/api/v1/auth/logout', { method: 'POST' });
    } finally {
      session.clearToken();
      session.clearAdminToken();
    }
  },
};

// 2. PRODUCTS
export const productsService = {
  async list(params = {}, signal) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') query.append(k, v);
    });
    const url = `/api/v1/products${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await api(url, { signal });
    return unwrapList(res).map(mapProduct);
  },
  async get(id, signal) {
    return this.getById(id, signal);
  },
  async getById(id, signal) {
    const res = await api(`/api/v1/products/${id}`, { signal });
    return mapProduct(unwrapData(res));
  },
  async getReviews(productId) {
    const res = await api(`/api/v1/products/${productId}/reviews`);
    return unwrapList(res);
  },
  addReview(productId, data) {
    return api(`/api/v1/products/${productId}/reviews`, { method: 'POST', body: data });
  },
};

// 3. CATEGORIES
export const categoriesService = {
  async list(signal) {
    const res = await api('/api/v1/categories', { signal });
    return unwrapList(res);
  },
  get(id, params = {}) {
    return this.getById(id, params);
  },
  getById(id, params = {}) {
    const query = params.include_products ? '?include_products=1' : '';
    return api(`/api/v1/categories/${id}${query}`);
  },
};

// 4. PRODUCT IMAGES
export const productImagesService = {
  getGallery(productId) {
    return api(`/api/v1/product-images/${productId}`);
  },
  uploadImages(formData) {
    return api('/api/v1/product-images', { method: 'POST', body: formData });
  },
  reorderImages(data) {
    return api('/api/v1/product-images/reorder', { method: 'POST', body: data });
  },
  deleteImage(id) {
    return api(`/api/v1/product-images/${id}`, { method: 'DELETE' });
  },
};

// 5. CART
export const cartService = {
  view() {
    return api('/api/v1/cart');
  },
  get() {
    return this.view();
  },
  add(data) {
    return this.addItem(data);
  },
  addItem(data) {
    return api('/api/v1/cart', { method: 'POST', body: data });
  },
  update(id, quantity) {
    return this.updateQuantity(id, quantity);
  },
  updateQuantity(id, quantity) {
    return api(`/api/v1/cart/${id}`, { method: 'PUT', body: { quantity } });
  },
  remove(id) {
    return this.removeItem(id);
  },
  removeItem(id) {
    return api(`/api/v1/cart/${id}`, { method: 'DELETE' });
  },
  applyCoupon(code) {
    return api('/api/v1/cart/apply-coupon', { method: 'POST', body: { code } });
  },
};

// 6. CHECKOUT & ORDERS
export const checkoutService = {
  saveShippingAddress(data) {
    return api('/api/v1/checkout/shipping-address', { method: 'POST', body: data });
  },
  getShippingMethods() {
    return api('/api/v1/checkout/shipping-methods');
  },
  savePaymentMethod(payment_method) {
    return api('/api/v1/checkout/payment-method', { method: 'POST', body: { payment_method } });
  },
  confirmOrder(data) {
    return api('/api/v1/orders/confirm', { method: 'POST', body: data });
  },
  trackOrder(orderNumber) {
    return api(`/api/v1/orders/${encodeURIComponent(orderNumber)}/tracking`);
  },
};

// 7. WISHLIST
export const wishlistService = {
  async list() {
    const res = await api('/api/v1/wishlist');
    return unwrapList(res);
  },
  get() {
    return this.list();
  },
  add(product_id) {
    return api('/api/v1/wishlist', { method: 'POST', body: { product_id } });
  },
  remove(id) {
    return api(`/api/v1/wishlist/${id}`, { method: 'DELETE' });
  },
};

// 8. REVIEWS & NOTIFICATIONS
export const notificationsService = {
  async list() {
    const res = await api('/api/v1/notifications');
    return unwrapList(res);
  },
  markAsRead(id) {
    return api(`/api/v1/notifications/${id}/read`, { method: 'PUT' });
  },
};

// 9. BLOG & ARTICLES
export const articlesService = {
  async list(perPage = 9) {
    const res = await api(`/api/v1/articles?per_page=${perPage}`);
    return unwrapList(res);
  },
  async getLatest(limit = 3) {
    const res = await api(`/api/v1/articles/latest?limit=${limit}`);
    return unwrapList(res);
  },
  getBySlug(slug) {
    return api(`/api/v1/articles/${encodeURIComponent(slug)}`);
  },
};

// 10. FORMS & PAGES
export const formsService = {
  subscribeNewsletter(email) {
    return api('/api/v1/newsletter/subscribe', { method: 'POST', body: { email } });
  },
  newsletter(email) {
    return this.subscribeNewsletter(email);
  },
  sendContactMessage(data) {
    return api('/api/v1/contact', { method: 'POST', body: data });
  },
  contact(data) {
    return this.sendContactMessage(data);
  },
};

export const pagesService = {
  getPrivacyPolicy() {
    return api('/api/v1/pages/privacy-policy');
  },
  getReturnPolicy() {
    return api('/api/v1/pages/return-policy');
  },
  getAboutUs() {
    return api('/api/v1/pages/about-us');
  },
};

// 11. BANNERS & SETTINGS
export const bannersService = {
  async getActiveBanners() {
    const res = await api('/api/v1/banners');
    return unwrapList(res);
  },
};

export const settingsService = {
  getPublicSettings() {
    return api('/api/v1/settings');
  },
};

// 12. ADMIN PANEL
export const adminService = {
  getDashboardStats() {
    return api('/api/v1/admin/dashboard/stats', { isAdmin: true });
  },
  getOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return api(`/api/v1/admin/orders${query ? `?${query}` : ''}`, { isAdmin: true });
  },
  updateOrderStatus(id, status, note = '') {
    return api(`/api/v1/admin/orders/${id}/status`, { method: 'PUT', body: { status, note }, isAdmin: true });
  },
  updateOrderTracking(id, tracking_number) {
    return api(`/api/v1/admin/orders/${id}/tracking`, { method: 'POST', body: { tracking_number }, isAdmin: true });
  },
  getProducts() {
    return api('/api/v1/admin/products', { isAdmin: true });
  },
  createProduct(formData) {
    return api('/api/v1/admin/products', { method: 'POST', body: formData, isAdmin: true });
  },
  editProduct(id, formData) {
    return api(`/api/v1/admin/products/${id}`, { method: 'POST', body: formData, isAdmin: true });
  },
  deleteProduct(id) {
    return api(`/api/v1/admin/products/${id}`, { method: 'DELETE', isAdmin: true });
  },
  getInventory(params = {}) {
    const query = new URLSearchParams(params).toString();
    return api(`/api/v1/admin/inventory${query ? `?${query}` : ''}`, { isAdmin: true });
  },
  updateInventory(id, stock_quantity) {
    return api(`/api/v1/admin/inventory/${id}`, { method: 'PUT', body: { stock_quantity }, isAdmin: true });
  },
  getCoupons() {
    return api('/api/v1/admin/coupons', { isAdmin: true });
  },
  createCoupon(data) {
    return api('/api/v1/admin/coupons', { method: 'POST', body: data, isAdmin: true });
  },
  deleteCoupon(id) {
    return api(`/api/v1/admin/coupons/${id}`, { method: 'DELETE', isAdmin: true });
  },
  uploadBanner(formData) {
    return api('/api/v1/admin/banners', { method: 'POST', body: formData, isAdmin: true });
  },
  deleteBanner(id) {
    return api(`/api/v1/admin/banners/${id}`, { method: 'DELETE', isAdmin: true });
  },
  getCustomers() {
    return api('/api/v1/admin/customers', { isAdmin: true });
  },
  getCustomerDetails(id) {
    return api(`/api/v1/admin/customers/${id}`, { isAdmin: true });
  },
  updateCustomerStatus(id, status) {
    return api(`/api/v1/admin/customers/${id}/status`, { method: 'PUT', body: { status }, isAdmin: true });
  },
  getSalesReport(period = 'monthly') {
    return api(`/api/v1/admin/reports/sales?period=${period}`, { isAdmin: true });
  },
  getProductsReport(limit = 10) {
    return api(`/api/v1/admin/reports/products?limit=${limit}`, { isAdmin: true });
  },
  updateStoreSettings(data) {
    return api('/api/v1/admin/settings', { method: 'PUT', body: data, isAdmin: true });
  },
};
