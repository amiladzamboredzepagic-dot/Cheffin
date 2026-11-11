import { Typography, styled } from '@mui/material'
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

export const SplitSectionEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.highlight,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '1.8px',
  lineHeight: 1.65,
  textTransform: 'uppercase',
}))

export const SplitSectionHeading = styled('h2')(({ theme }) => ({
  margin: `${theme.spacing(1.5)} 0 0`,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 36,
  fontWeight: 500,
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: 32,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 29,
  },
}))

export const SplitSectionDescription = styled(Typography)(({ theme }) => ({
  maxWidth: 500,
  marginTop: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  fontSize: 15,
  lineHeight: 1.65,
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
