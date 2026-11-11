import { useTheme } from '@mui/material'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/ActionButton'

export function NavbarAddRecipe() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <ActionButton
      text={
        <>
          <Plus
            className="navbar-add-recipe-icon"
            size={18}
            aria-hidden="true"
          />
          <span className="navbar-add-recipe-label">
            {t('navigation.addRecipe')}
          </span>
        </>
      }
      href="/recipes/new"
      aria-label={t('navigation.addRecipe')}
      backgroundColor={theme.palette.background.input}
      textColor={theme.palette.primary.main}
      border={`1px solid ${theme.palette.divider}`}
      hoverShadow={false}
      sx={{
        boxSizing: 'border-box',
        minWidth: { xs: 40, sm: 144 },
        width: { xs: 40, sm: 144 },
        height: { xs: 40, sm: 46 },
        px: { xs: 0, sm: '19px' },
        gap: { xs: 0, sm: '9px' },
        fontSize: 13,
        fontWeight: 600,
        lineHeight: '16px',
        whiteSpace: 'nowrap',
        '& .navbar-add-recipe-label': {
          display: { xs: 'none', sm: 'inline' },
        },
      }}
    />
  )
}
