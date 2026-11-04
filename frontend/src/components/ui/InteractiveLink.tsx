import type { ReactNode } from 'react'
import {
  InteractiveLinkRoot,
  LinkIconContainer,
} from './InteractiveLink.styles'

interface InteractiveLinkProps {
  text: string
  href: string
  icon?: ReactNode
}

export function InteractiveLink({ text, href, icon }: InteractiveLinkProps) {
  return (
    <InteractiveLinkRoot href={href} underline="none" variant="button">
      {text}
      {icon && <LinkIconContainer aria-hidden="true">{icon}</LinkIconContainer>}
    </InteractiveLinkRoot>
  )
}
