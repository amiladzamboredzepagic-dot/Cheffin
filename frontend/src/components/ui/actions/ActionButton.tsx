import type { ReactNode, ElementType } from 'react'
import type { ButtonProps } from '@mui/material'
import { ActionButtonRoot } from './ActionButton.styles'

export interface ActionButtonProps extends Omit<
  ButtonProps,
  'children' | 'color' | 'variant'
> {
  text: ReactNode
  kind?: 'primary' | 'secondary'
  backgroundColor?: string
  textColor?: string
  border?: string
  hoverShadow?: boolean
  component?: ElementType
  to?: string
}

export function ActionButton({
  text,
  kind = 'primary',
  backgroundColor,
  textColor,
  border,
  hoverShadow,
  ...props
}: ActionButtonProps) {
  return (
    <ActionButtonRoot
      {...props}
      kind={kind}
      backgroundColor={backgroundColor}
      textColor={textColor}
      border={border}
      hoverShadow={hoverShadow}
      variant="contained"
    >
      {text}
    </ActionButtonRoot>
  )
}
