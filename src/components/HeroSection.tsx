import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/defaultTees';

interface HeroSectionProps {
  totalTees: number;
}

export function HeroSection({ totalTees }: HeroSectionProps) {
  const [imgError, setImgError] = useState(false);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="top"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 lg:pt-10 lg:pb-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-zinc-500 mb-3">
            <span className="whitespace-nowrap">India Men&apos;s T-Shirt Showcase</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">{totalTees} Curated Picks</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">Direct Store Links</span>
          </div>

          <h1 className="font-display font-bold tracking-tight text-zinc-950 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.06] [text-wrap:balance] mb-5">
            Heavyweight tees, straight to the source.
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mb-8">
            No long blog posts, no filler reviews. Browse SpunSilly&apos;s edited
            lineup of men&apos;s crew necks, boxy fits, and graphic drops — click
            any product card to shop directly on Amazon.in, Myntra, Ajio &amp;
            more.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={scrollToCatalog}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            >
              <span>Shop the Drop</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>

            <a
              href="#curation-note"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              How direct links work
            </a>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-full min-h-[260px] aspect-[4/3] lg:aspect-auto rounded-xl overflow-hidden bg-[#ececee] border border-zinc-200/80">
            {!imgError ? (
              <img
                src={HERO_IMAGE_URL}
                alt="Folded heavyweight men's cotton t-shirts in charcoal, chalk white, and cobalt blue"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-200 to-zinc-300 text-zinc-700">
                <svg
                  className="w-14 h-14 mb-3 text-zinc-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M6.5 3.5L2 6.5l2.5 4L7 9.5V20h10V9.5l2.5 1 2.5-4-4.5-3h-2.2a3.3 3.3 0 0 1-6.6 0H6.5z" />
                </svg>
                <span className="font-display font-semibold text-lg">
                  SpunSilly Men&apos;s Tees
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
