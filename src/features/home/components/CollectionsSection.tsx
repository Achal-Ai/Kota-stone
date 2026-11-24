import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Reveal, SectionHeader } from '@/components/ui'
import { useCategoriesStore, useProductsStore } from '@/data/store'
import { cn } from '@/utils/format'

/**
 * Explore collections — editorial mosaic.
 * First category spans a large plate; the rest form a rhythm of smaller tiles,
 * so the section never reads as five identical cards.
 */
export function CollectionsSection() {
  const { t, tx } = useLanguage()
  const { categories } = useCategoriesStore()
  const { products } = useProductsStore()

  return (
    <section
      aria-labelledby="collections-title"
      className="section-y border-t border-champagne bg-ivory-deep"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="02"
            eyebrow={t('collections.eyebrow')}
            title={
              <span id="collections-title">
                {t('collections.title1')}{' '}
                <em className="text-taupe not-italic">{t('collections.title2')}</em>
              </span>
            }
            subtitle={t('collections.subtitle')}
          />
          <Link
            to="/products"
            className="link-underline shrink-0 self-start text-[0.75rem] font-semibold tracking-[0.16em] text-bronze uppercase lg:self-auto"
          >
            {t('common.viewAll')} →
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const count = products.filter((p) => p.categorySlug === category.slug).length
            const isFeature = index === 0

            return (
              <Reveal
                key={category.slug}
                delay={index * 80}
                className={cn(
                  isFeature && 'md:col-span-2 lg:col-span-2 lg:row-span-2',
                )}
              >
                <Link
                  to={`/products?category=${category.slug}`}
                  className="group relative flex h-full min-h-[16rem] flex-col justify-end overflow-hidden no-tap-highlight lg:min-h-[20rem]"
                >
                  <ImageFrame
                    src={category.image}
                    alt={`${tx(category.name)} — ${t('common.illustrative')}`}
                    ratio={isFeature ? 'aspect-[16/11] lg:aspect-auto' : 'aspect-[16/10]'}
                    className={isFeature ? 'absolute inset-0 h-full w-full' : undefined}
                    imgClassName="group-hover:scale-[1.04]"
                    sizes={isFeature ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 50vw, 33vw'}
                    illustrative
                  />

                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-obsidian/88 via-obsidian/25 to-transparent"
                  />

                  <div className="relative flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      <span className="index-num text-champagne">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-px flex-1 bg-ivory/25" />
                      <span className="text-[0.625rem] font-medium tracking-[0.16em] text-ivory/70 uppercase">
                        {count} {t('collections.varieties')}
                      </span>
                    </div>

                    <h3
                      className={cn(
                        'font-display text-ivory transition-colors group-hover:text-champagne',
                        isFeature ? 'text-[2.25rem] sm:text-[2.75rem]' : 'text-[1.75rem]',
                      )}
                    >
                      {tx(category.name)}
                    </h3>

                    <p className="line-clamp-2 max-w-lg text-[0.8125rem] leading-relaxed text-ivory/70">
                      {tx(category.tagline)}
                    </p>

                    <span className="mt-1 inline-flex items-center gap-2 text-[0.625rem] font-semibold tracking-[0.18em] text-champagne uppercase">
                      {t('collections.explore')}
                      <ArrowUpRight
                        aria-hidden
                        size={14}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
