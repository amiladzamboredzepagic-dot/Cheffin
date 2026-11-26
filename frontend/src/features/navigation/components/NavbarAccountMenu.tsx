import { CircleUserRound, LogOut, ShieldUser } from 'lucide-react'
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
      minWidth={240}
    >
      <AppMenuItem onClick={onProfile}>
        <CircleUserRound size={20} aria-hidden="true" style={{ marginRight: 8 }} />
        {t('profile.myProfile')}
      </AppMenuItem>
      {isAdmin && (
        <AppMenuItem onClick={onAdmin}>
          <ShieldUser size={20} aria-hidden="true" style={{ marginRight: 8 }} />
          {t('admin.menuLabel')}
        </AppMenuItem>
      )}
      <AppMenuItem onClick={onLogout}>
        <LogOut size={20} aria-hidden="true" style={{ marginRight: 8 }} />
        {t('auth.logout')}
      </AppMenuItem>
    </AppMenu>
  )
}
