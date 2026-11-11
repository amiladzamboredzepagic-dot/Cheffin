import { Box, Typography, styled } from '@mui/material'
import { Flex } from '../../components/ui/layout/Flex'

export const CommunitySection = styled('section')(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 330,
  padding: theme.spacing(3.75, 8),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 2.5),
  },
}))

export const CommunityPanel = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 340px',
  alignItems: 'stretch',
  gap: theme.spacing(4),
  width: '100%',
  minHeight: 260,
  padding: '38px 40px 29px',
  borderRadius: 18,
  backgroundColor: theme.palette.background.secondary,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) 240px',
    gap: theme.spacing(3),
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(4),
    padding: theme.spacing(3),
  },
}))

export const CommunityCopy = styled(Flex)(({ theme }) => ({
  alignItems: 'flex-start',
  minWidth: 0,
  [theme.breakpoints.down('sm')]: {
    minHeight: 205,
  },
}))

export const CommunityEyebrow = styled(Typography)(({ theme }) => ({
  color: theme.palette.highlight,
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '1.7px',
  lineHeight: 1.65,
  textTransform: 'uppercase',
}))

export const CommunityHeading = styled('h2')(({ theme }) => ({
  margin: `${theme.spacing(2)} 0 0`,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 35,
  fontWeight: 500,
  lineHeight: 1.2,
  [theme.breakpoints.down('md')]: {
    fontSize: 32,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 28,
  },
}))

export const CommunityDescription = styled(Typography)(({ theme }) => ({
  maxWidth: 720,
  marginTop: theme.spacing(1.75),
  color: theme.palette.text.secondary,
  fontSize: 15,
  lineHeight: 1.65,
}))

export const CommunityLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
  marginTop: 'auto',
  color: theme.palette.primary.light,
  fontSize: 13,
  fontWeight: 600,
  lineHeight: 1.65,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

export const CommunityProfile = styled(Flex)(({ theme }) => ({
  minWidth: 0,
  paddingTop: 0,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    alignSelf: 'center',
  },
}))

export const CommunityPortrait = styled('img')(({ theme }) => ({
  display: 'block',
  width: 110,
  height: 110,
  borderRadius: '50%',
  objectFit: 'cover',
  backgroundColor: theme.palette.background.default,
}))

export const CommunityName = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.75),
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 22,
  fontWeight: 400,
  lineHeight: 1.2,
}))

export const CommunityProfileDetail = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  color: theme.palette.primary.light,
  fontSize: 11,
  lineHeight: 1.65,
}))
