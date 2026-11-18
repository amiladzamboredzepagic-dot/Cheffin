import { Box, IconButton, styled } from '@mui/material'
import { Flex } from '../../components/ui/layout/Flex'

export const ProfileHero = styled(Flex)(({ theme }) => ({
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
  minHeight: 140,
  padding: theme.spacing(4, 5),
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.accent,
  [theme.breakpoints.down('sm')]: {
    minHeight: 120,
    padding: theme.spacing(3),
  },
}))

export const ProfileLayout = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(210px, 280px) minmax(0, 1fr)',
  alignItems: 'start',
  gap: theme.spacing(4),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
    gap: theme.spacing(3),
  },
}))

export const ProfileIdentity = styled(Flex)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.75),
  backgroundColor: theme.palette.background.paper,
}))

export const ProfileEditButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  color: theme.palette.primary.light,
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.light}`,
  },
}))

export const ProfileImagePreview = styled('img')({
  display: 'block',
  width: '100%',
  maxHeight: 180,
  borderRadius: 9,
  objectFit: 'cover',
})

export const ProfileName = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: theme.typography.fontFamilySerif,
  fontSize: theme.typography.pxToRem(23),
  fontWeight: theme.typography.fontWeightRegular,
  lineHeight: 1.25,
  overflowWrap: 'anywhere',
}))

export const ProfileRole = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(12),
}))

export const ProfileStats = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  width: '100%',
  borderTop: `1px solid ${theme.palette.divider}`,
}))

export const ProfileStat = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
  paddingTop: theme.spacing(1.5),
  '& + &': {
    paddingLeft: theme.spacing(1.5),
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}))

export const ProfileStatValue = styled('span')(({ theme }) => ({
  color: theme.palette.text.label,
  fontSize: theme.typography.pxToRem(20),
  fontWeight: theme.typography.fontWeightMedium,
  lineHeight: 1.2,
}))

export const ProfileStatLabel = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(11),
}))

export const ProfileTabPanel = styled('section')(({ theme }) => ({
  minWidth: 0,
  '& > [role="tabpanel"]': {
    marginTop: theme.spacing(3),
  },
}))
