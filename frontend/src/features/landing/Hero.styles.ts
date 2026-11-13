import { Box, Button, Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/layout/Flex'
import { Description as BaseDescription } from '../../components/ui/typography/Description'

export const HeroSection = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 650,
  padding: '48px clamp(24px, 4.444vw, 64px) 70px',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    minHeight: 'auto',
    paddingBlock: theme.spacing(6),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 2.5, 5),
  },
}))

export const HeroLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 570fr) minmax(0, 646fr)',
  alignItems: 'center',
  gap: 'clamp(32px, 6.667vw, 96px)',
  width: '100%',
  height: 532,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    height: 'auto',
    gap: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(3),
  },
}))

export const HeroCopy = styled(Flex)(({ theme }) => ({
  alignSelf: 'stretch',
  paddingTop: 26,
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
  },
}))

export const Eyebrow = styled(Typography)(({ theme }) => ({
  marginBottom: 19,
  color: theme.palette.highlight,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '1.8px',
  lineHeight: '18px',
  textTransform: 'uppercase',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1.5),
    fontSize: 10,
  },
}))

export const Heading = styled('h1')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 'clamp(42px, 4.584vw, 66px)',
  fontWeight: 500,
  letterSpacing: '-0.035em',
  lineHeight: 1.18,
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(38px, 5.2vw, 56px)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(42px, 11vw, 58px)',
  },
}))

export const Description = styled(BaseDescription)(({ theme }) => ({
  maxWidth: 525,
  marginTop: 28,
  fontSize: 17,
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2.5),
    fontSize: 15,
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(2),
    fontSize: 15,
  },
}))

export const HeroActions = styled(Flex)(({ theme }) => ({
  gap: 16,
  marginTop: 32,
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(1),
    marginTop: theme.spacing(2.5),
  },
}))

const ActionButton = styled(Button)(({ theme }) => ({
  boxSizing: 'border-box',
  height: 48,
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  [theme.breakpoints.down('sm')]: {
    height: 46,
    fontSize: 12,
  },
}))

export const ExploreButton = styled(ActionButton)(({ theme }) => ({
  width: 190,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.input,
  color: theme.palette.primary.light,
  '&:hover': {
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.input,
  },
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    paddingInline: theme.spacing(2),
  },
}))

export const Note = styled(Typography)(({ theme }) => ({
  marginTop: 18,
  color: theme.palette.text.secondary,
  fontSize: 12,
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1.5),
  },
}))

export const FeaturedImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 360,
  overflow: 'hidden',
  borderRadius: 20,
  backgroundColor: theme.palette.background.secondary,
  backgroundImage:
    'url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=88")',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  [theme.breakpoints.down('md')]: {
    minHeight: 430,
    maxHeight: 532,
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: 0,
    height: 'auto',
    aspectRatio: '1.22 / 1',
    borderRadius: 16,
  },
}))

export const RecipeCaption = styled(Flex)(({ theme }) => ({
  position: 'absolute',
  right: 24,
  bottom: 23,
  left: 24,
  boxSizing: 'border-box',
  minHeight: 75,
  gap: theme.spacing(2),
  padding: '12px 18px',
  borderRadius: 12,
  backgroundColor: theme.palette.background.input,
  [theme.breakpoints.down('sm')]: {
    right: 12,
    bottom: 12,
    left: 12,
    minHeight: 62,
    padding: theme.spacing(1, 1.5),
  },
}))

export const CaptionLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.highlight,
  fontSize: 9,
  fontWeight: 600,
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: 8,
  },
}))

export const RecipeTitle = styled(Typography)(({ theme }) => ({
  marginTop: 2,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 21,
  fontWeight: 400,
  lineHeight: 1.18,
  [theme.breakpoints.down('sm')]: {
    fontSize: 16,
  },
}))

export const RecipeTime = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: theme.palette.primary.light,
  fontSize: 12,
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: 10,
  },
}))
