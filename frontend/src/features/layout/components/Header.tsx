import type React from 'react'
import { HeaderContainer } from './Header.styles'

interface HeaderProps {
  children: React.ReactNode
}

export default function Header({ children }: HeaderProps) {
  return (
    <HeaderContainer component="header" justify="space-between" wrap="wrap">
      {children}
    </HeaderContainer>
  )
}
