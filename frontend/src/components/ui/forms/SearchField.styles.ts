import { styled } from '@mui/material'

export const SearchRow = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: theme.spacing(2),
  '& > .MuiFormControl-root': { flex: '1 1 0%', minWidth: 0 },
  [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
}))
