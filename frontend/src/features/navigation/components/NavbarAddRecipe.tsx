import { Box, useTheme } from '@mui/material'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ActionButton } from '../../../components/ui/actions/ActionButton'
import { RECIPE_CREATE_ROUTES } from '../../recipes/create/components/recipeEntryMode'

export function NavbarAddRecipe() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <ActionButton
      component={Link}
      to={RECIPE_CREATE_ROUTES.BASE}
      aria-label={t('navigation.addRecipe')}
      text={
        <>
          <Plus size={18} aria-hidden="true" />
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            {t('navigation.addRecipe')}
          </Box>
        </>
      }
      backgroundColor={theme.palette.background.input}
      textColor={theme.palette.primary.main}
      border={`1px solid ${theme.palette.divider}`}
      hoverShadow={false}
      sx={{
        minWidth: { xs: 40, sm: 144 },
        width: { xs: 40, sm: 144 },
        height: { xs: 40, sm: 46 },
        px: { xs: 0, sm: '19px' },
        gap: { xs: 0, sm: '9px' },
      }}
    />
  )
}
