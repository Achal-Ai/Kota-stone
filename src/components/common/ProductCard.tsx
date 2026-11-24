import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Badge } from '@/components/ui'
import type { Product } from '@/types'
import { getCategoryBySlug } from '@/data/mock/categories'
import { getFinishById } from '@/data/mock/finishes'
import { cn } from '@/utils/format'

/**
 * Product card used on Home, Products and Related rails.
 * Tone variants keep it at home on both ivory and obsidian grounds.
 */
interface ProductCardProps {
  product: Product
  tone?: 'light' | 'dark'
  className?: string
  eager?: boolean
}

export function ProductCard({ product, tone = 'light', className, eager }: ProductCardProps) {
  const { t, tx } = useLanguage()
  const category = getCategoryBySlug(product.categorySlug)
  const primaryFinish = product.finishes[0] ? getFinishById(product.finishes[0]) : undefined
  const isLight = tone === 'light'

  return (
    <Link
      to={`/products/${product.slug}`}
      className={cn(
        'group flex h-full flex-col no-tap-highlight',
        className,
      )}
      aria-label={`${tx(product.name)} — ${t('common.viewDetails')}`}
    >
      <div className="relative overflow-hidden">
        <ImageFrame
          src={product.images[0]}
          alt={`${tx(product.name)} — ${t('common.illustrative')}`}
          ratio="aspect-[4/5]"
          priority={eager}
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          imgClassName="group-hover:scale-[1.05]"
        />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          <Badge tone={isLight ? 'bronze' : 'light'}>
            {tx(category?.name)}
          </Badge>
        </div>

        {!product.inStock && (
          <span className="absolute right-3 bottom-3 bg-obsidian/70 px-2.5 py-1 text-[0.5625rem] font-medium tracking-[0.16em] text-ivory uppercase backdrop-blur-sm">
            {t('common.onRequest')}
          </span>
        )}

        {/* hover affordance */}
        <span
          aria-hidden
          className={cn(
            'absolute right-3 bottom-3 grid h-10 w-10 translate-y-2 place-items-center opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100',
            isLight ? 'bg-obsidian text-ivory' : 'bg-ivory text-obsidian',
          )}
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-2.5 border-t pt-4',
          isLight ? 'border-champagne' : 'border-champagne/25',
        )}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              'font-display text-[1.35rem] leading-tight transition-colors',
              isLight
                ? 'text-obsidian group-hover:text-bronze'
                : 'text-ivory group-hover:text-champagne',
            )}
          >
            {tx(product.name)}
          </h3>
          <span
            className={cn(
              'shrink-0 text-[0.5625rem] font-medium tracking-[0.16em] uppercase',
              isLight ? 'text-taupe' : 'text-ivory/45',
            )}
          >
            {product.thickness.split('·')[0].trim()}
          </span>
        </div>

        <p
          className={cn(
            'line-clamp-2 text-[0.8125rem] leading-relaxed',
            isLight ? 'text-obsidian/60' : 'text-ivory/55',
          )}
        >
          {tx(product.summary)}
        </p>

        <div
          className={cn(
            'mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 text-[0.625rem] tracking-[0.14em] uppercase',
            isLight ? 'text-taupe-deep' : 'text-champagne/70',
          )}
        >
          {primaryFinish && <span>{tx(primaryFinish.name)}</span>}
          {product.sizes[0] && (
            <>
              <span aria-hidden className={isLight ? 'text-champagne' : 'text-ivory/25'}>
                /
              </span>
              <span>{product.sizes[0].label}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
