import { AccountCircle, AdminPanelSettings, Logout } from '@mui/icons-material'
import { BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  return (
    <AppMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      ariaLabel={t('auth.account')}
      minWidth={240}
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
      <AppMenuItem
        onClick={() => {
          onClose()
          navigate('/library')
        }}
      >
        <BookOpen size={18} aria-hidden="true" style={{ marginRight: 8 }} />
        {t('navigation.myLibrary')}
      </AppMenuItem>
      <AppMenuItem onClick={onLogout}>
        <Logout fontSize="small" sx={{ mr: 1 }} />
        {t('auth.logout')}
      </AppMenuItem>
    </AppMenu>
  )
}
