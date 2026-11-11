import { useTranslation } from 'react-i18next'
import { GenericModal } from '../../components/ui/modals/GenericModal'
import { AUTH_MODE, type AuthMode } from './loginForm.utils'
import { LoginForm } from './LoginForm'

interface AuthModalProps {
  open: boolean
  authMode: AuthMode
  onClose: () => void
  onAuthModeChange: (mode: AuthMode) => void
  onSubmit: () => void
}

export function AuthModal({
  open,
  authMode,
  onClose,
  onAuthModeChange,
  onSubmit,
}: AuthModalProps) {
  const { t } = useTranslation()
  const isLogin = authMode === AUTH_MODE.LOGIN

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      eyebrow={t(isLogin ? 'auth.loginEyebrow' : 'auth.createAccountEyebrow')}
      title={t(isLogin ? 'auth.login' : 'auth.createAccount')}
      description={t(
        isLogin ? 'auth.loginDescription' : 'auth.createAccountDescription',
      )}
      closeLabel={t('common.close')}
      content={
        <LoginForm
          authMode={authMode}
          onAuthModeChange={onAuthModeChange}
          onSubmit={onSubmit}
        />
      }
    />
  )
}
