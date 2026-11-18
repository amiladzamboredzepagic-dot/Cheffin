import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Flex } from '../../../components/ui/layout/Flex'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export function ProfileSettingsPanel() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-labelledby="profile-settings-title"
      sx={{
        mt: 2,
        p: { xs: 2, sm: 3 },
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Flex direction="column" align="stretch" gap={1.5}>
        <Typography
          id="profile-settings-title"
          component="h2"
          variant="h4"
          sx={{ m: 0 }}
        >
          {t('profile.settingsTitle')}
        </Typography>
        <Flex
          align="center"
          justify="space-between"
          gap={2}
          sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}
        >
          <Typography variant="body1">{t('profile.theme')}</Typography>
          <ThemeToggle />
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          gap={2}
          sx={{ py: 1.5, borderTop: 1, borderColor: 'divider' }}
        >
          <Typography variant="body1">{t('common.language')}</Typography>
          <LanguageToggle />
        </Flex>
      </Flex>
    </Box>
  )
}
