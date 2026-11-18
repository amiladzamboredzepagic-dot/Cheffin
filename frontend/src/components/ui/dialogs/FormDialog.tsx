import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import type { DialogProps } from '@mui/material'
import type { ReactNode, SubmitEvent } from 'react'
import { ActionButton } from '../actions/ActionButton'

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
          <ActionButton
            type="button"
            kind="secondary"
            text={cancelLabel}
            onClick={handleClose}
            disabled={loading}
          />
          <ActionButton type="submit" text={submitLabel} disabled={loading} />
        </DialogActions>
      </form>
    </Dialog>
  )
}
