import type { ReactNode } from 'react'
import type { ButtonProps } from '@mui/material'
import { ArrowRight } from 'lucide-react'
import { Flex } from '../layout/Flex'
import { Loading } from '../feedback/Loading'
import { ActionButton } from './ActionButton'

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
    <ActionButton
      {...props}
      disabled={loading || props.disabled}
      sx={[
        {
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: '496px',
          px: '19px',
          alignSelf: 'center',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      type="submit"
      text={
        <Flex gap="9px" justify="center">
          {loading ? (
            <Loading />
          ) : showArrow ? (
            <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          ) : null}
          {children}
        </Flex>
      }
    />
  )
}
