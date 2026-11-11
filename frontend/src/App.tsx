import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex } from './components/ui/layout/Flex'
import { useAuth } from './context/useAuth'
import { Footer } from './features/layout/components/Footer'
import { AuthModal } from './features/login/AuthModal'
import { AUTH_MODE, type AuthMode } from './features/login/loginForm.utils'
import { AppRoutes } from './features/routing/AppRoutes'
import { Navbar } from './features/navigation/components/Navbar'

export default function App() {
  const { accessToken } = useAuth()
  const navigate = useNavigate()
  const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.LOGIN)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const openLogin = () => openAuthModal(AUTH_MODE.LOGIN)
  const openSignup = () => openAuthModal(AUTH_MODE.SIGNUP)

  const requestLogin = useCallback(() => {
    setAuthMode(AUTH_MODE.LOGIN)
    setAuthModalOpen(true)
    navigate('/', { replace: true })
  }, [navigate])

  return (
    <Flex
      direction="column"
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navbar onLogin={openLogin} onCreateAccount={openSignup} />
      <AppRoutes
        isAuthenticated={Boolean(accessToken)}
        onAuthenticationRequired={requestLogin}
        onCreateAccount={openSignup}
        onLogin={openLogin}
      />
      <Footer />
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        authMode={authMode}
        onAuthModeChange={setAuthMode}
        onSubmit={() => setAuthModalOpen(false)}
      />
    </Flex>
  )
}
