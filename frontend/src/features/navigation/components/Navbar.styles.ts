import { Box, styled } from '@mui/material'
import { TextLinkBase } from '../../../components/ui/TextLink.styles'

export const NavItemsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
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
