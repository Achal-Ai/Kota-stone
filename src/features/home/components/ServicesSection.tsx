import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Briefcase,
  Layers,
  Ruler,
  Truck,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { Reveal, SectionHeader } from '@/components/ui'
import { services } from '@/data/mock/services'

const icons: Record<string, LucideIcon> = {
  ruler: Ruler,
  layers: Layers,
  video: Video,
  truck: Truck,
  briefcase: Briefcase,
}

/**
 * Business services — five value-added services as a numbered list with
 * line icons and an editorial link into the services page.
 */
export function ServicesSection() {
  const { t, tx } = useLanguage()

  return (
    <section
      aria-labelledby="services-title"
      className="section-y border-t border-champagne bg-ivory"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="08"
            eyebrow={t('services.eyebrow')}
            title={
              <span id="services-title">
                {t('services.title1')}{' '}
                <em className="text-taupe not-italic">{t('services.title2')}</em>
              </span>
            }
            subtitle={t('services.subtitle')}
          />
          <Link
            to="/services"
            className="link-underline shrink-0 self-start text-[0.75rem] font-semibold tracking-[0.16em] text-bronze uppercase lg:self-auto"
          >
            {t('common.viewAll')} →
          </Link>
        </div>

        <ul className="mt-12 grid border-t border-champagne md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Layers
            return (
              <Reveal
                key={service.id}
                delay={index * 70}
                className="border-b border-champagne xl:[&:nth-child(3n+1)]:border-r md:[&:nth-child(odd)]:border-r xl:[&:nth-child(3n)]:border-r-0"
              >
                <li className="flex h-full flex-col gap-4 p-7 transition-colors hover:bg-ivory-deep/60">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center border border-champagne text-bronze">
                      <Icon size={19} strokeWidth={1.4} aria-hidden />
                    </span>
                    <span className="index-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-[1.4rem] leading-tight text-obsidian">
                    {tx(service.title)}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed text-obsidian/65">
                    {tx(service.summary)}
                  </p>

                  <Link
                    to={`/services#${service.slug}`}
                    className="link-underline mt-auto w-fit pt-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-bronze uppercase"
                  >
                    {t('common.readMore')}
                  </Link>
                </li>
              </Reveal>
            )
          })}

          {/* filler cell keeps the grid rhythm on xl */}
          <li
            aria-hidden
            className="hidden border-b border-champagne xl:block"
          />
        </ul>

        <Reveal className="mt-12 flex flex-wrap gap-4">
          <Link to="/contact#inquiry" className="btn btn-solid">
            {t('services.cta')}
            <ArrowUpRight aria-hidden size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
