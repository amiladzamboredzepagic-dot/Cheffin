import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackSnackbar } from '../../../components/ui/FeedbackSnackbar'
import { Flex } from '../../../components/ui/Flex'
import { useAuth } from '../../../context/useAuth'
import { NavbarAccountButton } from './NavbarAccountButton'
import { NavbarAccountMenu } from './NavbarAccountMenu'
import { NavbarAddRecipe } from './NavbarAddRecipe'
import { NavbarGuestActions } from './NavbarGuestActions'

interface NavbarAuthProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function NavbarAuth({ onLogin, onCreateAccount }: NavbarAuthProps) {
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
          <Flex
            align="center"
            gap={{ xs: 1, sm: '18px' }}
            sx={{
              width: { xs: 'auto', sm: 200 },
              height: { xs: 40, sm: 46 },
              flexShrink: 0,
            }}
          >
            <NavbarAccountButton
              initials={initials}
              expanded={Boolean(accountMenuAnchor)}
              onClick={(event) => setAccountMenuAnchor(event.currentTarget)}
            />
          </Flex>
          <NavbarAccountMenu
            anchorEl={accountMenuAnchor}
            onClose={() => setAccountMenuAnchor(null)}
            onLogout={handleLogout}
          />
        </>
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
