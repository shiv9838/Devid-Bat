import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, Pencil, RotateCcw, Trash2, X } from 'lucide-react';
import { STUDIO_IMAGE_PRESETS } from '../data/defaultTees';
import type {
  TeeCategory,
  TeeFormInput,
  TeeProduct,
  TeeValidationErrors,
} from '../types/tee';
import {
  buildBloggerHtmlSnippet,
  formatPrice,
  validateTeeInput,
} from '../utils/catalog';

interface ManageTeesDrawerProps {
  isOpen: boolean;
  tees: TeeProduct[];
  onClose: () => void;
  onAddTee: (tee: Omit<TeeProduct, 'id' | 'featuredOrder' | 'clicks'>) => void;
  onUpdateTee: (
    id: string,
    updates: Omit<TeeProduct, 'id' | 'featuredOrder' | 'clicks'>,
  ) => void;
  onDeleteTee: (id: string) => void;
  onResetDefaults: () => void;
}

const EMPTY_FORM: TeeFormInput = {
  title: '',
  brand: '',
  price: '',
  category: 'Heavyweight',
  fit: '',
  retailer: '',
  affiliateUrl: '',
  imageUrl: STUDIO_IMAGE_PRESETS[0].url,
  tag: '',
};

const CATEGORY_OPTIONS: TeeCategory[] = [
  'Heavyweight',
  'Graphic',
  'Oversized',
  'Vintage Wash',
];

export function ManageTeesDrawer({
  isOpen,
  tees,
  onClose,
  onAddTee,
  onUpdateTee,
  onDeleteTee,
  onResetDefaults,
}: ManageTeesDrawerProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'blogger'>('catalog');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TeeFormInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<TeeValidationErrors>({});
  const [copiedHtml, setCopiedHtml] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const startEdit = (tee: TeeProduct) => {
    setEditingId(tee.id);
    setForm({
      title: tee.title,
      brand: tee.brand,
      price: String(tee.price),
      category: tee.category,
      fit: tee.fit,
      retailer: tee.retailer,
      affiliateUrl: tee.affiliateUrl,
      imageUrl: tee.imageUrl,
      tag: tee.tag ?? '',
    });
    setErrors({});
    setActiveTab('catalog');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateTeeInput(form);
    if (
      Object.keys(validation.errors).length > 0 ||
      !validation.normalizedUrl ||
      validation.parsedPrice === null
    ) {
      setErrors(validation.errors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      brand: form.brand.trim(),
      price: validation.parsedPrice,
      category: form.category,
      fit: form.fit.trim(),
      retailer: form.retailer.trim(),
      affiliateUrl: validation.normalizedUrl,
      imageUrl: form.imageUrl.trim(),
      tag: form.tag.trim() || undefined,
    };

    if (editingId) {
      onUpdateTee(editingId, payload);
      setEditingId(null);
    } else {
      onAddTee(payload);
    }

    setForm(EMPTY_FORM);
    setErrors({});
  };

  const bloggerHtml = buildBloggerHtmlSnippet(tees);

  const handleCopyBloggerHtml = async () => {
    try {
      await navigator.clipboard.writeText(bloggerHtml);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    } catch {
      setCopiedHtml(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-zinc-950/40 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manage-drawer-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white h-full shadow-2xl border-l border-zinc-200 flex flex-col"
      >
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4">
          <div>
            <h2
              id="manage-drawer-title"
              className="font-display text-lg font-bold text-zinc-950"
            >
              Manage SpunSilly Links
            </h2>
            <p className="text-xs text-zinc-500">
              Every card links straight to its affiliate URL with no blog post.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close Manage Tees drawer"
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 pt-3 pb-2 border-b border-zinc-200 flex items-center justify-between gap-4 bg-[#f7f7f8]">
          <div className="inline-flex p-1 bg-[#ececee] rounded-lg gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Affiliate Links ({tees.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('blogger')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeTab === 'blogger'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Blogger HTML Export
            </button>
          </div>

          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-950 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'catalog' ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-950">
                    {editingId ? 'Edit T-Shirt Link' : 'Add New Men’s Tee'}
                  </h3>
                  {editingId ? (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="text-xs font-medium text-zinc-500 hover:text-zinc-950 cursor-pointer"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="tee-title"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Product Title
                    </label>
                    <input
                      id="tee-title"
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      placeholder="e.g. Heavyweight Loopwheel Crew — Black"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                    {errors.title ? (
                      <p className="text-xs text-red-600 mt-1">{errors.title}</p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="tee-brand"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Brand
                    </label>
                    <input
                      id="tee-brand"
                      type="text"
                      value={form.brand}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, brand: e.target.value }))
                      }
                      placeholder="e.g. Bonkers Corner"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                    {errors.brand ? (
                      <p className="text-xs text-red-600 mt-1">{errors.brand}</p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="tee-price"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Price (INR ₹)
                    </label>
                    <input
                      id="tee-price"
                      type="number"
                      step="1"
                      min="0"
                      value={form.price}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, price: e.target.value }))
                      }
                      placeholder="1299"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                    {errors.price ? (
                      <p className="text-xs text-red-600 mt-1">{errors.price}</p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="tee-category"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Category
                    </label>
                    <select
                      id="tee-category"
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          category: e.target.value as TeeCategory,
                        }))
                      }
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-blue-700"
                    >
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="tee-fit"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Fit / Weight
                    </label>
                    <input
                      id="tee-fit"
                      type="text"
                      value={form.fit}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, fit: e.target.value }))
                      }
                      placeholder="Boxy · 300gsm"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                    {errors.fit ? (
                      <p className="text-xs text-red-600 mt-1">{errors.fit}</p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="tee-retailer"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Partner Store
                    </label>
                    <input
                      id="tee-retailer"
                      type="text"
                      value={form.retailer}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          retailer: e.target.value,
                        }))
                      }
                      placeholder="Amazon.in / Myntra / Ajio"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                    {errors.retailer ? (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.retailer}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="tee-tag"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Optional Highlight
                    </label>
                    <input
                      id="tee-tag"
                      type="text"
                      value={form.tag}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, tag: e.target.value }))
                      }
                      placeholder="e.g. Top Pick"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="tee-url"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Direct Affiliate URL
                    </label>
                    <input
                      id="tee-url"
                      type="url"
                      value={form.affiliateUrl}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          affiliateUrl: e.target.value,
                        }))
                      }
                      placeholder="https://www.amazon.in/dp/B0...?tag=spunsilly-21"
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                    {errors.affiliateUrl ? (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.affiliateUrl}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="tee-image"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Product Image URL (or pick a studio preset)
                    </label>
                    <input
                      id="tee-image"
                      type="text"
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          imageUrl: e.target.value,
                        }))
                      }
                      placeholder="https://..."
                      className="w-full h-9 px-3 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:border-blue-700 mb-2"
                    />
                    {errors.imageUrl ? (
                      <p className="text-xs text-red-600 mb-2">
                        {errors.imageUrl}
                      </p>
                    ) : null}

                    <div className="grid grid-cols-6 gap-2">
                      {STUDIO_IMAGE_PRESETS.map((preset) => {
                        const selected = form.imageUrl === preset.url;
                        return (
                          <button
                            key={preset.url}
                            type="button"
                            title={preset.label}
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                imageUrl: preset.url,
                              }))
                            }
                            className={`aspect-[4/3] rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                              selected
                                ? 'border-blue-700 ring-1 ring-blue-700'
                                : 'border-zinc-200 hover:border-zinc-400'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Publish Tee Card'}
                </button>
              </form>

              <div className="pt-6 border-t border-zinc-200">
                <h3 className="text-sm font-semibold text-zinc-950 mb-3">
                  Active Storefront Cards
                </h3>
                <ul className="divide-y divide-zinc-200 border border-zinc-200 rounded-xl overflow-hidden">
                  {tees.map((tee) => (
                    <li
                      key={tee.id}
                      className="p-3 bg-white flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={tee.imageUrl}
                          alt={tee.title}
                          className="w-12 h-9 rounded object-cover bg-zinc-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-950 truncate">
                            {tee.title}
                          </p>
                          <p className="text-xs text-zinc-500 tabular-nums truncate">
                            {formatPrice(tee.price)} · {tee.retailer} ·{' '}
                            {tee.clicks} clicks
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          aria-label={`Edit ${tee.title}`}
                          onClick={() => startEdit(tee)}
                          className="p-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${tee.title}`}
                          onClick={() => onDeleteTee(tee.id)}
                          className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-950">
                    Blogger Direct-Link Grid Snippet
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1">
                    Paste this HTML into a Blogger page or HTML/JavaScript gadget.
                    Clicking any card jumps directly to your affiliate URL with no
                    post view.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyBloggerHtml}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer"
                >
                  {copiedHtml ? (
                    <>
                      <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy HTML</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-zinc-950 text-zinc-100 text-xs font-mono rounded-xl overflow-x-auto max-h-[460px] leading-relaxed">
                <code>{bloggerHtml}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
