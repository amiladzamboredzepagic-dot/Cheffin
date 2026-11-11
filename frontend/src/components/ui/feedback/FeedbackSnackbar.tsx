import type { ReactNode } from 'react'
import { Alert, Snackbar } from '@mui/material'
import type { StatusAlertSeverity } from './StatusAlert'

interface FeedbackSnackbarProps {
  open: boolean
  message: ReactNode
  severity: StatusAlertSeverity
  onClose: () => void
  autoHideDuration?: number
}

export function FeedbackSnackbar({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 6000,
}: FeedbackSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
