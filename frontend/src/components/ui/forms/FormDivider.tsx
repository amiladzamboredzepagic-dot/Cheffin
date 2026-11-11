import { styled } from '@mui/material'

export const FormDivider = styled('hr')(({ theme }) => ({
  width: '100%',
  height: 1,
  margin: 0,
  border: 0,
  backgroundColor: theme.palette.divider,
}))
