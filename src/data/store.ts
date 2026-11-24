import { useEffect, useState } from 'react'
import type { Category, Finish, GalleryItem, Inquiry, InquiryStatus, Product, Banner } from '@/types'
import { products as defaultProducts } from '@/data/mock/products'
import { categories as defaultCategories } from '@/data/mock/categories'
import { finishes as defaultFinishes } from '@/data/mock/finishes'
import { galleryItems as defaultGallery } from '@/data/mock/gallery'

/* --------------------------------------------------------------------------
   Local Storage Keys & Initial Data
   -------------------------------------------------------------------------- */

const KEYS = {
  PRODUCTS: 'sawariya_stone_products_v1',
  CATEGORIES: 'sawariya_stone_categories_v1',
  FINISHES: 'sawariya_stone_finishes_v1',
  GALLERY: 'sawariya_stone_gallery_v3',
  INQUIRIES: 'sawariya_stone_inquiries_v1',
  BANNERS: 'sawariya_stone_banners_v1',
} as const

const defaultInquiries: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Vikramaditya Rathore',
    company: 'Rathore Architects & Associates',
    email: 'vikram@rathorearch.com',
    phone: '+91 98290 12345',
    subject: 'Bulk order for luxury villa project in Jaipur',
    message: 'We require approx 8,500 sq.ft of Makrana White marble (Gangsaw slabs 8x4 ft) and 3,000 sq.ft of Kota Blue semi-polished tiles. Need sample inspection and thickness calibration report.',
    productSlug: 'makrana-white',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'inq-102',
    name: 'Ananya Deshmukh',
    company: 'Urban Spaces Development Corp',
    email: 'ananya.d@urbanspaces.in',
    phone: '+91 97110 56789',
    subject: 'Driveway cobbles and parking stones quotation',
    message: 'Need 12,000 sq.ft Black Basalt rough and Red Mandana grooved tiles for institutional campus parking and entrance ramp.',
    productSlug: 'black-basalt',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'inq-103',
    name: 'Rajesh Meena',
    company: 'Heritage Construction Ltd',
    email: 'rmeena@heritagebuild.co.in',
    phone: '+91 94140 88990',
    subject: 'Jodhpur Pink and Dholpur Beige Sandstone for facade',
    message: 'Supply of rock-face sandstone strips 3x18 in and 4x24 in with calibrated thickness 15mm. Looking for dispatched shipment schedule.',
    productSlug: 'dholpur-beige',
    status: 'quoted',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
]

const defaultBanners: Banner[] = [
  {
    id: 'ban-1',
    title: { en: 'Direct Quarry Sourcing from Rajasthan', hi: 'राजस्थान की खदानों से सीधा स्रोत' },
    subtitle: { en: 'Calibrated Kota Stone & Makrana Marble supplied Pan-India with zero intermediaries.', hi: 'कैलिब्रेटेड कोटा स्टोन और मकराना मार्बल बिना बिचौलियों के पूरे भारत में उपलब्ध।' },
    image: '/images/hero/hero-main.svg',
    ctaLabel: { en: 'Explore Collections', hi: 'संग्रह देखें' },
    ctaHref: '/products',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'ban-2',
    title: { en: 'Architectural Stone Consultation', hi: 'वास्तुकला स्टोन परामर्श' },
    subtitle: { en: 'Physical sample dispatch & live video stockyard inspection before shipment.', hi: 'डिस्पैच से पहले भौतिक नमूने व लाइव वीडियो स्टॉकयार्ड सत्यापन उपलब्ध।' },
    image: '/images/hero/cta-plate.svg',
    ctaLabel: { en: 'Request Quotation', hi: 'कोटेशन प्राप्त करें' },
    ctaHref: '/contact',
    active: true,
    sortOrder: 2,
  },
]

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : fallback
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e)
    return fallback
  }
}

function writeLocal<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(val))
    window.dispatchEvent(new CustomEvent('sawariya_store_change', { detail: { key } }))
  } catch (e) {
    console.error(`Error writing ${key} to localStorage`, e)
  }
}

/* --------------------------------------------------------------------------
   Store Listeners
   -------------------------------------------------------------------------- */

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  const onCustomChange = () => callback()
  const onStorage = () => callback()
  window.addEventListener('sawariya_store_change', onCustomChange)
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('sawariya_store_change', onCustomChange)
    window.removeEventListener('storage', onStorage)
  }
}

/* --------------------------------------------------------------------------
   Stores API & Hooks
   -------------------------------------------------------------------------- */

export const store = {
  /* Products */
  getProducts(): Product[] {
    return readLocal<Product[]>(KEYS.PRODUCTS, defaultProducts)
  },
  setProducts(prods: Product[]) {
    writeLocal(KEYS.PRODUCTS, prods)
  },
  addProduct(prod: Product) {
    const list = this.getProducts()
    writeLocal(KEYS.PRODUCTS, [prod, ...list])
  },
  updateProduct(prod: Product) {
    const list = this.getProducts().map((p) => (p.id === prod.id ? prod : p))
    writeLocal(KEYS.PRODUCTS, list)
  },
  deleteProduct(id: string) {
    const list = this.getProducts().filter((p) => p.id !== id)
    writeLocal(KEYS.PRODUCTS, list)
  },

  /* Categories */
  getCategories(): Category[] {
    return readLocal<Category[]>(KEYS.CATEGORIES, defaultCategories)
  },
  setCategories(cats: Category[]) {
    writeLocal(KEYS.CATEGORIES, cats)
  },
  addCategory(cat: Category) {
    const list = this.getCategories()
    writeLocal(KEYS.CATEGORIES, [...list, cat])
  },
  updateCategory(cat: Category) {
    const list = this.getCategories().map((c) => (c.id === cat.id ? cat : c))
    writeLocal(KEYS.CATEGORIES, list)
  },
  deleteCategory(id: string) {
    const list = this.getCategories().filter((c) => c.id !== id)
    writeLocal(KEYS.CATEGORIES, list)
  },

  /* Finishes */
  getFinishes(): Finish[] {
    return readLocal<Finish[]>(KEYS.FINISHES, defaultFinishes)
  },
  updateFinish(fin: Finish) {
    const list = this.getFinishes().map((f) => (f.id === fin.id ? fin : f))
    writeLocal(KEYS.FINISHES, list)
  },

  /* Gallery */
  getGallery(): GalleryItem[] {
    return readLocal<GalleryItem[]>(KEYS.GALLERY, defaultGallery)
  },
  addGalleryItem(item: GalleryItem) {
    const list = this.getGallery()
    writeLocal(KEYS.GALLERY, [item, ...list])
  },
  deleteGalleryItem(id: string) {
    const list = this.getGallery().filter((item) => item.id !== id)
    writeLocal(KEYS.GALLERY, list)
  },

  /* Inquiries */
  getInquiries(): Inquiry[] {
    return readLocal<Inquiry[]>(KEYS.INQUIRIES, defaultInquiries)
  },
  addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'> & { id?: string; status?: InquiryStatus }): Inquiry {
    const fullInquiry: Inquiry = {
      id: inquiry.id || `inq-${Date.now()}`,
      status: inquiry.status || 'new',
      createdAt: new Date().toISOString(),
      ...inquiry,
    }
    const list = this.getInquiries()
    writeLocal(KEYS.INQUIRIES, [fullInquiry, ...list])
    return fullInquiry
  },
  updateInquiryStatus(id: string, status: InquiryStatus) {
    const list = this.getInquiries().map((inq) => (inq.id === id ? { ...inq, status } : inq))
    writeLocal(KEYS.INQUIRIES, list)
  },
  deleteInquiry(id: string) {
    const list = this.getInquiries().filter((inq) => inq.id !== id)
    writeLocal(KEYS.INQUIRIES, list)
  },

  /* Banners */
  getBanners(): Banner[] {
    return readLocal<Banner[]>(KEYS.BANNERS, defaultBanners)
  },
  addBanner(ban: Banner) {
    const list = this.getBanners()
    writeLocal(KEYS.BANNERS, [...list, ban])
  },
  updateBanner(ban: Banner) {
    const list = this.getBanners().map((b) => (b.id === ban.id ? ban : b))
    writeLocal(KEYS.BANNERS, list)
  },
  deleteBanner(id: string) {
    const list = this.getBanners().filter((b) => b.id !== id)
    writeLocal(KEYS.BANNERS, list)
  },

  /* Reset all store to default */
  resetAll() {
    writeLocal(KEYS.PRODUCTS, defaultProducts)
    writeLocal(KEYS.CATEGORIES, defaultCategories)
    writeLocal(KEYS.FINISHES, defaultFinishes)
    writeLocal(KEYS.GALLERY, defaultGallery)
    writeLocal(KEYS.INQUIRIES, defaultInquiries)
    writeLocal(KEYS.BANNERS, defaultBanners)
  },
}

/* React Hooks */

export function useProductsStore() {
  const [data, setData] = useState(() => store.getProducts())
  useEffect(() => {
    return subscribe(() => setData(store.getProducts()))
  }, [])
  return {
    products: data,
    addProduct: (p: Product) => store.addProduct(p),
    updateProduct: (p: Product) => store.updateProduct(p),
    deleteProduct: (id: string) => store.deleteProduct(id),
  }
}

export function useCategoriesStore() {
  const [data, setData] = useState(() => store.getCategories())
  useEffect(() => {
    return subscribe(() => setData(store.getCategories()))
  }, [])
  return {
    categories: data,
    addCategory: (c: Category) => store.addCategory(c),
    updateCategory: (c: Category) => store.updateCategory(c),
    deleteCategory: (id: string) => store.deleteCategory(id),
  }
}

export function useFinishesStore() {
  const [data, setData] = useState(() => store.getFinishes())
  useEffect(() => {
    return subscribe(() => setData(store.getFinishes()))
  }, [])
  return {
    finishes: data,
    updateFinish: (f: Finish) => store.updateFinish(f),
  }
}

export function useGalleryStore() {
  const [data, setData] = useState(() => store.getGallery())
  useEffect(() => {
    return subscribe(() => setData(store.getGallery()))
  }, [])
  return {
    gallery: data,
    addGalleryItem: (item: GalleryItem) => store.addGalleryItem(item),
    deleteGalleryItem: (id: string) => store.deleteGalleryItem(id),
  }
}

export function useInquiriesStore() {
  const [data, setData] = useState(() => store.getInquiries())
  useEffect(() => {
    return subscribe(() => setData(store.getInquiries()))
  }, [])
  return {
    inquiries: data,
    addInquiry: (inq: Omit<Inquiry, 'id' | 'createdAt' | 'status'> & { id?: string; status?: InquiryStatus }) => store.addInquiry(inq),
    updateInquiryStatus: (id: string, status: InquiryStatus) => store.updateInquiryStatus(id, status),
    deleteInquiry: (id: string) => store.deleteInquiry(id),
  }
}

export function useBannersStore() {
  const [data, setData] = useState(() => store.getBanners())
  useEffect(() => {
    return subscribe(() => setData(store.getBanners()))
  }, [])
  return {
    banners: data,
    addBanner: (b: Banner) => store.addBanner(b),
    updateBanner: (b: Banner) => store.updateBanner(b),
    deleteBanner: (id: string) => store.deleteBanner(id),
  }
}
