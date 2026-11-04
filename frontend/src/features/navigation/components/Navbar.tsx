import { Flex } from '../../../components/ui/Flex'
import CheffinLogo from '../../../components/brand/CheffinLogo'
import Header from '../../layout/components/Header'
import { ExploreRecipeLink } from './ExploreRecipesLink'
import { NavItemsContainer, NavLink } from './Navbar.styles'

const NAV_ITEMS = [
  { label: 'Discover', href: '/discover', active: true },
  { label: 'Pantry', href: '/pantry' },
  { label: 'Meal planner', href: '/planner' },
  { label: 'My library', href: '/library' },
  { label: 'Community', href: '/community' },
]

export function Navbar() {
  return (
    <Header>
      <Flex gap={1.5}>
        <CheffinLogo />
      </Flex>

      {/* Mock up navigation data  */}
      <NavItemsContainer>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.label} href={item.href} active={item.active}>
            {item.label}
          </NavLink>
        ))}
      </NavItemsContainer>

      <Flex>
        <ExploreRecipeLink />
      </Flex>
    </Header>
  )
}
