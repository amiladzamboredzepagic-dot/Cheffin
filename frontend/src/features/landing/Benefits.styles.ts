import { Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/Flex'

export const BenefitsSection = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 112,
  paddingInline: 64,
  backgroundColor: theme.palette.background.secondary,
  [theme.breakpoints.down('md')]: {
    paddingInline: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 0,
    padding: theme.spacing(2.5),
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(2),
  },
}))

export const BenefitItem = styled(Flex)(({ theme }) => ({
  flex: '1 1 0',
  minWidth: 0,
  [theme.breakpoints.down('sm')]: {
    flex: '0 0 auto',
  },
}))

export const BenefitNumber = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.highlight,
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.6,
}))

export const BenefitTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 21,
  fontWeight: 400,
  lineHeight: 1.18,
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
}))
