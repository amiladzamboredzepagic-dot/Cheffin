import { Button, styled } from '@mui/material'

interface ActionButtonStyleProps {
  backgroundColor?: string
  textColor?: string
  border?: string
  hoverShadow?: boolean
}

export const ActionButtonRoot = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'backgroundColor' &&
    prop !== 'textColor' &&
    prop !== 'border' &&
    prop !== 'hoverShadow',
})<ActionButtonStyleProps>(
  ({
    theme,
    backgroundColor,
    textColor,
    border = 'none',
    hoverShadow = true,
  }) => ({
    boxSizing: 'border-box',
    minWidth: 0,
    height: 46,
    border,
    boxShadow: 'none',
    borderRadius: theme.spacing(1.25),
    color: textColor ?? theme.palette.primary.contrastText,
    backgroundColor: backgroundColor ?? theme.palette.primary.light,
    ...theme.typography.button,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      color: textColor ?? theme.palette.primary.contrastText,
      backgroundColor: backgroundColor ?? theme.palette.primary.light,
      boxShadow: hoverShadow ? theme.shadows[4] : 'none',
    },
    '&.Mui-disabled': {
      color: textColor ?? theme.palette.primary.contrastText,
      backgroundColor: backgroundColor ?? theme.palette.primary.light,
      opacity: 0.65,
    },
  }),
)
