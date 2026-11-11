import { Box, Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/Flex'
export {
  SplitSection as PantrySection,
  SplitSectionCopy as PantryCopy,
  SplitSectionDescription as PantryDescription,
  SplitSectionEyebrow as PantryEyebrow,
  SplitSectionHeading as PantryHeading,
  SplitSectionLink as PantryLink,
} from './LandingSplitSection.styles'

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
