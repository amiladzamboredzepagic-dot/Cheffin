import { styled } from '@mui/material'
import { Flex } from '../../../components/ui/Flex'
import { TextLinkBase } from '../../../components/ui/TextLink.styles'

export const NavItemsContainer = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const NavLink = styled(TextLinkBase, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  fontSize: '14px',
  fontWeight: active
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
}))
