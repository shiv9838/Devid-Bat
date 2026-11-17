export type TeeCategory = 'Heavyweight' | 'Graphic' | 'Oversized' | 'Vintage Wash';

export type FilterCategory = 'All' | TeeCategory;

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export interface TeeProduct {
  id: string;
  title: string;
  brand: string;
  price: number;
  category: TeeCategory;
  fit: string;
  retailer: string;
  affiliateUrl: string;
  imageUrl: string;
  tag?: string;
  featuredOrder: number;
  clicks: number;
}

export interface TeeFormInput {
  title: string;
  brand: string;
  price: string;
  category: TeeCategory;
  fit: string;
  retailer: string;
  affiliateUrl: string;
  imageUrl: string;
  tag: string;
}

export interface TeeValidationErrors {
  title?: string;
  brand?: string;
  price?: string;
  fit?: string;
  retailer?: string;
  affiliateUrl?: string;
  imageUrl?: string;
}
