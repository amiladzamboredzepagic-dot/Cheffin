import { Typography, styled } from '@mui/material'
import { Flex } from './Flex'

export type SectionIntroductionVariant = 'page' | 'split' | 'compact'

interface VariantProps {
  introVariant: SectionIntroductionVariant
}

export const SectionIntroductionRoot = styled(Flex, {
  shouldForwardProp: (prop) => prop !== 'introVariant',
})<VariantProps>(({ theme, introVariant }) => ({
  width: introVariant === 'compact' ? 'auto' : '100%',
  alignItems: introVariant === 'page' ? 'stretch' : 'flex-start',
  ...(introVariant === 'page' && {
    gap: theme.spacing(1.5),
  }),
  ...(introVariant === 'split' && {
    gap: 0,
  }),
  ...(introVariant === 'compact' && {
    gap: 0,
  }),
}))

export const SectionIntroductionEyebrow = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'introVariant',
})<VariantProps>(({ theme, introVariant }) => ({
  color: theme.palette.highlight,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: introVariant === 'compact' ? '1.7px' : '1.8px',
  lineHeight:
    introVariant === 'page' ? '12px' : introVariant === 'compact' ? 1.6 : 1.65,
  textTransform: 'uppercase',
}))

export const SectionIntroductionTitle = styled('h2', {
  shouldForwardProp: (prop) => prop !== 'introVariant',
})<VariantProps>(({ theme, introVariant }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontWeight: 500,
  ...(introVariant === 'page' && {
    fontSize: 40,
    letterSpacing: '-1.1px',
    lineHeight: 1.15,
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
    },
  }),
  ...(introVariant === 'split' && {
    marginTop: theme.spacing(1.5),
    fontSize: 36,
    lineHeight: 1.2,
    [theme.breakpoints.down('md')]: {
      fontSize: 32,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 29,
    },
  }),
  ...(introVariant === 'compact' && {
    marginTop: theme.spacing(0.75),
    fontSize: 35,
    lineHeight: 1.18,
    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 27,
    },
  }),
}))

export const SectionIntroductionDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'introVariant',
})<VariantProps>(({ theme, introVariant }) => ({
  color: theme.palette.text.secondary,
  ...(introVariant === 'page' && {
    fontSize: 14,
    lineHeight: 1.6,
  }),
  ...(introVariant === 'split' && {
    maxWidth: 500,
    marginTop: theme.spacing(2.5),
    fontSize: 15,
    lineHeight: 1.65,
  }),
  ...(introVariant === 'compact' && {
    fontSize: 14,
    lineHeight: 1.6,
  }),
}))
