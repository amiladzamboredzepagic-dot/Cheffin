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
      <Flex gap={1.5} sx={{ '& img': { height: { xs: 24, sm: 40 } } }}>
        <Link to="/">
          <CheffinLogo />
        </Link>
      </Flex>
      <Flex
        gap={3}
        sx={{
          alignSelf: 'stretch',
          order: { xs: 3, md: 0 },
          width: { xs: '100%', md: 'auto' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          height: { xs: 32, md: 'auto' },
        }}
      >
        <NavigationLink to="/explore">
          {t('navigation.discover')}
        </NavigationLink>
        <NavigationLink to="/library">
          {t('navigation.myLibrary')}
        </NavigationLink>
      </Flex>
      <Flex gap={{ xs: 0, sm: 1 }}>
        <LanguageToggle />
        <NavbarAuth onLogin={onLogin} onCreateAccount={onCreateAccount} />
      </Flex>
    </Header>
  )
}
