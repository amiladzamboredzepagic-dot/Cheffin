import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Description } from '../../../components/ui/typography/Description'
import { Sidebar, SidebarCard } from '../LibraryPage.styles'

export function LibrarySidebar() {
  const { t } = useTranslation()

  return (
    <Sidebar>
      <Box>
        <Box
          component="h2"
          sx={{
            fontSize: 'body2.fontSize',
            fontWeight: 'fontWeightMedium',
            m: 0,
            mb: 2,
          }}
        >
          {t('library.yourTags')}
        </Box>
        <Description>{t('library.tagsUnavailable')}</Description>
      </Box>
      <Box sx={{ borderTop: 1, borderColor: 'divider' }} />
      <SidebarCard>
        <Box
          component="h2"
          sx={{
            fontSize: 'body1.fontSize',
            fontWeight: 'fontWeightMedium',
            m: 0,
          }}
        >
          {t('library.fromYourKitchen')}
        </Box>
        <Description>{t('library.addYourRecipe')}</Description>
        <Button
          component={Link}
          to="/recipe/create"
          sx={{ alignSelf: 'flex-start', p: 0 }}
        >
          {t('navigation.addRecipe')} →
        </Button>
      </SidebarCard>
    </Sidebar>
  )
}
