import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { ProductCard } from '@/components/common/ProductCard'
import { Button, Reveal, SectionHeader } from '@/components/ui'
import { featuredProducts } from '@/data/mock/products'

/**
 * Featured products — a horizontal rail with custom arrow controls
 * (native scrollbar hidden, touch momentum preserved).
 */
export function FeaturedSection() {
  const { t } = useLanguage()
  const railRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.min(rail.clientWidth * 0.8, 420)
    rail.scrollBy({ left: amount * direction, behavior: 'smooth' })
  }

  return (
    <section
      aria-labelledby="featured-title"
      className="section-y border-t border-champagne bg-ivory"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="03"
            eyebrow={t('featured.eyebrow')}
            title={
              <span id="featured-title">
                {t('featured.title1')}{' '}
                <em className="text-taupe not-italic">{t('featured.title2')}</em>
              </span>
            }
            subtitle={t('featured.subtitle')}
          />

          <div className="flex items-center gap-3 lg:pb-2">
            <RailButton direction="prev" onClick={() => scrollBy(-1)} label={t('product.prevImage')} />
            <RailButton direction="next" onClick={() => scrollBy(1)} label={t('product.nextImage')} />
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-90rem)/2+1.25rem))] pb-2 xl:px-[max(4rem,calc((100vw-90rem)/2+4rem))]"
      >
        {featuredProducts.map((product, index) => (
          <Reveal
            key={product.id}
            delay={index * 60}
            className="w-[16.5rem] shrink-0 snap-start sm:w-[19rem]"
          >
            <ProductCard product={product} />
          </Reveal>
        ))}

        {/* End card */}
        <Reveal
          delay={featuredProducts.length * 60}
          className="flex w-[16.5rem] shrink-0 snap-start sm:w-[19rem]"
        >
          <Link
            to="/products"
            className="group flex flex-col justify-between border border-champagne p-6 transition-colors hover:border-bronze"
          >
            <span className="eyebrow text-bronze">{t('common.viewAll')}</span>
            <span className="font-display text-[1.75rem] leading-tight text-obsidian">
              {t('featured.cta')}
            </span>
            <span className="grid h-11 w-11 place-items-center bg-obsidian text-ivory transition-colors group-hover:bg-bronze">
              <ArrowUpRight aria-hidden size={16} />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className="container-page mt-10 lg:hidden">
        <Button as={Link} to="/products" variant="outline" className="w-full">
          {t('featured.cta')}
        </Button>
      </div>
    </section>
  )
}

function RailButton({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid h-12 w-12 place-items-center border border-champagne text-obsidian transition-colors hover:border-bronze hover:bg-bronze hover:text-ivory"
    >
      {direction === 'prev' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
    </button>
  )
}
