import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

/** Admin console — delivered in the admin build phase. */
export default function AdminApp() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('nav.admin')}
      title={t('admin.loginTitle')}
      body={t('admin.loginSubtitle')}
    />
  )
}
