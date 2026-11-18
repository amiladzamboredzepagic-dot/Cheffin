import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SectionIntroduction } from '../../../components/ui/layout/SectionIntroduction'
import { Flex } from '../../../components/ui/layout/Flex'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export function ProfileSettingsPanel() {
  const { t } = useTranslation()

  return (
    <Flex component="section" direction="column" align="stretch" gap={3}>
      <SectionIntroduction
        eyebrow={t('profile.eyebrow')}
        title={t('profile.settingsTitle')}
        variant="compact"
      />
      <Flex direction="column" align="stretch" gap={1.5}>
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
    </Flex>
  )
}
