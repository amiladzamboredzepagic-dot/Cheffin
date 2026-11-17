import { styled } from '@mui/material'

export const Sidebar = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 25,
  color: theme.palette.text.label,
}))

export const SidebarCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  padding: 18,
  borderRadius: 14,
  backgroundColor: theme.palette.background.planner,
}))

export const Content = styled('div')({
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 28,
})

export const SectionTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.label,
  fontFamily: '"Lora", Georgia, serif',
  fontSize: 25,
  fontWeight: 500,
  letterSpacing: '-0.5px',
}))

export const CollectionGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 20,
  marginTop: 17,
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}))

export const RecipeGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
}))

export const CollectionCard = styled('button')(({ theme }) => ({
  height: 150,
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: 0,
  borderRadius: 14,
  backgroundColor: theme.palette.background.secondary,
  color: theme.palette.text.label,
  overflow: 'hidden',
  border: 0,
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
}))

export const CollectionPhoto = styled('img')(({ theme }) => ({
  width: 155,
  height: 150,
  flexBasis: 155,
  flexShrink: 0,
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    width: 120,
    flexBasis: 120,
  },
}))

export const CollectionDetails = styled('span')({
  minWidth: 0,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 9,
})

export const CollectionTitle = styled('span')(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.label,
  fontFamily: theme.typography.fontFamilySerif,
  fontSize: 22,
  fontWeight: 400,
  lineHeight: 1.2,
  overflowWrap: 'anywhere',
}))

export const CollectionMetadata = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 11,
  fontWeight: 400,
  lineHeight: '13px',
}))

export const CollectionAction = styled('span')(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: 11,
  fontWeight: 600,
  lineHeight: '13px',
}))
