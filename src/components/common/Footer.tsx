import { Link, useLocation } from 'react-router-dom'
import {
  ArrowUp,
  ArrowUpRight,
  Clock,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { categories } from '@/data/mock/categories'
import { services } from '@/data/mock/services'
import { CONTACT } from '@/data/constants/contact'

/**
 * World-class luxury architectural stone atelier footer.
 *
 * Features:
 * - Rajasthan quarry & manufacturing excellence trust pillars.
 * - Project consultation & dispatch desk banner.
 * - Comprehensive 4-column atelier navigation with honest business data.
 * - Architectural services capability strip.
 * - Smooth "Back to Top" luxury trigger & legal credentials.
 */

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { t, tx } = useLanguage()
  const location = useLocation()

  // The homepage closes with its own cinematic CTA — avoid stacking two.
  const showCtaBand = location.pathname !== '/'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-obsidian text-ivory overflow-hidden border-t border-champagne/25">
      {/* Decorative ambient background radiance */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(216, 198, 165, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* 1. Quarry & Manufacturing Trust Pillars */}
      <div className="border-b border-champagne/15 bg-obsidian-800/50">
        <div className="container-page py-8 sm:py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex items-start gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center border border-champagne/30 bg-obsidian text-champagne">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-ivory">
                  Quarry Bed Direct
                </h4>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-ivory/60">
                  Direct from Rajasthan stone beds — Kota, Makrana & Dholpur.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center border border-champagne/30 bg-obsidian text-champagne">
                <Layers size={18} />
              </div>
              <div>
                <h4 className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-ivory">
                  Laser & Gangsaw Calibrated
                </h4>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-ivory/60">
                  Uniform 16–20mm tiles & gangsaw slabs with precision tolerances.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center border border-champagne/30 bg-obsidian text-champagne">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-ivory">
                  Pan-India Crate Dispatch
                </h4>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-ivory/60">
                  Strapped wooden crates & corrugated packaging for safe transit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="grid h-10 w-10 shrink-0 place-items-center border border-champagne/30 bg-obsidian text-champagne">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-[0.75rem] font-semibold tracking-[0.16em] uppercase text-ivory">
                  Direct Wholesale Supply
                </h4>
                <p className="mt-1 text-[0.75rem] leading-relaxed text-ivory/60">
                  Zero middlemen — bulk pricing for architects, builders & homes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Optional CTA band for interior pages */}
      {showCtaBand && (
        <div className="container-page section-y-tight">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-champagne/20 pb-14 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow text-champagne">{t('cta.eyebrow')}</span>
              <h2 className="display-sm mt-5 text-ivory">
                {t('cta.title1')}{' '}
                <em className="text-champagne not-italic">{t('cta.title2')}</em>
              </h2>
              <p className="measure mt-5 text-[0.95rem] leading-relaxed text-ivory/70">
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

      {/* 3. Main Footer Grid */}
      <div className="container-page pt-16 pb-14 lg:pt-20 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Brand Column (Col 1 — 4 cols) */}
          <div className="flex flex-col lg:col-span-4">
            <div className="flex items-center gap-3.5">
              {/* Luxury architectural craftsman seal */}
              <div
                aria-hidden
                className="relative grid h-12 w-12 place-items-center border border-champagne/40 bg-obsidian-800 p-1 shadow-sm"
              >
                <div className="grid h-full w-full place-items-center border border-champagne/25 bg-gradient-to-br from-bronze to-bronze-dark text-ivory">
                  <span className="font-display text-[1.15rem] leading-none font-semibold tracking-wider">
                    PN
                  </span>
                </div>
              </div>

              <div className="flex flex-col leading-none">
                <span className="font-display text-[1.45rem] font-medium tracking-tight text-ivory">
                  {t('common.brandFull')}
                </span>
                <span className="mt-1.5 text-[0.5625rem] font-semibold tracking-[0.32em] text-champagne uppercase">
                  Rajasthan Natural Stone Atelier
                </span>
              </div>
            </div>

            <p className="mt-6 text-[0.875rem] leading-[1.8] text-ivory/65 max-w-sm font-light">
              {t('footer.dealingInValue')}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 border-l-2 border-bronze pl-4 text-[0.75rem] leading-relaxed text-champagne/85">
              <span className="font-semibold uppercase tracking-[0.14em] text-champagne">
                {t('footer.wholesaleNote')}
              </span>
              <span className="text-ivory/60">
                Direct dispatch from Rajasthan stockyards to project sites nationwide.
              </span>
            </div>

            <div className="mt-7 flex items-center gap-4 text-[0.6875rem] tracking-[0.14em] text-ivory/50 uppercase">
              <span className="inline-flex items-center gap-1.5 text-champagne/90">
                <MapPin size={13} className="text-bronze-light" />
                <span>Rajasthan, India</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} className="text-bronze-light" />
                <span>Mon–Sat 9AM–7PM</span>
              </span>
            </div>
          </div>

          {/* Natural Stone Collections (Col 2 — 3 cols) */}
          <nav aria-label={t('nav.products')} className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1 w-1 rotate-45 bg-bronze-light" />
              <h3 className="eyebrow text-champagne tracking-[0.24em]">
                {t('nav.products')}
              </h3>
            </div>
            <ul className="flex flex-col gap-3.5 text-[0.8125rem]">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="link-underline inline-block text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {tx(category.name)}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-champagne transition-colors hover:text-ivory"
                >
                  <span>{t('common.viewAll')} 30 Varieties</span>
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Links & Company (Col 3 — 2 cols) */}
          <nav aria-label={t('footer.quickLinks')} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1 w-1 rotate-45 bg-bronze-light" />
              <h3 className="eyebrow text-champagne tracking-[0.24em]">
                {t('footer.quickLinks')}
              </h3>
            </div>
            <ul className="flex flex-col gap-3.5 text-[0.8125rem]">
              {[
                { label: t('nav.home'), to: '/' },
                { label: t('nav.about'), to: '/about' },
                { label: t('nav.services'), to: '/services' },
                { label: t('nav.gallery'), to: '/gallery' },
                { label: t('nav.contact'), to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="link-underline inline-block text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 text-[0.6875rem] tracking-[0.14em] uppercase text-ivory/40 transition-colors hover:text-champagne"
                >
                  <span>{t('nav.admin')} Portal</span>
                  <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sourcing & Dispatch Desk (Col 4 — 3 cols) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1 w-1 rotate-45 bg-bronze-light" />
              <h3 className="eyebrow text-champagne tracking-[0.24em]">
                {t('footer.contact')}
              </h3>
            </div>

            <ul className="flex flex-col gap-5 text-[0.8125rem]">
              <li className="flex items-start gap-3">
                <Mail aria-hidden size={15} className="mt-1 shrink-0 text-bronze-light" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-champagne/80 uppercase">
                    {t('footer.email')}
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-ivory/85 transition-colors hover:text-champagne font-light"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone aria-hidden size={15} className="mt-1 shrink-0 text-bronze-light" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-champagne/80 uppercase">
                    {t('footer.phone')}
                  </span>
                  <span className="text-ivory/60 font-light">
                    {CONTACT.phoneDisplay ?? t('footer.phonePending')}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin aria-hidden size={15} className="mt-1 shrink-0 text-bronze-light" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.625rem] font-medium tracking-[0.2em] text-champagne/80 uppercase">
                    {t('footer.address')}
                  </span>
                  <span className="text-ivory/60 font-light">
                    {CONTACT.addressLines.length > 0
                      ? CONTACT.addressLines.join(', ')
                      : t('footer.addressPending')}
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-7 pt-2">
              <Link
                to="/contact#inquiry"
                className="group inline-flex items-center justify-center gap-2 border border-champagne/50 bg-obsidian-800/80 px-5 py-3 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-champagne transition-all duration-300 hover:border-bronze hover:bg-bronze hover:text-ivory hover:-translate-y-0.5 shadow-sm"
              >
                <span>{t('common.requestQuotation')}</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Service Capabilities Strip */}
      <div className="border-t border-champagne/15 bg-obsidian-800/30">
        <div className="container-page py-4 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[0.6875rem] tracking-[0.14em] text-ivory/50 uppercase">
            <span className="text-champagne/70 font-semibold">Our Capabilities:</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {services.map((service) => (
                <li key={service.id} className="transition-colors hover:text-ivory">
                  {tx(service.title)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Legal Bar with Back to Top Button */}
      <div className="border-t border-champagne/15 bg-obsidian">
        <div className="container-page flex flex-col gap-4 py-6 text-[0.6875rem] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <div>
            <p>
              © {CURRENT_YEAR} {t('common.brandFull')}. {t('footer.rights')}
            </p>
            <p className="mt-1 text-[0.625rem] text-ivory/35">
              100% Genuine Rajasthan Natural Stone · Processed & Supplied Pan-India
            </p>
          </div>

          <div className="flex items-center gap-6">
            <p className="hidden max-w-md text-right text-[0.625rem] text-ivory/35 lg:block">
              {t('footer.legal')}
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="group inline-flex items-center gap-2 border border-champagne/30 bg-obsidian-800 px-3.5 py-2 text-[0.625rem] font-medium tracking-[0.2em] uppercase text-champagne transition-all duration-300 hover:border-champagne/70 hover:bg-obsidian-700 hover:text-ivory"
            >
              <span>Back to Top</span>
              <ArrowUp
                size={12}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
