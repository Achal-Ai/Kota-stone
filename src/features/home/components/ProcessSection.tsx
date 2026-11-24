import { useLanguage } from '@/app/providers/LanguageProvider'
import { ImageFrame } from '@/components/common/ImageFrame'
import { Reveal, SectionHeader } from '@/components/ui'
import { processSteps } from '@/data/mock/siteContent'

/**
 * Manufacturing & processing — four numbered stages, staggered against a
 * tall plate so the section reads as a process, not a card grid.
 */
export function ProcessSection() {
  const { t, tx } = useLanguage()

  return (
    <section
      aria-labelledby="process-title"
      className="section-y border-t border-champagne bg-ivory"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            index="05"
            eyebrow={t('process.eyebrow')}
            title={
              <span id="process-title">
                {t('process.title1')}{' '}
                <em className="text-taupe not-italic">{t('process.title2')}</em>
              </span>
            }
            subtitle={t('process.subtitle')}
          />

          <Reveal className="mt-10 hidden lg:block">
            <ImageFrame
              src="/images/processing/cutting.svg"
              alt="Stone cutting on the processing line (illustrative)"
              ratio="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              illustrative
              caption="Cutting · Calibration · Finishing"
            />
          </Reveal>
        </div>

        <ol className="flex flex-col lg:col-span-7">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * 90}>
              <li className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-champagne py-8 last:border-b sm:gap-x-8">
                <span className="index-num pt-1.5 text-[0.75rem]">{step.index}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-[1.6rem] leading-tight text-obsidian sm:text-[1.85rem]">
                    {tx(step.title)}
                  </h3>
                  <p className="measure text-[0.9rem] leading-relaxed text-obsidian/65">
                    {tx(step.body)}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
