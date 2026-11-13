import { styled } from '@mui/material'

export const PageContainer = styled('main')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  flex: 1,
  minHeight: 866,
  padding: theme.spacing(5, 8, 6),
  [theme.breakpoints.down('md')]: {
    minHeight: 0,
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2, 4),
  },
}))
