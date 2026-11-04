import { Box, Link, styled } from '@mui/material'

export const NavItemsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const NavLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: '14px',
  fontWeight: active
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))
