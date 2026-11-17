import { Search, X } from 'lucide-react';
import type { FilterCategory, SortOption, TeeProduct } from '../types/tee';
import { TEE_CATEGORIES } from '../utils/catalog';
import { TeeCard } from './TeeCard';

interface CatalogSectionProps {
  tees: TeeProduct[];
  totalCount: number;
  activeCategory: FilterCategory;
  searchQuery: string;
  sortBy: SortOption;
  onSelectCategory: (category: FilterCategory) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  onCardClick: (id: string) => void;
}

export function CatalogSection({
  tees,
  totalCount,
  activeCategory,
  searchQuery,
  sortBy,
  onSelectCategory,
  onSearchChange,
  onSortChange,
  onClearFilters,
  onCardClick,
}: CatalogSectionProps) {
  const isFiltered = activeCategory !== 'All' || searchQuery.trim().length > 0;

  return (
    <section
      id="catalog"
      aria-label="Men's T-Shirt Catalog"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-zinc-200/90">
        <div
          role="tablist"
          aria-label="Filter t-shirts by style"
          className="inline-flex flex-nowrap items-center gap-1 p-1 bg-[#ececee] rounded-lg overflow-x-auto max-w-full"
        >
          {TEE_CATEGORIES.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectCategory(category)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                  isSelected
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <label htmlFor="catalog-search" className="sr-only">
              Search men&apos;s t-shirts
            </label>
            <Search
              className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="catalog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tees, brands, stores"
              className="w-full h-10 pl-9 pr-9 text-sm bg-white border border-zinc-200 rounded-lg text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
            />
            {searchQuery ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="shrink-0">
            <label htmlFor="catalog-sort" className="sr-only">
              Sort t-shirts
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full sm:w-auto h-10 px-3 text-sm font-medium bg-white border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
        <p className="tabular-nums">
          Showing <span className="font-semibold text-zinc-900">{tees.length}</span>{' '}
          of <span className="font-semibold text-zinc-900">{totalCount}</span>{' '}
          tees <span aria-hidden="true">·</span> Click any card to open partner
          store directly
        </p>

        {isFiltered ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4 cursor-pointer"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {tees.length > 0 ? (
        <div
          data-testid="tee-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {tees.map((tee) => (
            <TeeCard key={tee.id} tee={tee} onCardClick={onCardClick} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-xl p-12 text-center">
          <h3 className="font-display text-lg font-semibold text-zinc-950 mb-2">
            No matching t-shirts found
          </h3>
          <p className="text-sm text-zinc-600 mb-6 max-w-md mx-auto">
            Try another keyword or reset your category filter to view all curated
            men&apos;s tees.
          </p>
          <button
            type="button"
            onClick={onClearFilters}
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Show All Tees
          </button>
        </div>
      )}
    </section>
  );
}
