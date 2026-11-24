import { useLanguage } from '@/app/providers/LanguageProvider'
import { Reveal } from '@/components/ui'
import { siteStats } from '@/data/mock/siteContent'

/**
 * Proof strip — five claims from the business profile, set as an editorial
 * hairline grid rather than boxed cards.
 */
export function StatsStrip() {
  const { tx } = useLanguage()

  return (
    <section aria-label="Company facts" className="border-b border-champagne bg-ivory">
      <div className="container-page">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {siteStats.map((stat, index) => (
            <li
              key={stat.id}
              className="border-t border-champagne px-5 py-7 lg:border-t-0 lg:border-l lg:px-6 lg:py-9 lg:first:border-l-0"
            >
              <Reveal delay={index * 70}>
                <span className="eyebrow block text-bronze">{stat.value}</span>
                <span className="mt-3 block font-display text-[1.05rem] leading-snug text-obsidian sm:text-[1.15rem]">
                  {tx(stat.label)}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
