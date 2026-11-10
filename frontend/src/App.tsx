import { useState } from 'react'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Flex } from './components/ui/Flex'
import { GenericModal } from './components/ui/GenericModal'
import { Footer } from './features/layout/components/Footer'
import { LoginForm } from './features/login/LoginForm'
import { AUTH_MODE, type AuthMode } from './features/login/loginForm.utils'
import { Navbar } from './features/navigation/components/Navbar'
import { RecipeGallery } from './features/recipes/RecipeGallery'

export default function App() {
  const { t } = useTranslation()
  const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.LOGIN)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const selectAuthMode = (mode: AuthMode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <Flex
      direction="column"
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navbar
        onLogin={() => selectAuthMode(AUTH_MODE.LOGIN)}
        onCreateAccount={() => selectAuthMode(AUTH_MODE.SIGNUP)}
      />
      <Box component="main" sx={{ width: '100%', flex: 1 }}>
        <RecipeGallery />
      </Box>
      <Footer />
      <GenericModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        eyebrow={
          authMode === AUTH_MODE.LOGIN
            ? t('auth.loginEyebrow')
            : t('auth.createAccountEyebrow')
        }
        title={
          authMode === AUTH_MODE.LOGIN
            ? t('auth.login')
            : t('auth.createAccount')
        }
        description={
          authMode === AUTH_MODE.LOGIN
            ? t('auth.loginDescription')
            : t('auth.createAccountDescription')
        }
        closeLabel={t('common.close')}
        content={
          <LoginForm
            authMode={authMode}
            onAuthModeChange={setAuthMode}
            onSubmit={() => setAuthModalOpen(false)}
          />
        }
      />
    </Flex>
  )
}
