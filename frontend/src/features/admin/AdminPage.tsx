import { Alert } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../components/ui/feedback/Loading'
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
        <Loading label={t('admin.loading')} sx={{ mt: 4 }} />
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
