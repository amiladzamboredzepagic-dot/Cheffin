import { Flex } from './components/ui/layout/Flex'
import { Footer } from './features/layout/components/Footer'
import { AuthModal } from './features/login/AuthModal'
import { AppRoutes } from './features/routing/AppRoutes'
import { Navbar } from './features/navigation/components/Navbar'
import { useAuth } from './context/useAuth'

export default function App() {
  const {
    authModalOpen,
    authMode,
    setAuthMode,
    openLogin,
    openSignup,
    closeAuthModal,
  } = useAuth()

  return (
    <Flex
      direction="column"
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navbar onLogin={openLogin} onCreateAccount={openSignup} />
      <AppRoutes />
      <Footer />
      <AuthModal
        open={authModalOpen}
        onClose={closeAuthModal}
        authMode={authMode}
        onAuthModeChange={setAuthMode}
        onSubmit={closeAuthModal}
      />
    </Flex>
  )
}
