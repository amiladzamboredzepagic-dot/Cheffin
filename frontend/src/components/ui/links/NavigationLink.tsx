import { styled } from '@mui/material'
import { NavLink } from 'react-router-dom'

export const NavigationLink = styled(NavLink)(({ theme }) => ({
  alignSelf: 'stretch',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '2px solid transparent',
  color: theme.palette.text.secondary,
  fontSize: 13,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '&.active': {
    borderBottomColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    fontWeight: 600,
  },
}))
