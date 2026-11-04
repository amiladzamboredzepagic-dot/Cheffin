import type { BoxProps } from '@mui/material'
import { FlexRoot, type FlexStyleProps } from './Flex.styles'

export interface FlexProps
  extends Omit<BoxProps, keyof FlexStyleProps>, Partial<FlexStyleProps> {}

export function Flex({
  children,
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = 2,
  ...rest
}: FlexProps) {
  return (
    <FlexRoot ownerState={{ direction, align, justify, wrap, gap }} {...rest}>
      {children}
    </FlexRoot>
  )
}
