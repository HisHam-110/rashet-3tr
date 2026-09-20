import { useEffect } from 'react';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_SEO,
  DEFAULT_OG_IMAGE,
} from '../../utils/seoConfig';

/**
 * Headless SEO Component
 * Dynamically updates document title, meta tags, canonical link, and JSON-LD schema
 * without rendering any visual DOM elements.
 */
export default function SEOHead({
  title,
  description,
  canonical,
  image,
  type = 'website',
  robots = 'index, follow',
  schema = null,
}) {
  const fullTitle = title
    ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`)
    : DEFAULT_SEO.title;

  const metaDesc = description || DEFAULT_SEO.description;
  const canonicalUrl = canonical
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
    : SITE_URL;
  const ogImage = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : DEFAULT_OG_IMAGE;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper to update or create a meta tag
    const setMetaTag = (attributeName, attributeValue, content) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', metaDesc);
    setMetaTag('name', 'robots', robots);

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDesc);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', 'ar_SA');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDesc);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. Schema.org JSON-LD structured data
    let scriptTag = document.getElementById('dynamic-seo-jsonld');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'dynamic-seo-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup if unmounting
    };
  }, [fullTitle, metaDesc, canonicalUrl, ogImage, type, robots, schema]);

  return null;
}
