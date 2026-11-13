import { Box, IconButton, Typography, styled } from '@mui/material'
import { Flex } from './ui/layout/Flex'

export const CardRoot = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: 324,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.input,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 14,
}))

export const Media = styled(Box)({
  position: 'relative',
  isolation: 'isolate',
  width: '100%',
  height: 176,
  flexShrink: 0,
  overflow: 'hidden',
})

export const Photograph = styled('img')({
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

export const PhotoPlaceholder = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.secondary,
  color: theme.palette.primary.light,
}))

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
  boxSizing: 'border-box',
  width: '100%',
  flex: 1,
  padding: '16px 18px 18px',
})

export const RecipeTag = styled(Typography)(({ theme }) => ({
  marginBottom: 11,
  color: theme.palette.highlight,
  fontSize: theme.typography.pxToRem(9),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.pxToRem(11),
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  overflowWrap: 'anywhere',
}))

export const RecipeDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  boxSizing: 'border-box',
  width: '100%',
  marginTop: 'auto',
  paddingTop: 16,
  borderTop: `1px solid ${theme.palette.divider}`,
}))

export const RecipeRating = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.primary.light,
  fontSize: theme.typography.pxToRem(12),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: theme.typography.pxToRem(15),
}))

export const RecipeTitle = styled(Typography)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  color: theme.palette.text.label,
  fontFamily: theme.typography.fontFamilySerif,
  fontSize: theme.typography.pxToRem(19),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: theme.typography.pxToRem(24),
  letterSpacing: 'normal',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
}))

export const RecipeMetadata = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.detail,
  fontSize: theme.typography.pxToRem(11),
  lineHeight: theme.typography.pxToRem(13),
}))

export const RecipeContext = styled(Typography)(({ theme }) => ({
  width: '100%',
  marginTop: 7,
  marginBottom: 16,
  color: theme.palette.text.detail,
  fontSize: theme.typography.pxToRem(11),
  lineHeight: theme.typography.pxToRem(13),
  overflowWrap: 'anywhere',
}))
