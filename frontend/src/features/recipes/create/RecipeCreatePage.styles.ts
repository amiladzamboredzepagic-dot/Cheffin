import { Box, ButtonBase, Typography, styled } from '@mui/material'
import { Flex } from '../../../components/ui/layout/Flex'

export const CreateRecipePage = styled('main')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(4),
  width: '100%',
  minHeight: 866,
  padding: theme.spacing(5, 8, 6),
  [theme.breakpoints.down('md')]: {
    minHeight: 0,
    padding: theme.spacing(4, 4, 5),
  },
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(3),
    padding: theme.spacing(3, 2, 4),
  },
}))

export const RecipeWorkspace = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 560fr) minmax(0, 704fr)',
  alignItems: 'start',
  gap: 48,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(4),
  },
}))

export const RecipeEntry = styled(Flex)(({ theme }) => ({
  width: '100%',
  gap: theme.spacing(3.125),
}))

export const EntryTabs = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  padding: 4,
  borderRadius: 10,
  backgroundColor: theme.palette.background.secondary,
}))

export const EntryTab = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
  display: 'flex',
  flex: '1 1 0',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
  minHeight: 42,
  borderRadius: 7,
  color: selected ? theme.palette.primary.light : theme.palette.text.secondary,
  backgroundColor: selected ? theme.palette.background.input : 'transparent',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: selected
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
    outlineOffset: '-2px',
  },
}))

export const ImportGuidance = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  lineHeight: 1.65,
}))

export const RecipeTag = styled(Flex, {
  shouldForwardProp: (prop) => prop !== 'accent',
})<{ accent?: boolean }>(({ theme, accent }) => ({
  minHeight: 33,
  padding: theme.spacing(0, 1.75),
  borderRadius: 100,
  color: accent ? theme.palette.highlight : theme.palette.primary.light,
  backgroundColor: accent
    ? theme.palette.background.accent
    : theme.palette.background.planner,
  fontSize: theme.typography.caption.fontSize,
  fontWeight: 500,
  lineHeight: '15px',
  whiteSpace: 'nowrap',
}))

export const PrivacyNote = styled(Flex)(({ theme }) => ({
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  fontSize: 11,
  lineHeight: '13px',
  textAlign: 'center',
}))

export const RecipePreview = styled(Flex)(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: 652,
  padding: theme.spacing(3),
  gap: theme.spacing(2.625),
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 18,
  backgroundColor: theme.palette.background.input,
  [theme.breakpoints.down('sm')]: {
    minHeight: 0,
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
}))

export const PreviewStatus = styled(Flex)(({ theme }) => ({
  width: '100%',
  gap: theme.spacing(1),
  color: theme.palette.primary.light,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: '19px',
}))

export const PreviewLabel = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  color: theme.palette.highlight,
  fontSize: 10,
  letterSpacing: '1.4px',
  lineHeight: '12px',
  textAlign: 'right',
  textTransform: 'uppercase',
}))

export const PreviewImage = styled('img')(({ theme }) => ({
  display: 'block',
  width: '100%',
  height: 310,
  borderRadius: 12,
  backgroundColor: theme.palette.background.secondary,
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    aspectRatio: '656 / 310',
  },
}))

export const PreviewRecipeTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 33,
  fontWeight: theme.typography.fontWeightRegular,
  letterSpacing: '-0.6px',
  lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
    fontSize: 26,
  },
}))

export const PreviewMetadata = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.caption.fontSize,
  lineHeight: '15px',
}))

export const PreviewReview = styled(Flex)(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
  },
}))

export const ReviewHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.label,
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 500,
  lineHeight: '16px',
}))

export const ReviewGuidance = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 11,
  lineHeight: 1.5,
}))

export const ReviewAction = styled('button')(({ theme }) => ({
  flexShrink: 0,
  padding: 0,
  border: 0,
  color: theme.palette.primary.light,
  background: 'none',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.caption.fontSize,
  fontWeight: theme.typography.fontWeightMedium,
  cursor: 'pointer',
}))
