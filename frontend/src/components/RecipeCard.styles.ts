import { Box, IconButton, Typography, styled } from '@mui/material'
import { Flex } from './ui/Flex'

export const CardRoot = styled(Flex)({
  width: '100%',
})

export const Media = styled(Box)(({ theme }) => ({
  position: 'relative',
  isolation: 'isolate',
  width: '100%',
  aspectRatio: '458 / 220',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
}))

export const Photograph = styled('img')({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

export const SaveButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  width: theme.spacing(4.25),
  height: theme.spacing(4.25),
  padding: 0,
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.background.input,
  '&:hover': {
    backgroundColor: theme.palette.background.input,
  },
}))

export const VideoBadge = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  bottom: theme.spacing(1.5),
  left: theme.spacing(1.5),
  padding: theme.spacing(0.75, 1.25),
  borderRadius: theme.spacing(6.25),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  fontSize: theme.typography.pxToRem(11),
  lineHeight: theme.typography.pxToRem(13),
}))

export const RecipeInformation = styled(Flex)({
  width: '100%',
})

export const RecipeTitle = styled(Typography)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: theme.typography.pxToRem(19),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.3,
  letterSpacing: theme.typography.pxToRem(-0.4),
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: `${theme.spacing(1)} 0`,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.pxToRem(17),
  },
}))

export const RecipeMetadata = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(12),
  lineHeight: theme.typography.pxToRem(15),
}))

export const RecipeContext = styled(Typography)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(11),
  lineHeight: 1.4,
}))
