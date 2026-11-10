import { Box, Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/Flex'

export const PantrySection = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: 430,
  padding: theme.spacing(4.5, 8),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2.5),
  },
}))

export const PantryLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 640fr) minmax(0, 540fr)',
  alignItems: 'center',
  gap: 'clamp(32px, 6.667vw, 96px)',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(4),
  },
}))

export const IngredientPreview = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 272fr) minmax(0, 292fr)',
  gridTemplateRows: '236px 58px',
  gap: '20px 26px',
  width: '100%',
  minHeight: 358,
  padding: 22,
  borderRadius: 18,
  backgroundColor: theme.palette.background.accent,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows: 'auto auto auto',
    gap: theme.spacing(2),
    minHeight: 0,
    padding: theme.spacing(2),
  },
}))

export const PantryPhoto = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: '100%',
  minHeight: 0,
  objectFit: 'cover',
  borderRadius: 12,
  backgroundColor: theme.palette.background.secondary,
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    aspectRatio: '272 / 236',
  },
}))

export const DetectedIngredients = styled(Flex)(({ theme }) => ({
  minWidth: 0,
  paddingTop: 6,
  [theme.breakpoints.down('sm')]: {
    paddingTop: 0,
  },
}))

export const PreviewEyebrow = styled(Typography)(({ theme }) => ({
  marginBottom: 8,
  color: theme.palette.highlight,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.04em',
  lineHeight: 1.65,
  textTransform: 'uppercase',
}))

export const IngredientChip = styled(Typography)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minHeight: 32,
  paddingInline: 15,
  borderRadius: 16,
  color: theme.palette.primary.light,
  backgroundColor: theme.palette.background.input,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.65,
  [theme.breakpoints.down('sm')]: {
    minHeight: 36,
  },
}))

export const PantryMatch = styled(Flex)(({ theme }) => ({
  gridColumn: '1 / -1',
  boxSizing: 'border-box',
  minWidth: 0,
  paddingInline: 16,
  borderRadius: 10,
  backgroundColor: theme.palette.background.input,
  [theme.breakpoints.down('sm')]: {
    gridColumn: 'auto',
    minHeight: 58,
  },
}))

export const MatchText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 17,
  fontWeight: 400,
  lineHeight: 1.2,
}))

export const PantryCopy = styled(Flex)(({ theme }) => ({
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    maxWidth: 640,
  },
}))

export const PantryEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.highlight,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '1.8px',
  lineHeight: 1.65,
  textTransform: 'uppercase',
}))

export const PantryHeading = styled('h2')(({ theme }) => ({
  margin: `${theme.spacing(1.5)} 0 0`,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 36,
  fontWeight: 500,
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: 32,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 29,
  },
}))

export const PantryDescription = styled(Typography)(({ theme }) => ({
  maxWidth: 500,
  marginTop: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  fontSize: 15,
  lineHeight: 1.65,
}))

export const PantryLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  marginTop: theme.spacing(3),
  color: theme.palette.primary.light,
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.65,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))
