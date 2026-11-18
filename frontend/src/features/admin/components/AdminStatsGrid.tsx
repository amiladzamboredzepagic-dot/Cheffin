import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import type { AdminDashboardStats } from '../admin.types'

interface AdminStatsGridProps {
  stats: AdminDashboardStats
}

const statKeys = [
  ['totalUsers', 'users'],
  ['totalRecipes', 'recipes'],
  ['publishedRecipes', 'publishedRecipes'],
  ['draftRecipes', 'draftRecipes'],
  ['totalCollections', 'collections'],
  ['totalSavedRecipes', 'savedRecipes'],
] as const

export function AdminStatsGrid({ stats }: AdminStatsGridProps) {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
          xl: 'repeat(6, minmax(0, 1fr))',
        },
        gap: 2,
        mt: 4,
      }}
    >
      {statKeys.map(([key, labelKey]) => (
        <Paper
          key={key}
          variant="outlined"
          sx={{
            p: 2.25,
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: 34 }}
          >
            {t(`admin.stats.${labelKey}`)}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 1,
              color: 'text.label',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {stats[key]}
          </Typography>
        </Paper>
      ))}
    </Box>
  )
}
