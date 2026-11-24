import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useGalleryStore } from '@/data/store'
import { galleryCollections } from '@/data/mock/gallery'
import { SectionHeader, EmptyState } from '@/components/ui'
import { ImageFrame } from '@/components/common/ImageFrame'
import { cn } from '@/utils/format'
import type { GalleryItem } from '@/types'

export default function GalleryPage() {
  const { t, tx } = useLanguage()
  usePageMeta('gallery.heroEyebrow', 'gallery.subtitle')

  const { gallery } = useGalleryStore()
  const [activeCollection, setActiveCollection] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = activeCollection === 'all'
    ? gallery
    : gallery.filter((item) => item.collection === activeCollection)

  const activeItem: GalleryItem | null =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, filteredItems.length])

  return (
    <div className="bg-ivory pt-32 sm:pt-36 lg:pt-40 pb-24">
      {/* 1. Hero Header */}
      <div className="container-page pb-12 sm:pb-16 border-b border-champagne">
        <SectionHeader
          eyebrow={t('gallery.heroEyebrow')}
          titleFirst={t('gallery.title1')}
          titleSecond={t('gallery.title2')}
          subtitle={t('gallery.subtitle')}
        />

        {/* Collection Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveCollection('all')}
            className={cn(
              'px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 border',
              activeCollection === 'all'
                ? 'border-bronze bg-bronze text-ivory shadow-xs'
                : 'border-champagne bg-ivory-deep/60 text-obsidian hover:border-bronze hover:text-bronze',
            )}
          >
            {t('common.all')} ({gallery.length})
          </button>
          {galleryCollections.map((col) => {
            const count = gallery.filter((g) => g.collection === col.id).length
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setActiveCollection(col.id)}
                className={cn(
                  'px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-all duration-300 border',
                  activeCollection === col.id
                    ? 'border-bronze bg-bronze text-ivory shadow-xs'
                    : 'border-champagne bg-ivory-deep/60 text-obsidian hover:border-bronze hover:text-bronze',
                )}
              >
                {tx(col.name)} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Gallery Masonry / Grid */}
      <div className="container-page py-12">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => {
              const colObj = galleryCollections.find((c) => c.id === item.collection)
              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative cursor-pointer border border-champagne bg-ivory-deep/40 p-2.5 transition-all duration-300 hover:border-bronze shadow-xs hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <ImageFrame
                      src={item.image}
                      alt={tx(item.title)}
                      ratio="aspect-[4/3]"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="h-10 w-10 grid place-items-center bg-ivory text-obsidian rounded-none shadow-md">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 pb-2 px-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-[0.625rem] text-bronze">
                        {colObj ? tx(colObj.name) : item.collection}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-obsidian group-hover:text-bronze transition-colors">
                      {tx(item.title)}
                    </h3>
                    <p className="text-[0.8125rem] text-obsidian/70 line-clamp-2">
                      {tx(item.caption)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-20">
            <EmptyState
              title={t('gallery.empty')}
              body={t('products.noResultsBody')}
              action={
                <button
                  type="button"
                  onClick={() => setActiveCollection('all')}
                  className="btn btn-outline btn-sm mt-2"
                >
                  {t('products.clearAll')}
                </button>
              }
            />
          </div>
        )}

        {/* Bottom Illustrative Note */}
        <div className="mt-16 pt-8 border-t border-champagne/60 text-center">
          <p className="text-[0.75rem] text-taupe-deep italic max-w-xl mx-auto">
            {t('gallery.illustrativeNote')}
          </p>
        </div>
      </div>

      {/* 3. Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full bg-ivory border border-champagne shadow-lifted overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 h-10 w-10 grid place-items-center bg-obsidian/80 text-ivory hover:bg-bronze transition-colors"
              aria-label={t('common.close')}
            >
              <X size={18} />
            </button>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1,
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 grid place-items-center bg-obsidian/70 text-ivory hover:bg-bronze transition-colors backdrop-blur-xs"
              aria-label={t('common.previous')}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0,
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 grid place-items-center bg-obsidian/70 text-ivory hover:bg-bronze transition-colors backdrop-blur-xs"
              aria-label={t('common.next')}
            >
              <ChevronRight size={20} />
            </button>

            {/* Image Preview */}
            <div className="relative aspect-[16/10] bg-ivory-deep/80 overflow-hidden border-b border-champagne">
              <img
                src={activeItem.image}
                alt={tx(activeItem.title)}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Caption & Metadata */}
            <div className="p-6 sm:p-8 flex flex-col gap-2 bg-ivory">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-bronze">
                  {galleryCollections.find((c) => c.id === activeItem.collection)
                    ? tx(galleryCollections.find((c) => c.id === activeItem.collection)!.name)
                    : activeItem.collection}
                </span>
                <span className="text-[0.6875rem] text-taupe font-medium tabular-nums">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <h3 className="font-display text-2xl text-obsidian">{tx(activeItem.title)}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-obsidian/75">
                {tx(activeItem.caption)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
