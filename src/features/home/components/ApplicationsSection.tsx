import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { ImageFrame } from '@/components/common/ImageFrame'
import { SectionHeader } from '@/components/ui'
import { applicationTabs } from '@/data/mock/siteContent'
import { getCategoryBySlug } from '@/data/mock/categories'
import { cn } from '@/utils/format'

/**
 * Applications & inspiration — tabbed cinematic band on obsidian ground.
 * Each tab pairs a large plate with editorial copy and related category links.
 */
export function ApplicationsSection() {
  const { t, tx } = useLanguage()
  const [activeId, setActiveId] = useState(applicationTabs[0].id)
  const active = applicationTabs.find((tab) => tab.id === activeId) ?? applicationTabs[0]

  return (
    <section
      aria-labelledby="applications-title"
      className="section-y bg-obsidian text-ivory"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="04"
            tone="light"
            eyebrow={t('applications.eyebrow')}
            title={
              <span id="applications-title">
                {t('applications.title1')}{' '}
                <em className="text-champagne not-italic">{t('applications.title2')}</em>
              </span>
            }
            subtitle={t('applications.subtitle')}
          />

          {/* Tabs */}
          <div
            role="tablist"
            aria-label={t('applications.eyebrow')}
            className="flex flex-wrap gap-x-6 gap-y-3 lg:pb-1"
          >
            {applicationTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === active.id}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  'border-b py-2 text-[0.75rem] font-medium tracking-[0.14em] uppercase transition-colors',
                  tab.id === active.id
                    ? 'border-bronze-light text-champagne'
                    : 'border-transparent text-ivory/50 hover:text-ivory',
                )}
              >
                {tx(tab.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          className="mt-12 grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
          style={{ animation: 'luxe-scale-in 0.7s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <div className="lg:col-span-7">
            <ImageFrame
              src={active.image}
              alt={`${tx(active.title)} — ${t('common.illustrative')}`}
              ratio="aspect-[16/10]"
              sizes="(max-width: 1024px) 100vw, 58vw"
              illustrative
            />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <span className="eyebrow text-champagne">{tx(active.label)}</span>
            <h3 className="display-xs max-w-[16ch] text-ivory">{tx(active.title)}</h3>
            <p className="measure text-[0.95rem] leading-relaxed text-ivory/65">
              {tx(active.body)}
            </p>

            <div className="flex flex-wrap gap-2">
              {active.categories.map((slug) => {
                const category = getCategoryBySlug(slug)
                return (
                  <Link
                    key={slug}
                    to={`/products?category=${slug}`}
                    className="border border-ivory/25 px-4 py-2.5 text-[0.6875rem] font-medium tracking-[0.12em] text-ivory/80 uppercase transition-colors hover:border-bronze-light hover:text-champagne"
                  >
                    {category ? tx(category.name) : slug.replace(/-/g, ' ')}
                  </Link>
                )
              })}
            </div>

            <Link
              to="/products"
              className="link-underline mt-2 inline-flex w-fit items-center gap-2 text-[0.75rem] font-semibold tracking-[0.16em] text-champagne uppercase"
            >
              {t('common.requestQuotation')}
              <ArrowUpRight aria-hidden size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
