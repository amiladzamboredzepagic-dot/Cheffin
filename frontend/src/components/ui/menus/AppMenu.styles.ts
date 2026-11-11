import { MenuItem, styled } from '@mui/material'

export const AppMenuItem = styled(MenuItem)(({ theme }) => ({
  minHeight: theme.spacing(5),
  padding: theme.spacing(1, 1.25),
  borderRadius: theme.spacing(1),
  color: theme.palette.text.label,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  '&:hover': {
    backgroundColor: theme.palette.background.secondary,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.secondary,
    '&:hover': {
      backgroundColor: theme.palette.background.secondary,
    },
  },
}))
