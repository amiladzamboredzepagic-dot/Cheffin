import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SegmentedToggleOption = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
  boxSizing: 'border-box',
  flex: '1 1 0',
  minWidth: 0,
  height: '40px',
  padding: 0,
  borderRadius: '7px',
  backgroundColor: selected ? theme.palette.background.input : 'transparent',
  color: selected ? theme.palette.primary.light : theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontSize: '13px',
  fontWeight: selected ? 600 : 400,
  lineHeight: '16px',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '-2px',
  },
}))
