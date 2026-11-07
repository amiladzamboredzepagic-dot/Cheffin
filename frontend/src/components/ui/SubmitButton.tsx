import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import { Flex } from './Flex'
import { Loading } from './Loading'
import { SubmitButtonRoot } from './SubmitButton.styles'

export interface SubmitButtonProps extends Omit<
  ButtonProps,
  'type' | 'loading'
> {
  children: ReactNode
  showArrow?: boolean
  loading?: boolean
}

export function SubmitButton({
  children,
  showArrow = true,
  loading = false,
  sx,
  ...props
}: SubmitButtonProps) {
  return (
    <SubmitButtonRoot
      {...props}
      disabled={loading || props.disabled}
      sx={sx}
      type="submit"
      variant="contained"
    >
      <Flex gap="9px" justify="center">
        {loading ? (
          <Loading />
        ) : showArrow ? (
          <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
        ) : null}
        {children}
      </Flex>
    </SubmitButtonRoot>
  )
}
