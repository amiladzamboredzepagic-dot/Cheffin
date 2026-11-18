import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Description } from '../../../components/ui/typography/Description'
import { RECIPE_CREATE_ROUTES } from '../../recipes/create/components/recipeEntryMode'
import { Sidebar, SidebarCard } from '../LibraryPage.styles'

export function LibrarySidebar() {
  const { t } = useTranslation()

  return (
    <Sidebar>
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
          to={RECIPE_CREATE_ROUTES.BASE}
          sx={{ alignSelf: 'flex-start', p: 0 }}
        >
          {t('navigation.addRecipe')} →
        </Button>
      </SidebarCard>
    </Sidebar>
  )
}
