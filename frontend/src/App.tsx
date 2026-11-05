import { Flex } from './components/ui/Flex'
import { Footer } from './features/layout/components/Footer'
import { LoginForm } from './features/login/LoginForm'
import { Navbar } from './features/navigation/components/Navbar'

export default function App() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      sx={{ minHeight: '100vh' }}
    >
      <Navbar />
      <LoginForm />
      <Footer />
    </Flex>
  )
}
