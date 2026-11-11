import { Link } from '@mui/material'
import { styled } from '@mui/material/styles'

export const InteractiveLinkRoot = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.light,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
}))

export const LinkIconContainer = styled('span')({
  display: 'inline-flex',
  transform: 'translateY(1px)',
})
