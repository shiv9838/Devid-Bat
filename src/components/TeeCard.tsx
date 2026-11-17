import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { TeeProduct } from '../types/tee';
import { formatPrice } from '../utils/catalog';

interface TeeCardProps {
  tee: TeeProduct;
  onCardClick: (id: string) => void;
}

export function TeeCard({ tee, onCardClick }: TeeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={tee.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() => onCardClick(tee.id)}
      data-testid={`tee-card-${tee.id}`}
      className="group flex flex-col bg-white border border-zinc-200/90 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] w-full bg-[#ececee] overflow-hidden">
        {!imgError ? (
          <img
            src={tee.imageUrl}
            alt={tee.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-600">
            <svg
              className="w-10 h-10 mb-2 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M6.5 3.5L2 6.5l2.5 4L7 9.5V20h10V9.5l2.5 1 2.5-4-4.5-3h-2.2a3.3 3.3 0 0 1-6.6 0H6.5z" />
            </svg>
            <span className="text-xs font-medium text-zinc-500 line-clamp-2">
              {tee.title}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 mb-1.5">
            <span className="uppercase tracking-wider font-medium truncate">
              {tee.brand} <span aria-hidden="true">·</span> {tee.fit}
            </span>
            {tee.tag ? (
              <span className="shrink-0 font-medium text-zinc-600">
                {tee.tag}
              </span>
            ) : null}
          </div>

          <h3 className="text-base font-semibold text-zinc-950 leading-snug line-clamp-2 mb-4 group-hover:text-blue-700 transition-colors">
            {tee.title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <span className="font-mono text-[15px] font-semibold tabular-nums text-zinc-950">
            {formatPrice(tee.price)}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform whitespace-nowrap shrink-0">
            <span>Shop at {tee.retailer}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </a>
  );
}
