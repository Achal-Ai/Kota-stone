import { Link } from 'react-router-dom'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Button, Reveal, SectionHeader } from '@/components/ui'
import { ArrowUpRight } from 'lucide-react'

/**
 * Company introduction — asymmetric 7/5 editorial split with an overlapping
 * image plate and a numbered proof list.
 */
export function IntroSection() {
  const { t, tList } = useLanguage()
  const points = tList('intro.points')

  return (
    <section id="intro" className="section-y bg-ivory" aria-labelledby="intro-title">
      <div className="container-page grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Copy — 6 cols */}
        <div className="lg:col-span-6">
          <SectionHeader
            index="01"
            eyebrow={t('intro.eyebrow')}
            title={
              <span id="intro-title">
                {t('intro.title1')} <em className="text-taupe not-italic">{t('intro.title2')}</em>
              </span>
            }
          />

          <Reveal className="mt-8 flex flex-col gap-5">
            <p className="measure text-[1.0625rem] leading-relaxed text-obsidian/80">
              {t('intro.body1')}
            </p>
            <p className="measure text-[0.95rem] leading-relaxed text-obsidian/65">
              {t('intro.body2')}
            </p>
          </Reveal>

          {/* Proof list */}
          <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-champagne pt-8 sm:grid-cols-2">
            {points.map((point, index) => (
              <li key={point} className="flex items-baseline gap-3">
                <span className="index-num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.9rem] leading-snug text-obsidian/75">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button as={Link} to="/about" variant="outline">
              {t('common.readMore')}
              <ArrowUpRight aria-hidden size={15} />
            </Button>
          </div>
        </div>

        {/* Imagery — 6 cols, staggered */}
        <div className="relative lg:col-span-6">
          <Reveal>
            <div className="relative">
              <ImageFrame
                src="/images/applications/marble-interior.svg"
                alt="Polished natural stone flooring in a light-filled interior (illustrative)"
                ratio="aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                illustrative
              />
              <span
                aria-hidden
                className="vertical-caption absolute -left-4 bottom-6 hidden text-taupe lg:block"
              >
                {t('intro.caption')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={140} className="mt-6 lg:absolute lg:-bottom-14 lg:-left-10 lg:mt-0 lg:w-56">
            <div className="border border-champagne bg-ivory p-6 shadow-lifted">
              <span className="font-display text-[3.25rem] leading-none font-light text-bronze">
                100%
              </span>
              <p className="mt-3 text-[0.75rem] leading-relaxed tracking-[0.1em] text-taupe-deep uppercase">
                Natural stone · Quarry direct · Calibrated
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
