import { styled } from '@mui/material'

export const Workspace = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '220px minmax(0, 1fr)',
  alignItems: 'start',
  gap: 32,
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 24 },
}))
