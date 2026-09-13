const DEFAULT_BASE_URL = 'https://rashet-etr.growfet.com';

const getBaseUrl = () => {
  const envUrl = typeof import.meta !== 'undefined' && import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL;
  const isDev = typeof import.meta !== 'undefined' && import.meta && import.meta.env && import.meta.env.DEV;

  if (envUrl !== undefined && envUrl !== null && envUrl !== '') {
    const trimmed = envUrl.trim().replace(/\/$/, '');
    // In local dev mode, bypass direct cross-origin target to use Vite proxy (/api) & avoid CORS
    if (isDev && (trimmed === 'https://rashet-etr.growfet.com' || trimmed === 'http://rashet-etr.growfet.com')) {
      return '';
    }
    return trimmed;
  }
  if (isDev) {
    return '';
  }
  return DEFAULT_BASE_URL;
};

const BASE_URL = getBaseUrl();
const TOKEN_KEY = 'rashet_auth_token';
const ADMIN_TOKEN_KEY = 'rashet_admin_token';
const CART_TOKEN_KEY = 'rashet_cart_token';
const USER_KEY = 'rashet_user_info';

export const session = {
  getToken: () => {
    const val = localStorage.getItem(TOKEN_KEY);
    return (val && val !== 'null' && val !== 'undefined') ? val : null;
  },
  setToken: (value) => {
    if (value && value !== 'null' && value !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, value);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
  clearToken: () => localStorage.removeItem(TOKEN_KEY),

  getUser: () => {
    try {
      const data = localStorage.getItem(USER_KEY);
      return (data && data !== 'null' && data !== 'undefined') ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setUser: (value) => {
    if (value && typeof value === 'object') {
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(value));
      } catch {}
    } else {
      localStorage.removeItem(USER_KEY);
    }
  },
  clearUser: () => localStorage.removeItem(USER_KEY),

  getAdminToken: () => {
    const val = localStorage.getItem(ADMIN_TOKEN_KEY);
    return (val && val !== 'null' && val !== 'undefined') ? val : null;
  },
  setAdminToken: (value) => {
    if (value && value !== 'null' && value !== 'undefined') {
      localStorage.setItem(ADMIN_TOKEN_KEY, value);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  },
  clearAdminToken: () => localStorage.removeItem(ADMIN_TOKEN_KEY),

  getCartToken: () => {
    const val = localStorage.getItem(CART_TOKEN_KEY);
    return (val && val !== 'null' && val !== 'undefined') ? val : null;
  },
  setCartToken: (value) => {
    if (value && value !== 'null' && value !== 'undefined') {
      localStorage.setItem(CART_TOKEN_KEY, value);
    } else {
      localStorage.removeItem(CART_TOKEN_KEY);
    }
  },
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

  if (token && token !== 'null' && token !== 'undefined') {
    requestHeaders.Authorization = `Bearer ${token}`;
  }
  if (cartToken && cartToken !== 'null' && cartToken !== 'undefined') {
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

  let payload = {};
  try {
    const rawText = await response.text();
    try {
      payload = JSON.parse(rawText);
    } catch {
      payload = { message: rawText };
    }
  } catch {
    payload = {};
  }

  const responseCartToken = payload.cart_token || payload.cartToken || payload.data?.cart_token;
  if (responseCartToken) session.setCartToken(responseCartToken);

function translateBackendMessage(msg, fieldName = '') {
  if (!msg || typeof msg !== 'string') return msg;
  const lower = msg.toLowerCase();
  const f = fieldName ? fieldName.toLowerCase() : '';

  if (f === 'email' || lower.includes('email') || lower.includes('البريد')) {
    if (lower.includes('taken') || lower.includes('already') || lower.includes('exists') || lower.includes('unique') || lower.includes('مسجل') || lower.includes('موجود')) {
      return 'البريد الإلكتروني مسجل مسبقاً في النظام';
    }
    if (lower.includes('valid') || lower.includes('invalid') || lower.includes('format')) {
      return 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (lower.includes('required') || lower.includes('مطلوب')) {
      return 'حقل البريد الإلكتروني مطلوب';
    }
  }

  if (f === 'phone' || f === 'phone_number' || f === 'mobile' || lower.includes('phone') || lower.includes('mobile') || lower.includes('هاتف') || lower.includes('جوال')) {
    if (lower.includes('taken') || lower.includes('already') || lower.includes('exists') || lower.includes('unique') || lower.includes('مسجل') || lower.includes('موجود')) {
      return 'رقم الهاتف مسجل مسبقاً في النظام';
    }
    if (lower.includes('valid') || lower.includes('invalid') || lower.includes('format')) {
      return 'صيغة رقم الهاتف غير صحيحة';
    }
    if (lower.includes('required') || lower.includes('مطلوب')) {
      return 'حقل رقم الهاتف مطلوب';
    }
  }

  if (f === 'password' || lower.includes('password') || lower.includes('كلمة المرور')) {
    if (lower.includes('at least') || lower.includes('min') || lower.includes('short') || lower.includes('least')) {
      return 'كلمة المرور يجب ألا تقل عن 6 خانات';
    }
    if (lower.includes('required') || lower.includes('مطلوب')) {
      return 'حقل كلمة المرور مطلوب';
    }
    if (lower.includes('confirmed') || lower.includes('confirmation')) {
      return 'تأكيد كلمة المرور غير متطابق';
    }
  }

  if (f === 'name' || lower.includes('name') || lower.includes('الاسم')) {
    if (lower.includes('required') || lower.includes('مطلوب')) {
      return 'حقل الاسم الكامل مطلوب';
    }
  }

  if (lower.includes('credentials') || lower.includes('do not match') || lower.includes('unauthenticated')) {
    return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
  }

  return msg;
}

  if (!response.ok) {
    if (response.status === 401) {
      if (isAdmin) {
        session.clearAdminToken();
      } else {
        session.clearToken();
        session.clearUser();
      }
    }

    const defaultStatusMessages = {
      400: 'البيانات المرسلة غير صحيحة (400)',
      401: 'غير مصرح أو انتهت الجلسة (401)',
      402: 'الخدمة تتطلب تفعيل الاشتراك أو الدفع (402)',
      403: 'ليس لديك صلاحية لتنفيذ هذا الإجراء (403)',
      404: 'العنصر أو المسار غير موجود (404)',
      422: 'البيانات المدخلة غير صالحة أو مسجلة مسبقاً (422)',
      429: 'طلبات متكررة، يرجى المحاولة بعد قليل (429)',
      500: 'خطأ في خادم النظام (500)',
      502: 'الخادم غير متاح حالياً (502)',
      503: 'الخدمة غير متوفرة مؤقتاً (503)'
    };

    let errorMessage = payload.message || payload.error || defaultStatusMessages[response.status] || `خطأ في الاتصال بالخادم (${response.status})`;
    const rawFieldErrors = payload.errors || payload.data?.errors || (typeof payload.details === 'object' ? payload.details : null);
    
    if (rawFieldErrors && typeof rawFieldErrors === 'object') {
      const messages = [];
      Object.entries(rawFieldErrors).forEach(([field, val]) => {
        const valArr = Array.isArray(val) ? val : [val];
        valArr.forEach((m) => {
          messages.push(translateBackendMessage(m, field));
        });
      });
      if (messages.length > 0) {
        errorMessage = messages.join(' ، ');
      }
    } else if (errorMessage) {
      errorMessage = translateBackendMessage(errorMessage);
    }

    console.warn(`[API ${response.status}] ${path}:`, { payload, errorMessage });

    throw new ApiError(
      errorMessage,
      response.status,
      rawFieldErrors || payload.details || payload
    );
  }

  return payload;
}
