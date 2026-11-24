import { products } from '@/data/mock/products'
import { categories } from '@/data/mock/categories'
import { finishes } from '@/data/mock/finishes'
import type { ProductRecommendation } from './types'

export function toProductRecommendation(p: (typeof products)[number]): ProductRecommendation {
  const cat = categories.find((c) => c.slug === p.categorySlug)
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    categorySlug: p.categorySlug,
    categoryName: cat?.name ?? { en: 'Natural Stone', hi: 'प्राकृतिक पत्थर' },
    image: p.images[0] || '/images/categories/kota-stone.svg',
    summary: p.summary,
    thickness: p.thickness,
    applications: p.applications,
  }
}

export const KNOWLEDGE_BASE = {
  products: products.map(toProductRecommendation),
  categories,
  finishes,

  findProductBySlug(slug: string): ProductRecommendation | undefined {
    const found = products.find((p) => p.slug === slug || p.id === slug)
    return found ? toProductRecommendation(found) : undefined
  },

  findProductsByCategory(categorySlug: string): ProductRecommendation[] {
    return products
      .filter((p) => p.categorySlug === categorySlug)
      .map(toProductRecommendation)
  },

  search(query: string, maxResults = 3): ProductRecommendation[] {
    const q = query.toLowerCase().trim()
    if (!q) return []

    const matches = products.filter((p) => {
      const matchNameEn = p.name.en.toLowerCase().includes(q)
      const matchNameHi = p.name.hi ? p.name.hi.toLowerCase().includes(q) : false
      const matchSummaryEn = p.summary.en.toLowerCase().includes(q)
      const matchSummaryHi = p.summary.hi ? p.summary.hi.toLowerCase().includes(q) : false
      const matchShade = p.shade.toLowerCase().includes(q)
      const matchApps = p.applications.some(
        (app) => app.en.toLowerCase().includes(q) || (app.hi ? app.hi.toLowerCase().includes(q) : false),
      )
      return matchNameEn || matchNameHi || matchSummaryEn || matchSummaryHi || matchShade || matchApps
    })

    return matches.slice(0, maxResults).map(toProductRecommendation)
  },
}
