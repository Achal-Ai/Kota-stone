import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function AboutPage() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('about.heroEyebrow')}
      title={`${t('about.title1')} ${t('about.title2')}`}
      body={t('about.subtitle')}
    />
  )
}
