import type { DialogProps } from '@mui/material'
import { useId, type ReactNode, type SubmitEvent } from 'react'
import { ActionButton } from '../actions/ActionButton'
import { Flex } from '../layout/Flex'
import { GenericModal } from '../modals/GenericModal'

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

const FORM_DIALOG_MAX_WIDTH: Record<
  Exclude<NonNullable<DialogProps['maxWidth']>, false>,
  number
> = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
}

function getFormDialogMaxWidth(maxWidth: DialogProps['maxWidth']) {
  return maxWidth === false
    ? 'none'
    : FORM_DIALOG_MAX_WIDTH[maxWidth ?? 'xs']
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
  const formId = useId()

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onSubmit(event)
  }

  const handleClose = () => {
    if (!loading) onClose()
  }

  return (
    <GenericModal
      open={open}
      onClose={handleClose}
      title={title}
      closeLabel={cancelLabel}
      panelSx={{ maxWidth: getFormDialogMaxWidth(maxWidth) }}
      content={
        <Flex
          id={formId}
          component="form"
          onSubmit={handleSubmit}
          direction="column"
          align="stretch"
          gap={1.5}
        >
          {children}
        </Flex>
      }
      footer={
        <Flex
          direction={{ xs: 'column-reverse', sm: 'row' }}
          align="stretch"
          justify="flex-end"
          gap={1.5}
        >
          <ActionButton
            type="button"
            kind="secondary"
            text={cancelLabel}
            onClick={handleClose}
            disabled={loading}
          />
          <ActionButton
            type="submit"
            form={formId}
            text={submitLabel}
            disabled={loading}
          />
        </Flex>
      }
    />
  )
}
