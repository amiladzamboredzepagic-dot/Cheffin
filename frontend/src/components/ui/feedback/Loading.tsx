import { CircularProgress, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { Flex } from '../layout/Flex'

export interface LoadingProps {
  label?: string
  icon?: ReactNode
  size?: number
  inline?: boolean
  sx?: SxProps<Theme>
}

export function Loading({
  label = 'Loading',
  icon,
  size = 24,
  inline = false,
  sx,
}: LoadingProps) {
  if (inline) {
    return (
      <CircularProgress
        size={size}
        aria-label={label}
        role="status"
        sx={[
          { color: 'primary.main' },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      />
    )
  }

  return (
    <Flex
      role="status"
      aria-live="polite"
      align="center"
      justify="center"
      gap={1.5}
      sx={[
        {
          boxSizing: 'border-box',
          width: '100%',
          minHeight: 120,
          py: 3,
          color: 'text.secondary',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <CircularProgress
        size={size}
        aria-hidden="true"
        sx={{ color: 'primary.main' }}
      />
      <Typography
        variant="body2"
        sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}
      >
        {icon}
        {label}
      </Typography>
    </Flex>
  )
}
