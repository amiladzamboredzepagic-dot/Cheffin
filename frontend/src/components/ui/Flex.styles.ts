import { Box, type BoxProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import type { SystemProps } from '@mui/system'

export interface FlexStyleProps {
  direction: SystemProps['flexDirection']
  align: SystemProps['alignItems']
  justify: SystemProps['justifyContent']
  wrap: SystemProps['flexWrap']
  gap: SystemProps['gap']
}

interface FlexRootProps {
  ownerState: FlexStyleProps
}

export const FlexRoot = styled(Box, {
  shouldForwardProp: (prop): prop is keyof BoxProps => prop !== 'ownerState',
})<FlexRootProps>(({ theme, ownerState }) => ({
  display: 'flex',
  ...theme.unstable_sx({
    flexDirection: ownerState.direction,
    alignItems: ownerState.align,
    justifyContent: ownerState.justify,
    flexWrap: ownerState.wrap,
    gap: ownerState.gap,
  }),
}))
