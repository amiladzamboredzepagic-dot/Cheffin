import { Flex } from '../../../components/ui/layout/Flex'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import CheffinLogo from '../../../components/brand/CheffinLogo'
import { NavigationLink } from '../../../components/ui/links/NavigationLink'
import Header from '../../layout/components/Header'
import { LanguageToggle } from './LanguageToggle'
import { NavbarAuth } from './NavbarAuth'

interface NavbarProps {
  onLogin: () => void
  onCreateAccount: () => void
}

export function Navbar({ onLogin, onCreateAccount }: NavbarProps) {
  const { t } = useTranslation()

  return (
    <Header>
      <Flex gap={1.5}>
        <Link to="/">
          <CheffinLogo />
        </Link>
      </Flex>
      <NavigationLink to="/library">{t('navigation.myLibrary')}</NavigationLink>
      <Flex gap={1}>
        <LanguageToggle />
        <NavbarAuth onLogin={onLogin} onCreateAccount={onCreateAccount} />
      </Flex>
    </Header>
  )
}
