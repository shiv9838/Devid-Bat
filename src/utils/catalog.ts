import type {
  FilterCategory,
  SortOption,
  TeeFormInput,
  TeeProduct,
  TeeValidationErrors,
} from '../types/tee';

export const TEE_CATEGORIES: FilterCategory[] = [
  'All',
  'Heavyweight',
  'Graphic',
  'Oversized',
  'Vintage Wash',
];

export function formatPrice(price: number): string {
  const hasDecimals = !Number.isInteger(price);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(price);
}

export function normalizeAffiliateUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return null;
  }

  const candidate =
    /^https?:\/\//i.test(trimmed) || trimmed.includes('://')
      ? trimmed
      : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export function isValidImageSrc(rawSrc: string): boolean {
  const trimmed = rawSrc.trim();
  if (!trimmed) {
    return false;
  }
  if (trimmed.startsWith('/')) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateTeeInput(input: TeeFormInput): {
  errors: TeeValidationErrors;
  normalizedUrl: string | null;
  parsedPrice: number | null;
} {
  const errors: TeeValidationErrors = {};

  if (!input.title.trim()) {
    errors.title = 'Enter a product title.';
  }
  if (!input.brand.trim()) {
    errors.brand = 'Enter a brand name.';
  }

  const parsedPrice = Number.parseFloat(input.price.trim());
  if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
    errors.price = 'Enter a valid price greater than 0.';
  }

  if (!input.fit.trim()) {
    errors.fit = 'Specify fit or fabric weight (e.g. Boxy · 300gsm).';
  }
  if (!input.retailer.trim()) {
    errors.retailer = 'Enter the partner store name (e.g. Amazon, SSENSE).';
  }

  const normalizedUrl = normalizeAffiliateUrl(input.affiliateUrl);
  if (!normalizedUrl) {
    errors.affiliateUrl = 'Enter a valid http(s) affiliate destination URL.';
  }

  if (!isValidImageSrc(input.imageUrl)) {
    errors.imageUrl = 'Enter a valid image URL or choose a studio preset.';
  }

  return {
    errors,
    normalizedUrl,
    parsedPrice: Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : null,
  };
}

export function filterAndSortTees(
  tees: TeeProduct[],
  options: {
    category: FilterCategory;
    query: string;
    sort: SortOption;
  },
): TeeProduct[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  const filtered = tees.filter((tee) => {
    const matchesCategory =
      options.category === 'All' || tee.category === options.category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      tee.title,
      tee.brand,
      tee.category,
      tee.fit,
      tee.retailer,
      tee.tag ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  const sorted = [...filtered];
  if (options.sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price || a.featuredOrder - b.featuredOrder);
  } else if (options.sort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price || a.featuredOrder - b.featuredOrder);
  } else {
    sorted.sort((a, b) => a.featuredOrder - b.featuredOrder);
  }

  return sorted;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function buildBloggerHtmlSnippet(tees: TeeProduct[]): string {
  const cards = tees
    .map((tee) => {
      const safeUrl = normalizeAffiliateUrl(tee.affiliateUrl) ?? '#';
      return `  <a class="spunsilly-card" href="${escapeHtml(safeUrl)}" target="_blank" rel="nofollow sponsored noopener noreferrer">
    <div class="spunsilly-thumb">
      <img src="${escapeHtml(tee.imageUrl)}" alt="${escapeHtml(tee.title)}" loading="lazy" />
    </div>
    <div class="spunsilly-meta">
      <div class="spunsilly-kicker">${escapeHtml(tee.brand)} &middot; ${escapeHtml(tee.fit)}</div>
      <h3 class="spunsilly-title">${escapeHtml(tee.title)}</h3>
      <div class="spunsilly-footer">
        <span class="spunsilly-price">${escapeHtml(formatPrice(tee.price))}</span>
        <span class="spunsilly-cta">Shop at ${escapeHtml(tee.retailer)} &nearr;</span>
      </div>
    </div>
  </a>`;
    })
    .join('\n');

  return `<style>
  .spunsilly-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; font-family: system-ui, -apple-system, sans-serif; }
  .spunsilly-card { display: block; text-decoration: none; color: #111215; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; transition: transform 180ms ease, box-shadow 180ms ease; }
  .spunsilly-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(17, 18, 21, 0.08); }
  .spunsilly-thumb { aspect-ratio: 4 / 3; background: #ececee; overflow: hidden; }
  .spunsilly-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .spunsilly-meta { padding: 16px; }
  .spunsilly-kicker { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 6px; }
  .spunsilly-title { font-size: 16px; font-weight: 600; margin: 0 0 12px; color: #111215; }
  .spunsilly-footer { display: flex; align-items: center; justify-content: space-between; font-size: 14px; }
  .spunsilly-price { font-weight: 600; font-variant-numeric: tabular-nums; }
  .spunsilly-cta { color: #1d4ed8; font-weight: 500; }
</style>
<div class="spunsilly-grid">
${cards}
</div>`;
}
