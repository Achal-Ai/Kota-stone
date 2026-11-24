import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { Reveal } from '@/components/ui'
import { CONTACT, whatsappHref } from '@/data/constants/contact'

/**
 * Premium inquiry CTA — full-bleed plate with flat obsidian scrim,
 * closing the homepage before the footer.
 */
export function InquiryCtaSection() {
  const { t } = useLanguage()

  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-obsidian"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/gallery/quarry-blocks.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center filter brightness-[0.85] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/95 via-obsidian/85 to-obsidian/75" />
      </div>

      <div className="container-page section-y">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow text-champagne">{t('cta.eyebrow')}</span>
            <h2 id="cta-title" className="display-sm mt-6 max-w-[16ch] text-ivory">
              {t('cta.title1')}{' '}
              <em className="text-champagne not-italic">{t('cta.title2')}</em>
            </h2>
            <p className="measure mt-6 text-[0.95rem] leading-relaxed text-ivory/70">
              {t('cta.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact#inquiry" className="btn btn-solid btn-lg">
                {t('cta.primary')}
                <ArrowUpRight aria-hidden size={15} />
              </Link>
              <a
                href={`mailto:${CONTACT.email}`}
                className="btn btn-light btn-lg"
              >
                <Mail aria-hidden size={15} />
                {t('cta.secondary')}
              </a>
            </div>

            <a
              href={whatsappHref({ source: 'home-cta' })}
              className="link-underline text-[0.6875rem] font-semibold tracking-[0.16em] text-champagne uppercase lg:mt-2"
            >
              {t('product.whatsappInquiry')} →
            </a>

            <p className="text-[0.625rem] tracking-[0.18em] text-ivory/45 uppercase lg:text-right">
              {t('cta.note')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
