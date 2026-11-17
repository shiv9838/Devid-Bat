import type { FilterCategory } from '../types/tee';

interface HeaderProps {
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  onOpenManage: () => void;
}

const NAV_ITEMS: { label: string; category: FilterCategory }[] = [
  { label: 'All Tees', category: 'All' },
  { label: 'Heavyweight', category: 'Heavyweight' },
  { label: 'Graphic', category: 'Graphic' },
  { label: 'Oversized', category: 'Oversized' },
  { label: 'Vintage Wash', category: 'Vintage Wash' },
];

export function Header({
  activeCategory,
  onSelectCategory,
  onOpenManage,
}: HeaderProps) {
  const handleNavClick = (category: FilterCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#f7f7f8]/95 backdrop-blur-sm border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded"
        >
          SpunSilly
        </a>

        <nav
          aria-label="T-shirt categories"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.category;
            return (
              <a
                key={item.category}
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.category);
                }}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b-2 ${
                  isActive
                    ? 'text-zinc-950 border-blue-700'
                    : 'border-transparent hover:text-zinc-950 hover:border-zinc-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenManage}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            Manage Tees
          </button>
        </div>
      </div>
    </header>
  );
}
