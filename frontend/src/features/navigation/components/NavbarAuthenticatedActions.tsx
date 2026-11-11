import { useState } from 'react'
import { Flex } from '../../../components/ui/Flex'
import { NavbarAccountButton } from './NavbarAccountButton'
import { NavbarAccountMenu } from './NavbarAccountMenu'
import { NavbarAddRecipe } from './NavbarAddRecipe'

interface NavbarAuthenticatedActionsProps {
  firstName: string | null
  lastName: string | null
  onLogout: () => void
}

export function NavbarAuthenticatedActions({
  firstName,
  lastName,
  onLogout,
}: NavbarAuthenticatedActionsProps) {
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<HTMLButtonElement | null>(null)

  const handleLogout = () => {
    setAccountMenuAnchor(null)
    onLogout()
  }

  return (
    <>
      <Flex
        align="center"
        gap={{ xs: 1, sm: '18px' }}
        sx={{
          width: { xs: 'auto', sm: 200 },
          height: { xs: 40, sm: 46 },
          flexShrink: 0,
        }}
      >
        <NavbarAccountButton
          firstName={firstName}
          lastName={lastName}
          expanded={Boolean(accountMenuAnchor)}
          onClick={(event) => setAccountMenuAnchor(event.currentTarget)}
        />
      </Flex>
      <NavbarAccountMenu
        anchorEl={accountMenuAnchor}
        onClose={() => setAccountMenuAnchor(null)}
        onLogout={handleLogout}
      />
    </>
  )
}
