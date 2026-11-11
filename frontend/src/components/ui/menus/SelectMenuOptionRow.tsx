import { MenuItem } from '@mui/material'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Flex } from '../layout/Flex'

interface SelectMenuOptionRowProps {
  value: string
  label: string
  icon?: ReactNode
  selected: boolean
}

export function SelectMenuOptionRow({
  value,
  label,
  icon,
  selected,
}: SelectMenuOptionRowProps) {
  return (
    <MenuItem
      value={value}
      sx={{
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: '11px',
        flex: '0 0 44px',
        minHeight: 44,
        mx: 1,
        px: '14px',
        py: 0,
        borderRadius: '6px',
        fontSize: '13px',
        lineHeight: '16px',
        backgroundColor: selected
          ? (theme) => theme.palette.background.planner
          : 'transparent',
        color: selected
          ? (theme) => theme.palette.primary.light
          : (theme) => theme.palette.text.label,
        fontWeight: selected ? 500 : 400,
        '&:hover': {
          backgroundColor: selected
            ? (theme) => theme.palette.background.planner
            : (theme) => theme.palette.action.hover,
        },
      }}
    >
      {icon && (
        <Flex
          sx={{
            flexShrink: 0,
            color: 'text.secondary',
            '& svg': { width: 17, height: 17 },
          }}
        >
          {icon}
        </Flex>
      )}
      {label}
      {selected && (
        <Flex sx={{ marginLeft: 'auto', color: 'primary.light' }}>
          <Check size={16} strokeWidth={1.7} />
        </Flex>
      )}
    </MenuItem>
  )
}
