import { Flex } from '../../../components/ui/Flex'
import CheffinLogo from '../../../components/brand/CheffinLogo'
import Header from '../../layout/components/Header'
import { ExploreRecipeLink } from './ExploreRecipesLink'
import { NavItemsContainer, NavLink } from './Navbar.styles'
import { useTranslation } from 'react-i18next'

const NAV_ITEMS = [
  { labelKey: 'navigation.discover', href: '/discover', active: true },
  { labelKey: 'navigation.pantry', href: '/pantry' },
  { labelKey: 'navigation.mealPlanner', href: '/planner' },
  { labelKey: 'navigation.myLibrary', href: '/library' },
  { labelKey: 'navigation.community', href: '/community' },
]

export function Navbar() {
  const { t } = useTranslation()

  return (
    <Header>
      <Flex gap={1.5}>
        <CheffinLogo />
      </Flex>

      {/* Mock up navigation data  */}
      <NavItemsContainer>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.labelKey} href={item.href} active={item.active}>
            {t(item.labelKey)}
          </NavLink>
        ))}
      </NavItemsContainer>

      <Flex>
        <ExploreRecipeLink />
      </Flex>
    </Header>
  )
}
