import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useProductsStore, useCategoriesStore, useFinishesStore } from '@/data/store'
import { ProductCard } from '@/components/common/ProductCard'
import { SectionHeader, EmptyState } from '@/components/ui'
import { cn } from '@/utils/format'

type SortOption = 'featured' | 'az' | 'za'

export default function ProductsPage() {
  const { t, tx } = useLanguage()
  usePageMeta('products.heroEyebrow', 'products.subtitle')

  const [searchParams, setSearchParams] = useSearchParams()
  const { products } = useProductsStore()
  const { categories } = useCategoriesStore()
  const { finishes } = useFinishesStore()

  const currentCategory = searchParams.get('category') || 'all'
  const currentFinish = searchParams.get('finish') || 'all'
  const currentSearch = searchParams.get('q') || ''
  const currentSort = (searchParams.get('sort') as SortOption) || 'featured'

  const [searchInput, setSearchInput] = useState(currentSearch)

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateParam('q', searchInput.trim())
  }

  const clearAllFilters = () => {
    setSearchInput('')
    setSearchParams({}, { replace: true })
  }

  const hasActiveFilters = currentCategory !== 'all' || currentFinish !== 'all' || currentSearch !== ''

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (currentCategory !== 'all' && product.categorySlug !== currentCategory) {
          return false
        }
        // Finish filter
        if (currentFinish !== 'all' && !product.finishes.includes(currentFinish as any)) {
          return false
        }
        // Search query filter (matches EN, HI, shade, summary)
        if (currentSearch) {
          const q = currentSearch.toLowerCase()
          const nameEn = product.name.en.toLowerCase()
          const nameHi = product.name.hi?.toLowerCase() || ''
          const shade = product.shade.toLowerCase()
          const summary = product.summary.en.toLowerCase()
          if (!nameEn.includes(q) && !nameHi.includes(q) && !shade.includes(q) && !summary.includes(q)) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        if (currentSort === 'az') {
          return a.name.en.localeCompare(b.name.en)
        }
        if (currentSort === 'za') {
          return b.name.en.localeCompare(a.name.en)
        }
        // 'featured'
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.name.en.localeCompare(b.name.en)
      })
  }, [products, currentCategory, currentFinish, currentSearch, currentSort])

  return (
    <div className="bg-ivory pt-32 sm:pt-36 lg:pt-40 pb-24">
      {/* Editorial Header */}
      <div className="container-page pb-12 sm:pb-16 border-b border-champagne">
        <SectionHeader
          eyebrow={t('products.heroEyebrow')}
          titleFirst={t('products.title1')}
          titleSecond={t('products.title2')}
          subtitle={t('products.subtitle')}
        />

        {/* Category Pills Bar */}
        <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => updateParam('category', 'all')}
            className={cn(
              'px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 border',
              currentCategory === 'all'
                ? 'border-bronze bg-bronze text-ivory shadow-xs'
                : 'border-champagne bg-ivory-deep/60 text-obsidian hover:border-bronze hover:text-bronze',
            )}
          >
            {t('products.allCategories')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => updateParam('category', cat.slug)}
              className={cn(
                'px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 border',
                currentCategory === cat.slug
                  ? 'border-bronze bg-bronze text-ivory shadow-xs'
                  : 'border-champagne bg-ivory-deep/60 text-obsidian hover:border-bronze hover:text-bronze',
              )}
            >
              {tx(cat.name)}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Control Toolbar */}
      <div className="container-page py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between border-b border-champagne/60 pb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('products.searchPlaceholder')}
              className="w-full bg-ivory-deep/80 border border-champagne pl-10 pr-10 py-2.5 text-[0.8125rem] text-obsidian placeholder:text-taupe focus:border-bronze focus:outline-none transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-taupe pointer-events-none" size={16} />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('')
                  updateParam('q', '')
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-taupe hover:text-obsidian"
                aria-label={t('common.close')}
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Right Controls: Finish Filter, Sort Dropdown & Results Counter */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[0.75rem]">
            {/* Finish Filter */}
            <div className="flex items-center gap-2 border border-champagne bg-ivory-deep/60 px-3 py-1.5">
              <SlidersHorizontal size={14} className="text-bronze" />
              <label htmlFor="finish-select" className="eyebrow text-taupe-deep text-[0.625rem]">
                {t('products.finish')}:
              </label>
              <select
                id="finish-select"
                value={currentFinish}
                onChange={(e) => updateParam('finish', e.target.value)}
                className="bg-transparent text-obsidian text-[0.75rem] font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">{t('products.allFinishes')}</option>
                {finishes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {tx(f.name)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border border-champagne bg-ivory-deep/60 px-3 py-1.5">
              <ArrowUpDown size={14} className="text-bronze" />
              <label htmlFor="sort-select" className="eyebrow text-taupe-deep text-[0.625rem]">
                {t('products.sortLabel')}:
              </label>
              <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="bg-transparent text-obsidian text-[0.75rem] font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">{t('products.sortFeatured')}</option>
                <option value="az">{t('products.sortAZ')}</option>
                <option value="za">{t('products.sortZA')}</option>
              </select>
            </div>

            {/* Clear All Pill */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 border border-bronze/40 bg-bronze/10 px-3 py-1.5 text-[0.6875rem] font-semibold text-bronze uppercase tracking-wider hover:bg-bronze hover:text-ivory transition-colors"
              >
                <X size={12} />
                {t('products.clearAll')}
              </button>
            )}

            {/* Counter */}
            <span className="eyebrow text-taupe-deep pl-1">
              {filteredProducts.length === 1
                ? t('products.resultsOne')
                : t('products.resultsCount').replace('{count}', String(filteredProducts.length))}
            </span>
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                tone="light"
                eager={idx < 4}
              />
            ))}
          </div>
        ) : (
          <div className="py-20">
            <EmptyState
              title={t('products.noResultsTitle')}
              body={t('products.noResultsBody')}
              action={
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="btn btn-outline btn-sm mt-2"
                >
                  {t('products.clearAll')}
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
