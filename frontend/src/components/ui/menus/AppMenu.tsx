import {
  Menu,
  type MenuProps,
} from '@mui/material'
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
            borderRadius: theme.spacing(1.5),
            backgroundColor: theme.palette.background.input,
            boxShadow: '0px 12px 32px rgba(20, 38, 26, 0.14)',
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
