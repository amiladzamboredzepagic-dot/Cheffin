import { ButtonBase, styled } from '@mui/material'

export type TabsVariant = 'underline' | 'segmented'

interface TabsStyleProps {
  tabsVariant: TabsVariant
}

export const TabsRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'tabsVariant',
})<TabsStyleProps>(({ theme, tabsVariant }) => ({
  display: 'flex',
  ...(tabsVariant === 'underline'
    ? {
        gap: 30,
        borderBottom: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
      }
    : {
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 560,
        padding: 4,
        gap: 4,
        borderRadius: 10,
        backgroundColor: theme.palette.background.secondary,
      }),
}))

export const Tab = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'tabsVariant',
})<TabsStyleProps & { selected: boolean }>(
  ({ theme, selected, tabsVariant }) => ({
    color: selected
      ? theme.palette.primary.light
      : theme.palette.text.secondary,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: selected
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
    ...(tabsVariant === 'underline'
      ? {
          padding: '0 0 16px',
          borderBottom: `2px solid ${selected ? theme.palette.primary.light : 'transparent'}`,
          whiteSpace: 'nowrap',
        }
      : {
          display: 'flex',
          flex: '1 1 0',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.spacing(1),
          minWidth: 0,
          minHeight: 42,
          borderRadius: 7,
          backgroundColor: selected
            ? theme.palette.background.input
            : 'transparent',
          fontFamily: theme.typography.fontFamily,
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.light}`,
            outlineOffset: '-2px',
          },
        }),
  }),
)
