const BASE_URL = (typeof import.meta !== 'undefined' && import.meta && import.meta.env ? (import.meta.env.VITE_API_BASE_URL || '') : '').replace(/\/$/, '');
const TOKEN_KEY = 'rashet_auth_token';
const ADMIN_TOKEN_KEY = 'rashet_admin_token';
const CART_TOKEN_KEY = 'rashet_cart_token';
const USER_KEY = 'rashet_user_info';

export const session = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (value) => value && localStorage.setItem(TOKEN_KEY, value),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),

  getUser: () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (value) => {
    if (value) {
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(value));
      } catch {}
    }
  },
  clearUser: () => localStorage.removeItem(USER_KEY),

  getAdminToken: () => localStorage.getItem(ADMIN_TOKEN_KEY),
  setAdminToken: (value) => value && localStorage.setItem(ADMIN_TOKEN_KEY, value),
  clearAdminToken: () => localStorage.removeItem(ADMIN_TOKEN_KEY),

  getCartToken: () => localStorage.getItem(CART_TOKEN_KEY),
  setCartToken: (value) => value && localStorage.setItem(CART_TOKEN_KEY, value),
  clearCartToken: () => localStorage.removeItem(CART_TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function api(path, { method = 'GET', body, headers = {}, signal, isAdmin = false } = {}) {
  const isForm = body instanceof FormData;
  const requestHeaders = { Accept: 'application/json', ...headers };

  const token = isAdmin ? session.getAdminToken() : session.getToken();
  const cartToken = session.getCartToken();

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }
  if (cartToken) {
    requestHeaders['X-Cart-Token'] = cartToken;
  }

  if (body && !isForm) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  const requestUrl = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  let response;
  try {
    response = await fetch(requestUrl, {
      method,
      headers: requestHeaders,
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('تعذر الاتصال بالخادم. حاول مرة أخرى.', 0);
  }

  const cartHeaderToken = response.headers.get('X-Cart-Token') || response.headers.get('x-cart-token');
  if (cartHeaderToken) session.setCartToken(cartHeaderToken);

  const contentType = response.headers.get('content-type') || '';
  let payload = {};

  if (contentType.includes('application/json')) {
    payload = await response.json().catch(() => ({}));
  }

  const responseCartToken = payload.cart_token || payload.cartToken || payload.data?.cart_token;
  if (responseCartToken) session.setCartToken(responseCartToken);

  if (!response.ok) {
    if (response.status === 401) {
      if (isAdmin) session.clearAdminToken();
      else session.clearToken();
    }
    throw new ApiError(
      payload.message || payload.error || `خطأ في الاتصال بالخادم (${response.status})`,
      response.status,
      payload.errors || payload.details
    );
  }

  return payload;
}
