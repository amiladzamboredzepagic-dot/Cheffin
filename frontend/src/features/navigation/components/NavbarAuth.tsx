import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackSnackbar } from '../../../components/ui/feedback/FeedbackSnackbar'
import { useAuth } from '../../../context/useAuth'
import {
  PROFILE_UPDATED_EVENT,
  readSavedProfileImage,
} from '../../profile/profileStorage'
import { NavbarAuthenticatedActions } from './NavbarAuthenticatedActions'
import { NavbarGuestActions } from './NavbarGuestActions'

interface NavbarAuthProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function NavbarAuth({ onLogin, onCreateAccount }: NavbarAuthProps) {
  const { t } = useTranslation()
  const { accessToken, firstName, lastName, isAdmin, logout } = useAuth()

  const [logoutError, setLogoutError] = useState(false)
  const [profileImage, setProfileImage] = useState(readSavedProfileImage)

  useEffect(() => {
    const refreshProfileImage = () => {
      setProfileImage(readSavedProfileImage())
    }
    window.addEventListener(PROFILE_UPDATED_EVENT, refreshProfileImage)
    window.addEventListener('storage', refreshProfileImage)
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, refreshProfileImage)
      window.removeEventListener('storage', refreshProfileImage)
    }
  }, [])

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
          profileImage={profileImage}
          isAdmin={isAdmin}
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
