import { useEffect, useMemo, useState } from 'react';
import { CatalogSection } from './components/CatalogSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ManageTeesDrawer } from './components/ManageTeesDrawer';
import { DEFAULT_TEES } from './data/defaultTees';
import type { FilterCategory, SortOption, TeeProduct } from './types/tee';
import { filterAndSortTees } from './utils/catalog';

const STORAGE_KEY = 'spunsilly_in_tees_v1';

function loadInitialTees(): TeeProduct[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TEES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_TEES;
  } catch {
    return DEFAULT_TEES;
  }
}

export default function App() {
  const [tees, setTees] = useState<TeeProduct[]>(loadInitialTees);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isManageOpen, setIsManageOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tees));
    } catch {
      // Ignore storage quota errors in restricted contexts.
    }
  }, [tees]);

  const filteredTees = useMemo(
    () =>
      filterAndSortTees(tees, {
        category: activeCategory,
        query: searchQuery,
        sort: sortBy,
      }),
    [tees, activeCategory, searchQuery, sortBy],
  );

  const handleCardClick = (id: string) => {
    setTees((prev) =>
      prev.map((tee) =>
        tee.id === id ? { ...tee, clicks: tee.clicks + 1 } : tee,
      ),
    );
  };

  const handleAddTee = (
    newTee: Omit<TeeProduct, 'id' | 'featuredOrder' | 'clicks'>,
  ) => {
    setTees((prev) => {
      const nextOrder =
        prev.reduce((max, item) => Math.max(max, item.featuredOrder), 0) + 1;
      const created: TeeProduct = {
        ...newTee,
        id: `tee-${Date.now()}`,
        featuredOrder: nextOrder,
        clicks: 0,
      };
      return [created, ...prev];
    });
  };

  const handleUpdateTee = (
    id: string,
    updates: Omit<TeeProduct, 'id' | 'featuredOrder' | 'clicks'>,
  ) => {
    setTees((prev) =>
      prev.map((tee) => (tee.id === id ? { ...tee, ...updates } : tee)),
    );
  };

  const handleDeleteTee = (id: string) => {
    setTees((prev) => prev.filter((tee) => tee.id !== id));
  };

  const handleResetDefaults = () => {
    setTees(DEFAULT_TEES);
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  const handleClearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f8] text-zinc-950">
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenManage={() => setIsManageOpen(true)}
      />

      <main className="flex-1">
        <HeroSection totalTees={tees.length} />

        <CatalogSection
          tees={filteredTees}
          totalCount={tees.length}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSelectCategory={setActiveCategory}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
          onCardClick={handleCardClick}
        />
      </main>

      <Footer />

      <ManageTeesDrawer
        isOpen={isManageOpen}
        tees={tees}
        onClose={() => setIsManageOpen(false)}
        onAddTee={handleAddTee}
        onUpdateTee={handleUpdateTee}
        onDeleteTee={handleDeleteTee}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
