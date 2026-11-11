import { styled } from '@mui/material'
import { Flex } from '../../components/ui/layout/Flex'

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
