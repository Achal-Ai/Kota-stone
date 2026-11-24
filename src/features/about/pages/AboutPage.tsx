import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, ShieldCheck, Factory, Mountain } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { SectionHeader } from '@/components/ui'
import { ImageFrame } from '@/components/common/ImageFrame'

export default function AboutPage() {
  const { t } = useLanguage()
  usePageMeta('about.heroEyebrow', 'about.subtitle')

  // Timelines and commitments from translation files
  const timeline = (t('about.timeline') as unknown as Array<{ year: string; title: string; body: string }>) || []
  const commitments = (t('about.commitments') as unknown as string[]) || []

  return (
    <div className="bg-ivory pt-32 sm:pt-36 lg:pt-40 pb-24">
      {/* 1. Hero Section */}
      <div className="container-page pb-14 sm:pb-20 border-b border-champagne">
        <SectionHeader
          eyebrow={t('about.heroEyebrow')}
          titleFirst={t('about.title1')}
          titleSecond={t('about.title2')}
          subtitle={t('about.subtitle')}
        />

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6 text-[1.05rem] leading-relaxed text-obsidian/80 font-light">
            <span className="eyebrow text-bronze">{t('about.introEyebrow')}</span>
            <h2 className="display-xs text-obsidian">{t('about.introTitle')}</h2>
            <p>
              Pushp Narayan Stone Supplier is headquartered in Rajasthan’s renowned natural stone mining and processing region. Sourcing directly from certified quarry blocks across Kota, Makrana, Rajnagar, and Jodhpur, we eliminate broker layers and inflated commissions to bring authentic Indian stone straight to architects, commercial builders, and private homeowners nationwide.
            </p>
            <p>
              With advanced multi-blade gang saws, automated continuous polishing lines, and strict diamond calibration tolerances (±1 mm), every batch is measured, inspected, and documented for dimensional consistency before packing into protective wooden crates.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-champagne p-2 bg-ivory-deep/40 shadow-xs">
              <ImageFrame
                src="/images/processing/stockyard.svg"
                alt="Stockyard infrastructure"
                ratio="aspect-[4/3]"
                imgClassName="hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sourcing & Infrastructure Pillars */}
      <div className="container-page py-16 sm:py-24 border-b border-champagne">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-champagne p-8 bg-ivory-deep/40 flex flex-col gap-4">
            <div className="h-12 w-12 grid place-items-center bg-bronze/10 text-bronze border border-bronze/30">
              <Mountain size={24} />
            </div>
            <span className="eyebrow text-bronze">{t('about.sourcingEyebrow')}</span>
            <h3 className="font-display text-2xl text-obsidian">{t('about.sourcingTitle')}</h3>
            <p className="text-sm leading-relaxed text-obsidian/70">
              Procuring directly from quarry heads gives us first choice of unblemished, structurally dense stone boulders with consistent sedimentary grain and mineral density.
            </p>
          </div>

          <div className="border border-champagne p-8 bg-ivory-deep/40 flex flex-col gap-4">
            <div className="h-12 w-12 grid place-items-center bg-bronze/10 text-bronze border border-bronze/30">
              <Factory size={24} />
            </div>
            <span className="eyebrow text-bronze">{t('about.infraEyebrow')}</span>
            <h3 className="font-display text-2xl text-obsidian">{t('about.infraTitle')}</h3>
            <p className="text-sm leading-relaxed text-obsidian/70">
              Gangsaw slicing, multi-head calibration, custom grooving, and edge-profiling are executed under rigorous quality supervision to guarantee zero on-site fitting surprises.
            </p>
          </div>

          <div className="border border-champagne p-8 bg-ivory-deep/40 flex flex-col gap-4">
            <div className="h-12 w-12 grid place-items-center bg-bronze/10 text-bronze border border-bronze/30">
              <ShieldCheck size={24} />
            </div>
            <span className="eyebrow text-bronze">{t('about.qualityEyebrow')}</span>
            <h3 className="font-display text-2xl text-obsidian">{t('about.qualityTitle')}</h3>
            <p className="text-sm leading-relaxed text-obsidian/70">
              Lot-by-lot sorting ensures consistent color tones across large orders. Pre-shipment live video calls and physical sample dispatches provide total transparency.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 4-Stage Operational Journey */}
      <div className="container-page py-16 sm:py-24 border-b border-champagne">
        <SectionHeader
          eyebrow={t('about.journeyEyebrow')}
          titleFirst={t('about.journeyTitle')}
          align="left"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(timeline) &&
            timeline.map((step, idx) => (
              <div
                key={idx}
                className="relative border border-champagne p-6 bg-ivory-deep/30 flex flex-col justify-between"
              >
                <div>
                  <span className="index-num text-bronze font-semibold">{step.year}</span>
                  <h4 className="font-display text-xl text-obsidian mt-3 mb-2">{step.title}</h4>
                  <p className="text-[0.8125rem] leading-relaxed text-obsidian/70">{step.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-champagne/40 text-[0.625rem] tracking-widest text-taupe-deep uppercase">
                  Stage 0{idx + 1}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 4. Business Commitments */}
      <div className="container-page py-16 sm:py-24 border-b border-champagne">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="eyebrow text-bronze">{t('about.commitEyebrow')}</span>
            <h2 className="display-xs text-obsidian">{t('about.commitTitle')}</h2>
            <p className="text-[0.95rem] leading-relaxed text-obsidian/75">
              Natural stone procurement requires unwavering trust in measurement accuracy, lot uniformity, and packaging resilience. These commitments govern every order we process.
            </p>
            <div className="pt-4">
              <Link
                to="/contact#inquiry"
                className="btn btn-solid btn-sm inline-flex items-center gap-2"
              >
                <span>{t('cta.primary')}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.isArray(commitments) &&
              commitments.map((commit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border border-champagne p-4 bg-ivory-deep/50"
                >
                  <span className="h-6 w-6 grid place-items-center bg-bronze/10 text-bronze shrink-0 mt-0.5">
                    <Check size={14} />
                  </span>
                  <span className="text-[0.875rem] font-medium text-obsidian leading-snug">
                    {commit}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 5. Bottom Call to Action */}
      <div className="container-page pt-16 sm:pt-20 text-center flex flex-col items-center gap-6">
        <span className="eyebrow text-bronze">Rajasthan · Direct Supply</span>
        <h2 className="display-sm text-obsidian max-w-xl">
          {t('cta.title1')} {t('cta.title2')}
        </h2>
        <p className="measure text-obsidian/70 text-[0.95rem]">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/products" className="btn btn-solid btn-lg">
            {t('hero.ctaPrimary')}
          </Link>
          <Link to="/contact" className="btn btn-outline btn-lg">
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>
    </div>
  )
}
