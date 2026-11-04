import { styled, Typography } from '@mui/material'
import { Flex } from '../../../components/ui/Flex'
import { TextLinkBase } from '../../../components/ui/TextLink.styles'

export const FooterContainer = styled(Flex)(({ theme }) => ({
  width: '100%',
  height: '70px',
  boxSizing: 'border-box',
  paddingInline: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.up('md')]: {
    paddingInline: theme.spacing(8),
  },
}))

export const BrandMotto = styled(Typography)(({ theme }) => ({
  fontFamily: "'Lora', serif",
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: theme.palette.primary.light,
  width: '193px',
  height: '18px',
  whiteSpace: 'nowrap',
}))

export const FooterLink = styled(TextLinkBase)(({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: theme.palette.text.secondary,
}))
