import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function ServicesPage() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('services.page.eyebrow')}
      title={`${t('services.page.title1')} ${t('services.page.title2')}`}
      body={t('services.page.subtitle')}
    />
  )
}
