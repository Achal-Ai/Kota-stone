import { useLanguage } from '@/app/providers/LanguageProvider'
import { Reveal, SectionHeader } from '@/components/ui'
import { qualityBenchmarks } from '@/data/mock/siteContent'

/**
 * Quality assurance — obsidian band carrying the technical benchmark table
 * from the business profile. Tabular numerals, hairline rows, no cards.
 */
export function QualitySection() {
  const { t, tx } = useLanguage()

  return (
    <section
      aria-labelledby="quality-title"
      className="section-y bg-obsidian text-ivory"
    >
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader
            index="07"
            tone="light"
            eyebrow={t('quality.eyebrow')}
            title={
              <span id="quality-title">
                {t('quality.title1')}{' '}
                <em className="text-champagne not-italic">{t('quality.title2')}</em>
              </span>
            }
            subtitle={t('quality.subtitle')}
          />

          <Reveal className="mt-8 border-l-2 border-bronze pl-5">
            <p className="text-[0.8125rem] leading-relaxed text-ivory/55">
              {t('quality.note')}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t('quality.eyebrow')}</caption>
            <thead>
              <tr className="border-b border-champagne/40">
                <th scope="col" className="eyebrow pb-4 text-champagne">
                  {t('quality.parameter')}
                </th>
                <th scope="col" className="eyebrow pb-4 text-champagne">
                  {t('quality.standard')}
                </th>
              </tr>
            </thead>
            <tbody>
              {qualityBenchmarks.map((row) => (
                <tr key={row.id} className="border-b border-ivory/12 align-top">
                  <th
                    scope="row"
                    className="w-2/5 py-5 pr-5 text-[0.8125rem] leading-snug font-medium text-ivory/80"
                  >
                    {tx(row.parameter)}
                  </th>
                  <td className="py-5 text-[0.8125rem] leading-snug text-ivory/60 tabular-nums">
                    {tx(row.standard)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
