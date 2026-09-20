/**
 * SEO Configuration and Schema.org Generator for "رشة عطر"
 * Base URL: https://rashet-etr-hesham.growfet.com
 */

export const SITE_URL = 'https://rashet-etr-hesham.growfet.com';
export const SITE_NAME = 'رشة عطر';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/rashet-3tr.png`;

export const DEFAULT_SEO = {
  title: 'رشة عطر | متجر العطور الفاخرة والأصلية في السعودية ومصر',
  description: 'متجر رشة عطر يقدم أرقى تشكيلات العطور الفاخرة والنيش والعود بتركيبات استثنائية وثبات عالٍ. استمتع بتجربة تسوق فريدة وتوصيل سريع.',
  keywords: 'رشة عطر, عطور فاخرة, عطور أصلية, عطور رجالية, عطور نسائية, عطور نيش, شراء عطور, عطور عود',
  canonical: SITE_URL,
  type: 'website',
  robots: 'index, follow',
};

/**
 * Generate Schema.org WebSite & Organization structured data
 */
export const getOrganizationAndWebSiteSchema = () => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+966506540920',
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'English'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'ar',
      description: DEFAULT_SEO.description,
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/perfumes?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
};

/**
 * Generate Product Schema.org structured data using ONLY actual product properties
 */
export const getProductSchema = (product) => {
  if (!product || !product.id) return null;

  const productUrl = `${SITE_URL}/product/${product.id}`;
  const price = Number(product.price || 0);
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images.filter(Boolean)
    : (product.image ? [product.image] : []);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${productUrl}#product`,
    name: product.name || 'عطر فاخر',
    description: product.description || `عطر فاخر أصلي من متجر ${SITE_NAME}`,
    image: images.length > 0 ? images : [DEFAULT_OG_IMAGE],
    url: productUrl,
    sku: `RET-${product.id}`,
    category: product.type || product.category || 'عطور',
  };

  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand,
    };
  }

  // Real offers schema
  if (price > 0) {
    schema.offers = {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'SAR',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    };
  }

  // AggregateRating only if real rating exists
  const ratingValue = Number(product.rating || 0);
  const reviewCount = Number(product.reviewsCount || product.reviews || 0);
  if (ratingValue > 0 && reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Math.min(5, Math.max(1, ratingValue)).toFixed(1),
      reviewCount: reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
};

/**
 * Generate BreadcrumbList Schema.org structured data
 * @param {Array<{name: string, url: string}>} items
 */
export const getBreadcrumbSchema = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
};

/**
 * Generate ItemList Schema for category or listing page
 */
export const getItemListSchema = (name, products = []) => {
  if (!Array.isArray(products) || products.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: name || 'قائمة العطور',
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.name,
      url: `${SITE_URL}/product/${prod.id}`,
    })),
  };
};
