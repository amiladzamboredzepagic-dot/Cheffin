import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackSnackbar } from '../../../components/ui/FeedbackSnackbar'
import { useAuth } from '../../../context/useAuth'
import { NavbarAuthenticatedActions } from './NavbarAuthenticatedActions'
import { NavbarGuestActions } from './NavbarGuestActions'

interface NavbarAuthProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function NavbarAuth({ onLogin, onCreateAccount }: NavbarAuthProps) {
  const { t } = useTranslation()
  const { accessToken, firstName, lastName, logout } = useAuth()

  const [logoutError, setLogoutError] = useState(false)

  const handleLogout = async () => {
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
        <NavbarAuthenticatedActions
          firstName={firstName}
          lastName={lastName}
          onLogout={handleLogout}
        />
      ) : (
        <NavbarGuestActions
          onLogin={onLogin}
          onCreateAccount={onCreateAccount}
        />
      )}
      <FeedbackSnackbar
        open={logoutError}
        severity="error"
        message={t('auth.logoutFailed')}
        onClose={() => setLogoutError(false)}
      />
    </>
  )
}
