import { IconButton, MenuItem, styled } from '@mui/material'

export const LanguageToggleButton = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.input,
  fontSize: theme.typography.pxToRem(21),
  '&:hover': {
    backgroundColor: theme.palette.background.secondary,
  },
}))

export const LanguageMenuItem = styled(MenuItem)(({ theme }) => ({
  minWidth: theme.spacing(3),
  justifyContent: 'center',
  fontSize: theme.typography.pxToRem(22),
}))
