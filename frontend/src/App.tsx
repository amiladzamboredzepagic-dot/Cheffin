import { Flex } from './components/ui/Flex'
import { Footer } from './features/layout/components/Footer'
import { Navbar } from './features/navigation/components/Navbar'

export default function App() {
  return (
    <Flex
      direction="column"
      justify="space-between"
      sx={{ minHeight: '100vh' }}
    >
      <Navbar />
      {/* Page content goes here when ready */}
      <Footer />
    </Flex>
  )
}
