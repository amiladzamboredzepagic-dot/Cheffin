import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Description } from '../../components/ui/typography/Description'
import { PageContainer } from '../../components/ui/layout/PageContainer'
import { SectionIntroduction } from '../../components/ui/layout/SectionIntroduction'
import { AdminStatsGrid } from './components/AdminStatsGrid'
import { AdminUserBreakdown } from './components/AdminUserBreakdown'
import { useAdminDashboardStats } from './hooks/useAdminDashboardStats'

export function AdminPage() {
  const { t } = useTranslation()
  const { stats, loading, error } = useAdminDashboardStats()

  return (
    <PageContainer aria-labelledby="admin-page-title">
      <SectionIntroduction
        eyebrow={t('admin.eyebrow')}
        title={t('admin.title')}
        description={t('admin.description')}
        titleId="admin-page-title"
        titleLevel="h1"
      />

      {loading ? (
        <Description sx={{ mt: 4 }}>{t('admin.loading')}</Description>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4 }}>
          {t('admin.loadError')}
        </Alert>
      ) : stats ? (
        <>
          <AdminStatsGrid stats={stats} />
          <AdminUserBreakdown users={stats.users} />
        </>
      ) : null}
    </PageContainer>
  )
}
