import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import type { ProductRecommendation } from '@/services/ai/types'

interface ProductRecommendationCardProps {
  product: ProductRecommendation
  onSelect?: () => void
}

export function ProductRecommendationCard({
  product,
  onSelect,
}: ProductRecommendationCardProps) {
  const { tx } = useLanguage()

  return (
    <div className="flex flex-col overflow-hidden border border-champagne/35 bg-ivory shadow-sm transition-all duration-300 hover:border-bronze hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian-800">
        <img
          src={product.image}
          alt={tx(product.name)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-2 left-2 border border-champagne/40 bg-obsidian/75 px-2 py-0.5 text-[0.5625rem] font-semibold tracking-[0.16em] uppercase text-champagne backdrop-blur-xs">
          {tx(product.categoryName)}
        </span>
      </div>

      <div className="flex flex-col p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-[1.1rem] leading-tight font-medium text-obsidian">
            {tx(product.name)}
          </h4>
          <span className="shrink-0 text-[0.625rem] font-medium tracking-[0.1em] text-bronze uppercase">
            {product.thickness.split('·')[0].trim()}
          </span>
        </div>

        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-obsidian/70 line-clamp-2">
          {tx(product.summary)}
        </p>

        {product.applications && product.applications.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {product.applications.slice(0, 2).map((app, i) => (
              <span
                key={i}
                className="bg-ivory-deep px-1.5 py-0.5 text-[0.5625rem] font-medium tracking-wide text-taupe-deep uppercase"
              >
                {tx(app)}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-champagne/20 pt-2.5">
          <Link
            to={`/products/${product.slug}`}
            onClick={onSelect}
            className="group inline-flex items-center gap-1 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase text-bronze transition-colors hover:text-bronze-dark"
          >
            <span>View Specifications</span>
            <ArrowUpRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
