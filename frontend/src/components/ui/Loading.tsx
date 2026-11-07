import { CircularProgress, type CircularProgressProps } from '@mui/material'

export interface LoadingProps extends Omit<
  CircularProgressProps,
  'aria-label'
> {
  label?: string
}

export function Loading({
  label = 'Loading',
  size = 18,
  sx,
  ...props
}: LoadingProps) {
  return (
    <CircularProgress
      {...props}
      size={size}
      aria-label={label}
      role="status"
      sx={[
        {
          color: 'primary.contrastText',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
