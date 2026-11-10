import { Logout } from '@mui/icons-material'
import {
  Alert,
  IconButton,
  Snackbar,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/ActionButton'
import { AppMenu, AppMenuItem } from '../../../components/ui/AppMenu'
import { useAuth } from '../../../context/useAuth'
import { UserAvatar } from './UserAvatar'

interface NavbarAuthProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function NavbarAuth({ onLogin, onCreateAccount }: NavbarAuthProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const { accessToken, firstName, lastName, logout } = useAuth()
  const initials = [firstName, lastName]
    .map((name) => name?.trim().charAt(0))
    .filter(Boolean)
    .join('')
    .toLocaleUpperCase()

  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<HTMLButtonElement | null>(null)
  const [logoutError, setLogoutError] = useState(false)

  const handleLogout = async () => {
    setAccountMenuAnchor(null)
    try {
      await logout()
    } catch (error) {
      console.error('Logout request failed:', error)
      setLogoutError(true)
    }
  }

  return (
    <>
      {accessToken ? (
        <>
          <IconButton
            aria-label={t('auth.account')}
            aria-haspopup="menu"
            aria-expanded={Boolean(accountMenuAnchor)}
            onClick={(event) => setAccountMenuAnchor(event.currentTarget)}
            sx={{ p: 0.5 }}
          >
            <UserAvatar initials={initials} />
          </IconButton>
          <AppMenu
            anchorEl={accountMenuAnchor}
            open={Boolean(accountMenuAnchor)}
            onClose={() => setAccountMenuAnchor(null)}
            ariaLabel={t('auth.account')}
          >
            <AppMenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              {t('auth.logout')}
            </AppMenuItem>
          </AppMenu>
        </>
      ) : (
        <>
          <ActionButton
            text={t('auth.login')}
            backgroundColor="transparent"
            textColor={theme.palette.primary.main}
            border="none"
            hoverShadow={false}
            onClick={onLogin}
            sx={{ minWidth: 186, height: 48, px: 1.25 }}
          />
          <ActionButton
            text={t('auth.createAccount')}
            onClick={onCreateAccount}
            sx={{ minWidth: 186, height: 48, px: 1.25 }}
          />
        </>
      )}
      <Snackbar
        open={logoutError}
        autoHideDuration={6000}
        onClose={() => setLogoutError(false)}
      >
        <Alert
          severity="error"
          onClose={() => setLogoutError(false)}
          sx={{ width: '100%' }}
        >
          {t('auth.logoutFailed')}
        </Alert>
      </Snackbar>
    </>
  )
}
