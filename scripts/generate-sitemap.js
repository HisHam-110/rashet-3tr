/**
 * Dynamic Sitemap Generator Script
 * Usage: node scripts/generate-sitemap.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://rashet-etr-hesham.growfet.com';
const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/perfumes', priority: '0.9', changefreq: 'daily' },
  { url: '/perfumes?category=men', priority: '0.8', changefreq: 'weekly' },
  { url: '/perfumes?category=women', priority: '0.8', changefreq: 'weekly' },
  { url: '/perfumes?category=unisex', priority: '0.8', changefreq: 'weekly' },
  { url: '/perfumes?category=luxury', priority: '0.8', changefreq: 'weekly' },
  { url: '/collections', priority: '0.8', changefreq: 'weekly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.6', changefreq: 'monthly' },
  { url: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { url: '/returns-policy', priority: '0.4', changefreq: 'yearly' },
];

const productIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
${productIds
  .map(
    (id) => `  <url>
    <loc>${SITE_URL}/product/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');
console.log(`Successfully generated sitemap with ${staticRoutes.length + productIds.length} URLs at ${outputPath}`);
