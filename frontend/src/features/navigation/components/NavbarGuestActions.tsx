import { useTheme } from '@mui/material'
import { LogIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ActionButton } from '../../../components/ui/ActionButton'

interface NavbarGuestActionsProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function NavbarGuestActions({
  onLogin,
  onCreateAccount,
}: NavbarGuestActionsProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <ActionButton
        text={
          <>
            <span className="navbar-login-label">{t('auth.login')}</span>
            <LogIn className="navbar-login-icon" size={18} aria-hidden="true" />
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
  )
}
