import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBloggerHtmlSnippet,
  filterAndSortTees,
  formatPrice,
  normalizeAffiliateUrl,
  validateTeeInput,
} from './catalog';
import type { TeeProduct } from '../types/tee';

const SAMPLE_TEES: TeeProduct[] = [
  {
    id: 't1',
    title: 'Boxy Heavyweight Crew',
    brand: 'Uniform Studio',
    price: 1299,
    category: 'Heavyweight',
    fit: 'Boxy · 300gsm',
    retailer: 'Myntra',
    affiliateUrl: 'https://www.myntra.com/men-tshirts?utm_source=spunsilly',
    imageUrl: '/src/assets/images/tee_heavyweight_charcoal_1794885709246.jpg',
    tag: '300gsm',
    featuredOrder: 1,
    clicks: 0,
  },
  {
    id: 't2',
    title: 'Modernist Block Print Tee',
    brand: 'Kuro Collective',
    price: 999,
    category: 'Graphic',
    fit: 'Oversized · 260gsm',
    retailer: 'Ajio',
    affiliateUrl: 'https://www.ajio.com/men-tshirts?utm_source=spunsilly',
    imageUrl: '/src/assets/images/tee_graphic_chalk_1794885709232.jpg',
    featuredOrder: 2,
    clicks: 0,
  },
  {
    id: 't3',
    title: 'Sun-Faded Pocket Tee',
    brand: 'Harbor Supply',
    price: 799,
    category: 'Vintage Wash',
    fit: 'Relaxed · 240gsm',
    retailer: 'Amazon.in',
    affiliateUrl: 'https://www.amazon.in/dp/B09SPUN03?tag=spunsilly-21',
    imageUrl: '/src/assets/images/tee_vintage_slate_1794885710402.jpg',
    featuredOrder: 3,
    clicks: 0,
  },
];

test('normalizeAffiliateUrl allows http/https and rejects unsafe protocols', () => {
  assert.equal(
    normalizeAffiliateUrl('https://www.amazon.in/dp/B01?tag=spunsilly-21'),
    'https://www.amazon.in/dp/B01?tag=spunsilly-21',
  );
  assert.equal(
    normalizeAffiliateUrl('amazon.in/dp/B01'),
    'https://amazon.in/dp/B01',
  );
  assert.equal(normalizeAffiliateUrl('javascript:alert(1)'), null);
  assert.equal(normalizeAffiliateUrl('data:text/html,hi'), null);
  assert.equal(normalizeAffiliateUrl('   '), null);
});

test('validateTeeInput rejects missing required fields and invalid price', () => {
  const result = validateTeeInput({
    title: '',
    brand: 'Acme',
    price: '-10',
    category: 'Heavyweight',
    fit: '',
    retailer: 'Amazon.in',
    affiliateUrl: 'javascript:evil()',
    imageUrl: '',
    tag: '',
  });

  assert.ok(result.errors.title);
  assert.ok(result.errors.price);
  assert.ok(result.errors.fit);
  assert.ok(result.errors.affiliateUrl);
  assert.ok(result.errors.imageUrl);
  assert.equal(result.normalizedUrl, null);
});

test('filterAndSortTees filters by category and query and sorts by price', () => {
  const graphicOnly = filterAndSortTees(SAMPLE_TEES, {
    category: 'Graphic',
    query: '',
    sort: 'featured',
  });
  assert.equal(graphicOnly.length, 1);
  assert.equal(graphicOnly[0].id, 't2');

  const searchResult = filterAndSortTees(SAMPLE_TEES, {
    category: 'All',
    query: 'amazon.in',
    sort: 'featured',
  });
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 't3');

  const asc = filterAndSortTees(SAMPLE_TEES, {
    category: 'All',
    query: '',
    sort: 'price-asc',
  });
  assert.deepEqual(
    asc.map((t) => t.price),
    [799, 999, 1299],
  );

  const desc = filterAndSortTees(SAMPLE_TEES, {
    category: 'All',
    query: '',
    sort: 'price-desc',
  });
  assert.deepEqual(
    desc.map((t) => t.price),
    [1299, 999, 799],
  );
});

test('formatPrice renders INR currency formatting', () => {
  assert.equal(formatPrice(1299), '₹1,299');
  assert.equal(formatPrice(799), '₹799');
});

test('buildBloggerHtmlSnippet generates direct anchor cards with no intermediate post links', () => {
  const html = buildBloggerHtmlSnippet(SAMPLE_TEES);
  assert.match(html, /class="spunsilly-card"/);
  assert.match(html, /href="https:\/\/www\.amazon\.in\/dp\/B09SPUN03\?tag=spunsilly-21"/);
  assert.match(html, /₹1,299/);
  assert.match(html, /rel="nofollow sponsored noopener noreferrer"/);
  assert.doesNotMatch(html, /\/post\//);
});
