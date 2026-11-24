import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function ContactPage() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('contact.heroEyebrow')}
      title={`${t('contact.title1')} ${t('contact.title2')}`}
      body={t('contact.subtitle')}
    />
  )
}
