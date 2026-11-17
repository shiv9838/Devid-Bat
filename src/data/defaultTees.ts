import type { TeeProduct } from '../types/tee';

export const STUDIO_IMAGE_PRESETS = [
  {
    label: 'Washed Charcoal Boxy',
    url: '/src/assets/images/tee_heavyweight_charcoal_1794885709246.jpg',
  },
  {
    label: 'Chalk Geometric Graphic',
    url: '/src/assets/images/tee_graphic_chalk_1794885709232.jpg',
  },
  {
    label: 'Vintage Slate Pocket',
    url: '/src/assets/images/tee_vintage_slate_1794885710402.jpg',
  },
  {
    label: 'Cobalt Supima Crew',
    url: '/src/assets/images/tee_cobalt_supima_1794885709777.jpg',
  },
  {
    label: 'Black & Chalk Striped',
    url: '/src/assets/images/tee_striped_skate_1794885710794.jpg',
  },
  {
    label: 'Sage Olive Graphic',
    url: '/src/assets/images/tee_graphic_olive_1794885710873.jpg',
  },
] as const;

export const HERO_IMAGE_URL =
  '/src/assets/images/hero_mens_tees_1794885709032.jpg';

export const DEFAULT_TEES: TeeProduct[] = [
  {
    id: 'tee-1',
    title: 'Heavyweight Boxy Crew — Washed Charcoal',
    brand: 'Standard Issue',
    price: 1299,
    category: 'Heavyweight',
    fit: 'Boxy · 310gsm',
    retailer: 'Myntra',
    affiliateUrl:
      'https://www.myntra.com/men-tshirts?utm_source=spunsilly&utm_medium=affiliate',
    imageUrl: '/src/assets/images/tee_heavyweight_charcoal_1794885709246.jpg',
    tag: '310gsm Cotton',
    featuredOrder: 1,
    clicks: 0,
  },
  {
    id: 'tee-2',
    title: 'Modernist Grid Screenprint Oversized Tee',
    brand: 'Kuro Studio',
    price: 999,
    category: 'Graphic',
    fit: 'Oversized · 260gsm',
    retailer: 'Ajio',
    affiliateUrl:
      'https://www.ajio.com/men-tshirts/c/830216014?utm_source=spunsilly&utm_medium=affiliate',
    imageUrl: '/src/assets/images/tee_graphic_chalk_1794885709232.jpg',
    tag: 'Limited Run',
    featuredOrder: 2,
    clicks: 0,
  },
  {
    id: 'tee-3',
    title: 'Garment-Dyed Utility Pocket Tee — Slate',
    brand: 'Harbor Goods',
    price: 799,
    category: 'Vintage Wash',
    fit: 'Relaxed · 245gsm',
    retailer: 'Amazon.in',
    affiliateUrl:
      'https://www.amazon.in/s?k=mens+garment+dyed+pocket+tshirt&tag=spunsilly-21',
    imageUrl: '/src/assets/images/tee_vintage_slate_1794885710402.jpg',
    tag: 'Pigment Dyed',
    featuredOrder: 3,
    clicks: 0,
  },
  {
    id: 'tee-4',
    title: 'Tailored Supima Essential Crew — Cobalt',
    brand: 'Atelier Mercer',
    price: 1490,
    category: 'Heavyweight',
    fit: 'Tailored · 250gsm',
    retailer: 'Uniqlo India',
    affiliateUrl:
      'https://www.uniqlo.com/in/en/men/tops/t-shirts?utm_source=spunsilly',
    imageUrl: '/src/assets/images/tee_cobalt_supima_1794885709777.jpg',
    tag: '100% Supima',
    featuredOrder: 4,
    clicks: 0,
  },
  {
    id: 'tee-5',
    title: 'Yarn-Dyed Horizontal Stripe Skate Tee',
    brand: 'Concrete Club',
    price: 1199,
    category: 'Oversized',
    fit: 'Drop Shoulder · 280gsm',
    retailer: 'Flipkart',
    affiliateUrl:
      'https://www.flipkart.com/mens-tshirts/pr?sid=clo,ash,ank,edy&affid=spunsilly',
    imageUrl: '/src/assets/images/tee_striped_skate_1794885710794.jpg',
    tag: 'Ribbed Collar',
    featuredOrder: 5,
    clicks: 0,
  },
  {
    id: 'tee-6',
    title: 'Arkitect Typeface Graphic Tee — Sage Olive',
    brand: 'Arkitect Supply',
    price: 899,
    category: 'Graphic',
    fit: 'Relaxed · 255gsm',
    retailer: 'Bewakoof',
    affiliateUrl:
      'https://www.bewakoof.com/men-t-shirts?utm_source=spunsilly',
    imageUrl: '/src/assets/images/tee_graphic_olive_1794885710873.jpg',
    tag: 'New Drop',
    featuredOrder: 6,
    clicks: 0,
  },
];
