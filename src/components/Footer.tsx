export function Footer() {
  return (
    <>
      <section
        id="curation-note"
        className="border-t border-zinc-200/90 bg-[#ececee]/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="font-display text-xl font-bold text-zinc-950 tracking-tight mb-2">
              Zero blog posts. Direct to the tee.
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              SpunSilly skips multi-page articles and jump-page friction. Every
              product card links straight to the verified partner store so you
              can check sizing, stock, and checkout in one click.
            </p>
          </div>

          <div className="md:col-span-7 md:pl-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-zinc-600">
            <div>
              <h3 className="font-semibold text-zinc-950 mb-1.5">
                Fabric & Fit Curation
              </h3>
              <p className="leading-relaxed">
                Focused on 240gsm–310gsm combed cotton, boxy streetwear cuts,
                pigment-dyed pocket tees, and tailored everyday essentials.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-950 mb-1.5">
                Affiliate Disclosure
              </h3>
              <p className="leading-relaxed">
                SpunSilly India may earn a small commission when you purchase
                through our partner store links (Amazon.in, Myntra, Ajio,
                Flipkart), at zero additional cost to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-zinc-950">
              SpunSilly
            </span>
            <span aria-hidden="true">·</span>
            <span>India Men&apos;s T-Shirt Affiliate Storefront</span>
          </div>

          <p>© {new Date().getFullYear()} SpunSilly. All partner trademarks belong to their respective owners.</p>
        </div>
      </footer>
    </>
  );
}
