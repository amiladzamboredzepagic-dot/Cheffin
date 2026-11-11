import type { BoxProps } from '@mui/material'
import { FlexRoot, type FlexStyleProps } from './Flex.styles'

export type FlexProps<C extends React.ElementType = 'div'> = Omit<
  BoxProps<C, { component?: C }>,
  keyof FlexStyleProps
> &
  Partial<FlexStyleProps>

export function Flex<C extends React.ElementType = 'div'>({
  children,
  direction = 'row',
  align = 'center',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = 2,
  ...rest
}: FlexProps<C>) {
  return (
    <FlexRoot ownerState={{ direction, align, justify, wrap, gap }} {...rest}>
      {children}
    </FlexRoot>
  )
}
