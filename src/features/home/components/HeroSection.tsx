import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/utils/format'

/**
 * Lighter, ultra-premium cinematic hero:
 * - Real, sunlit architectural natural marble & stone photography.
 * - Lighter, luminous scrims allowing genuine stone texture to breathe.
 * - Balanced typography hierarchy with natural line breaks.
 * - Refined warm bronze CTA and frosted architectural glass secondary button.
 * - High-contrast, clean legibility across desktop, tablet, and mobile.
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
      {/* Media & Architectural Lighting Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/images/hero/hero-stone.jpg"
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center filter brightness-[1.06] contrast-[1.05] saturate-[1.04]"
          style={{
            animation: visible ? 'luxe-scale-in 2.4s cubic-bezier(0.22,1,0.36,1) both' : undefined,
          }}
        />

        {/* 1. Lighter directional scrim: crystal clarity on the stone with soft text backing */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-obsidian/25 to-transparent sm:via-obsidian/18 sm:to-transparent" />

        {/* 2. Soft, airy top & bottom edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/65 via-transparent to-obsidian/30" />

        {/* 3. Luminous warm champagne & sunlit daylight radiance */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background:
              'radial-gradient(ellipse at 70% 28%, rgba(216, 198, 165, 0.35) 0%, rgba(183, 138, 95, 0.16) 45%, transparent 75%)',
          }}
        />

        {/* 4. Soft local contrast halo directly behind headline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse at 24% 62%, rgba(28, 26, 24, 0.45) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Vertical margin caption */}
      <div
        aria-hidden
        className="absolute top-1/2 left-8 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex pointer-events-none"
      >
        <span className="h-12 w-px bg-gradient-to-b from-transparent to-champagne/50" />
        <span className="vertical-caption text-[0.625rem] font-medium tracking-[0.35em] text-champagne/80">
          Est. Rajasthan · India
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-champagne/50 to-transparent" />
      </div>

      <div className="container-page relative pt-36 sm:pt-40 lg:pt-44 pb-14 sm:pb-16 lg:pb-20">
        <div
          className={cn(
            'flex flex-col gap-6 sm:gap-7 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]',
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          )}
        >
          {/* Eyebrow badge with bronze hairline & diamond ornament */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="h-px w-8 bg-bronze-light sm:w-14" />
            <div className="inline-flex items-center gap-2.5 border border-champagne/35 bg-obsidian/35 px-3.5 py-1.5 backdrop-blur-xs shadow-xs">
              <span className="h-1.5 w-1.5 rotate-45 bg-bronze-light" />
              <span className="eyebrow text-[0.6875rem] font-medium tracking-[0.28em] text-champagne">
                {t('hero.eyebrow')}
              </span>
            </div>
          </div>

          {/* Heading — natural editorial line breaks */}
          <h1 id="hero-title" className="display-lg max-w-4xl text-ivory tracking-[-0.02em]">
            <span className="block drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
              {t('hero.line1')}
            </span>
            <span className="block not-italic text-transparent bg-clip-text bg-gradient-to-r from-champagne via-champagne-soft to-champagne/95 drop-shadow-[0_2px_12px_rgba(216,198,165,0.25)]">
              {t('hero.line2')}
            </span>
            <span className="block drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
              {t('hero.line3')}
            </span>
          </h1>

          {/* Subtitle with vertical guide */}
          <div className="flex items-start gap-4 pt-1">
            <span className="hidden h-14 w-px bg-gradient-to-b from-champagne to-transparent sm:block sm:mt-1 shrink-0" />
            <p className="measure-wide max-w-2xl text-[0.95rem] leading-[1.8] text-ivory sm:text-base lg:text-[1.05rem] font-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-3 border border-champagne/50 bg-gradient-to-r from-bronze to-bronze-light px-7 sm:px-8 py-3.5 sm:py-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-4px_rgba(154,107,67,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:from-bronze-light hover:to-bronze hover:border-champagne hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_12px_28px_-4px_rgba(154,107,67,0.65)] active:translate-y-0"
            >
              <span>{t('hero.ctaPrimary')}</span>
              <ArrowUpRight
                aria-hidden
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <Link
              to="/contact#inquiry"
              className="group inline-flex items-center justify-center gap-3 border border-champagne/60 bg-ivory/15 px-7 sm:px-8 py-3.5 sm:py-4 text-[0.75rem] font-semibold tracking-[0.18em] uppercase text-ivory backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ivory hover:bg-ivory hover:text-obsidian active:translate-y-0"
            >
              <span>{t('hero.ctaSecondary')}</span>
            </Link>
          </div>
        </div>

        {/* Base bar: note + scroll cue */}
        <div className="mt-14 sm:mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-champagne/25 pt-6">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rotate-45 bg-bronze-light" />
            <p className="text-[0.625rem] font-medium tracking-[0.22em] text-ivory/80 uppercase sm:text-[0.6875rem]">
              {t('hero.note')}
            </p>
          </div>

          <a
            href="#intro"
            className="group inline-flex items-center gap-2.5 border border-champagne/30 bg-obsidian/30 px-3.5 py-1.5 backdrop-blur-xs text-[0.625rem] font-medium tracking-[0.22em] text-champagne uppercase transition-all duration-300 hover:border-champagne/60 hover:text-ivory hover:bg-obsidian/50"
          >
            <span>{t('hero.scroll')}</span>
            <ArrowDown
              aria-hidden
              size={12}
              className="transition-transform duration-500 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
