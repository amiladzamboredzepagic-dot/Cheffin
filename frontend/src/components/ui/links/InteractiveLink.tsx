import type { MouseEventHandler, ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import {
  InteractiveLinkRoot,
  LinkIconContainer,
} from './InteractiveLink.styles'

interface InteractiveLinkProps {
  text: string
  href: string
  icon?: ReactNode
  iconPosition?: 'start' | 'end'
  sx?: SxProps<Theme>
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

export function InteractiveLink({
  text,
  href,
  icon,
  iconPosition = 'end',
  sx,
  onClick,
}: InteractiveLinkProps) {
  return (
    <InteractiveLinkRoot
      href={href}
      underline="none"
      variant="button"
      sx={sx}
      onClick={onClick}
    >
      {iconPosition === 'start' && icon && (
        <LinkIconContainer aria-hidden="true">{icon}</LinkIconContainer>
      )}
      {text}
      {iconPosition === 'end' && icon && (
        <LinkIconContainer aria-hidden="true">{icon}</LinkIconContainer>
      )}
    </InteractiveLinkRoot>
  )
}
