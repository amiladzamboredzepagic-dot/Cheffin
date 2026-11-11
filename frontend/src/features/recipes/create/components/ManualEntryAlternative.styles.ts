import { Typography, styled } from '@mui/material'
import { Flex } from '../../../../components/ui/layout/Flex'

export const ManualAlternativeRoot = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 83,
  padding: theme.spacing(2.75),
  borderRadius: 14,
  backgroundColor: theme.palette.background.accent,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))

export const ManualAlternativeTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: '17px',
}))

export const ManualAlternativeAction = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: theme.typography.caption.fontSize,
  lineHeight: '15px',
}))
