import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import { Flex } from './Flex'
import { SubmitButtonRoot } from './SubmitButton.styles'

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  children: ReactNode
  showArrow?: boolean
}

export function SubmitButton({
  children,
  showArrow = true,
  sx,
  ...props
}: SubmitButtonProps) {
  return (
    <SubmitButtonRoot {...props} sx={sx} type="submit" variant="contained">
      <Flex gap="9px" justify="center">
        {showArrow && (
          <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
        )}
        {children}
      </Flex>
    </SubmitButtonRoot>
  )
}
