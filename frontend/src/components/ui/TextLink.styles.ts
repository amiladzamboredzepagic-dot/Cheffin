import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'

export const TextLinkBase = styled(Link)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))
