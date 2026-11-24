import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { categories } from '@/data/mock/categories'
import { CONTACT } from '@/data/constants/contact'
import { cn } from '@/utils/format'

/**
 * Primary website navigation.
 *
 * - Transparent over the hero, solid ivory once scrolled.
 * - Products opens an editorial mega-menu (desktop) listing the 5 categories.
 * - EN / हिं switcher writes to LanguageProvider (persisted).
 * - Mobile drawer traps focus, locks body scroll, closes on route change.
 */

const links = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.about', href: '/about' },
  { key: 'nav.products', href: '/products' },
  { key: 'nav.services', href: '/services' },
  { key: 'nav.gallery', href: '/gallery' },
  { key: 'nav.contact', href: '/contact' },
] as const

export function Navbar() {
  const { t, locale, setLocale } = useLanguage()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  const isHome = location.pathname === '/'

  /* --- scroll state ------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* --- close overlays on navigation --------------------------------- */
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname, location.hash])

  /* --- body scroll lock --------------------------------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* --- focus trap + escape for the drawer ---------------------------- */
  useEffect(() => {
    if (!mobileOpen) return
    const drawer = drawerRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (event.key !== 'Tab' || !drawer) return
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const firstLink = drawer?.querySelector<HTMLElement>('a, button')
    firstLink?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [mobileOpen])

  const solid = scrolled || mobileOpen || !isHome

  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          solid
            ? 'border-b border-champagne bg-ivory/95 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        {/* utility strip */}
        <div
          className={cn(
            'hidden transition-colors duration-500 lg:block',
            solid ? 'border-b border-champagne/60' : 'border-b border-ivory/15',
          )}
        >
          <div className="container-page flex h-9 items-center justify-between text-[0.625rem] tracking-[0.2em] uppercase">
            <p className={cn(solid ? 'text-taupe-deep' : 'text-ivory/70')}>
              {t('meta.tagline')}
            </p>
            <div className="flex items-center gap-5">
              <a
                href={`mailto:${CONTACT.email}`}
                className={cn(
                  'link-underline transition-colors',
                  solid ? 'text-taupe-deep hover:text-bronze' : 'text-ivory/70 hover:text-ivory',
                )}
              >
                {CONTACT.email}
              </a>
              <span
                aria-hidden
                className={cn('h-3 w-px', solid ? 'bg-champagne' : 'bg-ivory/25')}
              />
              <span className={cn(solid ? 'text-taupe-deep' : 'text-ivory/70')}>
                {t('footer.phone')}: {t('footer.phonePending')}
              </span>
            </div>
          </div>
        </div>

        {/* main bar */}
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Link to="/" aria-label={t('meta.siteName')} className="group flex items-center gap-3">
            <Mark solid={solid} />
            <span className="hidden flex-col leading-none sm:flex">
              <span
                className={cn(
                  'font-display text-[1.35rem] font-medium tracking-[-0.01em] transition-colors',
                  solid ? 'text-obsidian' : 'text-ivory',
                )}
              >
                Pushp Narayan
              </span>
              <span
                className={cn(
                  'mt-1 text-[0.5625rem] font-medium tracking-[0.34em] uppercase transition-colors',
                  solid ? 'text-taupe-deep' : 'text-ivory/70',
                )}
              >
                Stone Supplier
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {links.map((link) =>
              link.key === 'nav.products' ? (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <NavLink
                    to={link.href}
                    onClick={() => setMegaOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'link-underline flex items-center gap-1.5 py-2 text-[0.75rem] font-medium tracking-[0.16em] uppercase transition-colors',
                        solid
                          ? isActive
                            ? 'text-bronze'
                            : 'text-obsidian hover:text-bronze'
                          : isActive
                            ? 'text-champagne'
                            : 'text-ivory/85 hover:text-ivory',
                      )
                    }
                  >
                    {t(link.key)}
                    <ChevronDown
                      aria-hidden
                      size={13}
                      className={cn(
                        'transition-transform duration-300',
                        megaOpen && 'rotate-180',
                      )}
                    />
                  </NavLink>

                  {megaOpen && <MegaMenu solid={solid} />}
                </div>
              ) : (
                <NavLink
                  key={link.key}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'link-underline py-2 text-[0.75rem] font-medium tracking-[0.16em] uppercase transition-colors',
                      solid
                        ? isActive
                          ? 'text-bronze'
                          : 'text-obsidian hover:text-bronze'
                        : isActive
                          ? 'text-champagne'
                          : 'text-ivory/85 hover:text-ivory',
                    )
                  }
                >
                  {t(link.key)}
                </NavLink>
              ),
            )}
          </nav>

          {/* right cluster */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher
              locale={locale}
              onChange={setLocale}
              solid={solid}
            />

            <Link
              to="/contact#inquiry"
              className={cn(
                'hidden items-center gap-2 border px-5 py-2.5 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase transition-all duration-400 xl:inline-flex',
                solid
                  ? 'border-obsidian bg-obsidian text-ivory hover:bg-bronze hover:border-bronze'
                  : 'border-ivory/45 text-ivory hover:bg-ivory hover:text-obsidian',
              )}
            >
              {t('nav.inquiryCta')}
              <ArrowUpRight aria-hidden size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center border transition-colors lg:hidden',
                solid
                  ? 'border-champagne text-obsidian'
                  : 'border-ivory/35 text-ivory',
              )}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ref={drawerRef}
      />
    </>
  )
}

/* --------------------------------------------------------------------------
   Monogram mark
   -------------------------------------------------------------------------- */

function Mark({ solid }: { solid: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid h-11 w-11 shrink-0 place-items-center border transition-colors duration-500',
        solid ? 'border-bronze bg-bronze text-ivory' : 'border-ivory/50 text-ivory',
      )}
    >
      <span className="font-display text-[1.05rem] leading-none font-semibold tracking-tight">
        PN
      </span>
    </span>
  )
}

/* --------------------------------------------------------------------------
   Products mega-menu
   -------------------------------------------------------------------------- */

function MegaMenu({ solid }: { solid: boolean }) {
  const { t, tx } = useLanguage()

  return (
    <div
      className="absolute top-full left-1/2 z-50 w-[46rem] -translate-x-1/2 pt-4"
      role="region"
      aria-label={t('nav.products')}
    >
      <div
        className={cn(
          'border shadow-lifted',
          solid ? 'border-champagne bg-ivory' : 'border-ivory/20 bg-obsidian/95 backdrop-blur-md',
        )}
      >
        <div className="grid grid-cols-2 gap-px bg-champagne/60">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className={cn(
                'group flex items-start gap-4 p-5 transition-colors',
                solid ? 'bg-ivory hover:bg-ivory-deep' : 'bg-obsidian hover:bg-obsidian-700',
              )}
            >
              <span className="index-num pt-1">{String(index + 1).padStart(2, '0')}</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    'font-display text-xl transition-colors',
                    solid ? 'text-obsidian group-hover:text-bronze' : 'text-ivory group-hover:text-champagne',
                  )}
                >
                  {tx(category.name)}
                </span>
                <span
                  className={cn(
                    'text-[0.75rem] leading-snug',
                    solid ? 'text-taupe-deep' : 'text-ivory/55',
                  )}
                >
                  {tx(category.tagline)}
                </span>
              </span>
            </Link>
          ))}

          <Link
            to="/products"
            className={cn(
              'group flex flex-col justify-center gap-2 p-5 transition-colors',
              solid ? 'bg-obsidian hover:bg-obsidian-700' : 'bg-bronze hover:bg-bronze-dark',
            )}
          >
            <span className="eyebrow text-champagne">{t('common.viewAll')}</span>
            <span className="font-display text-xl text-ivory">
              All {t('nav.products')} →
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Language switcher
   -------------------------------------------------------------------------- */

function LanguageSwitcher({
  locale,
  onChange,
  solid,
}: {
  locale: 'en' | 'hi'
  onChange: (locale: 'en' | 'hi') => void
  solid: boolean
}) {
  const { t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={t('common.language')}
      className={cn(
        'flex items-center border transition-colors duration-500',
        solid ? 'border-champagne' : 'border-ivory/35',
      )}
    >
      {(['en', 'hi'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          aria-pressed={locale === code}
          className={cn(
            'px-3 py-2 text-[0.625rem] font-semibold tracking-[0.16em] uppercase transition-colors',
            locale === code
              ? 'bg-bronze text-ivory'
              : solid
                ? 'text-taupe-deep hover:text-bronze'
                : 'text-ivory/70 hover:text-ivory',
          )}
        >
          {code === 'en' ? 'EN' : 'हिं'}
        </button>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Mobile drawer
   -------------------------------------------------------------------------- */

const MobileDrawer = forwardRef<
  HTMLDivElement,
  { open: boolean; onClose: () => void }
>(function MobileDrawer({ open, onClose }, ref) {
  const { t, tx, locale, setLocale } = useLanguage()

  return (
    <div
      id="mobile-drawer"
      ref={ref}
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-40 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 bg-obsidian/60 transition-opacity duration-400',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menu')}
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-[24rem] flex-col overflow-y-auto bg-ivory pt-24 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-6">
          {links.map((link, index) => (
            <NavLink
              key={link.key}
              to={link.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-baseline justify-between border-b border-champagne py-4 transition-colors',
                  isActive ? 'text-bronze' : 'text-obsidian hover:text-bronze',
                )
              }
            >
              <span className="font-display text-[1.6rem]">{t(link.key)}</span>
              <span className="index-num">
                {String(index + 1).padStart(2, '0')}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 pt-8">
          <p className="eyebrow mb-3 text-taupe">{t('products.category')}</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                onClick={onClose}
                className="border border-champagne px-3 py-2 text-[0.75rem] text-obsidian transition-colors hover:border-bronze hover:text-bronze"
              >
                {tx(category.name)}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4 px-6 pt-10 pb-10">
          <div className="flex items-center gap-3">
            {(['en', 'hi'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                className={cn(
                  'border px-4 py-2.5 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-colors',
                  locale === code
                    ? 'border-bronze bg-bronze text-ivory'
                    : 'border-champagne text-taupe-deep',
                )}
              >
                {code === 'en' ? 'English' : 'हिंदी'}
              </button>
            ))}
          </div>

          <Link to="/contact#inquiry" onClick={onClose} className="btn btn-solid w-full">
            {t('nav.inquiryCta')}
          </Link>
        </div>
      </div>
    </div>
  )
})
