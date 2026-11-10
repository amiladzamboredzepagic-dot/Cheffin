import { useState } from 'react'
import { Flex } from './components/ui/Flex'
import { Footer } from './features/layout/components/Footer'
import { LoginForm } from './features/login/LoginForm'
import { AUTH_MODE, type AuthMode } from './features/login/loginForm.utils'
import { Navbar } from './features/navigation/components/Navbar'

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.LOGIN)

  const selectAuthMode = (mode: AuthMode) => {
    setAuthMode(mode)
    document
      .getElementById('login-form')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Flex
      direction="column"
      justify="space-between"
      sx={{ minHeight: '100vh' }}
    >
      <Navbar
        onLogin={() => selectAuthMode(AUTH_MODE.LOGIN)}
        onCreateAccount={() => selectAuthMode(AUTH_MODE.SIGNUP)}
      />
      <LoginForm authMode={authMode} onAuthModeChange={setAuthMode} />
      <Footer />
    </Flex>
  )
}
