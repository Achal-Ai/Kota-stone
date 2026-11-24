import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function GalleryPage() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('gallery.heroEyebrow')}
      title={`${t('gallery.title1')} ${t('gallery.title2')}`}
      body={t('gallery.subtitle')}
    />
  )
}
