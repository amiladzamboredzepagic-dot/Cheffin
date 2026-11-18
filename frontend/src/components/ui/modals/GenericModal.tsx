import { useId, type ReactNode } from 'react'
import { Modal as MuiModal, type ModalProps } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import { X } from 'lucide-react'
import {
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalEyebrow,
  ModalHeader,
  ModalFooter,
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
  footer?: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  closeLabel?: string
  panelSx?: SxProps<Theme>
}

export function GenericModal({
  open,
  onClose,
  title,
  content,
  footer,
  eyebrow,
  description,
  closeLabel = 'Close dialog',
  panelSx,
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
        sx={panelSx}
        direction="column"
        align="stretch"
        justify="flex-start"
        gap={{ xs: 2, sm: 3 }}
      >
        <ModalCloseButton aria-label={closeLabel} onClick={onClose}>
          <X size={20} aria-hidden="true" />
        </ModalCloseButton>
        <ModalHeader direction="column" align="flex-start">
          {eyebrow && <ModalEyebrow>{eyebrow}</ModalEyebrow>}
          <ModalTitle id={titleId}>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalContent id={contentId}>{content}</ModalContent>
        {footer != null && <ModalFooter>{footer}</ModalFooter>}
      </ModalPanel>
    </MuiModal>
  )
}
