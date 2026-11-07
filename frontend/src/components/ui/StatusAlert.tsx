import type { ReactNode } from 'react'
import { Alert as MuiAlert, AlertTitle, type AlertProps } from '@mui/material'

export type StatusAlertSeverity = NonNullable<AlertProps['severity']>

export interface StatusAlertProps extends Omit<AlertProps, 'severity' | 'title'> {
  severity: StatusAlertSeverity
  title?: ReactNode
}

export function StatusAlert({
  children,
  severity,
  title,
  ...props
}: StatusAlertProps) {
  return (
    <MuiAlert {...props} severity={severity}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  )
}
