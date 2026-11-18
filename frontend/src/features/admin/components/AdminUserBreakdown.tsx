import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Description } from '../../../components/ui/typography/Description'
import type { AdminUserStats } from '../admin.types'

interface AdminUserBreakdownProps {
  users: AdminUserStats[]
}

export function AdminUserBreakdown({ users }: AdminUserBreakdownProps) {
  const { t } = useTranslation()

  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        component="h2"
        variant="h5"
        sx={{
          mb: 2,
          color: 'text.label',
          fontFamily: (theme) => theme.typography.fontFamilySerif,
        }}
      >
        {t('admin.userBreakdown')}
      </Typography>
      {users.length === 0 ? (
        <Description>{t('admin.noUsers')}</Description>
      ) : (
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderColor: 'divider',
            borderRadius: 2.5,
            bgcolor: 'background.paper',
            overflowX: 'auto',
          }}
        >
          <Table
            aria-label={t('admin.userBreakdown')}
          >
            <TableHead>
              <TableRow>
                <TableCell>{t('admin.table.user')}</TableCell>
                <TableCell>{t('admin.table.email')}</TableCell>
                <TableCell align="right">{t('admin.table.recipes')}</TableCell>
                <TableCell align="right">{t('admin.table.published')}</TableCell>
                <TableCell align="right">{t('admin.table.drafts')}</TableCell>
                <TableCell align="right">
                  {t('admin.table.collections')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.label',
                        fontWeight: 600,
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {[user.firstName, user.lastName]
                        .filter(Boolean)
                        .join(' ') || t('admin.unnamedUser')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ overflowWrap: 'anywhere' }}
                    >
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {user.recipeCount}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: 'text.label',
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {user.publishedRecipeCount}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {user.draftRecipeCount}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {user.collectionCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
