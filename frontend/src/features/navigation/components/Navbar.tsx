import { Flex } from '../../../components/ui/Flex'
import { ExploreRecipeLink } from '../../recipes/components/ExploreRecipesLink'
import CheffinLogo from './CheffinLogo'
import Header from './Header'
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
