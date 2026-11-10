import { useId, type ReactNode } from 'react'
import { Modal as MuiModal, type ModalProps } from '@mui/material'
import { X } from 'lucide-react'
import {
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalEyebrow,
  ModalHeader,
  ModalPanel,
  ModalTitle,
} from './GenericModal.styles'

export interface GenericModalProps extends Omit<
  ModalProps,
  'children' | 'open' | 'onClose' | 'title' | 'content'
> {
  open: boolean
  onClose: () => void
  title: ReactNode
  content: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  closeLabel?: string
}

export function GenericModal({
  open,
  onClose,
  title,
  content,
  eyebrow,
  description,
  closeLabel = 'Close dialog',
  ...modalProps
}: GenericModalProps) {
  const titleId = useId()
  const contentId = useId()

  return (
    <MuiModal
      {...modalProps}
      open={open}
      onClose={() => onClose()}
      aria-labelledby={titleId}
      aria-describedby={contentId}
    >
      <ModalPanel
        direction="column"
        align="stretch"
        justify="space-between"
        gap={3.125}
      >
        <ModalCloseButton aria-label={closeLabel} onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </ModalCloseButton>
        <ModalHeader direction="column" align="flex-start">
          {eyebrow && <ModalEyebrow>{eyebrow}</ModalEyebrow>}
          <ModalTitle id={titleId}>{title}</ModalTitle>
          {description && (
            <ModalDescription>{description}</ModalDescription>
          )}
        </ModalHeader>
        <ModalContent id={contentId}>{content}</ModalContent>
      </ModalPanel>
    </MuiModal>
  )
}
