/**
 * Core domain types.
 *
 * These mirror the future Laravel API payloads 1:1 so that swapping the mock
 * adapter for real endpoints requires no component changes.
 */

/** Bilingual text — `hi` falls back to `en` when unavailable. */
export interface Bilingual {
  en: string
  hi?: string
}

export type Locale = 'en' | 'hi'

export interface Category {
  id: string
  slug: string
  name: Bilingual
  tagline: Bilingual
  description: Bilingual
  /** Key applications, straight from the business profile. */
  applications: Bilingual[]
  image: string
  bannerImage: string
  sortOrder: number
}

export type FinishId =
  | 'mirror-polish'
  | 'semi-polish'
  | 'honed'
  | 'river-finish'
  | 'shot-blasted'

export interface Finish {
  id: FinishId
  name: Bilingual
  description: Bilingual
}

export interface ProductSize {
  label: string
  metric: string
  thickness: string
}

export interface Specification {
  label: Bilingual
  value: Bilingual
}

export interface Product {
  id: string
  slug: string
  categorySlug: string
  name: Bilingual
  /** Shade / variety line, e.g. "Kota Blue". */
  shade: string
  summary: Bilingual
  description: Bilingual
  applications: Bilingual[]
  finishes: FinishId[]
  sizes: ProductSize[]
  thickness: string
  packaging: Bilingual
  specifications: Specification[]
  images: string[]
  /** Marks a product surfaced on the homepage rail. */
  featured?: boolean
  inStock?: boolean
  createdAt: string
}

export type InquiryStatus = 'new' | 'contacted' | 'quoted' | 'closed'

export interface Inquiry {
  id: string
  name: string
  company?: string
  email: string
  phone: string
  subject: string
  message: string
  productSlug?: string
  status: InquiryStatus
  createdAt: string
}

export interface GalleryItem {
  id: string
  title: Bilingual
  caption: Bilingual
  collection: GalleryCollectionId
  image: string
}

export type GalleryCollectionId =
  | 'stone-collection'
  | 'stockyard'
  | 'processing'
  | 'applications'
  | 'completed-projects'

export interface Service {
  id: string
  slug: string
  title: Bilingual
  summary: Bilingual
  description: Bilingual
  points: Bilingual[]
  icon: string
  image: string
}

export interface Banner {
  id: string
  title: Bilingual
  subtitle: Bilingual
  image: string
  ctaLabel: Bilingual
  ctaHref: string
  active: boolean
  sortOrder: number
}

export interface SiteStat {
  id: string
  value: string
  label: Bilingual
}
