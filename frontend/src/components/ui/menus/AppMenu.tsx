import { Menu, type MenuProps } from '@mui/material'
import type { ReactNode } from 'react'

export { AppMenuItem } from './AppMenu.styles'

interface AppMenuProps {
  anchorEl: HTMLElement | null
  open: boolean
  onClose: MenuProps['onClose']
  children: ReactNode
  id?: string
  ariaLabel?: string
  minWidth?: number
}

export function AppMenu({
  anchorEl,
  open,
  onClose,
  children,
  id,
  ariaLabel,
  minWidth = 180,
}: AppMenuProps) {
  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: (theme) => ({
            mt: 1,
            minWidth,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '10px',
            backgroundColor: theme.palette.background.input,
            boxShadow: '0px 10px 28px rgba(41, 62, 48, 0.14)',
          }),
        },
        list: {
          'aria-label': ariaLabel,
          sx: { p: 0.75 },
        },
      }}
    >
      {children}
    </Menu>
  )
}
