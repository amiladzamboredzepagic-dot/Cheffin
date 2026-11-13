import { styled } from '@mui/material'

export const SearchRow = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: theme.spacing(2),
  '& > .MuiFormControl-root': { flex: '1 1 0%', minWidth: 0 },
  [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
}))

export const PantryButton = styled('button')(({ theme }) => ({
  minHeight: 50,
  padding: '0 24px',
  border: 0,
  borderRadius: 10,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.light,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  opacity: 0.65,
}))
