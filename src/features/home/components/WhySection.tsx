import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { Reveal, SectionHeader } from '@/components/ui'
import { whyPoints } from '@/data/mock/siteContent'

/**
 * Why partner with us — four profile points on a warm ground, laid out as a
 * hairline grid with oversized numerals.
 */
export function WhySection() {
  const { t, tx } = useLanguage()

  return (
    <section
      aria-labelledby="why-title"
      className="section-y border-t border-champagne bg-ivory-deep"
    >
      <div className="container-page">
        <SectionHeader
          index="06"
          eyebrow={t('why.eyebrow')}
          title={
            <span id="why-title">
              {t('why.title1')}{' '}
              <em className="text-taupe not-italic">{t('why.title2')}</em>
            </span>
          }
        />

        <div className="mt-12 grid border-t border-champagne sm:grid-cols-2">
          {whyPoints.map((point, index) => (
            <Reveal
              key={point.id}
              delay={index * 80}
              className={[
                'border-b border-champagne p-7 sm:p-9',
                index % 2 === 0 ? 'sm:border-r' : '',
                index < 2 ? '' : 'sm:border-b-0',
                index === 2 ? 'sm:border-b sm:border-champagne' : '',
              ].join(' ')}
            >
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="font-display text-[2.75rem] leading-none font-light text-champagne"
                >
                  {point.index}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[1.5rem] leading-tight text-obsidian sm:text-[1.7rem]">
                    {tx(point.title)}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-obsidian/65">
                    {tx(point.body)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            to="/contact#inquiry"
            className="btn btn-solid"
          >
            {t('common.requestQuotation')}
            <ArrowUpRight aria-hidden size={15} />
          </Link>
          <Link to="/services" className="link-underline text-[0.75rem] font-semibold tracking-[0.16em] text-bronze uppercase">
            {t('services.cta')} →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
