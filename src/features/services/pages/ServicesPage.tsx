import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Ruler, Layers, Video, Truck, Briefcase } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { SectionHeader } from '@/components/ui'
import { ImageFrame } from '@/components/common/ImageFrame'
import { services } from '@/data/mock/services'
import type { Service } from '@/types'

function getServiceIcon(icon: string) {
  switch (icon) {
    case 'ruler':
      return <Ruler size={22} />
    case 'layers':
      return <Layers size={22} />
    case 'video':
      return <Video size={22} />
    case 'truck':
      return <Truck size={22} />
    case 'briefcase':
    default:
      return <Briefcase size={22} />
  }
}

export default function ServicesPage() {
  const { t, tx } = useLanguage()
  usePageMeta('services.page.eyebrow', 'services.page.subtitle')

  return (
    <div className="bg-ivory pt-32 sm:pt-36 lg:pt-40 pb-24">
      {/* 1. Hero Header */}
      <div className="container-page pb-12 sm:pb-16 border-b border-champagne">
        <SectionHeader
          eyebrow={t('services.page.eyebrow')}
          titleFirst={t('services.page.title1')}
          titleSecond={t('services.page.title2')}
          subtitle={t('services.page.subtitle')}
        />
      </div>

      {/* 2. Detailed Services Breakdown */}
      <div className="container-page py-16 sm:py-20 flex flex-col gap-20">
        {services.map((service: Service, idx: number) => {
          const isEven = idx % 2 === 1
          const quoteUrl = `/contact?service=${encodeURIComponent(tx(service.title))}#inquiry`

          return (
            <article
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-champagne/60 pb-16 last:border-b-0"
            >
              {/* Media Plate */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="border border-champagne p-2.5 bg-ivory-deep/40 shadow-xs relative">
                  <ImageFrame
                    src={service.image}
                    alt={tx(service.title)}
                    ratio="aspect-[16/10]"
                    imgClassName="hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-5 right-5 h-10 w-10 grid place-items-center bg-obsidian text-champagne border border-champagne/40 backdrop-blur-xs">
                    {getServiceIcon(service.icon)}
                  </div>
                </div>
              </div>

              {/* Text & Points */}
              <div
                className={`lg:col-span-6 flex flex-col gap-6 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="index-num">0{idx + 1}</span>
                  <span className="h-px w-8 bg-bronze/50" />
                  <span className="eyebrow text-taupe-deep">{t('services.page.eyebrow')}</span>
                </div>

                <h2 className="display-xs text-obsidian">{tx(service.title)}</h2>

                <p className="text-[1rem] leading-relaxed text-obsidian/80 font-light">
                  {tx(service.description)}
                </p>

                {/* Service Deliverables Checklist */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <span className="eyebrow text-bronze">{t('services.page.includes')}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {service.points.map((point, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-2.5 text-[0.875rem] text-obsidian/85"
                      >
                        <Check size={15} className="text-bronze shrink-0 mt-0.5" />
                        <span>{tx(point)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to={quoteUrl}
                    className="inline-flex items-center gap-2 border border-bronze bg-bronze px-6 py-3 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-ivory hover:bg-bronze-dark transition-all duration-300 shadow-xs hover:-translate-y-0.5"
                  >
                    <span>{t('services.cta')}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* 3. Bottom Consultation Callout */}
      <div className="container-page pt-10 text-center flex flex-col items-center gap-6">
        <span className="eyebrow text-bronze">B2B Architectural & Commercial Support</span>
        <h3 className="display-sm text-obsidian max-w-xl">
          Need custom drawings or quantity takeoff support?
        </h3>
        <p className="measure text-obsidian/70 text-[0.95rem]">
          Our technical quarry-dispatch team assists architects and contractors with accurate square-footage calculation, edge profile drawings, and full-truckload scheduling.
        </p>
        <Link to="/contact#inquiry" className="btn btn-solid btn-lg">
          {t('common.enquiry')}
        </Link>
      </div>
    </div>
  )
}
