import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowUpRight, Check, MessageSquare, ShieldCheck, Truck, Layers } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useProductsStore, useCategoriesStore, useFinishesStore } from '@/data/store'
import { getRelatedProducts } from '@/data/mock/products'
import { whatsappHref } from '@/data/constants/contact'
import { ProductCard } from '@/components/common/ProductCard'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Badge, EmptyState } from '@/components/ui'
import { cn } from '@/utils/format'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, tx } = useLanguage()
  const { products } = useProductsStore()
  const { categories } = useCategoriesStore()
  const { finishes } = useFinishesStore()

  const product = products.find((p) => p.slug === slug)
  const category = categories.find((c) => c.slug === product?.categorySlug)

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedFinish, setSelectedFinish] = useState<string | null>(
    product?.finishes[0] || null,
  )

  usePageMeta(
    product ? tx(product.name) : 'common.loading',
    product ? tx(product.summary) : 'meta.defaultDescription',
  )

  if (!product) {
    return (
      <div className="bg-ivory pt-40 pb-24">
        <div className="container-page">
          <EmptyState
            title={t('errors.notFoundTitle')}
            body={t('errors.notFoundBody')}
            action={
              <Link to="/products" className="btn btn-solid btn-sm mt-4">
                {t('product.backToProducts')}
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  const related = getRelatedProducts(product, 4)
  const activeFinishDetail = finishes.find((f) => f.id === selectedFinish)
  const quoteUrl = `/contact?product=${encodeURIComponent(tx(product.name))}#inquiry`
  const waUrl = whatsappHref({ product: tx(product.name), source: 'product-detail' })

  return (
    <div className="bg-ivory pt-32 sm:pt-36 lg:pt-40 pb-24">
      {/* Breadcrumb Navigation */}
      <div className="container-page pb-8 border-b border-champagne/60">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-wider text-taupe-deep">
          <Link to="/" className="hover:text-bronze transition-colors">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-bronze transition-colors">
            {t('nav.products')}
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link to={`/products?category=${category.slug}`} className="hover:text-bronze transition-colors">
                {tx(category.name)}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-obsidian font-semibold truncate max-w-[200px] sm:max-w-none">
            {tx(product.name)}
          </span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container-page pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative border border-champagne bg-ivory-deep/40 overflow-hidden shadow-xs">
              <ImageFrame
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${tx(product.name)} — ${t('common.illustrative')}`}
                ratio="aspect-[4/5]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                imgClassName="transition-transform duration-700 hover:scale-105"
              />
              <span className="absolute left-4 top-4">
                <Badge tone="bronze">{category ? tx(category.name) : product.categorySlug}</Badge>
              </span>
              <span className="absolute right-4 top-4 bg-obsidian/75 text-ivory text-[0.625rem] font-medium tracking-[0.16em] uppercase px-3 py-1 backdrop-blur-xs">
                {product.inStock ? t('product.inStock') : t('product.onRequest')}
              </span>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      'relative h-20 w-20 shrink-0 border overflow-hidden transition-all duration-300',
                      activeImageIndex === idx ? 'border-bronze ring-2 ring-bronze/30' : 'border-champagne opacity-70 hover:opacity-100',
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality and Logistics Trust Badges */}
            <div className="grid grid-cols-3 gap-3 border border-champagne/60 p-4 bg-ivory-deep/40 text-center text-[0.6875rem]">
              <div className="flex flex-col items-center gap-1.5 text-taupe-deep">
                <ShieldCheck size={18} className="text-bronze" />
                <span className="font-semibold text-obsidian uppercase tracking-wider">±1mm Calibrated</span>
                <span className="text-[0.625rem]">Laser measured</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-taupe-deep border-x border-champagne/60 px-2">
                <Layers size={18} className="text-bronze" />
                <span className="font-semibold text-obsidian uppercase tracking-wider">Lot-wise Grading</span>
                <span className="text-[0.625rem]">Color matched</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-taupe-deep">
                <Truck size={18} className="text-bronze" />
                <span className="font-semibold text-obsidian uppercase tracking-wider">Pan-India Freight</span>
                <span className="text-[0.625rem]">Wooden crate pack</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Specifications, Finishes & CTAs */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-bronze">{product.shade}</span>
              <h1 className="display-sm text-obsidian">{tx(product.name)}</h1>
              <p className="text-sm font-medium tracking-wider text-taupe-deep uppercase">
                {product.thickness}
              </p>
              <p className="text-[1rem] leading-relaxed text-obsidian/75 pt-2">
                {tx(product.description)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-y border-champagne/80 py-6">
              <Link
                to={quoteUrl}
                className="group inline-flex items-center justify-center gap-2.5 border border-bronze bg-bronze px-8 py-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-ivory shadow-xs hover:bg-bronze-dark transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{t('product.requestQuote')}</span>
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={waUrl}
                className="inline-flex items-center justify-center gap-2.5 border border-champagne bg-ivory-deep/80 px-8 py-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-obsidian hover:border-bronze hover:text-bronze transition-all duration-300"
              >
                <MessageSquare size={15} />
                <span>{t('product.whatsappInquiry')}</span>
              </a>
            </div>

            {/* Available Finishes Selector */}
            {product.finishes.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-taupe-deep">{t('product.finishes')}</span>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((fId) => {
                    const fObj = finishes.find((f) => f.id === fId)
                    if (!fObj) return null
                    const isSelected = selectedFinish === fId
                    return (
                      <button
                        key={fId}
                        type="button"
                        onClick={() => setSelectedFinish(fId)}
                        className={cn(
                          'px-4 py-2 border text-[0.75rem] font-medium tracking-wide uppercase transition-all duration-200',
                          isSelected
                            ? 'border-bronze bg-bronze text-ivory shadow-xs'
                            : 'border-champagne bg-ivory-deep/60 text-obsidian hover:border-bronze hover:text-bronze',
                        )}
                      >
                        {tx(fObj.name)}
                      </button>
                    )
                  })}
                </div>
                {activeFinishDetail && (
                  <p className="text-[0.8125rem] italic text-taupe-deep pt-1">
                    {tx(activeFinishDetail.description)}
                  </p>
                )}
              </div>
            )}

            {/* Standard Sizes & Thickness Matrix */}
            {product.sizes.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-taupe-deep">{t('product.sizesThickness')}</span>
                <div className="border border-champagne overflow-x-auto">
                  <table className="w-full text-left text-[0.8125rem]">
                    <thead className="bg-ivory-deep/80 border-b border-champagne eyebrow text-[0.625rem] text-taupe-deep">
                      <tr>
                        <th className="py-2.5 px-4">{t('product.size')}</th>
                        <th className="py-2.5 px-4">Metric</th>
                        <th className="py-2.5 px-4">{t('product.thickness')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-champagne/40">
                      {product.sizes.map((s, idx) => (
                        <tr key={idx} className="hover:bg-ivory-deep/30 transition-colors">
                          <td className="py-2.5 px-4 font-medium text-obsidian">{s.label}</td>
                          <td className="py-2.5 px-4 text-taupe-deep">{s.metric}</td>
                          <td className="py-2.5 px-4 text-obsidian">{s.thickness}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Applications List */}
            {product.applications.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-taupe-deep">{t('product.applications')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.applications.map((app, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[0.875rem] text-obsidian/85">
                      <Check size={14} className="text-bronze shrink-0" />
                      <span>{tx(app)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging Information */}
            <div className="flex flex-col gap-1.5 border-t border-champagne/60 pt-4">
              <span className="eyebrow text-taupe-deep">{t('product.packaging')}</span>
              <p className="text-[0.875rem] text-obsidian/80">{tx(product.packaging)}</p>
            </div>

            {/* Technical Specifications Table */}
            {product.specifications.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-champagne/60 pt-6">
                <span className="eyebrow text-taupe-deep">{t('product.specifications')}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-champagne border border-champagne">
                  {product.specifications.map((spec, idx) => (
                    <div key={idx} className="bg-ivory p-3 flex flex-col gap-1">
                      <span className="eyebrow text-[0.625rem] text-taupe">{tx(spec.label)}</span>
                      <span className="text-[0.875rem] font-medium text-obsidian">{tx(spec.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Rail */}
        {related.length > 0 && (
          <div className="mt-24 sm:mt-32 pt-16 border-t border-champagne">
            <div className="flex items-end justify-between pb-10">
              <div>
                <span className="eyebrow text-bronze">{category ? tx(category.name) : ''}</span>
                <h2 className="display-xs text-obsidian mt-1">{t('product.related')}</h2>
              </div>
              <Link
                to="/products"
                className="hidden sm:inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-wider uppercase text-bronze hover:text-bronze-dark transition-colors"
              >
                <span>{t('common.viewAll')}</span>
                <ArrowRightIcon size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} tone="light" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
