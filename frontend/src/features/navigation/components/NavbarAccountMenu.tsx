import { Logout } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { AppMenu, AppMenuItem } from '../../../components/ui/AppMenu'

interface NavbarAccountMenuProps {
  anchorEl: HTMLButtonElement | null
  onClose: () => void
  onLogout: () => void
}

export function NavbarAccountMenu({
  anchorEl,
  onClose,
  onLogout,
}: NavbarAccountMenuProps) {
  const { t } = useTranslation()

  return (
    <AppMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      ariaLabel={t('auth.account')}
    >
      <AppMenuItem onClick={onLogout}>
        <Logout fontSize="small" sx={{ mr: 1 }} />
        {t('auth.logout')}
      </AppMenuItem>
    </AppMenu>
  )
}
