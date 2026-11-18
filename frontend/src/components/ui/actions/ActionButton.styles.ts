import { Button, styled } from '@mui/material'

interface ActionButtonStyleProps {
  kind?: 'primary' | 'secondary'
  backgroundColor?: string
  textColor?: string
  border?: string
  hoverShadow?: boolean
}

export const ActionButtonRoot = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'kind' &&
    prop !== 'backgroundColor' &&
    prop !== 'textColor' &&
    prop !== 'border' &&
    prop !== 'hoverShadow',
})<ActionButtonStyleProps>(
  ({
    theme,
    kind = 'primary',
    backgroundColor,
    textColor,
    border,
    hoverShadow,
  }) => {
    const isSecondary = kind === 'secondary'
    const resolvedBackgroundColor =
      backgroundColor ??
      (isSecondary
        ? theme.palette.background.input
        : theme.palette.primary.light)
    const resolvedTextColor =
      textColor ??
      (isSecondary
        ? theme.palette.primary.main
        : theme.palette.primary.contrastText)
    const resolvedBorder =
      border ?? (isSecondary ? `1px solid ${theme.palette.divider}` : 'none')
    const resolvedHoverShadow = hoverShadow ?? !isSecondary

    return {
    boxSizing: 'border-box',
    minWidth: 0,
    height: 46,
    border: resolvedBorder,
    boxShadow: 'none',
    borderRadius: theme.spacing(1.25),
    color: resolvedTextColor,
    backgroundColor: resolvedBackgroundColor,
    ...theme.typography.button,
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      color: resolvedTextColor,
      backgroundColor: resolvedBackgroundColor,
      boxShadow: resolvedHoverShadow ? theme.shadows[4] : 'none',
    },
    '&.Mui-disabled': {
      color: resolvedTextColor,
      backgroundColor: resolvedBackgroundColor,
      opacity: 0.65,
    },
  }
  },
)
