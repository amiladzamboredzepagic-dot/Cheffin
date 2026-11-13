import { styled } from '@mui/material'

export const Description = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: 14,
  lineHeight: 1.6,
}))
