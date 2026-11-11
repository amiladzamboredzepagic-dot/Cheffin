import { Logout } from '@mui/icons-material'
import { Alert, IconButton, Snackbar, useTheme } from '@mui/material'
import { LogIn } from 'lucide-react'
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
            text={
              <>
                <span className="navbar-login-label">{t('auth.login')}</span>
                <LogIn
                  className="navbar-login-icon"
                  size={18}
                  aria-hidden="true"
                />
              </>
            }
            aria-label={t('auth.login')}
            backgroundColor="transparent"
            textColor={theme.palette.primary.main}
            border="none"
            hoverShadow={false}
            onClick={onLogin}
            sx={{
              minWidth: { xs: 40, sm: 186 },
              width: { xs: 40, sm: 'auto' },
              height: { xs: 40, sm: 48 },
              px: { xs: 0, sm: 1.25 },
              '& .navbar-login-label': {
                display: { xs: 'none', sm: 'inline' },
              },
              '& .navbar-login-icon': {
                display: { xs: 'block', sm: 'none' },
              },
            }}
          />
          <ActionButton
            text={t('auth.createAccount')}
            onClick={onCreateAccount}
            sx={{
              minWidth: { xs: 0, sm: 186 },
              width: { xs: 'auto', sm: 'auto' },
              height: { xs: 40, sm: 48 },
              px: { xs: 1, sm: 1.25 },
              fontSize: { xs: 11, sm: 14 },
              whiteSpace: 'nowrap',
            }}
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
