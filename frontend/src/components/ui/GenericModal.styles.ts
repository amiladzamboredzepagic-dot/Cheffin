import { Box, IconButton, styled } from '@mui/material'
import { Flex } from './Flex'

export const ModalPanel = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'calc(100% - 32px)',
  maxWidth: 576,
  height: 'min(743px, calc(100dvh - 32px))',
  overflowY: 'auto',
  boxSizing: 'border-box',
  padding: theme.spacing(8, 5, 4),
  borderRadius: theme.spacing(2.5),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 16px 64px rgba(20, 38, 26, 0.18)',
  outline: 'none',
  transform: 'translate(-50%, -50%)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 24px)',
    height: 'min(743px, calc(100dvh - 24px))',
    padding: theme.spacing(7, 2.5, 2.5),
    borderRadius: theme.spacing(2),
  },
}))

export const ModalHeader = styled(Flex)(({ theme }) => ({
  width: '100%',
  gap: theme.spacing(1.5),
}))

export const ModalEyebrow = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.highlight,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(10),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.pxToRem(12),
  letterSpacing: theme.typography.pxToRem(1.7),
  textTransform: 'uppercase',
}))

export const ModalTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: theme.typography.pxToRem(34),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.pxToRem(44),
}))

export const ModalDescription = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(13),
  lineHeight: 1.6,
}))

export const ModalCloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: theme.spacing(4),
  height: theme.spacing(4),
  color: theme.palette.primary.light,
}))

export const ModalContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'stretch',
  flex: 1,
  width: '100%',
  minHeight: 0,
  '& > *': {
    width: '100%',
    flex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    overflowY: 'auto',
  },
}))
