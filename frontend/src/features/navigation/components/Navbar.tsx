import { Flex } from '../../../components/ui/Flex'
import CheffinLogo from '../../../components/brand/CheffinLogo'
import Header from '../../layout/components/Header'
import { LanguageToggle } from './LanguageToggle'
import { NavbarAuth } from './NavbarAuth'

interface NavbarProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function Navbar({ onLogin, onCreateAccount }: NavbarProps) {
  return (
    <Header>
      <Flex gap={1.5}>
        <CheffinLogo />
      </Flex>
      <Flex gap={1}>
        <LanguageToggle />
        <NavbarAuth onLogin={onLogin} onCreateAccount={onCreateAccount} />
      </Flex>
    </Header>
  )
}
