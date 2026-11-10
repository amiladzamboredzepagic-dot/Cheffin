import { Flex } from '../../../components/ui/Flex'
import CheffinLogo from '../../../components/brand/CheffinLogo'
import Header from '../../layout/components/Header'

export function Navbar() {
  return (
    <Header>
      <Flex gap={1.5}>
        <CheffinLogo />
      </Flex>
    </Header>
  )
}
