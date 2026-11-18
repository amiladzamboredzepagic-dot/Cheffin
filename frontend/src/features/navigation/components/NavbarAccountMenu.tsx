import { AccountCircle, AdminPanelSettings, Logout } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { AppMenu, AppMenuItem } from '../../../components/ui/menus/AppMenu'

interface NavbarAccountMenuProps {
  anchorEl: HTMLButtonElement | null
  onClose: () => void
  onProfile: () => void
  isAdmin: boolean
  onAdmin: () => void
  onLogout: () => void
}

export function NavbarAccountMenu({
  anchorEl,
  onClose,
  onProfile,
  isAdmin,
  onAdmin,
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
      <AppMenuItem onClick={onProfile}>
        <AccountCircle fontSize="small" sx={{ mr: 1 }} />
        {t('profile.myProfile')}
      </AppMenuItem>
      {isAdmin && (
        <AppMenuItem onClick={onAdmin}>
          <AdminPanelSettings fontSize="small" sx={{ mr: 1 }} />
          {t('admin.menuLabel')}
        </AppMenuItem>
      )}
      <AppMenuItem onClick={onLogout}>
        <Logout fontSize="small" sx={{ mr: 1 }} />
        {t('auth.logout')}
      </AppMenuItem>
    </AppMenu>
  )
}
