import { styled } from '@mui/material'
import { Flex } from '../../components/ui/Flex'

export const SplitSection = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: 430,
  padding: theme.spacing(4.5, 8),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2.5),
  },
}))

export const SplitSectionCopy = styled(Flex)(({ theme }) => ({
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    maxWidth: 640,
  },
}))

export const SplitSectionLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  marginTop: theme.spacing(3),
  color: theme.palette.primary.light,
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.65,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))
