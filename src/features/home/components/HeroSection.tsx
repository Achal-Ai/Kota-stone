import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { useReveal } from '@/hooks/useReveal'
import { Button } from '@/components/ui'
import { cn } from '@/utils/format'

/**
 * Cinematic hero — full-bleed imagery, flat obsidian scrim (never a gradient
 * blob), oversized Cormorant display type and a vertical margin caption.
 */
export function HeroSection() {
  const { t } = useLanguage()
  const { ref, visible } = useReveal<HTMLDivElement>(0.05)

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-obsidian"
    >
      {/* Media layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero/hero-main.svg"
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
          style={{
            animation: visible ? 'luxe-scale-in 2.4s cubic-bezier(0.22,1,0.36,1) both' : undefined,
          }}
        />
        <div className="absolute inset-0 bg-obsidian/62" />
        <div className="absolute inset-0 bg-linear-to-t from-obsidian via-obsidian/25 to-obsidian/45" />
      </div>

      {/* Vertical margin caption */}
      <span
        aria-hidden
        className="vertical-caption absolute top-1/2 left-6 hidden -translate-y-1/2 text-ivory/45 xl:block"
      >
        Est. Rajasthan · India
      </span>

      <div className="container-page relative pt-36 pb-16">
        <div
          className={cn(
            'flex flex-col gap-8 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]',
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          )}
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-bronze-light sm:w-16" />
            <span className="eyebrow text-champagne">{t('hero.eyebrow')}</span>
          </div>

          <h1 id="hero-title" className="display-lg max-w-[16ch] text-ivory">
            {t('hero.line1')}
            <br />
            <em className="text-champagne not-italic">{t('hero.line2')}</em>
            <br />
            {t('hero.line3')}
          </h1>

          <p className="measure-wide max-w-2xl text-[0.95rem] leading-relaxed text-ivory/75 sm:text-base">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button as={Link} to="/products" variant="solid" size="lg">
              {t('hero.ctaPrimary')}
              <ArrowUpRight aria-hidden size={15} />
            </Button>
            <Button as={Link} to="/contact#inquiry" variant="light" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </div>
        </div>

        {/* Base bar: note + scroll cue */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 pt-6">
          <p className="text-[0.625rem] tracking-[0.2em] text-ivory/55 uppercase sm:text-[0.6875rem]">
            {t('hero.note')}
          </p>
          <a
            href="#intro"
            className="group flex items-center gap-2 text-[0.625rem] tracking-[0.2em] text-ivory/55 uppercase transition-colors hover:text-ivory"
          >
            {t('hero.scroll')}
            <ArrowDown
              aria-hidden
              size={13}
              className="transition-transform duration-500 group-hover:translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
