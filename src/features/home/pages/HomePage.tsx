import { usePageMeta } from '@/hooks/usePageMeta'
import { HeroSection } from '@/features/home/components/HeroSection'
import { StatsStrip } from '@/features/home/components/StatsStrip'
import { IntroSection } from '@/features/home/components/IntroSection'
import { CollectionsSection } from '@/features/home/components/CollectionsSection'
import { FeaturedSection } from '@/features/home/components/FeaturedSection'
import { ApplicationsSection } from '@/features/home/components/ApplicationsSection'
import { ProcessSection } from '@/features/home/components/ProcessSection'
import { WhySection } from '@/features/home/components/WhySection'
import { QualitySection } from '@/features/home/components/QualitySection'
import { ServicesSection } from '@/features/home/components/ServicesSection'
import { InquiryCtaSection } from '@/features/home/components/InquiryCtaSection'

export default function HomePage() {
  usePageMeta('meta.defaultTitle', 'meta.defaultDescription')

  return (
    <>
      <HeroSection />
      <StatsStrip />
      <IntroSection />
      <CollectionsSection />
      <FeaturedSection />
      <ApplicationsSection />
      <ProcessSection />
      <WhySection />
      <QualitySection />
      <ServicesSection />
      <InquiryCtaSection />
    </>
  )
}
