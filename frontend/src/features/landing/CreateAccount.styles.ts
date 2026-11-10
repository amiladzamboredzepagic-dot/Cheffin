import { Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/Flex'

export const CreateAccountSection = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 320,
  padding: theme.spacing(2.5, 8),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.5, 4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 2.5),
  },
}))

export const CreateAccountPanel = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 276,
  padding: theme.spacing(4),
  borderRadius: 18,
  backgroundColor: theme.palette.background.planner,
  [theme.breakpoints.down('sm')]: {
    minHeight: 280,
    padding: theme.spacing(3, 2),
  },
}))

export const CreateAccountEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 10,
  fontWeight: 600,
  lineHeight: 1.65,
  textAlign: 'center',
  textTransform: 'uppercase',
}))

export const CreateAccountHeading = styled('h2')(({ theme }) => ({
  margin: `${theme.spacing(2.25)} 0 0`,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 42,
  fontWeight: 500,
  lineHeight: 1.2,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 36,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 30,
  },
}))

export const CreateAccountDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
  fontSize: 15,
  lineHeight: 1.65,
  textAlign: 'center',
}))

export const LogInPrompt = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  color: theme.palette.primary.light,
  fontSize: 12,
  lineHeight: 1.65,
  textAlign: 'center',
}))

export const SignInButton = styled('button')(({ theme }) => ({
  padding: 0,
  border: 0,
  color: 'inherit',
  background: 'none',
  font: 'inherit',
  fontWeight: 600,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    borderRadius: 2,
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: 3,
  },
}))
