import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { categories } from '@/data/mock/categories'
import { services } from '@/data/mock/services'
import { CONTACT } from '@/data/constants/contact'
import { cn } from '@/utils/format'

/**
 * Site footer — company information, navigation, contact block.
 * Contact values come from `constants/contact.ts`; pending values render as
 * honest "available on request" states rather than invented details.
 */
export function Footer() {
  const { t, tx } = useLanguage()
  const location = useLocation()

  const year = new Date().getFullYear()
  // The homepage closes with its own cinematic CTA — avoid stacking two.
  const showCtaBand = location.pathname !== '/'

  return (
    <footer className="bg-obsidian text-ivory">
      {/* CTA band */}
      {showCtaBand && (
      <div className="container-page section-y-tight">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-champagne/20 pb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow text-champagne">{t('cta.eyebrow')}</span>
            <h2 className="display-sm mt-5 text-ivory">
              {t('cta.title1')}{' '}
              <em className="text-champagne not-italic">{t('cta.title2')}</em>
            </h2>
            <p className="measure mt-5 text-[0.95rem] leading-relaxed text-ivory/65">
              {t('cta.subtitle')}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact#inquiry" className="btn btn-solid">
              {t('cta.primary')}
            </Link>
            <a href={`mailto:${CONTACT.email}`} className="btn btn-light">
              {t('cta.secondary')}
            </a>
          </div>
        </div>
      </div>
      )}

      {/* Main footer grid */}
      <div className="container-page grid gap-12 pb-16 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-12 w-12 place-items-center border border-bronze bg-bronze text-ivory"
            >
              <span className="font-display text-[1.1rem] leading-none font-semibold">PN</span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.4rem] text-ivory">
                {t('common.brandFull')}
              </span>
              <span className="mt-1.5 text-[0.5625rem] font-medium tracking-[0.3em] text-taupe uppercase">
                Est. Rajasthan · India
              </span>
            </span>
          </div>

          <p className="measure mt-6 text-sm leading-relaxed text-ivory/55">
            {t('footer.dealingInValue')}
          </p>

          <p className="mt-6 border-l-2 border-bronze pl-4 text-[0.75rem] leading-relaxed tracking-[0.04em] text-champagne/80">
            {t('footer.wholesaleNote')}
          </p>
        </div>

        {/* Explore */}
        <nav aria-label={t('footer.quickLinks')} className="lg:col-span-3">
          <h3 className="eyebrow mb-6 text-champagne">{t('footer.quickLinks')}</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { label: t('nav.home'), to: '/' },
              { label: t('nav.about'), to: '/about' },
              { label: t('nav.products'), to: '/products' },
              { label: t('nav.services'), to: '/services' },
              { label: t('nav.gallery'), to: '/gallery' },
              { label: t('nav.contact'), to: '/contact' },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline text-ivory/65 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Categories */}
        <nav aria-label={t('collections.title2')} className="lg:col-span-2">
          <h3 className="eyebrow mb-6 text-champagne">{t('nav.products')}</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/products?category=${category.slug}`}
                  className="text-ivory/65 transition-colors hover:text-ivory"
                >
                  {tx(category.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="eyebrow mb-6 text-champagne">{t('footer.contact')}</h3>
          <ul className="flex flex-col gap-5 text-sm">
            <li className="flex gap-3">
              <Mail aria-hidden size={15} className="mt-1 shrink-0 text-bronze-light" />
              <span className="flex flex-col gap-1">
                <span className="text-[0.625rem] tracking-[0.18em] text-taupe uppercase">
                  {t('footer.email')}
                </span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-ivory/75 transition-colors hover:text-ivory"
                >
                  {CONTACT.email}
                </a>
              </span>
            </li>

            <li className="flex gap-3">
              <Phone aria-hidden size={15} className="mt-1 shrink-0 text-bronze-light" />
              <span className="flex flex-col gap-1">
                <span className="text-[0.625rem] tracking-[0.18em] text-taupe uppercase">
                  {t('footer.phone')}
                </span>
                <span className="text-ivory/55 italic">
                  {CONTACT.phoneDisplay ?? t('footer.phonePending')}
                </span>
              </span>
            </li>

            <li className="flex gap-3">
              <MapPin aria-hidden size={15} className="mt-1 shrink-0 text-bronze-light" />
              <span className="flex flex-col gap-1">
                <span className="text-[0.625rem] tracking-[0.18em] text-taupe uppercase">
                  {t('footer.address')}
                </span>
                <span className="text-ivory/55 italic">
                  {CONTACT.addressLines.length > 0
                    ? CONTACT.addressLines.join(', ')
                    : t('footer.addressPending')}
                </span>
              </span>
            </li>
          </ul>

          <Link
            to="/contact#inquiry"
            className="mt-7 inline-flex items-center gap-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-champagne uppercase transition-colors hover:text-ivory"
          >
            {t('common.getInTouch')}
            <ArrowUpRight aria-hidden size={14} />
          </Link>
        </div>
      </div>

      {/* Service list strip */}
      <div className="container-page">
        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-champagne/15 py-6 text-[0.6875rem] tracking-[0.14em] text-ivory/40 uppercase">
          {services.map((service) => (
            <li key={service.id}>{tx(service.title)}</li>
          ))}
        </ul>
      </div>

      {/* Legal */}
      <div className="border-t border-champagne/15">
        <div
          className={cn(
            'container-page flex flex-col gap-3 py-6 text-[0.6875rem] text-ivory/40 md:flex-row md:items-center md:justify-between',
          )}
        >
          <p>
            © {year} {t('common.brandFull')}. {t('footer.rights')}
          </p>
          <p className="max-w-xl md:text-right">{t('footer.legal')}</p>
        </div>
      </div>
    </footer>
  )
}
