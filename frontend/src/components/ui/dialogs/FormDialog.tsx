import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import type { DialogProps } from '@mui/material'
import type { ReactNode, SubmitEvent } from 'react'

interface FormDialogProps {
  open: boolean
  title: ReactNode
  cancelLabel: string
  submitLabel: string
  loading?: boolean
  maxWidth?: DialogProps['maxWidth']
  onClose: () => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
  children: ReactNode
}

export function FormDialog({
  open,
  title,
  cancelLabel,
  submitLabel,
  loading = false,
  maxWidth = 'xs',
  onClose,
  onSubmit,
  children,
}: FormDialogProps) {
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onSubmit(event)
  }

  const handleClose = () => {
    if (!loading) onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={maxWidth}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button type="submit" disabled={loading}>
            {submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
