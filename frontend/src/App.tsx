import { useState } from 'react'
import { Flex } from './components/ui/Flex'
import { Footer } from './features/layout/components/Footer'
import { AUTH_MODE, type AuthMode } from './features/login/loginForm.utils'
import { Navbar } from './features/navigation/components/Navbar'
import { RecipeGallery } from './features/recipes/RecipeGallery'
import { Box } from '@mui/material'

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
      </Box>{' '}
      <Footer />
    </Flex>
  )
}
